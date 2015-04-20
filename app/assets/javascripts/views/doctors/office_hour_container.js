Assisster.Views.OfficeHourContainer = Backbone.CompositeView.extend({
	template: JST["doctors/office_hour_container"],
	className: "row",
	
	events: {
		"click button.create-office-hours": "showOfficeHourForm"
	},
  
	initialize: function (options) {
		this.officeHourCalendarView = new Assisster.Views.OfficeHourCalendarView({
		  collection: this.collection
		});
		this.addSubview("div.dashboard-body", this.officeHourCalendarView);
		this.listenTo(this.model, "sync", this.render);
	},
	
	onRender: function () {
		Backbone.CompositeView.prototype.onRender.call(this);
		this.$('button.create-appointment').tooltip({
		  container: 'body'
		});
	},
  
	render: function () {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		this.attachSubview("div.dashboard-body", this.officeHourCalendarView);
		this.onRender();

		return this;
	},
	
	showOfficeHourForm: function (event) {
		event.preventDefault();
		var officeHour = new Assisster.Models.Appointment();
		var coordinates = [event.clientX, event.clientY];
		
		if (this.officeHourForm) {
			this.officeHourForm.remove();
		}
		
	    this.officeHourForm = new Assisster.Views.OfficeHourForm({
			coordinates: coordinates,
			model: officeHour,
			collection: this.collection
	    });

	    $('body').append(this.officeHourForm.render().$el);
	},
})