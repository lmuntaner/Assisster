Assisster.Views.OfficeHourForm = Backbone.CompositeView.extend({
	template: JST["doctors/office_hour_form"],
	className: "appointment-form-container",
	
	events: {
		"click div.my-modal": "closeView",
		"click #close-office-hour-form": "closeView",
		"click #submit-office-hour-form": "save",
		"click #cancel-office-hour-form": "cancel",
		"click #open-more-days": "showMoreDays"
	},
	
	initialize: function (options) {
		var startTime, endTime;
		var screenWidth = $(document).width();
		var screenHeight = $(document).height();
		var formWidth = 330;
		var formHeigth = 350;

		this.$el.css('left', (screenWidth / 2) - (formWidth / 2));
		this.$el.css('top', 150);
		
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
				
		this.fromDateForm = new Assisster.Views.DateForm({
			date: startTime,
			position: "Desde",
			formView: this
		});
		this.toDateForm = new Assisster.Views.DateForm({
			date: endTime,
			position: "Hasta",
			formView: this
		});
		this.fromDateForm.setEndDate(this.toDateForm);
		this.toDateForm.setStartDate(this.fromDateForm);
		this.selectorDate = "div.form-inputs";
		this.addSubview(this.selectorDate, this.fromDateForm);
		this.addSubview(this.selectorDate, this.toDateForm);
	},
	
	cancel: function (event) {
		this.model.set("appointment_status", "Cancelled");
		this.model.save();
		this.remove();
	},
	
	closeView: function () {
		this.remove();
	},
	
	onRender: function () {
		this.$('.setDatepicker').datepicker({
			weekStart: 1,
			language: "es",
			format: 'dd/mm/yyyy',
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
		var nextDates = this.$('.more-dates-pick').datepicker("getDates");
		if (nextDates.length > 0) {
			nextDates.forEach(function (nextDate) {
				var strNextDate = moment(nextDate).format("D/M/YYYY");
				var newOfficeHour = new Assisster.Models.Appointment();
				stringStartTime = strNextDate + " " + params.startTimeHour;
				stringEndTime = strNextDate + " " + params.endTimeHour;
				view.saveOfficeHour(newOfficeHour, stringStartTime, stringEndTime)
			});			
		}
		this.remove();
	},
	
	saveOfficeHour: function(appointment, strStartTime, strEndTime) {
	    startTime = moment.utc(strStartTime, "D/M/YYYY HH:mm");
		endTime = moment.utc(strEndTime, "D/M/YYYY HH:mm");
	    var view = this;
		var appointmentParams = {
	    	title: "office hour",
	      	startTime: startTime,
	      	endTime: endTime,
			appointment_status: "Confirmed",
			office_hour: true
    	};
    	var isNewOfficeHour = appointment.isNew();
	    appointment.save(appointmentParams, {
			success: function (model) {
				view.collection.add(model, {merge: true});
				if (isNewOfficeHour) {
					view.collection.trigger("appAdd", model);					
				}
			}
	    });
	},

	showMoreDays: function () {
		var view = this;
		var focusDate = moment.utc(this.model.get('startTime')).add(1, "days").format("MM/DD/YYYY");
		if (this.fromDateForm.date) {
			focusDate = this.fromDateForm.date.add(1, "days").format("MM/DD/YYYY");
		}else if (!focusDate) {
			focusDate = moment().add(1, "days").format("MM/DD/YYYY");
		}
		this.$('.more-dates-pick').datepicker({
			todayHighlight: false,
			startDate: focusDate,
			multidate: true,
			language: "es",
			weekStart: 1
		});
	}
	
})