Assisster.Views.NotificationsView = Backbone.CompositeView.extend({
  template: JST["doctors/notifications"],
  className: "row",
  
	initialize: function () {
		this.sendEmailView = new Assisster.Views.SendEmailView();
		this.addSubview("div.notifications-container", this.sendEmailView);
		
		this.sendSmsView = new Assisster.Views.SendSmsView({
			model: this.model
		});
		this.addSubview("div.notifications-container", this.sendSmsView);
		
		this.searchView = new Assisster.Views.SearchView({
			collection: this.collection
		});
		this.addSubview("div.notifications-container", this.searchView);
		
		this.listenTo(this.model, "sync", this.render);
	},
  
	render: function () {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		this.attachSubview("div.notifications-container", this.sendEmailView);
		this.attachSubview("div.notifications-container", this.sendSmsView);
		this.attachSubview("div.notifications-container", this.searchView);
			

		return this;
	},
})