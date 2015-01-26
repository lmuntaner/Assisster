Assisster.Views.SearchView = Backbone.View.extend({
	template: JST["doctors/search"],
	className: "col-xs-12 search-container",
	
	render: function () {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		
		return this;
	},
	
})