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
		this.formView = options.formView;
	},
	
	checkDate: function (event) {
		var dateArray = event.currentTarget.value.split("/");
		var newMonth = parseInt(dateArray[1]) - 1;
		var newDay = dateArray[0];
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
			this.endDateView.date = this.date.clone();
			this.endDateView.render();
		} else if (!this.date.isSame(this.endDateView.date, "day")) {
			this.endDateView.date = this.date.clone();
			this.endDateView.render();
		}
	},
	
	checkStartDate: function () {
		if (this.date.isBefore(this.startDateView.date)) {
			this.startDateView.date = this.date.clone();
			this.startDateView.render();
		} else if (!this.date.isSame(this.startDateView.date, "day")) {
			this.startDateView.date = this.date.clone();
			this.startDateView.render();
		}
	},
	
	render: function () {
		var renderedContent = this.template({
			date: this.date
		});
		this.$el.html(renderedContent);
		this.formView.onRender();
		
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
		var newMinutes = timeArray[1];
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