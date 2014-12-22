Assisster.Views.ChooseTime = Backbone.CompositeView.extend({
	template: JST["patients/choose_time"],
	className: "row col-xs-8 choose-available-time",
	
	initialize: function (options) {
		this.date = options.date;
		this.availableSlots = true;
		this.collection = new Assisster.Collections.Appointments();
		this.collection.getDateAppointments(this.date, this.model);
		this.listenTo(this.collection, "availableSlots", this.setAvailability);
		this.listenTo(this.collection, "availableSlots", this.render);
		this.duration = moment.duration(this.model.get('duration_min'), 'minutes');
	},
	
	setAvailability: function () {
		if (this.collection.length === 0) {
			this.availableSlots = false;
		}
	},
	
	onRender: function () {
		this.resetSubviews();
		var view = this;
		this.collection.each(function (availableTime) {
			var availableTimeItem = new Assisster.Views.AvailableTimeItem({
				model: availableTime,
			});
			view.addSubview("div.list-group", availableTimeItem);
		});
	},
	
	render: function () {
		var renderedContent = this.template({
			date: this.date,
			availableSlots: this.availableSlots
		});
		this.$el.html(renderedContent);
		this.onRender();
		this.attachSubviews();
		
		return this;
	},
})