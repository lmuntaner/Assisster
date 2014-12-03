Assisster.Views.CalendarView = Backbone.View.extend({
  template: _.template('<div id="calendar"></div>'),
  
  initialize: function () {
		this.calendarCollection = new Assisster.Collections.CalendarAppointments();
		this.calendarCollection.fetch();
		this.listenTo(this.calendarCollection, "add", this.addToCalendar);
		this.listenTo(this.collection, "remove", this.removeFromCalendar);
  },
  
  addToCalendar: function (appointment) {
    $('#calendar').fullCalendar('addEventSource', [appointment.convertToEvent()]);
  },
	
	addTooltip: function (event) {
		var tooltip = event.title;
		$(this).attr("data-original-title", tooltip);
		$(this).tooltip({ container: "body"});
		$(this).tooltip('show');
	},
  
  createAppointment: function(date, jsEvent) {
		var appointment = new Assisster.Models.Appointment();
		var coordinates = [jsEvent.pageX, jsEvent.pageY];
		
		if (this.appointmentForm) {
			this.appointmentForm.remove();
		}
		
    this.appointmentForm = new Assisster.Views.AppointmentForm({
      collection: this.collection,
      date: date,
			model: appointment,
			coordinates: coordinates,
    });
    this.renderAppointmentForm(this.appointmentForm);
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
      events: [],
			eventDragStart: this.removeTooltip,
			eventDrop: this.updateAppointmentDraggOrResize.bind(this),
			eventRender: this.renderEvent,
			eventResize: this.updateAppointmentDraggOrResize.bind(this),
			eventMouseover: this.addTooltip
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
		// console.log("rendering event");
		var firstText = event.start.format("h:mm") + ": " + event.title;
		element.find("div.fc-time span").html(firstText);
		var lastText = event.fname + " " + event.lname;
		element.find("div.fc-title").html(lastText);
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