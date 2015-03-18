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

	onRender: function () {
		if ($("#email-body-textarea").length !== 0) {
			var editor = new wysihtml5.Editor("email-body-textarea", { // id of textarea element
	      			toolbar: "wysihtml5-toolbar", // id of toolbar element
	      			// stylesheets:  "<%= stylesheet_path('wysihtml') %>", // optional, css to style the editor's content
	      			// parserRules: "wysihtml5ParserRules", // defined in parser rules set
	      			//showToolbarAfterInit: false
	   		});
		}
	},
  
	render: function () {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		this.attachSubview("div.notifications-container", this.sendEmailView);
		this.attachSubview("div.notifications-container", this.sendSmsView);
		this.attachSubview("div.notifications-container", this.searchView);
		this.onRender();
			

		return this;
	},
})