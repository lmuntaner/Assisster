Assisster.Views.RecentAppointmentItem = Backbone.View.extend({
	template: JST["doctors/recent_appointment_item"],
	tagName: "tr",
	
	initialize: function() {
		this.listenTo(this.model, "sync", this.render);
	},
	
	render: function() {
		var renderedContent = this.template({
			appointment: this.model
		});
		var appointmentStauts = this.model.get('appointment_status');
		if (appointmentStauts === "Cancelled") {
			this.$el.addClass('danger');
		} else if (appointmentStauts === "Pending") {
			this.$el.addClass('warning');
		} else {
			this.$el.addClass('success');
		}
		this.$el.html(renderedContent);
		
		return this;
	}
})