Assisster.Views.SlotShow = Backbone.View.extend({
	template: JST["patients/slot_show"],
	
	events: {
		"change input": "validateForm",
		"click form>button": "createAppointment"
	},
	
	initialize: function() {
		// this.$errorDiv = $("div").addClass("alert alert-danger").attr("role", "alert");
	},
	
	createAppointment: function (event) {
		event.preventDefault();
		var params = $(event.currentTarget).parent().serializeJSON().appointment;
    var view = this;
		var appointmentParams = {
			email: params.email,
			fname: params.fname,
			lname: params.lname,
			country_code: params.countrycode,
			phone_number: params.phoneNumber,
			doctor_id: window.Doctor.id
    };
    this.model.save(appointmentParams, {
      success: function (model) {
        Backbone.history.navigate("success", { trigger: true });
      }
    });
	},
	
	render: function () {
		var renderedContent = this.template({
			appointment: this.model
		});
		this.$el.html(renderedContent);
		
		return this;
	},
	
	validateForm: function () {
		if (this.validateEmail() && this.validateFname() && this.validateLname()) {
			this.$('button').prop('disabled', false);
		} else {
			// this.$('.form-inputs').prepend(this.$errorDiv);
			this.$('button').prop('disabled', true);
		}
	},
	
	validateEmail: function () {
		var $email = this.$("input[type='email']");
		if ($email.val() === '') {
			$email.addClass("required");
			return false;
		} else {
			$email.removeClass("required");
			return true;
		}
	},
	
	validateFname: function () {
		var $fname = this.$("input[name='appointment[fname]']");
		if ($fname.val() === '') {
			$fname.addClass("required");
			return false;
		} else {
			$fname.removeClass("required");
			return true;
		}
	},
	
	validateLname: function () {
		var $lname = this.$("input[name='appointment[lname]']");
		if ($lname.val() === '') {
			$lname.addClass("required");
			return false;
		} else {
			$lname.removeClass("required");
			return true;
		}
	},
})