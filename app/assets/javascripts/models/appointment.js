Assisster.Models.Appointment = Backbone.Model.extend({
  urlRoot: "/api/appointments/",
	
	initialize: function () {
	},

  convertToEvent: function(officeHour) {
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
		
		if (!officeHour && this.get('office_hour')) {
			eventObject.rendering = "background";
		}
		if (eventObject.appointment_status === 'Pending') {
			eventObject.backgroundColor = "#257e4a";
			eventObject.borderColor = "#257e4a";
		}
		
    return eventObject;
  },
	
	date: function () {
		return this.startTime().format("dddd, D MMM");
	},
	
	endTime: function () {
		return moment.utc(this.get('endTime'));
	},
	
	fullName: function () {
		return this.escape('fname') + " " + this.escape("lname");
	},
	
	phoneNumber: function () {
		return this.escape('phone_number').slice(0, 3) + "-" + this.escape('phone_number').slice(3);
	},
	
	startTime: function () {
		return moment.utc(this.get('startTime'));
	},
	
	time: function () {
		return this.startTime().format("HH:mm") + " - " + this.endTime().format("HH:mm");
	},
	
	today: function () {
		var today = moment().format('YYYY-MM-DD');
		return this.startTime().isSame(today, "days") &&
					 (this.get('appointment_status') === "Confirmed");
	},
})