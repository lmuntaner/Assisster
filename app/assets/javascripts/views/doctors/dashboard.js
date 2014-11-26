Assisster.Views.DashboardView = Backbone.CompositeView.extend({
  template: JST["doctors/dashboard"],
  className: "row",
  
  initialize: function () {
    this.model = new Assisster.Models.Doctor();
    this.model.fetch();
    this.collection = this.model.appointments();
    var calendarView = new Assisster.Views.CalendarView({
      collection: this.collection
    });
    this.addSubview("div.dashboard-body", calendarView);
    this.listenTo(this.model, "sync", this.render)
  },
  
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();
    this.onRender();
    
    return this;
  },
})