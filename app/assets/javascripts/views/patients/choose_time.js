Assisster.Views.ChooseTime = Backbone.View.extend({
	template: JST["patients/choose_time"],
	className: "col-xs-6 choose-time-slot",
	
	initialize: function (options) {
		this.date = options.date;
	},
	
	render: function () {
		var renderedContent = this.template({
			date: this.date
		});
		this.$el.html(renderedContent);
		
		return this;
	}
})