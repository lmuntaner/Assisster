Assisster.Views.DashboardHome = Backbone.CompositeView.extend({
  template: JST["doctors/dashboard_home"],
	className: "row dashboard-home",
	
  initialize: function () {
		this.recentAppointmentsIndex = new Assisster.Views.RecentAppointmentsIndex({
			collection: this.collection
		});
		this.addSubview("div.appointments-lists", this.recentAppointmentsIndex);
		
		this.pendingAppointmentsIndex = new Assisster.Views.PendingAppointmentsIndex({
			collection: this.collection
		});
		this.addSubview("div.appointments-lists", this.pendingAppointmentsIndex);
		
		this.todaysAppointmentsIndex = new Assisster.Views.TodaysAppointmentsIndex({
			collection: this.collection
		});
		this.addSubview("div.todays-appointments-body", this.todaysAppointmentsIndex);
		
    this.listenTo(this.collection, "sync", this.render);
		this.listenToPusher();
  },
	
	listenToPusher: function () {
		if (!this.pusher) {
			this.pusher = new Pusher('b364d5eaf36fa6f4f92f');			
		}
		if (!this.channel) {
			this.channel = this.pusher.subscribe('appointment-channel');			
		}
		var view = this;
		this.channel.bind('appointment-event', function(data) {
			var appointment = view.collection.get(data.appointment.id);
			if (appointment) {
				appointment.fetch();
			} else {
				appointment = new Assisster.Models.Appointment(data.appointment);
				var num_length = view.collection.length;
				view.collection.add(appointment, {at: 0});
			}
		});
	},
  
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
		this.attachSubview("div.appointments-lists", this.pendingAppointmentsIndex);
		this.attachSubview("div.appointments-lists", this.recentAppointmentsIndex);
		this.attachSubview("div.todays-appointments-body", this.todaysAppointmentsIndex);
    
    return this;
  },
})