Assisster.Views.ChooseDate = Backbone.CompositeView.extend({
	template: JST["patients/choose_date"],
	className: "col-xs-3",
	
	onRender: function () {
		this.$('.date-pick').datepicker('hide');
	},
	
	render: function () {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		this.onRender();
		
		return this;
	}
})