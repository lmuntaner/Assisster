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
			var email_data = {
				to: params.to,
				subject: params.subject,
				body: params.body
			};
			var view = this;
			$.ajax({
			  url: url,
			  type: "POST",
			  data: {
			    email: email_data
			  },
				success: function (widgetData) {
			    view.resetForm();
			  }
			});			
		}
	},
	
	validateBody: function (body) {
		var $errorBody = $("<li>").addClass("errorBody").text("Introduce un Mensaje");
		if (body.length > 0) {
			this.remove("li.errorBody");
			return true;
		} else {
			this.$("ul.validation-errors").append($errorBody);
			return false;
		}
	},
	
	validateEmail: function (email) {
		var $errorEmail = $("<li>").addClass("errorEmail").text("Email Incorrecto");
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (re.test(email)) {
			this.remove("li.errorEmail");
			return true;
		} else {
			this.$("ul.validation-errors").append($errorEmail);
			return false;
		}
	},
	
	validateSubject: function (body) {
		var $errorSubject = $("<li>").addClass("errorSubject").text("Introduce un Asunto");
		if (body.length > 0) {
			this.remove("li.errorSubject");
			return true;
		} else {
			this.$("ul.validation-errors").append($errorSubject);
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