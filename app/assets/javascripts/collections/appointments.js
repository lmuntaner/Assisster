Assisster.Collections.Appointments = Backbone.Collection.extend({
  model: Assisster.Models.Appointment,
	
	addModels: function (objects) {
		var collection = this;
		objects.forEach(function (object) {
			var startTime = moment.utc(object.startTime);
			var endTime = moment.utc(object.endTime);
			collection.add({
				title: object.title,
				startTime: startTime,
				endTime: endTime
			});
		});
		this.trigger("availableSlots");
	},
	
  comparator: function(appointment) {
    return appointment.get('updated_at');
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
	
	getDateAppointments: function (date, service) {
		var url = "api/services/" + service.id + "/" + date.format("D-M-YYYY");
		var collection = this;
		$.ajax({
			type: "get",
			url: url,
			success: this.addModels.bind(this)
		});
	},
	
	getOfficeHours: function (officeHour) {
		var arrayOfficeHours = [];
    this.each(function(appointment) {
			if (appointment.get('office_hour')) {
	      arrayOfficeHours.push(appointment.convertToEvent(officeHour));				
			}
    });
		
		return arrayOfficeHours;
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
});







