$(document).ready(function verifyUserLogin() {

	$("#PersonalCenter").toggle();

	var data = $.ajax({
		type : "GET",
		url : getRootPath_web() + '/climax/getHttpSessionObj',
		contentType : "application/json; charset=utf-8",
		dataType : "json",
		success : function(sessionObj) {
			if (sessionObj != null) {
				$("#RegLog").toggle();
				$("#PersonalCenter").show();
			}
		},
		error : function(data) {
			console.log("error to get session");
		}

	});
});

$("#Logout").click(function() {

	var data = $.ajax({
		type : "GET",
		url : getRootPath_web() + '/climax/clearHttpSession',
		contentType : "application/json; charset=utf-8",
		dataType : "json",
		success : function(sessionObj) {
			$("#PersonalCenter").toggle();
			$("#RegLog").show();
		},
		error : function(data) {
			console.log("error to clear session");
		}

	});

});