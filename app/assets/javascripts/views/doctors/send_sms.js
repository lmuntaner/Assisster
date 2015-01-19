Assisster.Views.SendSmsView = Backbone.View.extend({
  template: JST["doctors/send_sms_form"],
  className: "col-xs-6 send-sms-form",
	
	events: {
		"click #send-sms": "sendSms"
	},
  
  render: function () {
    var renderedContent = this.template({
    	doctor: this.model
    });
    this.$el.html(renderedContent);
    
    return this;
  },
	
	resetForm: function () {
		this.$("input").val("");
		this.$("textarea").val("")
	},
	
	sendSms: function (event) {
		event.preventDefault();
		var params = $(event.currentTarget).parent().serializeJSON().sms;
		var phoneNumber = params.countrycode + params.phoneNumber;
		var url = "/api/send_messages";
		var sms_data = {
			phone_number: phoneNumber,
			message: params.message,
		};
		var view = this;
		$.ajax({
		  url: url,
		  type: "POST",
		  data: {
		    sms: sms_data
		  },
			success: function () {
		    view.resetForm();
		  }
		});
	}
})