Assisster.Views.ServiceForm = Backbone.View.extend({
	template: JST["doctors/service_form"],
	className: "service-form",
	
	events: {
		"click div.my-modal": "closeView",
		"click #close-service-form": "closeView",
		"click #submit-service-form": "updateService"
	},
	
	initialize: function (options) {
		// if (options.coordinates[0] < 1000) {
		// 	this.$el.css('left', options.coordinates[0]);
		// } else {
		// 	this.$el.css('left', options.coordinates[0] - 330);
		// }
		// if (options.coordinates[1] < 400) {
		// 	this.$el.css('top', options.coordinates[1]);
		// } else {
		// 	this.$el.css('top', options.coordinates[1] - 250);
		// }

		var screenWidth = $(document).width();
		var screenHeight = $(document).height();
		var formWidth = 300;
		var formHeigth = 264;

		this.$el.css('left', (screenWidth / 2) - (formWidth / 2));
		this.$el.css('top', 200);
	},
	
	closeView: function () {
		this.remove();
	},
	
	render: function () {
		var renderedContent = this.template({
			service: this.model
		});
		this.$el.html(renderedContent);
		
		return this;
	},
	
	updateService: function (event) {
		var view = this;
		var serviceParams = $(event.currentTarget).parent().serializeJSON().service;
		if (this.validateParams(serviceParams)) {
			this.model.save(serviceParams, {
				success: function(service) {
					view.collection.add(service, {merge: true});
					view.closeView();
				}
			});			
		}
	},
	
	validateDescription: function (description) {
		if (description.length > 0) {
			this.$("div.service-description-form").removeClass("has-error");
			return true;
		} else {
			this.$("div.service-description-form").addClass("has-error");
			return false;
		}
	},

	validateDuration: function (duration) {
		if (/^\d+$/.test(duration) && duration >= 0 && duration < 1440) {
			this.$("div.service-duration").removeClass("has-error");
			return true;
		} else {
			this.$("div.service-duration").addClass("has-error");
			return false;
		}
	},

	validateParams: function (params) {
		var validated = true;
		if (!this.validateDescription(params.description)) validated = false;
		if (!this.validateDuration(params.duration_min)) validated = false;
		if (!this.validateTitle(params.title)) validated = false;
		if (!this.validatePrice(params.price)) validated = false;
	
		return validated;
	},

	validatePrice: function (price) {
		if (/^\d+$/.test(price) && price >= 0) {
			this.$("div.service-price").removeClass("has-error");
			return true;
		} else {
			this.$("div.service-price").addClass("has-error");
			return false;
		}
	},
	
	validateTitle: function (title) {
		if (title.length > 0) {
			this.$("div.service-title").removeClass("has-error");
			return true;
		} else {
			this.$("div.service-title").addClass("has-error");
			return false;
		}
	},

})