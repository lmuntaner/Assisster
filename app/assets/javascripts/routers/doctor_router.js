Assisster.Routers.DoctorRouter = Backbone.Router.extend({
	routes: {
		"calendar": "calendar",
		"appointments": "allAppointments",
		"office_hours": "office_hours",
		"notifications": "notifications",
		"services": "services",
		"": "dashboard"
	},
  
	initialize: function(options) {
		this.model = new Assisster.Models.Doctor();
		var router = this;
		this.model.fetch({
			success: function () {
				router.collection.trigger("firstFetch");
				router.listenToPusher();
			}
		});
		this.collection = this.model.appointments();
		this.$rootEl = options.$rootEl;
		this.listenTo(this.collection, 'pusherAdd', this.notifyNewAppointment);
	},
	
	allAppointments: function () {
	    var appointmentsView = new Assisster.Views.AppointmentsView({
			collection: this.collection
	    });
	    
	    this._swapView(appointmentsView);
	},
	
	calendar: function () {
	    var calendarContainerView = new Assisster.Views.CalendarContainer({
	    	model: this.model,
			collection: this.collection
	    });
    
	    this._swapView(calendarContainerView);
	    calendarContainerView.onRender(); // I need this for when I comeback to this view in backbone
	},
	
	dashboard: function() {
		var dashboardView = new Assisster.Views.DashboardView({
			model: this.model,
			collection: this.collection
		});

		this._swapView(dashboardView);
	},
	
	listenToPusher: function () {
		if (!this.pusher) {
			this.pusher = new Pusher('b364d5eaf36fa6f4f92f');			
		}
		if (!this.channel) {
			var doctorChannel = "doctor-channel-" + this.model.id;
			this.channel = this.pusher.subscribe(doctorChannel);
		}
		var router = this;
		this.channel.bind('appointment-event', function(data) {
			// I was using the pusher to update all the changes in events. Now I use Backbone.
			// It doesn't make much sense now the pusherSync
			// However, I am planning to add multiple log in, so I will need this.
			var appointment = router.collection.get(data.appointment.id);
			if (appointment) {
				appointment.fetch();
			} else {
				appointment = new Assisster.Models.Appointment(data.appointment);
				router.collection.add(appointment, { at: 0 });
				if (appointment.get('appointment_status') === "Pending" &&
					!appointment.get('office_hour')) {
	        		router.collection.trigger('appAdd', appointment);
				}
			}
		});
		
		this.channel.bind('notification-event', function(data) {
			if (data.notification.doctor_id === router.model.id) {
				router.notifySentNotification(data.notification);
			}
		});
	},
	
	notifications: function () {
	    var notificationsView = new Assisster.Views.NotificationsView({
	    	model: this.model,
				collection: this.collection
	    });
    
	    this._swapView(notificationsView);
	},
	
	notifyNewAppointment: function (appointment) {
		if (appointment.get('appointment_status') === "Pending") {
			var msg = "New Appointment from " + appointment.fullName() + "     ";
		  	$('div.top-right').notify({
		     	message: { text: msg },
				fadeOut: { enabled: true, delay: 3000 }
		   	}).show();
		}
	},
	
	notifySentNotification: function (notification) {
		var msg;
		if (notification.type === "success") {
			msg = notification.notification_type + " sent successfully to: " + notification.receiver + "     ";			
		} else {
			msg = notification.notification_type + " NOT sent to: " + notification.receiver + "     "
		}
	  	$('div.top-right').notify({
	     	message: { text: msg },
			type: notification.type,
			fadeOut: { enabled: true, delay: 10000 }
	   	}).show();		
	},
	
	office_hours: function () {
	    var officeHourContainerView = new Assisster.Views.OfficeHourContainer({
	    	model: this.model,
			collection: this.collection
	    });
    
    	this._swapView(officeHourContainerView);
    	officeHourContainerView.onRender(); // I need this for when I comeback to this view in backbone
	},
	
	services: function () {
	    var servicesView = new Assisster.Views.ServicesView({
	    	model: this.model
	    });
	    
	    this._swapView(servicesView);
	},

	_swapView: function(view) {
	    this._currentView && this._currentView.remove();
	    this.$rootEl.html(view.render().$el);
	    this._currentView = view;
  	}
});