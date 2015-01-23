Assisster.Views.ServicesIndex = Backbone.CompositeView.extend({
	template: JST["doctors/services_index"],
	className: "col-xs-8",
	
	initialize: function(options) {
		this.attachServices();
		this.listenTo(this.collection, "parseSync", this.attachServices);
	},
	
	attachServices: function () {
		var view = this;
		this.collection.each(function (service) {
			var serviceItemView = new Assisster.Views.ServiceItem({
				model: service
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