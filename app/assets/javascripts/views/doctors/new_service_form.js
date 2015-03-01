Assisster.Views.NewServiceForm = Backbone.View.extend({
  template: JST["doctors/new_service_form"],
  className: "col-xs-4 new-service-form",
	
	events: {
		"click #create-service": "createService"
	},
	
	createService: function (event) {
		var serviceParams = $(event.currentTarget).parent().serializeJSON().service;
		if (this.validateParams(serviceParams)) {
			this.collection.create(serviceParams, {wait: true});
			this.resetForm();			
		}
	},
  
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    
    return this;
  },
	
	resetForm: function () {
		this.$("input").val("");
		this.$("textarea").val("")
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