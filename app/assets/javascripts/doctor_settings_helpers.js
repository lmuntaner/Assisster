$(function () {
	$("#edit-doctor").on("click", function (event) {
		event.preventDefault();
		var params = $(event.currentTarget).parent().serializeJSON().doctor
		if (params.password != params.repeat_password) {
			$("div.password").addClass("has-error");
			$("div.repeat-password").addClass("has-error");
			$("input[name='doctor[password]'").attr("value", "");
			$("input[name='doctor[repeat_password]'").attr("value", "");
		}
		debugger;
	});
});