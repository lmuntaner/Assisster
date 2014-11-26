Assisster.Views.AppointmentForm = Backbone.View.extend({
  template: JST["doctors/appointment_form"],
  className: "appointment-form-container",
  
  events: {
    
  },
  
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    
    return this;
  }
})