Assisster.Views.DashboardHome = Backbone.CompositeView.extend({
  template: JST["doctors/dashboard_home"],
	classNmae: "row",
	
  initialize: function () {
  },
  
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    
    return this;
  },
})