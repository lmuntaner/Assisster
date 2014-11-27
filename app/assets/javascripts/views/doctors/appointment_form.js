Assisster.Views.AppointmentForm = Backbone.CompositeView.extend({
  template: JST["doctors/appointment_form"],
  className: "appointment-form-container",
  
  events: {
    "click input[value='Cancel']": "cancel",
		"click input[value='Save']": "save"
  },
	
	initialize: function(options) {
		this.date = options.date;
		this.fromDateForm = new Assisster.Views.DateForm({
			date: this.date.clone(),
			position: "From"
		});
		this.toDateForm = new Assisster.Views.DateForm({
			date: this.date.add(30, 'm').clone(),
			position: "To"
		});
		this.selectorDate = "#appointment-modal .form-inputs";
		
		this.addSubview(this.selectorDate, this.fromDateForm);
		this.addSubview(this.selectorDate, this.toDateForm);
	},
  
  cancel: function (event) {
    event.preventDefault();
    this.$('#appointment-modal').modal('hide');
		this.remove();
  },
	
	onRender: function () {
		this.$('.setDatepicker').datepicker();
		this.$('.setTimepicker').timepicker();
	},
  
  render: function () {
    var renderedContent = this.template({
    	date: this.date
    });
    this.$el.html(renderedContent);
		this.attachSubview(this.selectorDate, this.fromDateForm);
		this.attachSubview(this.selectorDate, this.toDateForm);
		this.onRender()
		
    return this;
  },
	
	setMomentObject: function (dateObject, date, time) {
		var dateArray = date.split('/');
		dateObject.date(dateArray[1]);
		dateObject.month(dateArray[0]);
		dateObject.year(dateArray[2]);
		var timeArray = time.split(":");
		var sum = (timeArray[1].slice(2, 4) === 'am' ? 0 : 12)
		dateObject.hour(parseInt(timeArray[0]) + sum);
		dateObject.minute(parseInt(timeArray[1].slice(0,2)));
		
		return dateObject;
	},
	
	save: function (event) {
		event.preventDefault();
		var params = $(event.currentTarget).parent().serializeJSON().appointment;
		if (this.validateForm(params)) {
			var title = params.title;
	    var startTime = this.setMomentObject(this.fromDateForm.date,
																			params.startTimeDate,
																			params.startTimeHour);
	    var endTime = this.setMomentObject(this.toDateForm.date,
																			params.endTimeDate,
																			params.endTimeHour);
			var appointment = new Assisster.Models.Appointment({
	      title: title,
	      startTime: startTime,
	      endTime: endTime
	    });
	    var view = this;
	    appointment.save({}, {
	      success: function (model) {
	        view.collection.add(model);
	      }
	    })
			this.remove();
			this.$('#appointment-modal').modal('hide');			
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