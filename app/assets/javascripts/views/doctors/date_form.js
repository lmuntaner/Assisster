Assisster.Views.DateForm = Backbone.View.extend({
	template: JST["doctors/date_form"],
	className: "row",
	
	events: {
		"change .setTimepicker": "updateTime",
		"change .setDatepicker": "checkDate"
	},
	
	initialize: function (options) {
		this.date = options.date;
		this.position = options.position;
	},
	
	checkDate: function (event) {
		var dateArray = event.currentTarget.value.split("/");
		var newMonth = dateArray[0];
		var newDay = dateArray[1];
		var newYear = dateArray[2];
		this.date.date(newDay);
		this.date.month(newMonth);
		this.date.set('year', newYear);
		if (this.startDateView) {
			this.checkStartDate();
		}
		if (this.endDateView) {
			this.checkEndDate();
		}
	},
	
	checkEndDate: function () {
		if (this.date.isAfter(this.endDateView.date)) {
			this.endDateView.date = this.date.clone().add(30, "minutes");
			this.endDateView.render();
		}
	},
	
	checkStartDate: function () {
		if (this.date.isBefore(this.startDateView.date)) {
			this.endDateView.date = this.date.clone().subtract(30, "minutes");
			this.endDateView.render();
		}
	},
	
	render: function () {
		var renderedContent = this.template({
			date: this.date
		});
		this.$el.html(renderedContent);
		
		return this;
	},
	
	setEndDate: function (dateView) {
		this.endDateView = dateView;
	},
	
	setStartDate: function (dateView) {
		this.startDateView = dateView;
	},

	updateTime: function (event) {
		var timeArray = event.currentTarget.value.split(":");
		var newHour = timeArray[0];
		var newMinutes = timeArray[1].slice(0,2);
		this.date.set('hour', newHour);
		this.date.set('minutes', newMinutes);
		if (this.startDateView) {
			this.checkStartDate();
		}
		if (this.endDateView) {
			this.checkEndDate();
		}
	}
})