Assisster.Views.ChooseService = Backbone.View.extend({
	template: JST["patients/choose_service"],
	
	initialize: function () {
		this.listenTo(this.collection, "syncServices", this.render);
	},
	
	render: function () {
		var renderedContent = this.template({
			services: this.collection
		});
		this.$el.html(renderedContent);
		
		return this;
	},
})