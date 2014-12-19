Assisster.Views.AppointmentsIndex = Backbone.CompositeView.extend({
	template: JST['doctors/appointments_index'],
	className: "appointments-index row",
	
	events: {
		"click tr": "showForm"
	},
	
  initialize: function (options) {
		this.setApppointmentsSubviews();
		this.listenTo(this.collection, "pusherSync", this.setAppointmentsSubviews);
		this.listenTo(this.collection, "puserhAdd add", this.addAppointmentSubview);
  },
	
	addAppointmentSubview: function (appointment) {
		var appointmentItem = new Assisster.Views.AppointmentsItem({
			model: appointment
		});
		this.addSubview('tbody.appointments', appointmentItem);
		this.onRender();
	},
	
	onRender: function () {
		this.listOptions = {
			valueNames: ['table-fname', 'table-lname', 'table-email', 'table-title',
										'table-date', 'table-time', 'table-status']
		};
		
		setTimeout(function () {
			this.appointmentList = new List('appointments', this.listOptions);
		}.bind(this), 500);	
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

