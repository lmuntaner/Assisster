Assisster.Views.CalendarContainer = Backbone.CompositeView.extend({
  template: JST["doctors/calendar_container"],
  className: "row",
  
  initialize: function () {
    var calendarView = new Assisster.Views.CalendarView({
      collection: this.collection
    });
    this.addSubview("div.dashboard-body", calendarView);
    this.listenTo(this.model, "sync", this.render);
  },
  
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();
    this.onRender();
    
    return this;
  },
})