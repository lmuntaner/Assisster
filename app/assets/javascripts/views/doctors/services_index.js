Assisster.Views.ServicesIndex = Backbone.CompositeView.extend({
	template: JST["doctors/services_index"],
	className: "col-xs-8",
	
	events: {
		"click button.edit": "editService"
	},
	
	initialize: function(options) {
		this.attachServices();
		this.listenTo(this.collection, "parseSync add remove sync change", this.attachServices);
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
	
	editService: function(event) {
		var coordinates = [event.clientX, event.clientY];
		var id = $(event.currentTarget).parent().parent().data('id');
		var service = this.collection.get(id);

		if (this.serviceForm) {
			this.serviceForm.remove();
		}
		
		this.serviceForm = new Assisster.Views.ServiceForm({
			model: service,
			collection: this.collection,
			coordinates: coordinates
		});
		
		this.$el.append(this.serviceForm.render().$el);
	},
	
	render: function() {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		this.attachSubviews();
		
		return this;
	},
})