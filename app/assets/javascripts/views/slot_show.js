Assisster.Views.SlotShow = Backbone.View.extend({
	template: JST["patients/slot_confirm"],
	
	events: {
		"click button": "createAppointment"
	},
	
	createAppointment: function (event) {
		this.model.save({}, {
			success: function () {
				Backbone.history.navigate("success", { trigger: true });				
			}
		})
	},
	
	render: function () {
		var renderedContent = this.template({
			appointment: this.model
		});
		this.$el.html(renderedContent);
		
		return this;
	},
})