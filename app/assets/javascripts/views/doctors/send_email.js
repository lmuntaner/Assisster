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
	
	sendEmail: function (event) {
		event.preventDefault();
		var params = $(event.currentTarget).parent().serializeJSON().email;
		var url = "/api/send_emails";
		var email_data = {
			to: params.to,
			subject: params.subject,
			body: params.body
		};
		$.ajax({
		  url: url,
		  type: "POST",
		  data: {
		    email: email_data
		  },
			success: function (widgetData) {
		    console.log("email sent successfully");
		  }
		});
	}
})