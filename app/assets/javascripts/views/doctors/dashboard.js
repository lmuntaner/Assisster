Assisster.Views.DashboardView = Backbone.CompositeView.extend({
  template: JST["doctors/dashboard"],
  className: "row",
  
  initialize: function () {
    this.collection = this.model.appointments();
    this.dashboardHomeView = new Assisster.Views.DashboardHome({
      collection: this.collection
    });
    this.addSubview("div.dashboard-body", this.dashboardHomeView);
    this.listenTo(this.model, "sync", this.render);
  },
  
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubview("div.dashboard-body", this.dashboardHomeView);
    
    return this;
  },
})