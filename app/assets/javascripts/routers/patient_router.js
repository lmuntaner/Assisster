Assisster.Routers.PatientRouter = Backbone.Router.extend({
	routes: {
		"": "index",
		":id": "choose_appointment"
	},
	
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
		this.collection = new Assisster.Collections.Services();
		this.collection.fetch();
  },
	
	index: function () {
    var newAppointmentView = new Assisster.Views.NewAppointmentView({
    	collection: this.collection
    });
    
    this._swapView(newAppointmentView);
  },
	
	choose_appointment: function (id) {
		var service = this.collection.getOrFetch(id);
		var chooseAppointmentView = new Assisster.Views.ChooseAppointment({
			model: service
		});
		
		this._swapView(chooseAppointmentView);
	},
  
  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this.$rootEl.html(view.render().$el);
    this._currentView = view;
  },
})