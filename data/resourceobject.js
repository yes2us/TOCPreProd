define([], function() {
	var resourceObject = new Object();
	
	resourceObject.getDeptList = function(){
				return webix.ajax().post(urlstr+"/WBResourceMng/getDeptList",{UserCode:_UserCode});
	}


    resourceObject.getDeptResource = function(postData){
    			return webix.ajax().post(urlstr+"/WBResourceMng/getDeptResource",postData);
    }
   
    resourceObject.getNodeResource = function(postData){
    			return webix.ajax().post(urlstr+"/WBResourceMng/getNodeResource",postData);
    }
       
    resourceObject.getNodeList = function(postData){
    			return webix.ajax().post(urlstr+"/WBResourceMng/getNodeList",postData);
    }
     
    resourceObject.getPathList = function(postData){
    			return webix.ajax().post(urlstr+"/WBResourceMng/getPathList",postData);
    }
   
    resourceObject.getPathNode = function(pathcode){
    			return webix.ajax().post(urlstr+"/WBResourceMng/getPathNode",{UserCode:_UserCode,PathCode:pathcode});
    }
    
	return resourceObject;
});