Assisster.Views.RecentAppointmentsIndex = Backbone.CompositeView.extend({
  template: JST["doctors/recent_appointments_index"],
	className: "recent-list",
	
  initialize: function () {
		this.recentCollection = new Assisster.Collections.Appointments();
		this.getRecentAppointments();
		this.listenTo(this.collection, "sync add", this.getRecentAppointments);
		this.listenTo(this.recentCollection, "sync", this.render);
		this.listenToPusher();
  },
	
	getRecentAppointments: function () {
		this.resetSubviews();
		var view = this;
		var recentAppointments = this.collection.recentAppointments(5);
		this.recentCollection.set(recentAppointments);
		this.recentCollection.each(function (appointment) {
			var recentAppointmentItem = new Assisster.Views.RecentAppointmentItem({
				model: appointment
			});
			view.addSubview('table.recents', recentAppointmentItem);
		});
	},
	
	listenToPusher: function () {
		var pusher = new Pusher('b364d5eaf36fa6f4f92f');
		var channel = pusher.subscribe('appointment-channel');
		var view = this;
		channel.bind('appointment-event', function(data) {
			var appointment = view.collection.get(data.appointment.id);
			if (appointment) {
				appointment.fetch();
			} else {
				appointment = new Assisster.Models.Appointment(data.appointment);
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