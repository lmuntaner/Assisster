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
		this.$el.html(renderedContent);
		
		return this;
	}
})