Assisster.Collections.Appointments = Backbone.Collection.extend({
  model: Assisster.Models.Appointment,
	
	addModels: function (objects) {
		var collection = this;
		objects.forEach(function (object) {
			collection.create(object)
		});
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
	
	todaysAppointments: function () {
		var todaysAppointments = [];
		var collection = this;
		var onlyTodays = this.select(function(appointment) {
			return appointment.today();
		})
		var onlyTodaysSorted = onlyTodays.sort(function (a, b) {
			return b.startTime - a.startTime
		});
		onlyTodaysSorted.forEach(function (appointment, index) {
			if (!appointment.get('office_hour')) {
				todaysAppointments.push(appointment);
			} else {
				var newIndex = 1;
				var startTime = appointment.get('startTime');
				if (onlyTodaysSorted[newIndex]) {
					var endTime = onlyTodaysSorted[newIndex];
				} else {
					var endTime = appointment.get('endTime');
				}
				var freeTime = new Assisster.Models.Appointment({
					title: "Free Time",
					fname: "Free Time",
					startTime: startTime,
					endTime: endTime,
					appointment_status: "Approved"
				});
				todaysAppointments.push(freeTime);
			}				
		});
		
		return todaysAppointments;
	},
});







