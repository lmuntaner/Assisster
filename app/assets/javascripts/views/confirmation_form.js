Assisster.Views.ConfirmationForm = Backbone.View.extend({
	template: JST["doctors/confirmation_form"],
	className: "confirmation-form-container",
	
	events: {
		"click #cancel": "closeView",
		"click #send-message": "sendMessage"
	},
	
	initialize: function (options) {
		if (options.coordinates[0] < 1000) {
			this.$el.css('left', options.coordinates[0])			
		} else {
			this.$el.css('left', options.coordinates[0] - 300)
		}
		if (options.coordinates[1] < 400) {
			this.$el.css('top', options.coordinates[1] - 150)			
		} else {
			this.$el.css('top', options.coordinates[1] - 300)	
		}
	},
	
	closeView: function () {
		this.remove();
	},
	
	render: function () {
		var renderedContent = this.template({
			appointment: this.model
		});
		this.$el.html(renderedContent);
		
		return this;
	},
	
	sendMessage: function (event) {
		event.preventDefault();
		var params = $(event.currentTarget).parent().serializeJSON();
		var view = this;
		var phone_number = "1" + params.phone_number;
		// var data = {}
		// data.api_key = "72a4964e";
		// data.api_secret = "f6aa10e6";
		// data.from = "Dr William Davis";
		// data.to = phone_number;
		var text = params.message; //.replace(" ", "_");
		// data.text = text
		
		var url = "https://rest.nexmo.com/sms/json?api_key=72a4964e&api_secret=f6aa10e6&from=12097299391&to=" + phone_number + "&text=" + text;
		// var url = "https://rest.nexmo.com/sms/json";
		$.ajax({
			type: "GET",
			// data: data,
			url: url,
			// contentType: "application/json",
			success: function () {
				debugger;
				view.remove();
			},
			error: function () {
				debugger;
				view.remove();
			}
		});
	},
})