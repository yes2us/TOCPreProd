define(
["data/userobject"],
function(userobject){

return {
	$ui:{
		view: "submenu",
		id: "profilePopup",
		width: 200,
		padding:0,
		data: [
			{id: 1, icon: "user", value: "我的设置"},
			{id: 2, icon: "cog", value: "修改密码"},
			{ $template:"Separator" },
			{id: 3, icon: "sign-in", value: "登陆"},
			{id: 4, icon: "sign-out", value: "退出"},
			{ $template:"Separator" },
			{id: 5, icon: "question-circle", value: "帮助文档"}
		],
		type:{
			template: function(obj){
				if(obj.type)
					return "<div class='separator'></div>";
				return "<span class='webix_icon alerts fa-"+obj.icon+"'></span><span class='profileitem'> "+obj.value+"</span>";
			}
		},
		onClick:{
			profileitem:function(e,id,node){
				if(id==5) window.open("http://"+window.location.host+"/EmbrySCMWebix/disthelp.html", "_blank");
				if(id==3 || id==4) checkauthorization(true);			
				if(id==2)
				{
						webix.ui({
								view:"window",
								height:350,
							    width:400,
							    head:"修改密码",
							    id:"revisePWDWin",
							    position:"center",
								body:{
								rows:[{ view:"form", scroll:false, width:350, 
								elements:  [
												{ view: "text", label: '帐号', name: "usercode",id:"usercode",value:_UserCode,disabled:true},
											    { view: "text", label: '原密码',type:"password", name: "oldpwd" ,id:"oldpwd",required:true},
											    { view: "text", label: '新密码',type:"password", name: "newpwd" ,id:"newpwd",required:true},
											    { view: "text", label: '再输入',type:"password", name: "renewpwd" ,id:"renewpwd",required:true},
												{ 
													margin:5,
													cols:[
													      { view: "button", value: "确认",name: "OKButton",click:function(){
																if($$("newpwd").getValue()==$$("renewpwd").getValue())
																{
																	var postData={
																		UserCode:_UserCode,
																		OldPWD:$$("oldpwd").getValue(),
																		NewPWD:$$("newpwd").getValue()
																	};
																	userobject.reviseUserPWD(postData).then(function(response){
																		response = response.text();
																		if(response.indexOf("OK")>=0) 
																		{
																			webix.message("修改成功");
																			$$("revisePWDWin").close();
																		}
																		else
																		{
																			webix.message("原密码不正确");
																		}
																	});
																}
																else
																{
																	webix.message("两次输入的密码不一样");
																}
													      	
													      }},
													      { view: "button", value: "取消",name: "CancelButton",click:("$$('revisePWDWin').close();")}
												]}
											]
								}]
								}
							}).show();
//							$$("renewpwd").attachEvent("onChange",function(newv,oldv){console.log(newv);});
			}
		},

	}
}
}
});