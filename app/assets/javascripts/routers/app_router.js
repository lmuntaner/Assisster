Assisster.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "dashboard"
  },
  
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },
  
  dashboard: function() {
    var dashboardView = new Assisster.Views.DashboardView();
    
    this._swapView(dashboardView);
  },
  
  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this.$rootEl.html(view.render().$el);
    this._currentView = view;
  }
});