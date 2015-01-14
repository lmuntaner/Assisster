Assisster.Views.SendSmsView = Backbone.View.extend({
  template: JST["doctors/send_sms_form"],
  className: "col-xs-6 send-sms-form",
  
  render: function () {
    var renderedContent = this.template({
    	doctor: this.model
    });
    this.$el.html(renderedContent);
    
    return this;
  },
})