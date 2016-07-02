define([
	"data/resourceobject",
	"views/modules/modaladd/adddept",
	],
function(resourceobject,modaladd){
	
	checkauthorization(false);
	
  var titleBar = {
		view: "toolbar",
		id:"toolbar",
		css: "highlighted_header header5",
		paddingX:0,
		paddingY:0,
		height:_ToolBarHeight,
		cols:[
		   {  view: "label",label:"管理部门"},
			{},
			{  view: "button", type: "iconButton", icon: "refresh", label: "刷新",hidden:false, width: 80, 
			click: function(){
				$$("dt_Dept").clearAll();
				$$("dt_Dept").parse(resourceobject.getDeptList());
				}},
			{ view: "button",id:"editbutton", type: "iconButton", icon: "pencil-square-o", label: "编辑", width: 80,
			click:function(){
				$$('dt_Dept').define('editable',true);	
				$$('deletebutton').show();	
				$$('addbutton').show();
				$$('addbutton').refresh();	
				
				$$('toolbar').config.css="highlighted_header header4";
				$$('toolbar').reconstruct();
			}},
			{ view: "button", type: "iconButton", icon: "plus",id:"addbutton", label: "增加",hidden:false, width: 80, click: function(){this.$scope.ui(modaladd.$ui).show();}},
			{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, 
			click:function(){webix.toExcel($$("dt_Dept"));}},
		]
	};
	
	var grid_dept = {
		margin:10,
		rows:[
			{
				id:"dt_Dept",
				view:"datatable", 
				rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
				headermenu:{width:250,autoheight:false,scroll:true},
				resizeColumn:true,
				leftSplit:4,
				editable:true,
				navigation:true,
				select:"row",
				export:true,
				updateFromResponse:true,
				save:urlstr+"/WBCURDMng/saveDept",
				columns:[
					{id:"deletebutton", header:"&nbsp;",hidden:false, width:35, template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"},
					{id:"_identify", header:"ID",hidden:true, sort:"string",width:60},
					{id:"deptenabled", header:"启用", template:"{common.checkbox()}", sort:"string",fillspace:0.5},
					{id:"deptcode", header:["部门编号",{content:"textFilter"}], sort:"string",fillspace:1},
					{id:"deptname", header:"部门名", editor:"text", sort:"string",fillspace:1.5},
					{id:"depttype", header:["类型",{content:"selectFilter"}], editor:"text", sort:"string",fillspace:1,editor:"select",
					    options:[{id:"产前",value:"产前"},{id:"产中",value:"产中"}]},
					{id:"deptdesc", header:"备注", editor:"text", sort:"string",fillspace:2}

				],
				on: {
					onSelectChange:function(){
						var selRow = this.getSelectedItem();
						if(selRow){
						var PremzData = resourceobject.getDeptResource({DeptCode:selRow.deptcode,UserCode:_UserCode});
						$$("dt_DeptResource").clearAll();
						$$("dt_DeptResource").parse(PremzData);
						}
					}
				},
				onClick:{
					webix_icon:function(e,id,node){
						webix.confirm({
							text:"你将删除本条记录.<br/>确定吗?", ok:"确定", cancel:"取消",
							callback:function(res){
								if(res){
									webix.$$("dt_Dept").remove(id);
								}
							}
						});
					}
				},
			}
		]

	};

					
var grid_deptresource ={
	 view:"datatable",
	 id:"dt_DeptResource",
	 rowHeight:_RowHeight+5,
	 headerRowHeight:_HeaderRowHeight,
	headermenu:{width:250,autoheight:false,scroll:true},
	resizeColumn:true,
	editable:true,
	select:"row",
	header:true,footer:true,
	save:urlstr+"/WBCURDMng/saveDeptResource",
	 columns:[
	    	{id:"deletebutton", header:"&nbsp;",width:60, template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"},
	    {id:"_identify",header:"ID",hidden:true,width:30},
	    {id:"resenabled",header:"启用", template:"{common.checkbox()}", fillspace:0.5,footer:{text:"总计:", colspan:3}},
	    	{id:"rescode",header:"资源编号",fillspace:1,editor:"text"},
	    {id:"resname",header:"资源名称",fillspace:1,editor:"text"},
	    {id:"rescapacity",header:"资源产能",fillspace:1,editor:"text",footer:{ content:"summColumn" }},
	    {id:"resleadercode",header:"负责人编号",fillspace:1,editor:"text"},
	    {id:"resleadername",header:"负责人名称",fillspace:1},

	 ],
	 onClick:{
					webix_icon:function(e,id,node){
						webix.confirm({
							text:"你将删除本条记录.<br/>确定吗?", ok:"确定", cancel:"取消",
							callback:function(res){
								if(res){
									webix.$$("dt_DeptResource").remove(id);
								}
							}
						});
					}
				},
}

     /**
       * 
       * 部门资源-toolbar
       */
    	var toolbar_deptresource={ 
							view: "toolbar",
							css: "highlighted_header header4",
							paddingX:0,
							paddingY:0,
							height:_ToolBarHeight,
							cols:[
								{  view: "label",label:"管理部门资源信息"},
								{ view: "button",id:"editbutton2", type: "iconButton", icon: "pencil-square-o", label: "编辑", width: 80,
								click:function(){
									$$('dt_DeptResource').define('editable',true);	
									$$('addbutton2').show();
									$$('addbutton2').refresh();	
									
//									$$('toolbar2').config.css="highlighted_header header4";
//									$$('toolbar2').reconstruct();
								}},
								{ view: "button", type: "iconButton", icon: "plus",id:"addbutton2", label: "增加",hidden:false, width: 80, click: function(){this.$scope.ui(modaladd.$ui).show();}},
								
							]
			};
		
	var layout = {
		type: "line",
		rows:[
			titleBar,
			grid_dept,
			{view:"resizer"},
			toolbar_deptresource,
			grid_deptresource
		]

	};


	return {
		$ui: layout,
		$oninit:function(){

			var hasWriteAuth = checkWriteAuth();

				$$("dt_Dept").define("editable",hasWriteAuth);
				$$("dt_DeptResource").define("editable",hasWriteAuth);
				
				$$("editbutton").define("disabled",!hasWriteAuth);
				$$("addbutton").define("disabled",!hasWriteAuth);
			
				$$("dt_Dept").clearAll();
				$$("dt_Dept").parse(resourceobject.getDeptList());
			
			webix.dp.$$("dt_Dept").attachEvent("onAfterInsert", function(response, id, object){
			    $$("dt_Dept").getItem(id)._identify = response;
				$$("dt_Dept").refresh();   
			}); 

			webix.dp.$$("dt_DeptResource").attachEvent("onAfterInsert", function(response, id, object){
			    $$("dt_DeptResource").getItem(id)._identify = response;
				$$("dt_DeptResource").refresh();   
			}); 
		}
	};

});