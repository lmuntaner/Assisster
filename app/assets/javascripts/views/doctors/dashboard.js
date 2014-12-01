Assisster.Views.DashboardView = Backbone.CompositeView.extend({
  template: JST["doctors/dashboard"],
  className: "row",
  
  initialize: function () {
    this.collection = this.model.appointments();
    var dashboardHomeView = new Assisster.Views.DashboardHome({
      collection: this.collection
    });
    this.addSubview("div.dashboard-body", dashboardHomeView);
    this.listenTo(this.model, "sync", this.render);
  },
  
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();
    // this.onRender();
    
    return this;
  },
})