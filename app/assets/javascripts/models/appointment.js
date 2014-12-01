Assisster.Models.Appointment = Backbone.Model.extend({
  urlRoot: "/api/appointments/",
	
	initialize: function () {
		if (this.get('startTime')) {
			this.startTime = moment.utc(this.get('startTime'));			
		}
		if (this.get('endTime')) {
			this.endTime = moment.utc(this.get('endTime'));
		}
	},

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
	
	date: function () {
		return this.startTime.format("dddd, MMMM Do");
	},
	
	fullName: function () {
		return this.escape('fname') + " " + this.escape("lname");
	},
	
	time: function () {
		return this.startTime.format("h:mm a") + " - " + this.endTime.format("h:mm a");
	},
})