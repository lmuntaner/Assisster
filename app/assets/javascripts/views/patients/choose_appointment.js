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
		this.availableDates = [];
		var url = "/api/available_dates/" + window.Doctor.id;
		var view = this;
		$.ajax({
			type: "GET",
			url: url,
			success: function (dates) {
				dates.forEach( function (date) {
					view.availableDates.push(date.to_date);
				});
				view.render();
			}
		});
	},
	
	preventDefault: function (event) {
		event.preventDefault();
	},
	
	onRender: function () {
		var view = this;
		this.$('.date-pick').datepicker({
			startDate: "0d",
			language: "es",
			weekStart: 1,
			beforeShowDay: function(date) {
				var momentDate = moment(date)
				return view.availableDates.some(function (availableDate) {
					return momentDate.isSame(availableDate);
				})
			}
		});
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