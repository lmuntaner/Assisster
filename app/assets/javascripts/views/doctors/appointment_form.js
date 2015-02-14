Assisster.Views.AppointmentForm = Backbone.CompositeView.extend({
  template: JST["doctors/appointment_form"],
  className: "appointment-form-container",
  
  events: {
		"click .my-modal": "closeView",
		"click #submit-appointment-form": "save",
		"click #close-appointment-form": "closeView",
		"click #cancel-appointment-form": "cancelAppointment",
		"click #confirm-appointment-form": "confirmAppointment"
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
			this.$el.css('top', options.coordinates[1] - 430)	
		}

		if (options.date) {
			this.date = options.date;
			startTime = this.date.clone();	
			endTime = this.date.clone().add(30, 'm');
		} else if (this.model.isNew()){
			startTime = this.model.get('startTime');
			if (!startTime) {
				startTime = moment();
			}
			endTime = startTime.clone().add(30, "minutes");
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
	
	cancelAppointment: function (event) {
		// var appointment = this.model;
		// var view = this;
		// var url = "/api/cancel_appointments/" + this.model.id;
		// $.ajax({
		// 	type: "PATCH",
		// 	url: url,
		// 	success: function (response) {
		// 		$('#calendar').fullCalendar('removeEvents', [appointment.id]);
		// 		appointment.set("appointment_status", "Cancelled");
		// 		view.collection.bringToFront(view.model);
		// 		view.collection.trigger("statusSync", view.model);
		// 		view.remove();
		// 	}
		// });
		
		// this.model.set("appointment_status", "Cancelled");
		// $('#calendar').fullCalendar('removeEvents', [this.model.id]);
		// var view = this;
		// this.model.save({}, {
		// 	success: function (response) {
		// 		view.remove();
		// 	}
		// });
		
		this.$("div.reminders-container").css("display", "block");
	},
	
	// I need to figure out how to handle the clicks or mouseup outside this view
	checkClose: function (event) {
		if (event.currentTarget !== this.$el[0]) {
			this.closeView();
		}
	},
	
	closeView: function () {
		this.remove();
	},
	
	confirmAppointment: function (event) {
		// var appointment = this.model;
		// var view = this;
		// var url = "/api/confirm_appointments/" + this.model.id;
		// $.ajax({
		// 	type: "PATCH",
		// 	url: url,
		// 	success: function () {
		// 		appointment.set("appointment_status", "Confirmed");
		// 		view.collection.bringToFront(view.model);
		// 		view.collection.trigger("statusSync", view.model);
		// 		view.remove();
		// 	}
		// });
		
		// this.model.set("appointment_status", "Confirmed");
		// var view = this;
		// this.model.save({}, {
		// 	success: function (response) {
		// 		view.remove();
		// 	}
		// });
		
		this.$("div.reminder-container").css("display", "block");
		
	},
	
	onRender: function () {
		this.$('.setDatepicker').datepicker({
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
	    var startTime = moment.utc(stringStartTime, "D/M/YYYY HH:mm");
			var stringEndTime = params.endTimeDate + " " + params.endTimeHour;
		  var endTime = moment.utc(stringEndTime, "D/M/YYYY HH:mm");
	    var view = this;
			var appointmentStatus = this.model.get('appointment_status');
			if (appointmentStatus === "Cancelled" || this.model.isNew()) {
				appointmentStatus = "Confirmed";
			}
			if (!params.email) {
				params.email = null;
			}
			var appointmentParams = {
	      title: params.title,
	      startTime: startTime,
	      endTime: endTime,
				email: params.email,
				fname: params.fname,
				lname: params.lname,
				country_code: params.countrycode,
				phone_number: params.phone_number,
				appointment_status: appointmentStatus
	    };
		  this.model.save(appointmentParams);			
			this.$('#appointment-modal').modal('hide');
			this.remove();
		} else {
			this.$("div.appointment-title").addClass("has-error");
		}
	},
	
	validateForm: function (params) {
		return this.validateTitle(params.title);
	},
	
	validateTitle: function (title) {
		return title != "";
	},
	
})