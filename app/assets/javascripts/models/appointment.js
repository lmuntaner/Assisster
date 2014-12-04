Assisster.Models.Appointment = Backbone.Model.extend({
  urlRoot: "/api/appointments/",
	
	initialize: function () {
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
		eventObject.phone_number = this.escape('phone_number');
		eventObject.appointment_status = this.escape('appointment_status');
		
		if (this.get('office_hour')) {
			eventObject.rendering = "background";
		}
    return eventObject;
  },
	
	date: function () {
		return this.startTime().format("dddd, MMM Do");
	},
	
	endTime: function () {
		return moment.utc(this.get('endTime'));
	},
	
	fullName: function () {
		return this.escape('fname') + " " + this.escape("lname");
	},
	
	startTime: function () {
		return moment.utc(this.get('startTime'));
	},
	
	time: function () {
		return this.startTime().format("h:mm a") + " - " + this.endTime().format("h:mm a");
	},
	
	today: function () {
		var today = moment().format('YYYY-MM-DD');
		return this.startTime().isSame(today, "days") &&
					 (this.get('appointment_status') === "Approved");
	},
})