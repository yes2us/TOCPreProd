define([], function() {
	var obj = new Object();
	
	obj.getProjectList = function(postData){
		 postData.UserCode = _UserCode;
				return webix.ajax().post(urlstr+"/WBProjectMng/getProjectList",postData);
	}
   
    obj.deleteProjectNode =function(projectcode){
		 return webix.ajax().post(urlstr+"/WBProjectMng/deleteProjectNode",{UserCode:_UserCode,ProjectCode:projectcode});
	}
    
    obj.getProjectObj = function(projectcode){
		 return webix.ajax().post(urlstr+"/WBProjectMng/getProjectObj",{UserCode:_UserCode,ProjectCode:projectcode});
	}

    obj.getProjectNode = function(postData){
		postData.UserCode=_UserCode;
		return webix.ajax().post(urlstr+"/WBProjectMng/getProjectNode",postData);
	}
    
    obj.getNodeRGBStatcs = function(postData){
		 postData.UserCode=_UserCode;
		 return webix.ajax().post(urlstr+"/WBProjectMng/getNodeRGBStatcs",postData);    	    
    }
	return obj;
});