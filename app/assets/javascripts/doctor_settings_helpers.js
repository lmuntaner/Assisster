$(function () {
	$("#edit-doctor").on("click", function (event) {
		event.preventDefault();
		var params = $(event.currentTarget).parent().serializeJSON().doctor;
		if (validateForm(params, "edit-doctor")) {
			$("#edit-doctor-profile").submit();
		}
	});

	$("#new-doctor").on("click", function (event) {
		event.preventDefault();
		var params = $("#new-doctor-form").serializeJSON().doctor;
		if (validateForm(params, "new-doctor")) {
			$("#new-doctor-form").submit();
		}
	});

	var validateForm = function (params, formType) {
		var validated = true
		if (!validateEmail(params.email)) validated = false;
		if (!validatePasswordRepeat(params.password, params.repeat_password, false)) validated = false;
		if (formType === "new-doctor") {
			if (!validatePassword(params.password, true)) validated = false;
			if (!validateSubdomain(params.subdomain_name)) validated = false;
		} else {
			if (!validatePassword(params.password, false)) validated = false;
		}


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

	var validatePassword = function (password, isNew) {
		var validation;
		if (isNew) {
			notValidated = password.length < 6;
		} else {
			notValidated = password.length < 6 && password.length > 0;
		}
		if (notValidated) {
			$("span.password-validation-error").text("Mínimo de 6 carácteres");
			$("div.password").addClass("has-error");
			$("div.repeat-password").addClass("has-error");
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

	var validateSubdomain = function (subdomain_name) {
		if (subdomain_name.length <= 0 || subdomain_name.length > 20) {
			$("div.subdomain").addClass("has-error");
			$("input[name='doctor[subdomain_name]'").val("");
			return false
		} else {
			$("div.subdomain").removeClass("has-error");
			return true
		}
	}

});