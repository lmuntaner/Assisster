Assisster.Views.ChooseAppointment = Backbone.CompositeView.extend({
	template: JST["patients/choose_appointment"],
	
	events: {
		"click": "preventDefault",
		"changeDate .date-pick": "showTimeSlots"
	},
	
	initialize: function (options) {
		this.listenTo(this.model, "sync", this.render);
		this.chooseDateView = new Assisster.Views.ChooseDate();
		this.addSubview("div.choose-appointment-body", this.chooseDateView);
	},
	
	preventDefault: function (event) {
		event.preventDefault();
	},
	
	onRender: function () {
		$('.date-pick').datepicker();
		this.chooseDateView.$el.addClass('active-step');
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
		this.chooseDateView.$el.removeClass('active-step');
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