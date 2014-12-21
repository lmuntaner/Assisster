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
		this.trigger("available_slots");
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
	
	// getFreeTimes: function (officeHours, appointments) {
	// 	var freeTimes = [];
	// 	officeHours.forEach(function (officeHour) {
	// 		var startTime = moment.utc(officeHour.get('startTime'));
	// 		var officeHourEndTime = moment.utc(officeHour.get('endTime'));
	// 		appointments.forEach(function (appointment) {
	// 			var endTime = moment.utc(appointment.get('startTime'));
	// 			if (endTime <= officeHourEndTime && endTime > startTime) {
	// 				var newFreeTime = new Assisster.Models.Appointment({
	// 					title: "Free Time",
	// 					startTime: startTime.clone(),
	// 					endTime: endTime.clone()
	// 				});
	// 				freeTimes.push(newFreeTime);
	// 			}
	// 			startTime = moment.utc(appointment.get('endTime'));
	// 		});
	// 	})
	//
	// 	return freeTimes;
	// },
	//
	// todaysAppointments: function () {
	// 	var todaysAppointments = this.select(function(appointment) {
	// 		return appointment.today() && !appointment.get('office_hour');
	// 	});
	// 	var todaySorted = todaysAppointments.sort(function (a, b) {
	// 		return b.startTime() - a.startTime();
	// 	});
	// 	return todaySorted;
	// },
});







