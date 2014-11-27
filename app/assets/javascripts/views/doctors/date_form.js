Assisster.Views.DateForm = Backbone.View.extend({
	template: JST["doctors/date_form"],
	className: "row",
	
	events: {
		"change .setTimepicker": "updateTime",
		"change .setDatepicker": "updateDate"
	},
	
	initialize: function (options) {
		this.date = options.date;
		this.position = options.position;
	},
	
	render: function () {
		var renderedContent = this.template({
			date: this.date
		});
		this.$el.html(renderedContent);
		
		return this;
	},
	
	updateDate: function () {
		debugger;
	},
	
	updateTime: function (event) {
		var timeArray = event.currentTarget.value.split(":");
		var newHour = timeArray[0];
		var newMinutes = timeArray[1].slice(0,2);
		this.date.set('hour', newHour);
		this.date.set('minutes', newMinutes);
	}
})