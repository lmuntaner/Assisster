Assisster.Routers.DoctorRouter = Backbone.Router.extend({
  routes: {
		"calendar": "calendar",
    "": "dashboard"
  },
  
  initialize: function(options) {
    this.model = new Assisster.Models.Doctor();
    this.model.fetch();
		this.collection = this.model.appointments();
    this.$rootEl = options.$rootEl;
  },
  
  dashboard: function() {
    var dashboardView = new Assisster.Views.DashboardView({
    	model: this.model,
			collection: this.collection
    });
    
    this._swapView(dashboardView);
  },
	
	calendar: function () {
    var calendarContainerView = new Assisster.Views.CalendarContainer({
    	model: this.model,
			collection: this.collection
    });
    
    this._swapView(calendarContainerView);
    calendarContainerView.onRender();
	},
  
  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this.$rootEl.html(view.render().$el);
    this._currentView = view;
  }
});