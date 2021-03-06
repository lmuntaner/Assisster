Assisster.Views.AppointmentsView = Backbone.CompositeView.extend({
	template: JST['doctors/appointments'],
	className: "row",
	
  initialize: function (options) {
    this.appointmentsIndex = new Assisster.Views.AppointmentsIndex({
      collection: this.collection
    });
    this.addSubview("div.dashboard-body", this.appointmentsIndex);
  },
	
	render: function () {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		this.attachSubviews();
		this.onRender();
		
		return this;
	}
})