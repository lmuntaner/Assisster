Assisster.Views.DashboardView = Backbone.CompositeView.extend({
  template: JST["doctors/dashboard"],
  className: "row",
  
  initialize: function () {
    this.collection = new Assisster.Collections.Appointments();
    var calendarView = new Assisster.Views.CalendarView({
      collection: this.collection
    });
    
    this.addSubview("div.dashboard-body", calendarView);
  },
  
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();
    this.onRender();
    
    return this;
  },
})