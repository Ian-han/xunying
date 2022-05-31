$("#btnClear").click(function() {
	document.getElementById("userIdInp").value = null;
	document.getElementById("userNameInp").value = null;
	document.getElementById("passwordInp").value = null;
	document.getElementById("verifyPasswordInp").value = null;
	document.getElementById("sexId").value = "Male";
	document.getElementById("E-mailInp").value = null;
	document.getElementById("Tel-numberInp").value = null;

	$("#userIdDiv").removeClass("has-error");
	$("#userIdMsg").addClass("hidden");

	$("#passwordDiv").removeClass("has-error");
	$("#passwordMsg").addClass("hidden");

	$("#verifyPasswordDiv").removeClass("has-error");
	$("#verifyPasswordMsg").addClass("hidden");

});

function changeCode(){
	$("#captchaImage").attr('src', getRootPath_web() + '/prelude/getCaptcha?timestrap=' + (new Date()).valueOf());
};

$("#btnRegister").click(function() {
	var CaptchaInput = new Object();
	CaptchaInput.captcha = $("#verifyCaptchaInp").val();

	var captchaJson = JSON.stringify(CaptchaInput);

	var userInfoObj = new Object();
	userInfoObj.userId = $("#userIdInp").val();
	userInfoObj.userName = $("#userNameInp").val();
	userInfoObj.password = $("#passwordInp").val();
	userInfoObj.sex = $("#sexId").val();
	userInfoObj.email = $("#E-mailInp").val();
	userInfoObj.telNumber = $("#Tel-numberInp").val();

	var verifyPassword = document.getElementById("verifyPasswordInp").value
	var userInfoJson = JSON.stringify(userInfoObj);

	if (!userInfoObj.userId) {
		$("#userIdDiv").addClass("has-error");
		$("#userIdMsg").removeClass("hidden");

		$("#passwordDiv").removeClass("has-error");
		$("#passwordMsg").addClass("hidden");

		$("#verifyPasswordDiv").removeClass("has-error");
		$("#verifyPasswordMsg").addClass("hidden");
	} else if (!userInfoObj.password) {
		$("#passwordDiv").addClass("has-error");
		$("#passwordMsg").removeClass("hidden");

		$("#userIdDiv").removeClass("has-error");
		$("#userIdMsg").addClass("hidden");

		$("#verifyPasswordDiv").removeClass("has-error");
		$("#verifyPasswordMsg").addClass("hidden");

	} else if (verifyPassword != userInfoObj.password) {
		$("#verifyPasswordDiv").addClass("has-error");
		$("#verifyPasswordMsg").removeClass("hidden");

		$("#userIdDiv").removeClass("has-error");
		$("#userIdMsg").addClass("hidden");

		$("#passwordDiv").removeClass("has-error");
		$("#passwordMsg").addClass("hidden");
	} else if (!CaptchaInput.captcha) {
		$("#captchaDiv").addClass("has-error");
		$("#captchaMsg").removeClass("hidden");

		$("#verifyCaptchaMsg").addClass("hidden");

		$("#verifyPasswordDiv").removeClass("has-error");
		$("#verifyPasswordMsg").addClass("hidden");
	} else {
		$.ajax({
			type : "POST",
			data : captchaJson,
			dataType : "json",
			contentType : "application/json;charset=UTF-8",
			url : getRootPath_web() + "/prelude/varifyCaptcha",
			success : function(data) {
				if ("success" == data.resultMsg) {
					persistentEmp(userInfoJson);
				}else{
					$("#captchaDiv").addClass("has-error");
					$("#verifyCaptchaMsg").removeClass("hidden");

					$("#captchaMsg").addClass("hidden");
				}
			},
		});
	}
});

function persistentEmp(userInfoJson) {
	$.ajax({
		type : "POST",
		data : userInfoJson,
		dataType : "json",
		contentType : "application/json;charset=UTF-8",
		url :  getRootPath_web() + "/prelude/saveRegisterInfo",
		success : function(data) {
			if ("success" == data.resultMsg) {
				$('#registerSuccessModal').modal({
					keyboard: true
				})
			}
		},
		error : function (e) {
			alert(e.message())
		}
	});
};

