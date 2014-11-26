Assisster.Views.AppointmentForm = Backbone.View.extend({
  template: JST["doctors/appointment_form"],
  className: "appointment-form-container",
  
  events: {
    "click input[value='Cancel']": "cancel",
		"click input[value='Save']": "save"
  },
  
  cancel: function (event) {
    event.preventDefault();
    this.$('#appointment-modal').modal('hide');
  },
	
	save: function (event) {
		event.preventDefault();
		$form = $(event.currentTarget).parent();
		debugger
    var startTime = date.toJSON();
    var endTime = date.add(30, "m").toJSON();
		var params = 
		this.$('#appointment-modal').modal('hide');
	},
  
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    
    return this;
  }
})