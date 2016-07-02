define([], function() {
	var obj = new Object();
	
	obj.getProjectList = function(postData){
		 postData.UserCode = _UserCode;
				return webix.ajax().post(urlstr+"/WBProjectMng/getProjectList",postData);
	}
    
	return obj;
});