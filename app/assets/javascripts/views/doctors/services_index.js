Assisster.Views.ServicesIndex = Backbone.CompositeView.extend({
	template: JST["doctors/services_index"],
	className: "col-xs-8",
	
	initialize: function(options) {
	},
	
	render: function() {
		debugger;
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		
		return this;
	},
})