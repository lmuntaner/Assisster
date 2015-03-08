Assisster.Views.PendingForm = Backbone.CompositeView.extend({
	template: JST["doctors/pending_form"],
	className: "pending-form-container",
	
	events: {
		"click div.my-modal": "closeView",
		"click #send-message": "messageStep",
		"click #send-email": "emailStep",
		"click #send-both": "sendBoth",
		"click #send-not": "sendNot"
	},
	
	initialize: function (options) {
		this.callback = options.callback;
		this.email = false;
		this.message = false;

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
	
	emailStep: function (event) {
		this.email = true;
		this.updateStatus();
	},
	
	messageStep: function (event) {
		this.message = true;
		this.updateStatus();
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

	updateStatus: function () {
		var view = this;
		if (this.action === "cancel") {
			$('#calendar').fullCalendar('removeEvents', [this.model.id]);
			this.model.set("appointment_status", "Cancelled");
		} else {
			this.model.set("appointment_status", "Confirmed");
		}
		this.model.save({}, {
			success: function (response) {
				if (view.email) {
					view.sendEmail();
				}
				if (view.message) {
					view.sendMessage();
				}
				view.closeView();
			}
		});
	},
	
	sendBoth: function (event) {
		this.email = true;
		this.message = true;
		this.updateStatus();
	},
	
	sendEmail: function () {
		this.sendingForm.sendEmail(this.action);
		// var url = "api/send_" + this.action + "_emails/" + this.model.id;
		// $.ajax({
		//   url: url,
		//   type: "GET"
		// });
	},
	
	sendMessage: function () {
		var url = "api/send_" + this.action + "_messages/" + this.model.id;
		$.ajax({
		  url: url,
		  type: "GET"
		});
	},
	
	sendNot: function (event) {
		this.updateStatus();
	},
})