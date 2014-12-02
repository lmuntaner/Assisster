Assisster.Views.AvailableTimeItem = Backbone.View.extend({
	template: JST["patients/available_time_item"],
	tagName: "a",
	className: "available-time-item list-group-item",
	
	events: {
		"click": "selectTime"
	},
	
	render: function () {
		var renderedContent = this.template({
			appointment: this.model
		});
		this.$el.html(renderedContent);
		
		return this;
	},
	
	selectTime: function (event) {
		var $target = $(event.currentTarget);
		$('a.available-time-item').removeClass('active');
		$target.addClass('active');
		var slotShowView = new Assisster.Views.SlotShow({
			model: this.model
		});
		
		$('div.chosen-time').html(slotShowView.render().$el);
	},
})