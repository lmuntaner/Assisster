Assisster.Views.NotificationsView = Backbone.CompositeView.extend({
  template: JST["doctors/notifications"],
  className: "row",
  
  initialize: function () {
		this.sendEmailView = new Assisster.Views.SendEmailView();
		this.addSubview("div.notifications-container", this.sendEmailView);
		
    this.listenTo(this.model, "sync", this.render);
  },
  
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
		this.attachSubview("div.notifications-container", this.sendEmailView);
    
    return this;
  },
})