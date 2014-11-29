Assisster.Models.Appointment = Backbone.Model.extend({
  urlRoot: "/api/appointments/",
  
  convertToEvent: function() {
    var eventObject = {};
		eventObject.id = this.id;
    eventObject.title = this.escape('title');
    eventObject.start = this.escape('startTime');
    eventObject.end = this.escape('endTime');
    return eventObject;
  },
})