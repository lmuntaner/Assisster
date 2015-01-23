Assisster.Views.ServiceForm = Backbone.View.extend({
	template: JST["doctors/service_form"],
	className: "service-form",
	
	events: {
		"click #close-service-form": "closeForm",
		"click #submit-service-form": "updateService"
	},
	
	initialize: function (options) {
		if (options.coordinates[0] < 1000) {
			this.$el.css('left', options.coordinates[0]);
		} else {
			this.$el.css('left', options.coordinates[0] - 330);
		}
		if (options.coordinates[1] < 400) {
			this.$el.css('top', options.coordinates[1]);
		} else {
			this.$el.css('top', options.coordinates[1] - 250);
		}
	},
	
	closeForm: function () {
		this.remove();
	},
	
	render: function () {
		var renderedContent = this.template({
			service: this.model
		});
		this.$el.html(renderedContent);
		
		return this;
	}
})