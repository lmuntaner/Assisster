Assisster.Views.ConfirmationForm = Backbone.View.extend({
	template: JST["doctors/confirmation_form"],
	className: "confirmation-form-container",
	
	events: {
		"click #cancel": "closeView",
		"click #send-message": "sendMessage"
	},
	
	initialize: function (options) {
		this.callback = options.callback;
		if (options.coordinates[0] < 1000) {
			this.$el.css('left', options.coordinates[0])			
		} else {
			this.$el.css('left', options.coordinates[0] - 300)
		}
		this.$el.css('top', options.coordinates[1] - 150)
		this.action = options.action	
	},
	
	closeView: function () {
		this.callback(this.action, this.model.id);
		this.remove();
	},
	
	render: function () {
		var message;
		if (this.action == "confirm") {
			message = "Appointment Confirmed for: " + this.model.date() + " at " + this.model.time();			
		} else {
			message = "Sorry, but you appointment for: " + this.model.date() + " at " + this.model.time();
			message += " has been cancelled";
		}
		var renderedContent = this.template({
			appointment: this.model,
			message: message
		});
		this.$el.html(renderedContent);
		
		return this;
	},
	
	sendMessage: function (event) {
		event.preventDefault();
		// var params = $(event.currentTarget).parent().serializeJSON();
		// var view = this;
		// var phone_number = params.appointment.countrycode + params.appointment.phone_number;
		// var text = params.message;
		// $.ajax({
		// 	type: "GET",
		// 	// data: data,
		// 	url: url,
		// 	// contentType: "application/json",
		// 	success: function () {
		// 		view.callback("confirm", view.model.id);
		// 		view.remove();
		// 	},
		// 	error: function () {
		// 		view.callback("confirm", view.model.id);
		// 		view.remove();
		// 	}
		// });
	},
})