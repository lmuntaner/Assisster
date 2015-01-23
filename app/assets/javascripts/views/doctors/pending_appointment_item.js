Assisster.Views.PendingAppointmentItem = Backbone.View.extend({
	template: JST["doctors/pending_appointment_item"],
	tagName: "tr",
	className: "clickable",
	
	events: {
		"click button.confirm": "updateStatus",
		"click button.cancel": "updateStatus"
	},
	
	initialize: function() {
		this.$el.attr('data-id', this.model.id);
	},
	
	requestToServer: function (action, id) {
		var url = "/api/" + action + "_appointments/" + id;
		$.ajax({
			type: "PATCH",
			url: url
		});
	},

	render: function() {
		var renderedContent = this.template({
			appointment: this.model
		});
		this.$el.html(renderedContent);
		
		return this;
	},
	
	// Not using this form. Using the one below.
	// I should delete this and the confirmation form View and Template
	showConfirmationForm: function (action, event) {
		var coordinates = [event.clientX, event.clientY];
		
    var confirmationForm = new Assisster.Views.ConfirmationForm({
			model: this.model,
			coordinates: coordinates,
			callback: this.requestToServer,
			action: action
    });
		
		$('body').append(confirmationForm.render().$el);
	},
	
	showPendingForm: function (action, event) {
		var coordinates = [event.clientX, event.clientY];

    var pendingForm = new Assisster.Views.PendingForm({
			model: this.model,
			coordinates: coordinates,
			callback: this.requestToServer,
			action: action
    });
		
		$('body').append(pendingForm.render().$el);
	},
	
	updateStatus: function (event) {
		event.preventDefault();
		
		var action = $(event.currentTarget).text().toLowerCase();
		// this.showConfirmationForm(action, event);
		this.showPendingForm(action, event);
		// this.requestToServer(action, this.model.id)
	},
})