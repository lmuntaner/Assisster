Assisster.Views.ChooseTime = Backbone.View.extend({
	template: JST["patients/choose_time"],
	className: "col-xs-6 choose-time-slot",
	
	initialize: function (options) {
		this.date = options.date;
		this.collection = new Assisster.Collections.Appointments();
		this.collection.getDateAppointments(this.date, this.model);
		this.listenTo(this.collection, "add", this.render);
	},
	
	render: function () {
		var renderedContent = this.template({
			date: this.date
		});
		this.$el.html(renderedContent);
		
		return this;
	}
})