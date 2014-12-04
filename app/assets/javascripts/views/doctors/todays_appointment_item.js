Assisster.Views.TodaysAppointmentItem = Backbone.View.extend({
	template: JST["doctors/todays_appointment_item"],
	tagName: "li",
	className: "list-group-item clickable",
	
	initialize: function() {
		this.listenTo(this.model, "sync", this.render);
		this.$el.attr('data-id', this.model.id);
	},
	
	render: function() {
		var renderedContent = this.template({
			appointment: this.model
		});
		this.$el.html(renderedContent);
		
		return this;
	}
})