Assisster.Views.NewAppointmentView = Backbone.CompositeView.extend({
	template: JST["patients/new_appointment"],
	class_name: "row",
	
	render: function () {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		
		return this;
	}
})