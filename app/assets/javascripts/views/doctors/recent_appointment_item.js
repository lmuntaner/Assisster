Assisster.Views.RecentAppointmentItem = Backbone.View.extend({
	template: JST["doctors/recent_appointment_item"],
	tagName: "tr",
	className: "clickable",
	
	initialize: function() {
		this.$el.attr('data-id', this.model.id);
	},
	
	render: function() {
		if(this.model.id == 52){
			console.log('rendering item')
		}
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