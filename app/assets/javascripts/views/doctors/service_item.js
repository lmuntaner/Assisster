Assisster.Views.ServiceItem = Backbone.View.extend({
	template: JST["doctors/service_item"],
	tagName: "tr",
	
	initialize: function() {
		this.$el.attr('data-id', this.model.id);
	},
	
	render: function() {
		var renderedContent = this.template({
			service: this.model
		});
		this.$el.html(renderedContent);
		
		return this;
	},
	
})