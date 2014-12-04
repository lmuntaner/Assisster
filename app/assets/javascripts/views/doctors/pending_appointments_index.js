Assisster.Views.PendingAppointmentsIndex = Backbone.CompositeView.extend({
  template: JST["doctors/pending_appointments_index"],
	className: "pending-list",
	
	events: {
		"click td:not(.pending-button)": "showForm"
	},
	
  initialize: function () {
		this.pendingCollection = new Assisster.Collections.Appointments();
		this.getPendingAppointments();
		this.listenTo(this.collection, "sync add", this.getPendingAppointments);
		this.listenTo(this.pendingCollection, "sync", this.render);
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
	
	showConfirmationForm: function (event) {
		var coordinates = [event.clientX, event.clientY];
		var id = $(event.currentTarget).parent().parent().data('id');
		var appointment = this.collection.get(id);
		
    var confirmationForm = new Assisster.Views.ConfirmationForm({
			model: appointment,
			coordinates: coordinates,
    });
		
		$('body').append(confirmationForm.render().$el);
	},
	
	showForm: function (event) {
		var coordinates = [event.clientX, event.clientY];
		var id = $(event.currentTarget).parent().data('id');
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