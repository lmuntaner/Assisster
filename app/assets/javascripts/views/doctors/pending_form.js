Assisster.Views.PendingForm = Backbone.View.extend({
	template: JST["doctors/pending_form"],
	className: "pending-form-container",
	
	events: {
		"click #close": "closeView",
		"click #send-message": "message",
		"click #send-email": "email",
		"click #send-both": "sendBoth",
		"click #send-not": "sendNot"
	},
	
	initialize: function (options) {
		this.callback = options.callback;
		if (options.coordinates[0] < 1000) {
			this.$el.css('left', options.coordinates[0]);
		} else {
			this.$el.css('left', options.coordinates[0] - 300);
		}
		this.$el.css('top', options.coordinates[1] - 150);
		this.action = options.action;
	},
	
	closeView: function () {
		this.remove();
	},
	
	callbackAndClose: function () {
		this.callback(this.action, this.model.id);
		this.closeView();
	},
	
	email: function (event) {
		this.sendEmail();
		this.callbackAndClose();
	},
	
	message: function (event) {
		this.sendMessage();
		this.callbackAndClose();
	},
	
	render: function () {
		var renderedContent = this.template({
			appointment: this.model,
			action: this.action
		});
		this.$el.html(renderedContent);
		
		return this;
	},
	
	sendBoth: function (event) {
		this.sendEmail();
		this.sendMessage();
		this.callbackAndClose();
	},
	
	sendEmail: function () {
		var url = "api/send_" + this.action + "_emails/" + this.model.id;
		$.ajax({
		  url: url,
		  type: "GET"
		});
	},
	
	sendMessage: function () {
		var url = "api/send_" + this.action + "_messages/" + this.model.id;
		$.ajax({
		  url: url,
		  type: "GET"
		});
	},
	
	sendNot: function (event) {
		this.callbackAndClose();
	},
})