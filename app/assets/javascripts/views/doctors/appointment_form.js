Assisster.Views.AppointmentForm = Backbone.CompositeView.extend({
  template: JST["doctors/appointment_form"],
  className: "appointment-form-container",
  
  events: {
		"click #submit-appointment-form": "save",
		"click #cancel-appointment-form": "cancel"
  },
	
	initialize: function(options) {
		var startTime, endTime;
		if (options.date) {
			this.date = options.date;
			startTime = this.date.clone();	
			endTime = this.date.add(30, 'm').clone();
		} else {
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
		this.selectorDate = "#appointment-modal .form-inputs";
		
		this.addSubview(this.selectorDate, this.fromDateForm);
		this.addSubview(this.selectorDate, this.toDateForm);
	},
	
	cancel: function () {
		this.$('#appointment-modal').modal('hide');
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
			var title = params.title;
			var stringStartTime = params.startTimeDate + " " + params.startTimeHour;
	    var startTime = moment.utc(stringStartTime, "M/D/YYYY h:mm a");
			var stringEndTime = params.endTimeDate + " " + params.endTimeHour;
		  var endTime = moment.utc(stringEndTime, "M/D/YYYY h:mm a");
	    var view = this;
			this.model.set({
	      title: title,
	      startTime: startTime,
	      endTime: endTime
	    });
			if (this.model.isNew) {
		    this.model.save({}, {
		      success: function (model) {
		        view.collection.add(model);
		      }
		    })				
			} else {
				this.model.save();
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