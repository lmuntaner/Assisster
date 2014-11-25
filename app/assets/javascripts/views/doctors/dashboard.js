Assisster.Views.DashboardView = Backbone.View.extend({
  template: JST["doctors/dashboard"],
  className: "row",
  
  initialize: function () {
    this.collection = new Assisster.Collections.Appointments();
    this.listenTo(this.collection, "add", this.render);
  },
  
  appointments: function () {
    var arrayAppointments = [];
    this.collection.each(function(appointment) {
      arrayAppointments.push(appointment.convertToEvent());
    });

    return arrayAppointments;
  },
  
  onRender: function () {
    $("#calendar").fullCalendar({
      header: {
        left: 'month,agendaWeek,agendaDay',
        center: 'title',
        right: 'today prev,next'
      },
      timezone: "local",
      editable: true,
      defaultView: 'agendaWeek',
      eventRender: function(event, element) {
      				element.bind('dblclick', function() {
      					debugger
      				});
      },
      dayClick: this.createAppointment.bind(this),
      events: this.appointments()
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
    this.render();
  },
  
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.onRender();
    
    return this;
  },
})