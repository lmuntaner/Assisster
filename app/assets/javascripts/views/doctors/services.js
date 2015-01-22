Assisster.Views.ServicesView = Backbone.CompositeView.extend({
  template: JST["doctors/services"],
  className: "row",
  
  initialize: function () {
		this.serviceForm = new Assisster.Views.ServiceForm();
		this.addSubview("div.services-container", this.serviceForm);
		
    this.listenTo(this.model, "sync", this.render);
  },
  
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
		this.attachSubview("div.services-container", this.serviceForm);
    
    return this;
  },
})