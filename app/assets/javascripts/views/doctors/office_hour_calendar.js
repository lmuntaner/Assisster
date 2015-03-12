Assisster.Views.OfficeHourCalendarView = Backbone.View.extend({
  	template: _.template('<div id="office_hour_calendar" class="row"></div>'),
  
  	initialize: function (options) {
		this.listenTo(this.collection, "remove", this.removeFromCalendar);
		this.listenTo(this.collection, "sync", this.updateEvent);
		
		// setTimeout(function () {
			this.listenTo(this.collection, "appAdd", this.addToCalendar);
		// }.bind(this), 1000)
  	},
  
  	addToCalendar: function (appointment) {
  		console.log('adding to office hour calendar');
		if (appointment.get("office_hour") && appointment.get("appointment_status") === "Confirmed") {
	    $('#office_hour_calendar').fullCalendar('addEventSource', [appointment.convertToEvent(true)]);			
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
  
  	createOfficeHour: function(date, jsEvent) {
		var officeHour = new Assisster.Models.Appointment({
			office_hour: true
		});
		var coordinates = [jsEvent.pageX, jsEvent.pageY];
		
		if (this.officeHourForm) {
			this.officeHourForm.remove();
		}
		
	    this.officeHourForm = new Assisster.Views.OfficeHourForm({
	      collection: this.collection,
	      date: date,
				model: officeHour,
				coordinates: coordinates,
	    });
	    this.renderAppointmentForm(this.officeHourForm);
  	},
  
	  hideTooltip: function (event) {
	    	$(this).tooltip('hide');
	  },
	
	onRender: function (slotDuration) {
    $('#office_hour_calendar').fullCalendar({
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
      dayClick: this.createOfficeHour.bind(this),
			eventClick: this.updateOfficeHour.bind(this),
      events:this.collection.getOfficeHours(true),
			eventDragStart: this.removeTooltip,
			eventDrop: this.updateAppointmentDraggOrResize.bind(this),
      eventMouseout: this.hideTooltip,
			eventMouseover: this.addTooltip,
			eventRender: this.renderEvent,
			eventResize: this.updateAppointmentDraggOrResize.bind(this),
    });
  },
	
	removeFromCalendar: function (appointment) {
		$('#office_hour_calendar').fullCalendar('removeEvents', [appointment.id]);
	},

  render: function () {
    this.$el.html(this.template());
		
    return this;
  },
		
	renderAppointmentForm: function (appointmentForm) {
    this.$el.append(appointmentForm.render().$el);
	},

	renderEvent: function(event, element) {
		element.find("div.fc-title").html(event.title);
	},
	
	updateOfficeHour: function(event, jsEvent, view) {
		var officeHour = this.collection.get(event.id);
		var coordinates = [jsEvent.pageX, jsEvent.pageY];
		
		if (this.officeHourForm) {
			this.officeHourForm.remove();
		}
			
	    this.officeHourForm = new Assisster.Views.OfficeHourForm({
	      collection: this.collection,
	      event: event,
				model: officeHour,
				coordinates: coordinates,
	    });
	    this.renderAppointmentForm(this.officeHourForm);
	},
	
	updateAppointmentDraggOrResize: function (event) {
		var appointment = this.collection.get(event.id);
		
		appointment.save({
			startTime: event.start,
			endTime: event.end
		});
	},
	
	updateEvent: function (appointment) {
		var calendarEvent = $('#office_hour_calendar').fullCalendar( 'clientEvents', appointment.id )[0];
		if (calendarEvent) {
			if (appointment.get('appointment_status') === "Confirmed") {
				calendarEvent.start = moment.utc(appointment.get('startTime'));
				calendarEvent.end = moment.utc(appointment.get('endTime'));
				calendarEvent.title = appointment.get('title');
				calendarEvent.email = appointment.get('email');
				calendarEvent.phone_number = appointment.get('phone_number');
				calendarEvent.fname = appointment.get('fname');
				calendarEvent.lname = appointment.get('lname');
				$('#office_hour_calendar').fullCalendar( 'updateEvent', calendarEvent );			
			} else {
				$('#office_hour_calendar').fullCalendar( 'removeEvents', appointment.id );
			}
		} else {
			this.addToCalendar(appointment);
		}
	},
})