Assisster.Views.AppointmentsIndex = Backbone.CompositeView.extend({
	template: JST['doctors/appointments_index'],
	className: "appointments-index",
	
	events: {
		"click tr": "showForm"
	},
	
  initialize: function (options) {
		this.setApppointmentsSubviews();
		this.listenTo(this.collection, "sync add remove", this.render);
		this.listenTo(this.collection, "sync", this.setAppointmentsSubviews);
		this.listenTo(this.collection, "add", this.addAppointmentSubview);
  },
	
	addAppointmentSubview: function (appointment) {
		var appointmentItem = new Assisster.Views.AppointmentsItem({
			model: appointment
		});
		this.addSubview('tbody.appointments', appointmentItem);
	},
	
	onRender: function () {
		var options = {
			valueNames: ['table-fname', 'table-lname', 'table-email', 'table-title',
										'table-date', 'table-time', 'table-status']
		}
		
		var appointmentList = new List('appointments', options)
	},
	
	render: function () {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		this.attachSubviews();
		this.onRender();
		
		return this;
	},
	
	setApppointmentsSubviews: function () {
		var view = this;
		this.collection.each(function (appointment) {
			view.addAppointmentSubview(appointment);
		});
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

