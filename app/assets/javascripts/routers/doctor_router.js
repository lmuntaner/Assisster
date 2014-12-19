Assisster.Routers.DoctorRouter = Backbone.Router.extend({
  routes: {
		"calendar": "calendar",
		"appointments": "allAppointments",
    "": "dashboard"
  },
  
  initialize: function(options) {
    this.model = new Assisster.Models.Doctor();
		var router = this;
    this.model.fetch({
    	success: function () {
    		router.collection.trigger("firstFetch");
    	}
    });
		this.collection = this.model.appointments();
    this.$rootEl = options.$rootEl;
		this.listenToPusher();
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
    calendarContainerView.onRender();
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
			this.channel = this.pusher.subscribe('appointment-channel');			
		}
		var router = this;
		this.channel.bind('appointment-event', function(data) {
			var appointment = router.collection.get(data.appointment.id);
			if (appointment) {
				appointment.fetch({
					success: function () {
						router.collection.trigger('pusherSync');
					}
				});
			} else {
				appointment = new Assisster.Models.Appointment(data.appointment);
				router.collection.add(appointment, { at: 0 });
        router.collection.trigger('pusherAdd');
			}
		});
	},

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this.$rootEl.html(view.render().$el);
    this._currentView = view;
  }
});