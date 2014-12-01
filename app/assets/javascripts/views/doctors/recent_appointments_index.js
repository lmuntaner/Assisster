Assisster.Views.RecentAppointmentsIndex = Backbone.CompositeView.extend({
  template: JST["doctors/recent_appointments_index"],
	className: "recent-list",
	
  initialize: function () {
		
		// this.listenTo(this.collection, "sync", this.render)
  },
  
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    
    return this;
  },
})