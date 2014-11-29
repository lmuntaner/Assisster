Assisster.Models.Appointment = Backbone.Model.extend({
  urlRoot: "/api/appointments/",
  
  convertToEvent: function() {
    var eventObject = {};
		eventObject.id = this.id;
    eventObject.title = this.escape('title');
    eventObject.start = this.escape('startTime');
    eventObject.end = this.escape('endTime');
		eventObject.email = this.escape('email');
		eventObject.fname = this.escape('fname');
		eventObject.lname = this.escape('lname');
		
		if (this.get('office_hour')) {
			eventObject.rendering = "background";
		}
    return eventObject;
  },
})