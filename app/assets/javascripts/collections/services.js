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
					if (model.get("doctor_id") !== window.Doctor.id) {
						Backbone.history.navigate("", {trigger: true});
					} else {					
						collection.add(model);
					}
				}
			})
		} else {
			if (service.get("doctor_id") !== window.Doctor.id) {
				Backbone.history.navigate("", {trigger: true});
			}
		}
		
		return service;
	}
})