Assisster.Views.DashboardHome = Backbone.CompositeView.extend({
  template: JST["doctors/dashboard_home"],
	className: "row",
	
  initialize: function () {
		this.recentAppointmentsIndex = new Assisster.Views.RecentAppointmentsIndex({
			collection: this.collection
		});
		this.addSubview("div.appointments-lists", this.recentAppointmentsIndex);
		
		this.pendingAppointmentsIndex = new Assisster.Views.PendingAppointmentsIndex({
			collection: this.collection
		});
		this.addSubview("div.appointments-lists", this.pendingAppointmentsIndex);
		
		this.todaysAppointmentsIndex = new Assisster.Views.TodaysAppointmentsIndex({
			collection: this.collection
		});
		this.addSubview("div.todays-appointments-body", this.todaysAppointmentsIndex);
		
    this.listenTo(this.collection, "sync", this.render);
  },
  
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
		this.attachSubview("div.appointments-lists", this.pendingAppointmentsIndex);
		this.attachSubview("div.appointments-lists", this.recentAppointmentsIndex);
		this.attachSubview("div.todays-appointments-body", this.todaysAppointmentsIndex);
    
    return this;
  },
})