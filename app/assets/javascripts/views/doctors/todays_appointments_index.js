Assisster.Views.TodaysAppointmentsIndex = Backbone.CompositeView.extend({
  template: JST["doctors/todays_appointments_index"],
	className: "panel panel-primary today-appointments-index",
	
	events: {
		"click li": "showForm"
	},
	
  initialize: function () {
		this.getTodaysAppointments();
		this.listenTo(this.collection, "statusSync pusherAdd firstFetch sync", this.getTodaysAppointments);
  },
	
	addTodaySlots: function (objects) {
		this.resetSubviews();
		var view = this;
		objects.forEach(function (appointmentObject) {
			var appointment = new Assisster.Models.Appointment(appointmentObject);
			var todaysAppointmentItem = new Assisster.Views.TodaysAppointmentItem({
				model: appointment
			});
			view.addSubview('ul.todays-appointments', todaysAppointmentItem);
		});
	},
	
	getTodaysAppointments: function () {
		this.resetSubviews();
		var url = "/api/free_time/" + moment().format("DD-MM-YYYY");
		var view = this;
		$.ajax({
			type: "GET",
			url: url,
			success: function(response) {
				view.addTodaySlots(response);
			}
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
		var $target = $(event.currentTarget);
		var id = $target.data('id');
		var startTimeNew = moment.utc($target.data('start-time'));
		var appointment = this.collection.get(id);
		
		if (!appointment) {
			appointment = new Assisster.Models.Appointment({
				startTime: startTimeNew
			});
		}
		
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