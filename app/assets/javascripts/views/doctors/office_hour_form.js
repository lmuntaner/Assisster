Assisster.Views.OfficeHourForm = Backbone.CompositeView.extend({
	template: JST["doctors/office_hour_form"],
	className: "appointment-form-container",
	
	events: {
		"click #close-office-hour-form": "closeView",
	},
	
	initialize: function (options) {
		if (options.coordinates[0] < 1000) {
			this.$el.css('left', options.coordinates[0])			
		} else {
			this.$el.css('left', options.coordinates[0] - 330)
		}
		if (options.coordinates[1] < 400) {
			this.$el.css('top', options.coordinates[1])			
		} else {
			this.$el.css('top', options.coordinates[1] - 150)	
		}
		
		var startTime = moment();
		var endTime = moment().add(4, "hours");
		
		this.fromDateForm = new Assisster.Views.DateForm({
			date: startTime,
			position: "From"
		});
		this.toDateForm = new Assisster.Views.DateForm({
			date: endTime,
			position: "To"
		});
		this.selectorDate = "div.form-inputs";
		this.addSubview(this.selectorDate, this.fromDateForm);
		this.addSubview(this.selectorDate, this.toDateForm);
	},
	
	closeView: function () {
		this.remove();
	},
	
	onRender: function () {
		this.$('.setDatepicker').datepicker({
			autoclose: true
		});
		this.$('.setTimepicker').timepicker();
	},
  
  render: function () {
    var renderedContent = this.template({
    	date: this.date,
			appointment: this.model
    });
    this.$el.html(renderedContent);
		this.attachSubview(this.selectorDate, this.fromDateForm);
		this.attachSubview(this.selectorDate, this.toDateForm);
		this.onRender()
		
    return this;
  },
	
})