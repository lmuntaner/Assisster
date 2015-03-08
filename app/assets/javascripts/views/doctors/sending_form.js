Assisster.Views.SendingForm = Backbone.View.extend({
	template: JST["doctors/sending_form"],
	tagName: "form",
	attributes: {
		"role": "form"
	},

	initialize: function(options) {

	},

	render: function() {
		var renderedContent = this.template();
		this.$el.html(renderedContent);

		return this;
	}
})