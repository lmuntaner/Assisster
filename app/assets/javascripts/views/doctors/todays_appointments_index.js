Assisster.Views.TodaysAppointmentsIndex = Backbone.CompositeView.extend({
  template: JST["doctors/todays_appointments_index"],
	className: "panel panel-primary today-appointments-index",
	
  initialize: function () {
		this.getTodaysAppointments();
		this.listenTo(this.collection, "sync add", this.getTodaysAppointments);
		this.listenTo(this.collection, "sync", this.render);
  },
	
	getTodaysAppointments: function () {
		this.resetSubviews();
		var view = this;
		var todaysAppointments = this.collection.todaysAppointments().sort();
		var sortedAppointments = todaysAppointments.sort(function (a, b) {
			return b.startTime - a.startTime
		});
		sortedAppointments.forEach(function (appointment) {
			var todaysAppointmentItem = new Assisster.Views.TodaysAppointmentItem({
				model: appointment
			});
			view.addSubview('ul.todays-appointments', todaysAppointmentItem);
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