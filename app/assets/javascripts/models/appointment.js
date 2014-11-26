Assisster.Models.Appointment = Backbone.Model.extend({
  convertToEvent: function() {
    var eventObject = {};
    eventObject.title = this.escape('title');
    eventObject.start = this.escape('startTime');
    eventObject.end = this.escape('endTime');
    return eventObject;
  }
})