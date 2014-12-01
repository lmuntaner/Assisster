Assisster.Views.DashboardHome = Backbone.CompositeView.extend({
  template: JST["doctors/dashboard_home"],
	className: "row",
	
  initialize: function () {
		this.recentAppointmentsIndex = new Assisster.Views.RecentAppointmentsIndex({
		});

		this.addSubview("div.appointments-lists", this.recentAppointmentsIndex);
    this.listenTo(this.collection, "sync", this.render);
  },
  
  render: function () {
    var renderedContent = this.template();
		debugger;
    this.$el.html(renderedContent);
		this.attachSubview("div.appointments-lists", this.recentAppointmentsIndex);
    
    return this;
  },
})