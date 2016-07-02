define([
	"data/userobject",
	"views/modules/modaladd/adduser"
	],
function(userobject,modaladd){
	
	checkauthorization(false);
	
  var titleBar = {
		view: "toolbar",
		id:"toolbar",
		css: "highlighted_header header5",
		paddingX:0,
		paddingY:0,
		height:_ToolBarHeight,
		cols:[
			{  view: "button", type: "iconButton", icon: "refresh", label: "刷新",hidden:false, width: 80, 
			click: function(){
				$$("dt_user").clearAll();
				$$("dt_user").parse(userobject.getUserList());
				}},
			{},
			{ view: "button",id:"editbutton", type: "iconButton", icon: "pencil-square-o", label: "编辑", width: 80,
			click:function(){
				$$('deletebutton').show();	
				$$('addbutton').show();
				$$('addbutton').refresh();	
				
				$$('toolbar').config.css="highlighted_header header4";
				$$('toolbar').reconstruct();
			}},
			{ view: "button", type: "iconButton", icon: "plus",id:"addbutton", label: "增加",hidden:false, width: 80, click: function(){this.$scope.ui(modaladd.$ui).show();}},
			{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, 
			click:function(){webix.toExcel($$("dt_user"));}},
		]
	};
	
	var grid_user = {
		margin:10,
		rows:[
			{
				view:"datatable", 
				id:"dt_user",
				rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
				headermenu:{width:250,autoheight:false,scroll:true},
				resizeColumn:true,
				editable:true,
				select:true,
				navigation:true,
				save:urlstr+"/WBCURDMng/saveUser",
				updateFromResponse:true,
				columns:[
	    				{id:"_identify",header:"ID",hidden:true,width:30},
					{id:"deletebutton", header:"&nbsp;",hidden:false, width:35, template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"},
					{id:"userenabled", header:"启用", template:"{common.checkbox()}", sort:"string",fillspace:1},
					{id:"usercode", header:"用户编号", sort:"string",fillspace:1},
					{id:"usertruename", header:"用户真名", editor:"text", sort:"string",fillspace:1},
				],
				on: {
					onSelectChange:function(){
						var selRow = this.getSelectedItem();
						if(selRow){
						var PremzRelData = userobject.getUserRole(selRow.usercode);
						$$("dt_userrole").clearAll();
						$$("dt_userrole").parse(PremzRelData);
						}
					}
				},
				onClick:{
					webix_icon:function(e,id,node){
						webix.confirm({
							text:"你将删除本条记录.<br/>确定吗?", ok:"确定", cancel:"取消",
							callback:function(res){
								if(res){
									webix.$$("dt_user").remove(id);
								}
							}
						});
					}
				},
				pager:"para_pagerA"
			}
		]

	};

var pager = 	{
						view: "toolbar",
						css: "highlighted_header header6",
						paddingX:5,
						paddingY:5,
						height:40,
						cols:[{
							view:"pager", 
							id:"para_pagerA",
							template:"{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
							autosize:true,
							height: 35,
							group:5
						}]
					};
					
var grid_relation ={
		 view:"datatable",
		 id:"dt_userrole",
		rowHeight:_RowHeight,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{width:250,autoheight:false,scroll:true},
		resizeColumn:true,
		editable:true,
		select:true,
		navigation:true,
	 columns:[
	    {id:"_identify",header:"",hidden:true,width:30},
	    {id:"rolename",header:"角色",fillspace:1},
	    {id:"roletype",header:"角色类型",fillspace:1},
	    {id:"roledesc",header:"角色描述",fillspace:1},
	 ]
}
	var layout = {
		type: "line",
		rows:[
			titleBar,
			grid_user,
			pager,
			{view:"resizer"},
			grid_relation
		]

	};


	return {
		$ui: layout,
		$oninit:function(){
			var hasWriteAuth = checkWriteAuth();
				$$("dt_user").define("editable",hasWriteAuth);
				$$("dt_userrole").define("editable",hasWriteAuth);
				
				$$("editbutton").define("disabled",!hasWriteAuth);
				$$("addbutton").define("disabled",!hasWriteAuth);
						
			$$("dt_user").clearAll();
			$$("dt_user").parse(userobject.getUserList());
			
			webix.dp.$$("dt_user").attachEvent("onAfterInsert", function(response, id, object){
			    $$("dt_user").getItem(id)._identify = response;
				$$("dt_user").refresh();   
			}); 

			webix.dp.$$("dt_userrole").attachEvent("onAfterInsert", function(response, id, object){
			    $$("dt_userrole").getItem(id)._identify = response;
				$$("dt_userrole").refresh();   
			}); 
		}
	};

});