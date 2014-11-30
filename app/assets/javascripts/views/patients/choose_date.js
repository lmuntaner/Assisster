Assisster.Views.ChooseDate = Backbone.CompositeView.extend({
	template: JST["patients/choose_date"],
	className: "col-xs-3",
	
	render: function () {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		
		return this;
	}
})