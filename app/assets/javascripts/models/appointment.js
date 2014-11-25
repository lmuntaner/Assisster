Assisster.Models.Appointment = Backbone.Model.extend({
  convertToEvent: function() {
    var eventObject = {};
    eventObject.title = this.escape('title');
    eventObject.start = moment(this.escape('startTime'));
    eventObject.end = moment(this.escape('endTime'));
    return eventObject;
  }
})