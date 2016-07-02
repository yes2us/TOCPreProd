define([
	"data/moduleobject",
	"views/modules/modaladd/addwbmodule"
	],
function(moduleobject,modaladd){
	
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
				$$("dt_wbmodule").clearAll();
				$$("dt_wbmodule").parse(moduleobject.getModuleList());
				}},
			{},
			{ view: "button", id:"editbutton",type: "iconButton", icon: "pencil-square-o", label: "编辑", width: 80,
			click:function(){
				$$('dt_module').define('editable',true);	
				$$('deletebutton').show();	
				$$('addbutton').show();
				$$('addbutton').refresh();	
				
				$$('toolbar').config.css="highlighted_header header4";
				$$('toolbar').reconstruct();
			}},
			{ view: "button", type: "iconButton", icon: "plus",id:"addbutton", label: "增加",hidden:false, width: 80, click: function(){this.$scope.ui(modaladd.$ui).show();}},
			{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, 
			click:function(){webix.toExcel($$("dt_wbmodule"));}},
		]
	};
	
	var grid_wbmodule = {
		margin:10,
		rows:[
			{
				view:"datatable", 
				id:"dt_wbmodule",
				rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
				headermenu:{width:250,autoheight:false,scroll:true},
				resizeColumn:true,
				editable:true,
				select:true,
				navigation:true,
				updateFromResponse:true,
				save:urlstr+"/WBCURDMng/saveModule",
				columns:[
						{id:"deletebutton", header:"&nbsp;",hidden:false, width:35, template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"},
					  	{id:"_identify",header:"",hidden:true,width:30},
					    {id:"parentmoduleid",header:"父级模块ID",width:200,sort:"string",editor:"text"},
					    	{id:"modulelevel",header:["模块级别",{content:"textFilter"}],width:100,editor:"text"},
					    {id:"moduleid",header:"模块ID",width:200,editor:"text"},
					    {id:"modulename",header:"模块名称",width:100,editor:"text"},
					    {id:"moduleicon",header:"模块图标",width:150,editor:"text"},
					    	{id:"moduledesc",header:"模块描述",fillspace:1,editor:"text"},
				],
				on: {
					onSelectChange:function(){
						var selRow = this.getSelectedItem();
						if(selRow){
						var PremzRelData = moduleobject.getSubModuleList(selRow.moduleid);
						$$("dt_subwbmodule").clearAll();
						$$("dt_subwbmodule").parse(PremzRelData);
						}
					}
				},
				onClick:{
					webix_icon:function(e,id,node){
						webix.confirm({
							text:"你将删除本条记录.<br/>确定吗?", ok:"确定", cancel:"取消",
							callback:function(res){
								if(res){
									webix.$$("dt_wbmodule").remove(id);
								}
							}
						});
					}
				},
//				pager:"para_pagerA"
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
		margin:10,
	 rows:[{
				view:"datatable",
				id:"dt_subwbmodule",
	 			rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
				headermenu:{width:250,autoheight:false,scroll:true},
				resizeColumn:true,
				editable:true,
				select:true,
				navigation:true,
	 columns:[
	    	{id:"delete", header:"&nbsp;",hidden:false, width:60, template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"},
	    {id:"_identify",header:"",hidden:true,width:30},
	    {id:"moduleid",header:"模块ID",fillspace:1},
	    {id:"modulename",header:"模块名称",fillspace:1},
	    {id:"moduedesc",header:"模块描述",fillspace:1},
	 ],
	 onClick:{
					webix_icon:function(e,id,node){
						webix.confirm({
							text:"你将删除本条记录.<br/>确定吗?", ok:"确定", cancel:"取消",
							callback:function(res){
								if(res){
									webix.$$("dt_subwbmodule").remove(id);
								}
							}
						});
					}
				},
	}]
};

	var layout = {
		type: "line",
		rows:[
			titleBar,
			grid_wbmodule,
//			pager,
			{view:"resizer"},
			grid_relation
		]

	};


	return {
		$ui: layout,
		$oninit:function(){
			var hasWriteAuth = checkWriteAuth();
				$$("dt_wbmodule").define("editable",hasWriteAuth);
				$$("dt_subwbmodule").define("editable",hasWriteAuth);
				
				$$("editbutton").define("disabled",!hasWriteAuth);
				$$("addbutton").define("disabled",!hasWriteAuth);

			
			$$("dt_wbmodule").clearAll();
			$$("dt_wbmodule").parse(moduleobject.getModuleList());
			
			webix.dp.$$("dt_wbmodule").attachEvent("onAfterInsert", function(response, id, object){
			    $$("dt_wbmodule").getItem(id)._identify = response;
				$$("dt_wbmodule").refresh();   
			}); 
		}
	};

});