 function checkauthorization(forceLogin){

	var thishref = document.location.href
	var PageId = thishref.substr(thishref.lastIndexOf("/")+1,thishref.length-thishref.lastIndexOf("/"));

	webix.ajax().post(urlstr+"/WBUserMng/checkAuth",{UserCode:_UserCode,ModuleId:PageId},function(response){
		if(!response)
		{
			window.location.href= homestr+"/login.html";
		}
	});
	
// var _UserCode = webix.storage.local.get('_UserCode');
// var _LastLoginTime = webix.storage.local.get('_LastLoginTime');
// var dayGap = (new Date()-new Date(_LastLoginTime))/1000/3600/24;
    

   if((forceLogin || !_UserCode ) && !isDebug)
  {   
		window.location.href= homestr+"/login.html";
  };

};


function  checkWriteAuth(){
	var thishref = document.location.href
	var PageId = thishref.substr(thishref.lastIndexOf("/")+1,thishref.length-thishref.lastIndexOf("/"));
	
	 var hasWriteAuth = false;
		if(_UserObject)
		{
			_UserObject.MyPrevilege.forEach(function(item){
				if(item.moduleid==PageId) 
				{
					if(item.operation && item.operation=='rw')
					{
						hasWriteAuth = true;
					}
				}
			});
		}
	return hasWriteAuth;
}
