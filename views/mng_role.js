define([
	"data/roleobject",
	"data/userobject",
	"views/modules/modaladd/addrole"
	],
function(roleobject,userobject,modaladd){
	
	checkauthorization(false);
	var userlist;
    var selrolecode;
    
  var titleBar = {
		view: "toolbar",
		css: "highlighted_header header5",
		paddingX:0,
		paddingY:0,
		height:_ToolBarHeight,
		cols:[
			{  view: "button", type: "iconButton", icon: "refresh", label: "刷新",hidden:false, width: 80, 
			click: function(){
				$$("dt_role").clearAll();
				$$("dt_role").parse(roleobject.getRoleList());
				}},
//			{},
//			{ view: "button",id:"editbutton", type: "iconButton", icon: "pencil-square-o", label: "编辑", width: 80,
//			click:function(){
//				$$('dt_role').define('editable',true);	
//				$$('addbutton').show();
//				$$('addbutton').refresh();	
//				
//				$$('toolbar').config.css="highlighted_header header4";
//				$$('toolbar').reconstruct();
//			}},
			
			{},
			{ view: "button", type: "iconButton", icon: "plus",id:"addbutton", label: "增加",hidden:false, width: 80, 
			click: function(){this.$scope.ui(modaladd.$ui).show();}},
			{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, 
			click:function(){webix.toExcel($$("dt_role"));}},
		]
	};
	
	var grid_role = {
		margin:10,
		rows:[
			{
				view:"datatable", 
				id:"dt_role",
//				maxHeight:250,
				rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
				headermenu:{width:250,autoheight:false,scroll:true},
				resizeColumn:true,
				editable:true,
				select:true,
				navigation:true,
				updateFromResponse:true,
				save:urlstr+"/WBCURDMng/saveRole",
				columns:[
	    				{id:"_identify",header:"ID",hidden:true,width:30},
					{id:"deletebutton", header:"&nbsp;",hidden:false, width:35, template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"},
					{id:"roleenabled", header:"启用", template:"{common.checkbox()}", sort:"string",fillspace:1},
					{id:"rolecode", header:"角色编号", sort:"string",fillspace:1},
					{id:"rolename", header:"角色名称", sort:"string",fillspace:1},
					{id:"roletype", header:"类型", editor:"text", sort:"string",fillspace:1},
					{id:"roledesc", header:"描述", editor:"text", sort:"string",fillspace:1},
				],
				on: {
					onSelectChange:function(){
						$$("usertree").define("disabled",false);
						
						var selRow = this.getSelectedItem();
						if(selRow){
						selrolecode = selRow.rolecode;
						var premzRolePrevData = roleobject.getRoleUserList(selRow.rolecode);
						premzRolePrevData.then(function(response){
							var jsondata = response.json();
								$$("dt_roleuser1").clearAll();
								$$("dt_roleuser1").parse(jsondata);
								
								$$('usertree').blockEvent();
								$$("usertree").uncheckAll();
								$$('usertree').unblockEvent();
								
								jsondata.forEach(function(item){
									$$("usertree").checkItem(item.usercode);
								});								

						});
						}
					}
							
				},
				onClick:{
					webix_icon:function(e,id,node){
						webix.confirm({
							text:"你将删除本条记录.<br/>确定吗?", ok:"确定", cancel:"取消",
							callback:function(res){
								if(res){
									webix.$$("dt_role").remove(id);
								}
							}
						});
					}
				},
			}
		]

	};

					
var grid_roleuser ={
	 view:"datatable",
	 id:"dt_roleuser1",
	rowHeight:_RowHeight,
	headerRowHeight:_HeaderRowHeight,
	headermenu:{width:250,autoheight:false,scroll:true},
	resizeColumn:true,
	editable:true,
	select:true,
	navigation:true,
	save:urlstr+"/WBCURDMng/saveRoleUser",
	 columns:[
//	    	{id:"deletebutton", header:"&nbsp;",hidden:false, width:60, template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"},
	    {id:"_identify",header:"ID",hidden:true,width:30},
	    {id:"usercode",header:"用户编号",fillspace:1},
	    {id:"usertruename",header:"用户名",fillspace:1},
//	    {id:"usertype",header:"用户类型",fillspace:1},
	 ],
	 onClick:{
					webix_icon:function(e,id,node){
						webix.confirm({
							text:"你将删除本条记录.<br/>确定吗?", ok:"确定", cancel:"取消",
							callback:function(res){
								if(res){
									webix.$$("dt_roleuser1").remove(id);
								}
							}
						});
					}
				},
}

var grid_treetable={
	maxWidth:200,
	rows:[
		    		{
							view: "toolbar",
							css: "highlighted_header header4",
							paddingX:5,
							paddingY:5,
							height:35,
							cols:[
								{
									"template": "<span class='webix_icon fa-adjust'></span>用户列表", "css": "sub_title2", borderless: true
								},
							]
				},
				
				{
					view:"tree",
					id:"usertree",
					template:"{common.icon()} {common.checkbox()} {common.folder()} #value#",
					threeState: false,
					disabled:true,
					url:urlstr+"/WBUserMng/getUserTree",
					on:{
						onItemCheck:function(id){
//							console.log(selrolecode);
							if(!selrolecode)  return;
							
							var isChecked = $$("usertree").isChecked(id);						
							if(!isChecked){
								var arr = $$("dt_roleuser1").find(function(row){
										return row.usercode == id;
									});
									
									if(arr.length) $$("dt_roleuser1").remove(arr[0].id);
								return;
							}
							
							userlist.forEach(function(item){
								if(item.usercode==id)
								{
									var arr = $$("dt_roleuser1").find(function(row){
										return row.usercode == id;
									});
									
									if(!arr.length)
									$$("dt_roleuser1").add({
										rolecode:selrolecode,
										usercode:item.usercode,
										usertruename:item.usertruename
									});
								}
							});
						},
					}
				}

			]
};

	var layout = {
		type: "line",
		cols:[
			grid_treetable,
			{rows:[titleBar,{view:"resizer"},grid_role,grid_roleuser]}
//			pager,
		]

	};


	return {
		$ui: layout,
		$oninit:function(){
			var hasWriteAuth = checkWriteAuth();
			$$("dt_role").define("editable",hasWriteAuth);
			$$("usertree").define("editable",hasWriteAuth);
			$$("dt_roleuser1").define("editable",hasWriteAuth);
//			$$("editbutton").define("disabled",!hasWriteAuth);
			$$("addbutton").define("disabled",!hasWriteAuth);
			
			userobject.getUserList().then(function(response){
				userlist = response.json();
			});
			
			$$("dt_role").clearAll();
			$$("dt_role").parse(roleobject.getRoleList());
			
		webix.dp.$$("dt_role").attachEvent("onAfterInsert", function(response, id, object){
			    $$("dt_role").getItem(id)._identify = response;
				$$("dt_role").refresh();   
			}); 

		webix.dp.$$("dt_roleuser1").attachEvent("onAfterInsert", function(response, id, object){
			    $$("dt_roleuser1").getItem(id)._identify = response;
				$$("dt_roleuser1").refresh();   
			}); 
		}
	};

});