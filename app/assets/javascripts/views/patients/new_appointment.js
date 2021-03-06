Assisster.Views.NewAppointmentView = Backbone.CompositeView.extend({
	template: JST["patients/new_appointment"],
	class_name: "row",
	
	initialize: function (options) {
    var chooseServiceView = new Assisster.Views.ChooseService({
    	collection: this.collection
    });
    this.addSubview("div.new-appointment-body", chooseServiceView);
	},
	
	render: function () {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		this.attachSubviews();
		
		return this;
	}
})