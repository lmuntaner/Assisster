Assisster.Views.NewServiceForm = Backbone.View.extend({
  template: JST["doctors/new_service_form"],
  className: "col-xs-4 new-service-form",
	
	events: {
		"click #create-service": "createService"
	},
	
	createService: function (event) {
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