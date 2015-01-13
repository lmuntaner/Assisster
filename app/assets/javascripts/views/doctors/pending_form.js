Assisster.Views.PendingForm = Backbone.View.extend({
	template: JST["doctors/pending_form"],
	className: "pending-form-container",
	
	events: {
		"click #close": "closeView",
		"click #send-message": "sendMessage",
		"click #send-email": "sendEmail",
		"click #send-both": "sendBoth"
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
	
	render: function () {
		var renderedContent = this.template({
			appointment: this.model,
			action: this.action
		});
		this.$el.html(renderedContent);
		
		return this;
	},
	
	sendBoth: function (event) {
		this.callback(this.action, this.model.id);
		this.closeView();
	},
	
	sendEmail: function (event) {
		this.callback(this.action, this.model.id);
		this.closeView();
	},
	
	sendMessage: function (event) {
		this.callback(this.action, this.model.id);
		this.closeView();
	},
})