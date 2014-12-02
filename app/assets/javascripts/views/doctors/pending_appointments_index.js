Assisster.Views.PendingAppointmentsIndex = Backbone.CompositeView.extend({
  template: JST["doctors/pending_appointments_index"],
	className: "pending-list",
	
  initialize: function () {
		this.pendingCollection = new Assisster.Collections.Appointments();
		this.getPendingAppointments();
		this.listenTo(this.collection, "sync add", this.getPendingAppointments);
		this.listenTo(this.pendingCollection, "sync add", this.render);
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
  
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
		this.attachPrependSubviews();
    
    return this;
  },
})