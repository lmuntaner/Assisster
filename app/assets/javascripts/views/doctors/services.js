Assisster.Views.ServicesView = Backbone.CompositeView.extend({
  template: JST["doctors/services"],
  className: "row",
  
  initialize: function () {
		this.collection = this.model.services();
		
		this.serviceForm = new Assisster.Views.ServiceForm();
		this.addSubview("div.services-container", this.serviceForm);
		
		this.servicesIndex = new Assisster.Views.ServicesIndex({
			model: this.model,
			collection: this.collection
		});
		this.addSubview("div.services-container", this.servicesIndex);
		
    this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.collection, "parseSync", this.render);
  },
  
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
		this.attachSubview("div.services-container", this.serviceForm);
		this.attachSubview("div.services-container", this.servicesIndex);
    
    return this;
  },
})