Assisster.Views.DateForm = Backbone.View.extend({
	template: JST["doctors/date_form"],
	className: "row",
	
	initialize: function(options) {
		this.date = options.date;
		this.position = options.position;
	},
	
	render: function () {
		var renderedContent = this.template({
			date: this.date
		});
		this.$el.html(renderedContent);
		
		return this;
	}
})