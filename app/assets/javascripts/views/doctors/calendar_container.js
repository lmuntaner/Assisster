Assisster.Views.CalendarContainer = Backbone.CompositeView.extend({
  template: JST["doctors/calendar_container"],
  className: "row",
  
  initialize: function (options) {
    this.calendarView = new Assisster.Views.CalendarView({
      collection: this.collection
			// calendarCollection: options.calendarCollection
    });
    this.addSubview("div.dashboard-body", this.calendarView);
    this.listenTo(this.model, "sync", this.render);
  },
  
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubview("div.dashboard-body", this.calendarView);
    this.onRender();
    
    return this;
  },
})