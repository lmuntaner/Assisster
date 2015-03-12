Assisster.Views.CalendarContainer = Backbone.CompositeView.extend({
  template: JST["doctors/calendar_container"],
  className: "row",
	
	events: {
		"click button.create-appointment": "showForm",
		"click button.create-office-hours": "showOfficeHourForm",
		"click #show-pending": "showPending"
	},
  
  initialize: function (options) {
    this.calendarView = new Assisster.Views.CalendarView({
      collection: this.collection
    });
    this.addSubview("div.dashboard-body", this.calendarView);
    this.listenTo(this.model, "sync", this.render);
	this.showingPendingAttr = false;
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
    this.attachSubview("div.dashboard-body", this.calendarView);
    this.onRender();
    
    return this;
  },
	
  showForm: function(event) {
		event.preventDefault();
		var appointment = new Assisster.Models.Appointment();
		var coordinates = [event.clientX, event.clientY];
		
		if (this.appointmentForm) {
			this.appointmentForm.remove();
		}
		
    this.appointmentForm = new Assisster.Views.AppointmentForm({
			model: appointment,
			coordinates: coordinates,
    });
		
    $('body').append(this.appointmentForm.render().$el);
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
			model: officeHour
    });

    $('body').append(this.officeHourForm.render().$el);
	},
	
	showPending: function (event) {
		this.showingPendingAttr = !this.showingPendingAttr;
		this.$("#show-pending").blur();
		if (this.showingPendingAttr) {
			this.$("#show-pending").removeClass("btn-success").addClass("btn-info");
			this.$("#show-pending").text("Esconder Pendientes");
			this.calendarView.showPending();			
		} else {
			this.$("#show-pending").removeClass("btn-info").addClass("btn-success");
			this.$("#show-pending").text("Mostrar Pendientes");
			this.calendarView.removePending();
		}
		this.calendarView.setPendingAttr(this.showingPendingAttr);
	},
})