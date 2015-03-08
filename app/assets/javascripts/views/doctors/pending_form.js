Assisster.Views.PendingForm = Backbone.CompositeView.extend({
	template: JST["doctors/pending_form"],
	className: "pending-form-container",
	
	events: {
		"click div.my-modal": "closeView",
		"click #close": "closeView",
		"click #send-message": "message",
		"click #send-email": "email",
		"click #send-both": "sendBoth",
		"click #send-not": "sendNot"
	},
	
	initialize: function (options) {
		this.callback = options.callback;

		var screenWidth = $(document).width();
		var screenHeight = $(document).height();
		var formWidth = 220;
		var formHeigth = 210;

		this.$el.css('left', (screenWidth / 2) - (formWidth / 2));
		this.$el.css('top', 150);

		this.action = options.action;

		this.selectorSendingForm = "div.sending-form-inputs"
		this.sendingForm = new Assisster.Views.SendingForm({
			model: this.model
		});
		this.addSubview(this.selectorSendingForm, this.sendingForm);
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
		this.attachSubview(this.selectorSendingForm, this.sendingForm);
		
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