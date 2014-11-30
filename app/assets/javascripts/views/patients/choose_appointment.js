Assisster.Views.ChooseAppointment = Backbone.CompositeView.extend({
	template: JST["patients/choose_appointment"],
	
	events: {
		"changeDate #datepicker>input": "showTimeSlots"
	},
	
	initialize: function (options) {
		this.listenTo(this.model, "sync", this.render);
		this.chooseDateView = new Assisster.Views.ChooseDate({
			model: this.model
		});
		this.addSubview("div.choose-appointment-body", this.chooseDateView);
	},
	
	onRender: function () {
		this.$('#datepicker input').datepicker();
	},
	
	render: function () {
		var renderedContent = this.template({
			service: this.model
		});
		this.$el.html(renderedContent);
		this.attachSubview("div.choose-appointment-body", this.chooseDateView);
		this.onRender();
		
		return this;
	},
	
	showTimeSlots: function (event) {
		var date = moment(event.date);
		if (this.chooseTimeView) {
			this.chooseTimeView.remove();
			this.removeSubview("div.choose-appointment-body", this.chooseTimeView);
		}
		this.chooseTimeView = new Assisster.Views.ChooseTime({
			model: this.model,
			date: date
		});
		this.addSubview("div.choose-appointment-body", this.chooseTimeView);
		this.attachSubview("div.choose-appointment-body", this.chooseTimeView);
	}
})