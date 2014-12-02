Assisster.Views.TodaysAppointmentItem = Backbone.View.extend({
	template: JST["doctors/todays_appointment_item"],
	tagName: "li",
	className: "list-group-item",
	
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