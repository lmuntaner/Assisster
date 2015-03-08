Assisster.Views.SendingForm = Backbone.View.extend({
	template: JST["doctors/sending_form"],
	tagName: "form",
	attributes: {
		"role": "form"
	},

	render: function() {
		var renderedContent = this.template();
		this.$el.html(renderedContent);

		return this;
	},

	sendEmail: function (action) {
		var url = "api/send_" + action + "_emails/" + this.model.id;
		$.ajax({
		  url: url,
		  type: "GET"
		});
	},
})