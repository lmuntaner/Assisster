Assisster.Collections.Services = Backbone.Collection.extend({
	model: Assisster.Models.Service,
	url: "api/services",
	
	setDoctorServices: function (doctorId) {
		var url = "api/doctors/" + doctorId + "/services";
		var collection = this;
		$.ajax({
			type: "GET",
			url: url,
			success: function (services) {
				collection.set(services);
				collection.trigger("syncServices");
			}
		})
	},
	
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