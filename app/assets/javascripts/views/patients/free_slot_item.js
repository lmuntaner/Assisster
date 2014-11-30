Assisster.Views.FreeSlotItem = Backbone.View.extend({
	template: JST["patients/free_slot_item"],
	tagName: "a",
	className: "free-slot-item list-group-item",
	
	render: function () {
		var renderedContent = this.template({
			appointment: this.model
		});
		this.$el.html(renderedContent);
		
		return this;
	}
})