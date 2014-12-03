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
	
	getConfirmedAppointments: function () {
		var arrayAppointments = [];
    this.each(function(appointment) {
			if (!appointment.get('office_hour') &&
					appointment.get('appointment_status') === "Approved") {
	      			arrayAppointments.push(appointment.convertToEvent());
			}
    });
		
		return arrayAppointments;
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
	
	pendingAppointments: function () {
		return this.where({ appointment_status: "Pending" });
	},
	
	recentAppointments: function (n) {
		var appointments = this.sort().where({
			office_hour: false
		});
		var num_appointments = appointments.length;
		return appointments.slice(num_appointments - n, num_appointments);
	},
	
	todaysAppointments: function () {
		var todaysAppointments = [];
		this.each(function (appointment) {
			if (!appointment.get('office_hour') && appointment.today()) {
				todaysAppointments.push(appointment);
			}
		});
		
		return todaysAppointments;
	},
});







