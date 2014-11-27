Assisster.Views.CalendarView = Backbone.View.extend({
  template: _.template('<div id="calendar"></div>'),
  
  initialize: function () {
    this.listenTo(this.collection, "add", this.addToCalendar);
    this.listenToOnce(this.collection, "sync", this.render);
  },
  
  addToCalendar: function (appointment) {
    $('#calendar').fullCalendar('addEventSource', [appointment.convertToEvent()]);
  },
  
  appointments: function () {
    var arrayAppointments = []
    this.collection.each(function(appointment) {
      arrayAppointments.push(appointment.convertToEvent());
    });
    
    return arrayAppointments;
  },

  onRender: function () {
    $('#calendar').fullCalendar({
      header: {
        left: 'month,agendaWeek,agendaDay',
        center: 'title',
        right: 'today prev,next'
      },
      // timezone: "local",
      editable: true,
      defaultView: 'agendaWeek',
      dayClick: this.createAppointment.bind(this),
      events: this.appointments()
    });
    
  },
  
  createAppointment: function(date) {
    var appointmentForm = new Assisster.Views.AppointmentForm({
      collection: this.collection,
      date: date
    });
    this.$el.append(appointmentForm.render().$el);
    this.$('#appointment-modal').modal();
  },
  
  render: function () {
    this.$el.html(this.template());
    this.onRender();

    return this;
  }
})