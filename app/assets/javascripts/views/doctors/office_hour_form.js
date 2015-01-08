Assisster.Views.OfficeHourForm = Backbone.CompositeView.extend({
	template: JST["doctors/office_hour_form"],
	className: "appointment-form-container",
	
	events: {
		"click #close-office-hour-form": "closeView",
		"click #submit-office-hour-form": "save",
		"click #cancel-office-hour-form": "cancel"
	},
	
	initialize: function (options) {
		var startTime, endTime;
		
		if (options.coordinates[0] < 1000) {
			this.$el.css('left', options.coordinates[0]);
		} else {
			this.$el.css('left', options.coordinates[0] - 330);
		}
		if (options.coordinates[1] < 400) {
			this.$el.css('top', options.coordinates[1]);
		} else {
			this.$el.css('top', options.coordinates[1] - 350);
		}
		
		if (options.date) {
			this.date = options.date;
			startTime = this.date.clone();	
			endTime = this.date.clone().add(4, 'hours');
		} else if (this.model.isNew()){
			startTime = this.model.get('startTime');
			if (!startTime) {
				startTime = moment();
			}
			endTime = startTime.clone().add(4, "hours");
		} else {
			this.event = options.event;
			startTime = moment.utc(this.model.escape('startTime'));
			endTime = moment.utc(this.model.escape('endTime'));
		}
		
		this.week = [];
		var nextDate;
		for (var i = 1; i <= 7; i++) {
			nextDate = startTime.clone().add(i, 'days');
			this.week.push(nextDate);
		};
				
		this.fromDateForm = new Assisster.Views.DateForm({
			date: startTime,
			position: "From",
			formView: this
		});
		this.toDateForm = new Assisster.Views.DateForm({
			date: endTime,
			position: "To",
			formView: this
		});
		this.fromDateForm.setEndDate(this.toDateForm);
		this.toDateForm.setStartDate(this.fromDateForm);
		this.selectorDate = "div.form-inputs";
		this.addSubview(this.selectorDate, this.fromDateForm);
		this.addSubview(this.selectorDate, this.toDateForm);
	},
	
	cancel: function (event) {
		var appointment = this.model;
		var view = this;
		var url = "/api/cancel_appointments/" + this.model.id;
		$.ajax({
			type: "PATCH",
			url: url,
			success: function () {
				$('#office_hour_calendar').fullCalendar('removeEvents', [appointment.id]);
				view.remove();
			}
		})
	},
	
	closeView: function () {
		this.remove();
	},
	
	onRender: function () {
		this.$('.setDatepicker').datepicker({
			autoclose: true
		});
		this.$('.setTimepicker').timepicker({
			'timeFormat': 'H:i'
		});
	},
  
  render: function () {
    var renderedContent = this.template({
    	date: this.date,
			appointment: this.model,
			week: this.week
    });
    this.$el.html(renderedContent);
		this.attachPrependSubview(this.selectorDate, this.toDateForm);
		this.attachPrependSubview(this.selectorDate, this.fromDateForm);
		this.onRender()
		
    return this;
  },
	
	save: function (event) {
		event.preventDefault();
		var params = $(event.currentTarget).parent().serializeJSON().appointment;
		var stringStartTime = params.startTimeDate + " " + params.startTimeHour;
		var stringEndTime = params.endTimeDate + " " + params.endTimeHour;
		this.saveOfficeHour(this.model, stringStartTime, stringEndTime);
		var view = this;
		if (params.nextDates) {
			params.nextDates.forEach(function (nextDate) {
				var newOfficeHour = new Assisster.Models.Appointment();
				stringStartTime = nextDate + " " + params.startTimeHour;
				stringEndTime = nextDate + " " + params.endTimeHour;
				view.saveOfficeHour(newOfficeHour, stringStartTime, stringEndTime)
			});			
		}
	},
	
	saveOfficeHour: function(appointment, strStartTime, strEndTime) {
    startTime = moment.utc(strStartTime, "M/D/YYYY HH:mm");
	  endTime = moment.utc(strEndTime, "M/D/YYYY HH:mm");
    var view = this;
		var appointmentParams = {
      title: "office hour",
      startTime: startTime,
      endTime: endTime,
			appointment_status: "Confirmed",
			office_hour: true
    };
    appointment.save(appointmentParams, {
      success: function (model) {
				view.remove();
      }
    });
	},
	
})