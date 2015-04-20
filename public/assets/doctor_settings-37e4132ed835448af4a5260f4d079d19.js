$(function () {
	$("#edit-doctor").on("click", function (event) {
		event.preventDefault();
		var params = $(event.currentTarget).parent().serializeJSON().doctor
		if (validateForm(params)) {
			$("#edit-doctor-profile").submit();
		}
	});

	var validateForm = function (params) {
		var validated = true
		if (!validateEmail(params.email)) validated = false;
		if (!validatePasswordRepeat(params.password, params.repeat_password)) validated = false;
		if (!validatePassword(params.password)) validated = false;

		return validated
	};

	var validateEmail = function (email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (re.test(email)) {
			this.$("div.doctor-email").removeClass("has-error");
			return true;
		} else {
			this.$("div.doctor-email").addClass("has-error");
			return false;
		}
	};

	var validatePassword = function (password) {
		if (password.length < 6 && password.length > 0) {
			$("span.password-validation-error").text("Mínimo de 6 carácteres");
			return false
		} else {
			$("span.password-validation-error").text("");
			return true
		}
	};

	var validatePasswordRepeat = function (password, repeated) {
		if (password != repeated) {
			$("div.password").addClass("has-error");
			$("div.repeat-password").addClass("has-error");
			$("input[name='doctor[password]'").val("");
			$("input[name='doctor[repeat_password]'").val("");
			return false
		} else {
			$("div.password").removeClass("has-error");
			$("div.repeat-password").removeClass("has-error");
			return true
		}
	};

});
(function() {


}).call(this);
