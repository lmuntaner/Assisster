Assisster.Collections.CalendarAppointments = Backbone.Collection.extend({
	url: "api/pending_appointments",
	model: Assisster.Models.Appointment
})