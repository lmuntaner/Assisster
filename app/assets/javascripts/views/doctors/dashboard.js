Assisster.Views.DashboardView = Backbone.View.extend({
  template: JST["doctors/dashboard"],
  className: "row",
  
  render: function() {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    
    return this;
  }
})