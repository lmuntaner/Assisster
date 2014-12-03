Assisster.Views.AppointmentsIndex = Backbone.CompositeView.extend({
	template: JST['doctors/appointments_index'],
	className: "appointments-index",
	
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
		this.addSubview('table.appointments', appointmentItem);
	},
	
	render: function () {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		this.attachSubviews();
		
		return this;
	},
	
	setApppointmentsSubviews: function () {
		var view = this;
		this.collection.each(function (appointment) {
			view.addAppointmentSubview(appointment);
		});
	},
})

