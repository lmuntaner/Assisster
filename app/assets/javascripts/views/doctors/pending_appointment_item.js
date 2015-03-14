Assisster.Views.PendingAppointmentItem = Backbone.View.extend({
	template: JST["doctors/pending_appointment_item"],
	tagName: "tr",
	className: "clickable",
	
	events: {
		"click button.confirm": "checkAction",
		"click button.cancel": "checkAction"
	},
	
	initialize: function() {
		this.$el.attr('data-id', this.model.id);
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
			action: action
    	});
		
		$('body').append(pendingForm.render().$el);
	},
	
	checkAction: function (event) {
		event.preventDefault();
		var action;
		if ($(event.currentTarget).hasClass("confirm")) {
			this.showPendingForm("confirm")
		} else {
			this.showPendingForm("cancel")
		}
	},
})