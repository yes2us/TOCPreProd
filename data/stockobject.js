define([], function() {
	var _UserCode = webix.storage.local.get('_UserCode');
	var stockObject = new Object();
	
	stockObject.synTarget2Stock = function(_TargetSource)
	{
		return webix.ajax().post(urlstr+"/WBStockMng/synTarget2Stock",{TargetSource:_TargetSource,UserCode:_UserCode});
	}
	
	stockObject.getInitTarget = function(postData)
	{
		postData.UserCode = _UserCode;
		return webix.ajax().post(urlstr+"/WBStockMng/getInitTarget",postData);
	}

	stockObject.getInitTargetStatistics = function(postData)
	{
		postData.UserCode = _UserCode;
		return webix.ajax().post(urlstr+"/WBStockMng/getInitTargetStatistics",postData);
	}
	
	stockObject.getFGWHTSInfo = function(postData){
		return webix.ajax().post(urlstr+"/WBStockMng/getFGWHTSInfo",postData);
	}
	
	stockObject.getFGWHCrossTSInfo = function(postData){
		postData.UserCode = _UserCode;
		return webix.ajax().post(urlstr+"/WBStockMng/getFGWHCrossTSInfo",postData);
	}
	
	stockObject.getRetTargetWHSubWHTSInfo = function(postData){
		postData.UserCode = _UserCode;
		return webix.ajax().post(urlstr+"/WBStockMng/getRetTargetWHSubWHTSInfo",postData);
	}
	
     
    stockObject.getPartyIndex = function(postData){
    	   postData.UserCode = _UserCode;
    	   return webix.ajax().post(urlstr+"/WBStockMng/getPartyIndex",postData);
    }
         
     stockObject.getWHSKCInfo = function(postData){
       postData.UserCode = _UserCode;
       return webix.ajax().post(urlstr+"/WBStockMng/getWHSKCInfo",postData);
     }
  
      stockObject.getWHSKCInfoNewSKC = function(postData){
      	postData.UserCode = _UserCode;
       return webix.ajax().post(urlstr+"/WBStockMng/getWHSKCInfoNewSKC",postData);
     }
       
      stockObject.getProdHSStock = function(WHCode,SKUCode){
      	var postData={WHCode:WHCode,SKUCode:SKUCode,UserCode:_UserCode};
     	return webix.ajax().post(urlstr+"/WBStockMng/getProdHSStock",postData);
     }
      
      stockObject.getSKUPotentialRetList = function(SKUCode){
      	return webix.ajax().post(urlstr+"/WBStockMng/getSKUPotentialRetList",{SKUCode:SKUCode,UserCode:_UserCode});
      }
      
      stockObject.getCWHSKU = function(){
      	return webix.ajax().post(urlstr+"/WBStockMng/getCWHSKU",{UserCode:_UserCode});
      }
      
	return stockObject;
});