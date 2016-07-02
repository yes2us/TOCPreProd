define([], function() {
	var userObject = new Object();

	userObject.getUserList = function() {
		return webix.ajax().post(urlstr+"/WBUserMng/getUserList");
	}

	userObject.getUserRole = function(usercode) {
		return webix.ajax().post(urlstr+"/WBUserMng/getUserRole",{UserCode:usercode});
	}

	userObject.reviseUserPWD = function(postData){
		return webix.ajax().post(urlstr+"/WBUserMng/reviseUserPWD",postData);
	}
	
	return userObject;
});