Assisster.Views.ServiceForm = Backbone.View.extend({
  template: JST["doctors/service_form"],
  className: "col-xs-6",
	
	events: {
		"click #create-service": "createService"
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