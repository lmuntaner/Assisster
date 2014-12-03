Assisster.Views.AppointmentsItem = Backbone.View.extend({
	template: JST["doctors/appointments_item"],
	tagName: "tr",
	
	initialize: function(options) {
		this.listenTo(this.model, "sync", this.render);
		this.$el.attr('data-id', this.model.id);
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
	},
})