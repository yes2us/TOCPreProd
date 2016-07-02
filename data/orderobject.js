define([], function() {

	var orderObject = new Object();
	
	orderObject.getProProdOrder = function(postData){
		postData.UserCode = _UserCode;
		return webix.ajax().post(urlstr+"/WBOrderMng/getProProdOrder",postData);
	}

	return orderObject;
});