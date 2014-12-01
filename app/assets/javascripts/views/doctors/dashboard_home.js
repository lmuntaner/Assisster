Assisster.Views.DashboardHome = Backbone.CompositeView.extend({
  template: JST["doctors/dashboard_home"],
	className: "row",
	
  initialize: function () {
		this.recentAppointmentsIndex = new Assisster.Views.RecentAppointmentsIndex({
			collection: this.collection
		});

		this.addSubview("div.appointments-lists", this.recentAppointmentsIndex);
    this.listenTo(this.collection, "sync", this.render);
  },
  
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
		this.attachSubview("div.appointments-lists", this.recentAppointmentsIndex);
    
    return this;
  },
})