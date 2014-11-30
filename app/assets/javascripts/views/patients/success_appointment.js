Assisster.Views.SuccessAppointment = Backbone.View.extend({
	template: JST["patients/success_appointment"],
	className: "row",
	
	render: function () {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		
		return this;
	}
})