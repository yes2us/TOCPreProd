define([], function() {
	var billObject = new Object();
	
	billObject.getPartyBMRecord = function(postData) {
		postData.UserCode = _UserCode;
		return webix.ajax().post(urlstr+"/WBBillMng/getPartyBMRecord",postData);
	}

     billObject.getMovSKUPlan = function(postData){
		postData.UserCode = _UserCode;
        return webix.ajax().post(urlstr+"/WBBillMng/getMovSKUPlan",postData);	
     }

     billObject.getExportRepBill = function(postData){
     	postData.UserCode = _UserCode;
        return webix.ajax().post(urlstr+"/WBBillMng/getExportRepBill",postData);	
     }
     
     billObject.getMovSKUPlanItem = function(postData){
     	postData.UserCode = _UserCode;
        return webix.ajax().post(urlstr+"/WBBillMng/getMovSKUPlanItem",postData);	
     }
  
        
     billObject.getMovSKCPlanItem = function(postData){
     	postData.UserCode = _UserCode;
     	return webix.ajax().post(urlstr+"/WBBillMng/getMovSKCPlanItem",postData);
     }
     
     billObject.getSaleOrder = function(postData){
     	postData.UserCode = _UserCode;
     	return webix.ajax().post(urlstr+"/WBBillMng/getSaleOrder",postData);
     }
	return billObject;
});