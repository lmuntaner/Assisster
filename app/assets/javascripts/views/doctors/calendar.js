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
  
  // appointments: function () {
  //   var arrayAppointments = []
  //   this.collection.each(function(appointment) {
  // 			if (!appointment.get('office_hour')) {
  // 	      arrayAppointments.push(appointment.convertToEvent());
  // 			}
  //   });
  //
  //   return arrayAppointments;
  // },
  
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
	
	renderAppointmentForm: function (appointmentForm) {
    this.$el.append(appointmentForm.render().$el);
    this.$('#appointment-modal').modal();
	},

  render: function () {
    this.$el.html(this.template());
    this.onRender();

    return this;
  },
	
	renderEvent: function(event, element) {
		var firstText = event.start.format("h:mm") + ": " + event.title;
		element.find("div.fc-time span").text(firstText);
		var lastText = event.fname + " " + event.lname;
		element.find("div.fc-title").text(lastText);
	},
	
	updateAppointment: function(event, jsEvent, view) {
		var appointment = this.collection.get(event.id);

		var appointmentForm = new Assisster.Views.AppointmentForm({
			collection: this.collection,
			model: appointment,
			event: event
		});
		this.renderAppointmentForm(appointmentForm);
	},
	
	updateAppointmentDraggOrResize: function (event) {
		var appointment = this.collection.get(event.id);
		
		appointment.save({
			startTime: event.start,
			endTime: event.end
		});
	},
})