Assisster.Collections.Appointments = Backbone.Collection.extend({
  model: Assisster.Models.Appointment,
	
	addModels: function (objects) {
		var collection = this;
		objects.forEach(function (object) {
			collection.create(object)
		});
	},
	
  comparator: function(appointment) {
    return appointment.get('created_at');
  },
	
	getAppointments: function () {
		var arrayAppointments = [];
    this.each(function(appointment) {
			if (!appointment.get('office_hour')) {
	      arrayAppointments.push(appointment.convertToEvent());				
			}
    });
		
		return arrayAppointments;
	},
	
	getOfficeHours: function () {
		var arrayOfficeHours = [];
    this.each(function(appointment) {
			if (appointment.get('office_hour')) {
	      arrayOfficeHours.push(appointment.convertToEvent());				
			}
    });
		
		return arrayOfficeHours;
	},
	
	getDateAppointments: function (date, service) {
		var url = "api/services/" + service.id + "/" + date.format("D-M-YYYY");
		var collection = this;
		$.ajax({
			type: "get",
			url: url,
			success: this.addModels.bind(this)
		});
	},
	
	recentAppointments: function (n) {
		var num_appointments = this.length;
		return this.slice(num_appointments - n - 1, num_appointments);
	},
});