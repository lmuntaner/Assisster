Assisster.Collections.Appointments = Backbone.Collection.extend({
  model: Assisster.Models.Appointment,
	
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
	
	getFreeTimeSlots: function (date, service) {
		
	},
});