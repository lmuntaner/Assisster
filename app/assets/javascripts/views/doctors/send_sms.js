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
		if (this.validateParams(params)) {
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
	},
	
	validateMessage: function (message) {
		if (message.length > 0) {
			this.$("div.sms-message").removeClass("has-error");
			return true;
		} else {
			this.$("div.sms-message").addClass("has-error");
			return false;
		}
	},
	
	validatePhoneNumber: function (countrycode, phoneNumber) {
		if (/^\d+$/.test(phoneNumber) && (countrycode + phoneNumber).length === 11) {
			this.$("div.sms-phoneNumber").removeClass("has-error");
			return true;
		} else {
			this.$("div.sms-phoneNumber").addClass("has-error");
			return false;
		}
	},
	
	validateParams: function (params) {
		var validated = true;
		if (!this.validatePhoneNumber(params.countrycode, params.phoneNumber)) validated = false;
		if (!this.validateMessage(params.message)) validated = false;
		
		return validated;
	},
})