Assisster.Views.PendingAppointmentsIndex = Backbone.CompositeView.extend({
  template: JST["doctors/pending_appointments_index"],
	className: "pending-list",
	
  initialize: function () {
		this.pendingCollection = new Assisster.Collections.Appointments();
		this.getPendingAppointments();
		this.listenTo(this.collection, "sync add", this.getPendingAppointments);
		this.listenTo(this.pendingCollection, "sync add", this.render);
		this.listenToPusher();
  },
	
	getPendingAppointments: function () {
		this.resetSubviews();
		var view = this;
		var pendingAppointments = this.collection.pendingAppointments();
		this.pendingCollection.set(pendingAppointments);
		this.pendingCollection.each(function (appointment) {
			var pendingAppointmentItem = new Assisster.Views.PendingAppointmentItem({
				model: appointment
			});
			view.addSubview('table.pendings', pendingAppointmentItem);
		});
	},
	
	listenToPusher: function () {
		var pusher = new Pusher('b364d5eaf36fa6f4f92f');
		var channel = pusher.subscribe('appointment-channel');
		var view = this;
		channel.bind('appointment-event', function(data) {
			var appointment = new Assisster.Models.Appointment(data.appointment);
			if (appointment.get('appointment_status') === "Pending") {
				view.collection.add(appointment);
			}
		});
	},
  
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
		this.attachPrependSubviews();
    
    return this;
  },
})