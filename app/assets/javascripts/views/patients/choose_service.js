Assisster.Views.ChooseService = Backbone.View.extend({
	template: JST["patients/choose_service"],
	
	initialize: function () {
		this.collection = new Assisster.Collection.Services();
		this.collection.fetch();
		this.listenTo(this.collection, "sync", this.render);
	},
	
	render: function () {
		var renderedContent = this.template({
			services: this.collection
		});
		this.$el.html(renderedContent);
		
		return this;
	},
})