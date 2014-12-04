Assisster.Views.CalendarView = Backbone.View.extend({
  template: _.template('<div id="calendar" class="row"></div>'),
  
  initialize: function (options) {
		this.listenTo(this.collection, "remove", this.removeFromCalendar);
		
		setTimeout(function () {
			this.listenTo(this.collection, "add", this.addToCalendar);
		}.bind(this), 500)
  },
  
  addToCalendar: function (appointment) {
    $('#calendar').fullCalendar('addEventSource', [appointment.convertToEvent()]);
  },
	
	addTooltip: function (event) {
		var tooltip = event.title;
		$(this).attr("data-original-title", tooltip);
		var tooltipTemplate = '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>';
		$(this).tooltip({
			container: "body",
			template: tooltipTemplate
		});
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
	
	onRender: function (slotDuration) {
    $('#calendar').fullCalendar({
      header: {
        left: 'month,agendaWeek,agendaDay',
        center: 'title',
        right: 'today prev,next'
      },
			allDaySlot: false,
			scrollTime: '08:00:00',
			height: 500,
      editable: true,
			slotDuration: slotDuration,
      defaultView: 'agendaWeek',
      dayClick: this.createAppointment.bind(this),
			eventClick: this.updateAppointment.bind(this),
      events:this.collection.getConfirmedAppointments().concat(this.collection.getOfficeHours()),
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