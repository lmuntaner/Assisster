Assisster.Views.DashboardView = Backbone.View.extend({
  template: JST["doctors/dashboard"],
  className: "row",
  
  onRender: function () {
    $("#calendar").fullCalendar({
      header: {
        left: 'month,agendaWeek,agendaDay',
        center: 'title',
        right: 'today prev,next'
      },
      defaultView: 'agendaWeek',
      dayClick: function(date, jsEvent, view) {
        debugger;
      }
    });
  },
  
  render: function() {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.onRender();
    
    return this;
  },
})