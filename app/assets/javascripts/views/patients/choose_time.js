Assisster.Views.ChooseTime = Backbone.CompositeView.extend({
	template: JST["patients/choose_time"],
	className: "row col-xs-8 choose-available-time",
	
	initialize: function (options) {
		this.date = options.date;
		this.collection = new Assisster.Collections.Appointments();
		this.collection.getDateAppointments(this.date, this.model);
		this.listenTo(this.collection, "add", this.render);
		this.duration = moment.duration(this.model.get('duration_min'), 'minutes');
	},
	
	onRender: function () {
		this.resetSubviews();
		var view = this;
		this.setAvailableSlots().forEach(function (availableTime) {
			var availableTimeItem = new Assisster.Views.AvailableTimeItem({
				model: availableTime,
			});
			view.addSubview("div.list-group", availableTimeItem);
		});
	},
	
	render: function () {
		var renderedContent = this.template({
			date: this.date
		});
		this.$el.html(renderedContent);
		this.onRender();
		this.attachSubviews();
		
		return this;
	},
	
	setAvailableSlots: function () {
		var view = this;
		var freeSlots = [];
		this.collection.each(function (appointment, index) {
			if (appointment.get('office_hour')) {
				var newIndex = index + 1;
				var startTime = moment.utc(appointment.get('startTime'));
				var endTime = startTime.clone().add(view.duration);
				var officeHourEndTime = moment.utc(appointment.get('endTime'));
				while (endTime <= officeHourEndTime) {
					var newFreeSlot = new Assisster.Models.Appointment({
						title: view.model.escape('title'),
						startTime: startTime.clone(),
						endTime: endTime.clone()
					});
					if (view.collection.models[newIndex] && !view.collection.models[newIndex].get('office_hour')) {
						var nextAppointmentStart = view.collection.models[newIndex].get('startTime');
						var thisAppointmentEnd = newFreeSlot.get('endTime').toJSON();
						if (nextAppointmentStart < thisAppointmentEnd) {
							startTime = moment.utc(view.collection.models[newIndex].get('endTime'));
							endTime = startTime.clone().add(view.duration);
							newIndex = newIndex + 1;
						} else {
							freeSlots.push(newFreeSlot);
							startTime.add(view.duration);
							endTime.add(view.duration);				
						}
					} else {
						freeSlots.push(newFreeSlot);
						startTime.add(view.duration);
						endTime.add(view.duration);	
					}
				}
			}
		});
		
		return freeSlots;
	},
})