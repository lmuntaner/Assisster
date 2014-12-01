Assisster.Views.RecentAppointmentsIndex = Backbone.CompositeView.extend({
  template: JST["doctors/recent_appointments_index"],
	className: "recent-list",
	
  initialize: function () {
		this.listenTo(this.collection, "sync add", this.getRecentAppointments);
		this.listenTo(this.collection, "sync", this.render);
  },
	
	getRecentAppointments: function () {
		this.resetSubviews();
		var view = this;
		var num_appointments = this.length;
		var recentAppointments = this.collection.recentAppointments(5);
		recentAppointments.forEach(function (appointment) {
			var recentAppointmentItem = new Assisster.Views.RecentAppointmentItem({
				model: appointment
			});
			view.addSubview('table.recents', recentAppointmentItem);
		});
		this.render();
	},
  
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
		this.attachSubviews();
    
    return this;
  },
})