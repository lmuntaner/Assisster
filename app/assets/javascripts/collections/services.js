Assisster.Collections.Services = Backbone.Collection.extend({
	model: Assisster.Models.Service,
	url: "api/services",
	
	getOrFetch: function (id) {
		var service = this.get(id);
		if (!service) {
			var collection = this;
			service = new Assisster.Models.Service({ id: id });
			service.fetch({
				success: function(model) {
					collection.add(model);
				}
			})
		}
		
		return service;
	}
})