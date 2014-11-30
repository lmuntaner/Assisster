Assisster.Views.SlotShow = Backbone.View.extend({
	template: JST["patients/slot_confirm"],
	
	render: function () {
		var renderedContent = this.template({
			appointment: this.model
		});
		this.$el.html(renderedContent);
		
		return this;
	},
})