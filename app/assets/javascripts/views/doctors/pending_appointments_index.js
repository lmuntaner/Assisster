Assisster.Views.PendingAppointmentsIndex = Backbone.CompositeView.extend({
  template: JST["doctors/pending_appointments_index"],
	className: "pending-list",
	
  initialize: function () {
		this.getPendingAppointments();
		this.listenTo(this.collection, "sync add", this.getPendingAppointments);
		this.listenTo(this.collection, "sync", this.render);
  },
	
	getPendingAppointments: function () {
		this.resetSubviews();
		var view = this;
		var pendingAppointments = this.collection.pendingAppointments();
		pendingAppointments.forEach(function (appointment) {
			var pendingAppointmentItem = new Assisster.Views.PendingAppointmentItem({
				model: appointment
			});
			view.addSubview('table.pendings', pendingAppointmentItem);
		});
		this.render();
	},
  
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
		this.attachPrependSubviews();
    
    return this;
  },
})