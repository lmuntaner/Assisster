Assisster.Views.NotificationsView = Backbone.CompositeView.extend({
  template: JST["doctors/notifications"],
  className: "row",
  
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },
  
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    
    return this;
  },
})