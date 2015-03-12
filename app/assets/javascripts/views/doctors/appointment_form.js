Assisster.Views.AppointmentForm = Backbone.CompositeView.extend({
  	template: JST["doctors/appointment_form"],
  	className: "appointment-form-container",
  
  	events: {
		"click .my-modal": "closeView",
		"click #submit-appointment-form": "updateStep",
		"click #cancel-appointment-form": "cancelStep",
		"click #close-appointment-form": "closeView",
		"click #create-appointment-form": "createStep",
		"click #confirm-appointment-form": "confirmStep",
		"click #send-message": "messageStep",
		"click #send-email": "emailStep",
		"click #send-both": "sendBoth",
		"click #send-not": "sendNot"
  	},
	
	initialize: function(options) {
		var startTime, endTime;
		this.email = false;
		this.message = false;
		var screenWidth = $(document).width();
		var screenHeight = $(document).height();
		var formWidth = 330;
		var formHeigth = 600;

		this.$el.css('left', (screenWidth / 2) - (formWidth / 2));
		if (screenHeight < 700) {
			this.$el.css('top', 5);
		} else {
			this.$el.css('top', 50);
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

		this.selectorSendingForm = "div.sending-form-inputs"
		this.sendingForm = new Assisster.Views.SendingForm({
			model: this.model
		});
		this.addSubview(this.selectorSendingForm, this.sendingForm);
	},

	cancelStep: function () {
		this.action = "cancel";
		this.showForm();
	},
	
	closeView: function () {
		this.remove();
	},

	confirmStep: function () {
		this.action = "confirm";
		this.showForm();
	},

	createStep: function () {
		this.action = "create";
		this.showForm();
	},
	
	emailStep: function () {
		this.email = true;
		this.save();
	},
	
	messageStep: function () {
		this.message = true;
		this.save();
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
		this.attachSubview(this.selectorSendingForm, this.sendingForm);
		this.onRender()
			
		return this;
	},

	save: function () {
		var params = $("form.appointment-form").serializeJSON().appointment;
		if (this.validateForm(params)) {
			var stringStartTime = params.startTimeDate + " " + params.startTimeHour;
	    	var startTime = moment.utc(stringStartTime, "D/M/YYYY HH:mm");
			var stringEndTime = params.endTimeDate + " " + params.endTimeHour;
		  	var endTime = moment.utc(stringEndTime, "D/M/YYYY HH:mm");
			var appointmentStatus = this.model.get('appointment_status');
			if (this.action === "create" || this.action === "confirm") {
				appointmentStatus = "Confirmed";
			}
			if (this.action === "cancel") {
				$('#calendar').fullCalendar('removeEvents', [this.model.id]);
				appointmentStatus = "Cancelled";
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
			var view = this;
		  	this.model.save(appointmentParams, {
			  	success: function (model) {
			  		if (!view.collection.get(model.id)) {		  			
				  		view.collection.trigger("appAdd", model);
			  		}
			  		view.collection.add(model, {merge: true});
			  		if (view.email) {
			  			view.sendEmail()
			  		}
					if (view.message) {
						view.sendMessage();
					}
					view.closeView();
			  	},
			  	error: function (response) {
			  		console.log("Error!");
			  		view.closeView()
			  	}
		  	});			
		} else {
			this.$("div.appointment-title").addClass("has-error");
		}
	},
	
	sendBoth: function () {
		this.email = true;
		this.message = true;
		this.save();
	},
	
	sendEmail: function () {
		this.sendingForm.sendEmail(this.action);
	},
	
	sendMessage: function () {
		var url = "api/send_" + this.action + "_messages/" + this.model.id;
		$.ajax({
		  url: url,
		  type: "GET"
		});
	},
	
	sendNot: function () {
		this.save();
	},
	
	showForm: function (event) {
		this.$("div.sending-form-container").css("top", -2);
	},

	updateStep: function () {
		this.action = "update";
		this.showForm();
	},
	
	validateForm: function (params) {
		return true;
	},
	
	validateTitle: function (title) {
		return title != "";
	},
	
})