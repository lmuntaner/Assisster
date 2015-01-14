Assisster.Views.SendEmailView = Backbone.View.extend({
  template: JST["doctors/send_email_form"],
  className: "col-xs-6 send-email-form",
  
  initialize: function () {
  },
  
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    
    return this;
  },
})