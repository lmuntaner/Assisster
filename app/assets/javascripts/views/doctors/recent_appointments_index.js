Assisster.Views.RecentAppointmentsIndex = Backbone.CompositeView.extend({
  template: JST["doctors/recent_appointments_index"],
	className: "recent-list",
	
	events: {
		"click tr": "showForm"
	},
	
  initialize: function () {
		this.recentCollection = new Assisster.Collections.Appointments();
		this.getRecentAppointments();
    this.listenTo(this.collection, "statusSync pusherAdd firstFetch sync", this.getRecentAppointments);
  },
	
	getRecentAppointments: function () {
		this.resetSubviews();
		var view = this;
		this.collection.recentAppointments(5).forEach(function (appointment) {
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