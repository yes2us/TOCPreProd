define([], function() {

	var prodObject = new Object();
	
	prodObject.getProdStoreList = function(postData){
		postData.UserCode = _UserCode;
		return webix.ajax().post(urlstr+"/WBProdMng/getProdStoreList",postData);
	}

	prodObject.getSugSKUProdPlan = function(postData){
		postData.UserCode = _UserCode;
		return webix.ajax().post(urlstr+"/WBProdMng/getSugSKUProdPlan",postData);
	}

	prodObject.getSugSKCProdPlan = function(postData){
		postData.UserCode = _UserCode;
		return webix.ajax().post(urlstr+"/WBProdMng/getSugSKCProdPlan",postData);
	}
	
	prodObject.getProductList = function(postData){
		postData.UserCode = _UserCode;
		return webix.ajax().post(urlstr+"/WBProdMng/getProductList",postData);
	}

	
	prodObject.getProdSale = function(PartyCode,SKUCode) {
		var postData={PartyCode:PartyCode,SKUCode:SKUCode,UserCode:_UserCode};
		return webix.ajax().post(urlstr+"/WBProdMng/getProdSale",postData);
	}

	prodObject.getSKCIndex = function(postData){
		postData.UserCode = _UserCode;
		return webix.ajax().post(urlstr+"/WBProdMng/getSKCIndex",postData);
	}

     prodObject.getSKCIndexItem = function(postData){
     	postData.UserCode = _UserCode;
     	return webix.ajax().post(urlstr+"/WBProdMng/getSKCIndexItem",postData);
     }
	return prodObject;
});