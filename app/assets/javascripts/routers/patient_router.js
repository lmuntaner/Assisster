Assisster.Routers.PatientRouter = Backbone.Router.extend({
	routes: {
		"": "index"
	},
	
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },
	
	index: function () {
    var newAppointmentView = new Assisster.Views.NewAppointmentView();
    
    this._swapView(newAppointmentView);
  },
  
  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this.$rootEl.html(view.render().$el);
    this._currentView = view;
  },
})