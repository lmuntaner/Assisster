Assisster.Routers.DoctorRouter = Backbone.Router.extend({
  routes: {
		"calendar": "calendar",
		"appointments": "allAppointments",
    "": "dashboard"
  },
  
  initialize: function(options) {
    this.model = new Assisster.Models.Doctor();
    this.model.fetch();
		this.collection = this.model.appointments();
    this.$rootEl = options.$rootEl;
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

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this.$rootEl.html(view.render().$el);
    this._currentView = view;
  }
});