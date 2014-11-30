Assisster.Views.FreeSlotItem = Backbone.View.extend({
	template: JST["patients/free_slot_item"],
	tagName: "a",
	className: "free-slot-item list-group-item",
	
	events: {
		"click": "selectSlot"
	},
	
	render: function () {
		var renderedContent = this.template({
			appointment: this.model
		});
		this.$el.html(renderedContent);
		
		return this;
	},
	
	selectSlot: function (event) {
		var $target = $(event.currentTarget);
		$('a.free-slot-item').removeClass('active');
		$target.addClass('active');
		var slotShowView = new Assisster.Views.SlotShow({
			model: this.model
		});
		
		$('div.chosen-time').html(slotShowView.render().$el);
	},
})