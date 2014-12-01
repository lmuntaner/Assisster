Assisster.Routers.DoctorRouter = Backbone.Router.extend({
  routes: {
		"calendar": "calendar",
    "": "dashboard"
  },
  
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },
  
  dashboard: function() {
    var dashboardView = new Assisster.Views.DashboardView();
    
    this._swapView(dashboardView);
    dashboardView.onRender();
  },
	
	calendar: function () {
    var calendarContainerView = new Assisster.Views.CalendarContainer();
    
    this._swapView(calendarContainerView);
    calendarContainerView.onRender();
	},
  
  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this.$rootEl.html(view.render().$el);
    this._currentView = view;
  }
});