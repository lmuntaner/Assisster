Assisster.Views.SendEmailView = Backbone.View.extend({
  template: JST["doctors/send_email_form"],
  className: "col-xs-6 send-email-form",
	
	events: {
		"click #send-email": "sendEmail"
	},

	render: function () {
		var renderedContent = this.template();
		this.$el.html(renderedContent);

		return this;
	},
	
	resetForm: function () {
		this.$("input").val("");
		this.$("textarea").val("")
	},
	
	sendEmail: function (event) {
		event.preventDefault();
		var params = $(event.currentTarget).parent().serializeJSON().email;
		if (this.validateParams(params)) {
			var url = "/api/send_emails";
			var email_body = params.body;
			var email_data = {
				to: params.to,
				subject: params.subject,
				body: email_body
			};
			var view = this;
			$.ajax({
			  url: url,
			  type: "POST",
			  data: {
			    email: email_data
			  }
			});			
		    view.resetForm();
		}
	},
	
	validateBody: function (body) {
		if (body.length > 0) {
			this.$("div.email-body").removeClass("has-error");
			return true;
		} else {
			this.$("div.email-body").addClass("has-error");
			return false;
		}
	},
	
	validateEmail: function (email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (re.test(email)) {
			this.$("div.email-to").removeClass("has-error");
			return true;
		} else {
			this.$("div.email-to").addClass("has-error");
			return false;
		}
	},
	
	validateSubject: function (body) {
		if (body.length > 0) {
			this.$("div.email-subject").removeClass("has-error");
			return true;
		} else {
			this.$("div.email-subject").addClass("has-error");
			return false;
		}
	},
	
	validateParams: function (params) {
		var validated = true;
		if (!this.validateEmail(params.to)) validated = false;
		if (!this.validateSubject(params.subject)) validated = false;
		if (!this.validateBody(params.body)) validated = false;
		
		return validated;
	},
})