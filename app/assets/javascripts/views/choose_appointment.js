Assisster.Views.ChooseAppointment = Backbone.CompositeView.extend({
	template: JST["patients/choose_appointment"],
	
	initialize: function (options) {
		this.listenTo(this.model, "sync", this.render);
	},
	
	render: function () {
		var renderedContent = this.template({
			service: this.model
		});
		this.$el.html(renderedContent);
		
		return this;
	}
})