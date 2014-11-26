Assisster.Views.AppointmentForm = Backbone.View.extend({
  template: JST["doctors/appointment_form"],
  className: "appointment-form-container",
  
  events: {
    "click input[type='submit']": "cancel",
  },
  
  cancel: function (event) {
    event.preventDefault();
    this.$('#appointment-modal').modal('hide');
  },
  
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    
    return this;
  }
})