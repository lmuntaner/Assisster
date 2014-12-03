Assisster.Views.PendingAppointmentItem = Backbone.View.extend({
	template: JST["doctors/pending_appointment_item"],
	tagName: "tr",
	
	events: {
		"click button.confirm": "updateStatus",
		"click button.cancel": "updateStatus"
	},
	
	initialize: function() {
		this.listenTo(this.model, "sync", this.render);
	},
	
	updateStatus: function (event) {
		var action = $(event.currentTarget).text().toLowerCase();
		var view = this;
		var url = "/api/" + action + "_appointments/" + this.model.id;
		$.ajax({
			type: "PATCH",
			url: url,
			success: function () {
				view.remove();
			}
		});
		
		if (action === "confirm") {
			this.showForm(event);
		}
	},
	
	render: function() {
		var renderedContent = this.template({
			appointment: this.model
		});
		this.$el.html(renderedContent);
		
		return this;
	},
	
	showForm: function (event) {
		var coordinates = [event.clientX, event.clientY];
		
    var confirmationForm = new Assisster.Views.ConfirmationForm({
			model: this.model,
			coordinates: coordinates,
    });
		
		this.$el.append(confirmationForm.render().$el);
	},
})