Assisster.Views.TodaysAppointmentsIndex = Backbone.CompositeView.extend({
  template: JST["doctors/todays_appointments_index"],
	className: "panel panel-primary today-appointments-index",
	
	events: {
		"click li": "showForm"
	},
	
  initialize: function () {
		this.getTodaysAppointments();
		this.listenTo(this.collection, "sync add change:startTime", this.getTodaysAppointments);
		this.listenTo(this.collection, "sync", this.render);
  },
	
	getTodaysAppointments: function () {
		this.resetSubviews();
		var view = this;
		var todaysAppointments = this.collection.todaysAppointments().sort();
		var sortedAppointments = todaysAppointments.sort(function (a, b) {
			return b.startTime - a.startTime
		});
		sortedAppointments.forEach(function (appointment) {
			var todaysAppointmentItem = new Assisster.Views.TodaysAppointmentItem({
				model: appointment
			});
			view.addSubview('ul.todays-appointments', todaysAppointmentItem);
		});
		this.render();
	},
  
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
		this.attachPrependSubviews();
    
    return this;
  },
	
	showForm: function (event) {
		var coordinates = [event.clientX, event.clientY];
		var id = $(event.currentTarget).data('id');
		var appointment = this.collection.get(id);
		
		if (this.appointmentForm) {
			this.appointmentForm.remove();
		}
		
    this.appointmentForm = new Assisster.Views.AppointmentForm({
      collection: this.collection,
			model: appointment,
			coordinates: coordinates,
    });
		
		this.$el.append(this.appointmentForm.render().$el);
	},
})