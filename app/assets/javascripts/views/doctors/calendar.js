Assisster.Views.CalendarView = Backbone.View.extend({
  template: _.template('<div id="calendar"></div>'),
  initialize: function () {
    this.listenTo(this.collection, "add", this.addAppointment);
  },
  
  addAppointment: function (appointment) {
    $('#calendar').fullCalendar('addEventSource', [appointment.convertToEvent()]);
  },
  
  appointments: function () {
    var arrayAppointments = [
      {
        title: "Super appointment!",
        start: "2014-11-26T17:00:00.000Z",
        end: "2014-11-26T17:30:00.000Z"
      },
      {
        title: "Super second appointment!",
        start: "2014-11-26T18:00:00.000Z",
        end: "2014-11-26T18:30:00.000Z"
      }
    ];
    this.collection.each(function(appointment) {
      arrayAppointments.push(appointment.convertToEvent());
    });
    
    return arrayAppointments;
  },

  onRender: function () {
    var appointments = this.appointments();
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
      events: appointments
    });
  },
  
  createAppointment: function(date) {
    var title = "Super appointment!";
    var startTime = date.toJSON();
    var endTime = date.add(30, "m").toJSON();
    var appointment = new Assisster.Models.Appointment({
      title: title,
      startTime: startTime,
      endTime: endTime
    });
    this.collection.add(appointment);
  },
  
  render: function () {
    this.$el.html(this.template());
    this.onRender();

    return this;
  }
})