define([], function() {
	var roleObject = new Object();
	
	roleObject.getRoleList= function() {
		return webix.ajax().post(urlstr+"/WBRoleMng/getRoleList");
	}

	roleObject.getRoleUserList = function(rolecode) {
			return webix.ajax().post(urlstr+"/WBRoleMng/getRoleUserList",{RoleCode:rolecode});
	}

	roleObject.getRolePrevilege = function(rolecode) {
			return webix.ajax().post(urlstr+"/WBRoleMng/getRolePrevilege",{RoleCode:rolecode});
	}
	
	roleObject.savePrevilege = function(){
			return webix.ajax().post(urlstr+"/WBRoleMng/savePrevilege");
	}
	return roleObject;
});