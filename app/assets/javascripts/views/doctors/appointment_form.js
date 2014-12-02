Assisster.Views.AppointmentForm = Backbone.CompositeView.extend({
  template: JST["doctors/appointment_form"],
  className: "appointment-form-container",
  
  events: {
		"click #submit-appointment-form": "save",
		"click #close-appointment-form": "closeView",
		"click #cancel-appointment-form": "cancel"
  },
	
	initialize: function(options) {
		var startTime, endTime;
		
		if (options.coordinates[0] < 1000) {
			this.$el.css('left', options.coordinates[0])			
		} else {
			this.$el.css('left', options.coordinates[0] - 300)
		}
		if (options.coordinates[1] < 400) {
			this.$el.css('top', options.coordinates[1] - 150)			
		} else {
			this.$el.css('top', options.coordinates[1] - 300)	
		}
		
		if (options.date) {
			this.date = options.date;
			startTime = this.date.clone();	
			endTime = this.date.clone().add(30, 'm');
		} else {
			this.event = options.event;
			startTime = moment.utc(this.model.escape('startTime'));
			endTime = moment.utc(this.model.escape('endTime'));	
		}
		
		this.fromDateForm = new Assisster.Views.DateForm({
			date: startTime,
			position: "From"
		});
		this.toDateForm = new Assisster.Views.DateForm({
			date: endTime,
			position: "To"
		});
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
				$('#calendar').fullCalendar('removeEvents', [appointment.id]);
				view.remove();
			}
		})
	},
	
	closeView: function () {
		this.remove();
	},
	
	onRender: function () {
		this.$('.setDatepicker').datepicker();
		this.$('.setTimepicker').timepicker();
	},
  
  render: function () {
    var renderedContent = this.template({
    	date: this.date,
			appointment: this.model
    });
    this.$el.html(renderedContent);
		this.attachSubview(this.selectorDate, this.fromDateForm);
		this.attachSubview(this.selectorDate, this.toDateForm);
		this.onRender()
		
    return this;
  },

	save: function (event) {
		event.preventDefault();
		var params = $(event.currentTarget).parent().serializeJSON().appointment;
		if (this.validateForm(params)) {
			var stringStartTime = params.startTimeDate + " " + params.startTimeHour;
	    var startTime = moment.utc(stringStartTime, "M/D/YYYY h:mm a");
			var stringEndTime = params.endTimeDate + " " + params.endTimeHour;
		  var endTime = moment.utc(stringEndTime, "M/D/YYYY h:mm a");
	    var view = this;
			var appointmentParams = {
	      title: params.title,
	      startTime: startTime,
	      endTime: endTime,
				email: params.email,
				fname: params.fname,
				lname: params.lname,
				appointment_status: "Approved"
	    };
			if (this.model.isNew()) {
		    this.model.save(appointmentParams, {
		      success: function (model) {
		        view.collection.add(model);
		      }
		    })				
			} else {
				var calendarEvent = this.event;
				this.model.save(appointmentParams, {
					success: function (model) {
						view.collection.remove(model);
						view.collection.add(model);
					}
				});
			}
			this.$('#appointment-modal').modal('hide');
			this.remove();
		} else {
			var $errors = $('<span>').text('Error!').addClass('error');
			this.$('#appointment-modal .panel-body').prepend($errors);
		}
	},
	
	validateForm: function (params) {
		return this.validateTitle(params.title);
	},
	
	validateTitle: function (title) {
		return title != "";
	},
	
})