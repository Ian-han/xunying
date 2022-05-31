function getRootPath_web() {
	var curWPath = window.document.location.href;

	var pathName = window.document.location.pathname;

	var pos = curWPath.indexOf(pathName);

	var localhostPath = curWPath.substring(0, pos);

	var projectName = pathName
			.substring(0, pathName.substr(1).indexOf('/') + 1);

//	return (localhostPath + projectName);
	return (localhostPath);

};