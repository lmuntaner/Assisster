Assisster.Views.ServicesIndex = Backbone.CompositeView.extend({
	template: JST["doctors/services_index"],
	className: "col-xs-8",
	
	initialize: function(options) {
		this.attachServices();
		this.listenTo(this.collection, "parseSync add remove", this.attachServices);
	},
	
	attachServices: function () {
		this.resetSubviews();
		var view = this;
		this.collection.each(function (service) {
			var serviceItemView = new Assisster.Views.ServiceItem({
				model: service,
				collection: view.collection
			});
			view.addSubview("table.services", serviceItemView);
		});
		
		this.render();
	},
	
	render: function() {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		this.attachSubviews();
		
		return this;
	},
})