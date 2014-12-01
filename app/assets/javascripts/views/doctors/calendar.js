Assisster.Views.CalendarView = Backbone.View.extend({
  template: _.template('<div id="calendar"></div>'),
  
  initialize: function () {
    this.listenTo(this.collection, "add", this.addToCalendar);
		this.listenTo(this.collection, "remove", this.removeFromCalendar);
    this.listenToOnce(this.collection, "sync", this.render);
  },
  
  addToCalendar: function (appointment) {
    $('#calendar').fullCalendar('addEventSource', [appointment.convertToEvent()]);
  },
  
  createAppointment: function(date) {
		var appointment = new Assisster.Models.Appointment();
    var appointmentForm = new Assisster.Views.AppointmentForm({
      collection: this.collection,
      date: date,
			model: appointment
    });
    this.renderAppointmentForm(appointmentForm);
  },
	
  onRender: function () {
    $('#calendar').fullCalendar({
      header: {
        left: 'month,agendaWeek,agendaDay',
        center: 'title',
        right: 'today prev,next'
      },
			scrollTime: '08:00:00',
			height: 500,
      editable: true,
      defaultView: 'agendaWeek',
      dayClick: this.createAppointment.bind(this),
			eventClick: this.updateAppointment.bind(this),
      events: this.collection.getAppointments().concat(this.collection.getOfficeHours()),
			eventRender: this.renderEvent,
			eventDrop: this.updateAppointmentDraggOrResize.bind(this),
			eventResize: this.updateAppointmentDraggOrResize.bind(this)
    });  
  },
	
	removeFromCalendar: function (appointment) {
		$('#calendar').fullCalendar('removeEvents', [appointment.id]);
	},

  render: function () {
    this.$el.html(this.template());
    this.onRender();

    return this;
  },
		
	renderAppointmentForm: function (appointmentForm) {
    this.$el.append(appointmentForm.render().$el);
	},

	renderEvent: function(event, element) {
		var firstText = event.start.format("h:mm") + ": " + event.title;
		element.find("div.fc-time span").html(firstText);
		var lastText = event.fname + " " + event.lname;
		element.find("div.fc-title").html(lastText);
		var tooltip = event.title;
		$(element).attr("data-original-title", tooltip);
		$(element).tooltip({ container: "body"});
	},
	
	updateAppointment: function(event, jsEvent, view) {
		var appointment = this.collection.get(event.id);
		var coordinates = [jsEvent.pageX, jsEvent.pageY];
		
		if (this.appointmentForm) {
			this.appointmentForm.remove();
		}
		
		this.appointmentForm = new Assisster.Views.AppointmentForm({
			collection: this.collection,
			model: appointment,
			coordinates: coordinates,
			event: event
		});
		
		this.renderAppointmentForm(this.appointmentForm);
	},
	
	updateAppointmentDraggOrResize: function (event) {
		var appointment = this.collection.get(event.id);
		
		appointment.save({
			startTime: event.start,
			endTime: event.end
		});
	},
})