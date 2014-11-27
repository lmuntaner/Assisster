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
		this.$('#setTimepicker').timepicker();
	},
	
	save: function (event) {
		event.preventDefault();
		$form = $(event.currentTarget).parent();
		var title = $form.serializeJSON().appointment.title;
    var startTime = this.fromDateForm.date.toJSON();
    var endTime = this.toDateForm.date.toJSON();
		debugger
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
		this.$('#appointment-modal').modal('hide');
		this.remove();
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
  }
})