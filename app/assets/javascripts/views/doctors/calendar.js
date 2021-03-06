Assisster.Views.CalendarView = Backbone.View.extend({
	template: _.template('<div id="calendar" class="row"></div>'),
  
	initialize: function (options) {
		this.listenTo(this.collection, "remove", this.removeFromCalendar);
		this.listenTo(this.collection, "sync", this.updateEvent);
		this.listenTo(this.collection, "appAdd pusherAdd", this.addToCalendar);
		this.showPendingAttr = false;
	},
  
	addToCalendar: function (appointment) {
		if (this.showPendingAttr) {
			$('#calendar').fullCalendar('addEventSource', [appointment.convertToEvent()]);	
		} else {
			if (appointment.get("appointment_status") === 'Confirmed') {
		    	$('#calendar').fullCalendar('addEventSource', [appointment.convertToEvent()]);			
			}			
		}
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
  
	hideTooltip: function (event) {
		$(this).tooltip('hide');
	},
	
	onRender: function (slotDuration) {
	    $('#calendar').fullCalendar({
			header: {
				left: 'month,agendaWeek,agendaDay',
				center: 'title',
				right: 'today prev,next'
			},
			allDaySlot: false,
			axisFormat: 'H:mm',
			defaultView: 'agendaWeek',
			dayClick: this.createAppointment.bind(this),
			editable: true,
			eventClick: this.updateAppointment.bind(this),
			events:this.collection.getConfirmedAppointments().concat(this.collection.getOfficeHours()),
			eventDragStart: this.removeTooltip,
			eventDrop: this.updateAppointmentDraggOrResize.bind(this),
			eventMouseout: this.hideTooltip,
			eventMouseover: this.addTooltip,
			eventRender: this.renderEvent,
			eventResize: this.updateAppointmentDraggOrResize.bind(this),
			firstDay: 1,
			height: 500,
			lang: "es",
			scrollTime: '08:00:00',
	    });
	},
	
	removeFromCalendar: function (appointment) {
		$('#calendar').fullCalendar('removeEvents', [appointment.id]);
	},
	
	removePending: function () {
		var view = this;
		this.collection.pendingAppointments().forEach(function (appointment) {
			view.removeFromCalendar(appointment);
		});
	},

	render: function () {
		this.$el.html(this.template());
			
		return this;
	},
		
	renderAppointmentForm: function (appointmentForm) {
    	this.$el.append(appointmentForm.render().$el);
	},

	renderEvent: function(event, element) {
		var firstText = event.start.format("H:mm") + ": " + event.title;
		element.find("div.fc-time span").html(firstText);
		var lastText = event.fname + " " + event.lname;
		element.find("div.fc-title").html(lastText);
	},

	setPendingAttr: function(val) {
		this.showPendingAttr = val;
	},
	
	showPending: function() {
		var view = this;
		this.collection.pendingAppointments().forEach(function (appointment) {
			$('#calendar').fullCalendar('addEventSource', [appointment.convertToEvent()]);
		});
	},

	showPendingForm: function (appointment) {
    	var pendingForm = new Assisster.Views.PendingForm({
			model: appointment,
			collection: this.collection,
			action: "update"
    	});
		
		$('body').append(pendingForm.render().$el);
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
		var view = this;
		
		appointment.save({
			startTime: event.start,
			endTime: event.end
		}, {
			success: function(appointment) {
				view.showPendingForm(appointment);
			}
		});
	},
	
	updateEvent: function (appointment) {
		var calendarEvent = $('#calendar').fullCalendar( 'clientEvents', appointment.id )[0];
		if (calendarEvent) {
			if (appointment.get('appointment_status') === "Confirmed" ||
				appointment.get('appointment_status') === "Pending") {
				calendarEvent.start = moment.utc(appointment.get('startTime'));
				calendarEvent.end = moment.utc(appointment.get('endTime'));
				calendarEvent.title = appointment.escape('title') || "-";
				calendarEvent.email = appointment.escape('email');
				calendarEvent.phone_number = appointment.escape('phone_number');
				calendarEvent.fname = appointment.get('fname');
				calendarEvent.lname = appointment.get('lname');
				if (appointment.get('appointment_status') === "Pending") {
					calendarEvent.backgroundColor = "#257e4a";
					calendarEvent.borderColor = "#257e4a";
				} else {
					calendarEvent.backgroundColor = "#3a87ad";
					calendarEvent.borderColor = "#3a87ad";
				}
				$('#calendar').fullCalendar( 'updateEvent', calendarEvent );			
			} else {
				this.removeFromCalendar(appointment);
				// $('#calendar').fullCalendar( 'removeEvents', appointment.id );
			}
		} else {
			this.addToCalendar(appointment);
		}
	},
})