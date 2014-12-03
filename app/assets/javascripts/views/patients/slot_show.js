Assisster.Views.SlotShow = Backbone.View.extend({
	template: JST["patients/slot_confirm"],
	
	events: {
		"click form>button": "createAppointment"
	},
	
	createAppointment: function (event) {
		event.preventDefault();
		var params = $(event.currentTarget).parent().serializeJSON().appointment;
		if (this.validateForm(params)) {
	    var view = this;
			var appointmentParams = {
				email: params.email,
				fname: params.fname,
				lname: params.lname,
				phone_number: params.phone_number,
				doctor_id: window.Doctor.id
	    };
	    this.model.save(appointmentParams, {
	      success: function (model) {
	        Backbone.history.navigate("success", { trigger: true });
	      }
	    })				
		} else {
			var $errors = $('<span>').text('Error!').addClass('error');
			this.$('div.errors').prepend($errors);
		}
	},
	
	render: function () {
		var renderedContent = this.template({
			appointment: this.model
		});
		this.$el.html(renderedContent);
		
		return this;
	},
	
	validateForm: function (params) {
		return this.validateEmail(params.email);
	},
	
	validateEmail: function (title) {
		return title != "";
	},
})