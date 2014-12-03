Assisster.Views.RecentAppointmentsIndex = Backbone.CompositeView.extend({
  template: JST["doctors/recent_appointments_index"],
	className: "recent-list",
	
	events: {
		"click tr": "showForm"
	},
	
  initialize: function () {
		this.recentCollection = new Assisster.Collections.Appointments();
		this.getRecentAppointments();
		this.listenTo(this.collection, "sync add", this.getRecentAppointments);
		this.listenTo(this.recentCollection, "sync", this.render);
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
  
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
		this.attachPrependSubviews();
    
    return this;
  },
	
	showForm: function (event) {
		var $target = $(event.currentTarget);
		var id = $target.data('id');
		var appointment = this.collection.get(id);
	},
})