define([], function() {
	var partyObject = new Object();
	
	partyObject.getPartyList = function(){
				return webix.ajax().post(urlstr+"/WBPartyMng/getPartyList",{UserCode:_UserCode});
	}
	partyObject.getRegionList = function(){
		return webix.ajax().post(urlstr+"/WBPartyMng/getRegionList",{UserCode:_UserCode,FieldStr:"PartyCode,PartyName"});
	}
	
	partyObject.getRelPartyList = function(postData) {
		postData.UserCode = _UserCode;
		return webix.ajax().post(urlstr+"/WBPartyMng/getRelPartyList",postData);
	}

    partyObject.getPartyRelation = function(partycode){
    			return webix.ajax().post(urlstr+"/WBPartyMng/getPartyRelation",{PartyCode:partycode,UserCode:_UserCode});
    }
	return partyObject;
});