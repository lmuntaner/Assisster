Assisster.Views.AppointmentsIndex = Backbone.CompositeView.extend({
	template: JST['doctors/appointments_index'],
	className: "appointments-index",
	
  initialize: function (options) {
		var view = this;
		this.collection.each(function (appointment) {
			var appointmentItem = new Assisster.Views.AppointmentItem({
				model: appointment
			});
			view.addSubview('table.appointments', appointmentItem);
		});
		
		this.listenTo(this.collection, "sync add remove", this.render);
  },
	
	render: function () {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		this.attachSubviews();
		debugger;
		
		return this;
	}
})

