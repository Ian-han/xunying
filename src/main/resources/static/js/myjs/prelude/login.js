$("#btn_login").click(function() {
	var loginObj = new Object();
	loginObj.userId = $("#inputAccount").val();
	loginObj.password = $("#inputPassword").val();
	var loginJson = JSON.stringify(loginObj);
	$.ajax({
		type : 'POST',
		data : loginJson,
		dataType : 'json',
		contentType : 'application/json;charset=UTF-8',
		url : getRootPath_web() + '/prelude/verifyLogin',
		success : function(e) {
			if (e.accountMsg) {
				$("#accountDiv").addClass("has-error");
				$("#accountMsg").removeClass("hidden");

				$("#pwdDiv").removeClass("has-error");
				$("#pwdMsg").addClass("hidden");
			} else if (e.pwdMsg) {
				$("#accountDiv").removeClass("has-error");
				$("#accountMsg").addClass("hidden");

				$("#pwdDiv").addClass("has-error");
				$("#pwdMsg").removeClass("hidden");
			} else if (e.user) {
				location.href = getRootPath_web() + "/climax/home";
				console.log(user);
			}
		}
	});

});

$("#btn_register").click(function() {
	location.href = getRootPath_web() + "/prelude/register";
});

function keyLogin(e) {
	if (event.keyCode == 13) {
		document.getElementById("btn_login").click();
	}
};
