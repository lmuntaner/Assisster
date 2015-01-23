Assisster.Views.ServiceForm = Backbone.View.extend({
  template: JST["doctors/service_form"],
  className: "col-xs-4 service-form",
	
	events: {
		"click #create-service": "createService"
	},
	
	createService: function (event) {
		var view = this;
		var serviceParams = $(event.currentTarget).parent().serializeJSON().service;
		this.collection.create(serviceParams, {wait: true});
		this.resetForm();
	},
  
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    
    return this;
  },
	
	resetForm: function () {
		this.$("input").val("");
		this.$("textarea").val("")
	}
})