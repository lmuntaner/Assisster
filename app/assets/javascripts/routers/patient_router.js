Assisster.Routers.PatientRouter = Backbone.Router.extend({
	routes: {
		"success": "success_appointment",
		":id": "choose_appointment",
		"": "index"
	},
	
  	initialize: function(options) {
    	this.$rootEl = options.$rootEl;
		this.collection = new Assisster.Collections.Services();
		this.collection.setDoctorServices(window.Doctor.id);
  	},
	
	choose_appointment: function (id) {
		var service = this.collection.getOrFetch(id);
		var chooseAppointmentView = new Assisster.Views.ChooseAppointment({
			model: service
		});
		
		this._swapView(chooseAppointmentView);
	},	
	
	index: function () {
	    var newAppointmentView = new Assisster.Views.NewAppointmentView({
	    	collection: this.collection
	    });
	    
	    this._swapView(newAppointmentView);
	 },
	
	success_appointment: function () {
		var successAppointmentView = new Assisster.Views.SuccessAppointment();
		
		this._swapView(successAppointmentView)
	},

	_swapView: function(view) {
		this._currentView && this._currentView.remove();
		this.$rootEl.html(view.render().$el);
		this._currentView = view;
	},
})