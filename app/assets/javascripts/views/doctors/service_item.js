Assisster.Views.ServiceItem = Backbone.View.extend({
	template: JST["doctors/service_item"],
	tagName: "tr",
	
	events: {
		"click button.delete": "deleteService"
	},
	
	initialize: function() {
		this.$el.attr('data-id', this.model.id);
	},
	
	deleteService: function (event) {
		event.preventDefault();
		var id = $(event.currentTarget).parent().parent().data("id");
		var url = "api/services/" + id;
		var view = this;
		$.ajax({
			type: "DELETE",
			url: url,
			success: function(service) {
				view.collection.remove(service);
			},
			error: function() {
				console.log("error");
			}
		})
	},
	
	render: function() {
		var renderedContent = this.template({
			service: this.model
		});
		this.$el.html(renderedContent);
		
		return this;
	},
	
})