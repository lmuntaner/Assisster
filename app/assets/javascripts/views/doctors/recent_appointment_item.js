Assisster.Views.RecentAppointmentItem = Backbone.View.extend({
	template: JST["doctors/recent_appointment_item"],
	tagName: "tr",
	className: "clickable",
	
	initialize: function() {
		this.$el.attr('data-id', this.model.id);
	},
	
	render: function() {
		var renderedContent = this.template({
			appointment: this.model
		});
		var appointmentStatus = this.model.get('appointment_status');
		if (appointmentStatus === "Cancelled") {
			this.$el.addClass('danger');
		} else if (appointmentStatus === "Pending") {
			this.$el.addClass('warning');
		} else {
			this.$el.addClass('success');
		}
		this.$el.html(renderedContent);
		
		return this;
	},
})