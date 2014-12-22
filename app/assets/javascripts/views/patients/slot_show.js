Assisster.Views.SlotShow = Backbone.View.extend({
	template: JST["patients/slot_show"],
	
	events: {
		"click form>button": "createAppointment"
	},
	
	createAppointment: function (event) {
		event.preventDefault();
		var params = $(event.currentTarget).parent().serializeJSON().appointment;
		if (this.validateForm(params)) {
	    var view = this;
			var phoneNumber = params.countrycode + params.phoneNumber;
			var appointmentParams = {
				email: params.email,
				fname: params.fname,
				lname: params.lname,
				phone_number: phoneNumber,
				doctor_id: window.Doctor.id
	    };
	    this.model.save(appointmentParams, {
	      success: function (model) {
	        Backbone.history.navigate("success", { trigger: true });
	      }
	    })				
		} else {
			var $errors = $('<span>').text(this.errors).addClass('error');
			this.$('div.errors').prepend($errors);
		}
	},
	
	render: function () {
		var renderedContent = this.template({
			appointment: this.model,
		});
		this.$el.html(renderedContent);
		
		return this;
	},
	
	validateForm: function (params) {
		return this.validateEmail(params.email);
	},
	
	validateEmail: function (email) {
		if (email === '') {
			this.errors = "Please enter your email!";
			return false;
		}
		return true;
	},
})