Assisster.Views.PendingAppointmentItem = Backbone.View.extend({
	template: JST["doctors/pending_appointment_item"],
	tagName: "tr",
	className: "clickable",
	
	events: {
		"click button.confirm": "showForm",
		"click button.cancel": "showForm"
	},
	
	initialize: function() {
		this.$el.attr('data-id', this.model.id);
	},
	
	requestToServer: function (action, id) {
		if (action === "cancel") {
			$('#calendar').fullCalendar('removeEvents', [this.model.id]);
			this.model.set("appointment_status", "Cancelled");
		} else {
			this.model.set("appointment_status", "Confirmed");
		}
		this.model.save();
	},

	render: function() {
		var renderedContent = this.template({
			appointment: this.model
		});
		this.$el.html(renderedContent);
		
		return this;
	},
	
	showPendingForm: function (action) {
    	var pendingForm = new Assisster.Views.PendingForm({
			model: this.model,
			collection: this.collection,
			// callback: this.requestToServer,
			action: action
    	});
		
		$('body').append(pendingForm.render().$el);
	},
	
	showForm: function (event) {
		event.preventDefault();
		var action;
		if ($(event.currentTarget).text().toLowerCase() === "confirmar") {
			action = "confirm";
		} else {
			action = "cancel";
		}
		this.showPendingForm(action);
	},
})