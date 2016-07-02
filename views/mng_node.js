define([
	"data/resourceobject",
	"views/modules/modaladd/addnode"
	],
function(resourceobject,modaladd){
	
	checkauthorization(false);
	
	      var popup = webix.ui({
            view:"gridsuggest",
            body:{
            	   id:'popupid101',
            	   scroll:true,
            	   autoheight:false,
            	   autofocus:true,
               yCount:10,
               rowHeight:_RowHeight,
			   headerRowHeight:_HeaderRowHeight,
			   url:urlstr+"/WBResourceMng/getPopupDeptList",
                columns:[
                    {id:"id", header:["部门编号",{content:"textFilter"}], width:100},
                    {id:"deptname", header:"节点名称", width:120},
                ]
            }
        });
        
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
				$$("dt_Node").clearAll();
				$$("dt_Node").parse(resourceobject.getNodeList());
				}},
			{},
			{ view: "button",id:"bn_EditNode", type: "iconButton", icon: "pencil-square-o", label: "编辑", width: 80,
			click:function(){
				$$('deletebutton').show();	
				$$('bn_AddNode').show();
				$$('bn_AddNode').refresh();	
				
				$$('toolbar').config.css="highlighted_header header4";
				$$('toolbar').reconstruct();
			}},
			{ view: "button", type: "iconButton", icon: "plus",id:"bn_AddNode", label: "增加",hidden:false, width: 80, click: function(){this.$scope.ui(modaladd.$ui).show();}},
			{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, 
			click:function(){webix.toExcel($$("dt_Node"));}},
		]
	};
	
	var grid_Node = {
		margin:10,
		rows:[
			{
				view:"datatable", 
				id:"dt_Node",
				rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
				headermenu:{width:250,autoheight:false,scroll:true},
				resizeColumn:true,
				editable:true,
				select:true,
				navigation:true,
				leftSplit:5,
				save:urlstr+"/WBCURDMng/saveNode",
				updateFromResponse:true,
				columns:[
	    				{id:"_identify",header:"ID",hidden:true,width:30},
					{id:"deletebutton", header:"&nbsp;",hidden:false, width:35, template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"},
					{id:"nodeenabled", header:"启用", template:"{common.checkbox()}", sort:"string",width:50},
					{id:"nodecode", header:"节点编号", sort:"string",width:85,css:'bgcolor1'},
					{id:"nodename", header:"节点名", editor:"text", sort:"string",width:85,css:'bgcolor1'},
					{id:"nodetype", header:"节点类型", editor:"select",options:_NodeType,sort:"string",width:90,css:'bgcolor1'},
					{id:"belongdeptcode", header:"部门编号", editor:"text", sort:"string",width:85,editor:"richselect", popup:popup,css:'bgcolor1'},
					{id:"belongdeptname", header:"部门名称", editor:"text", sort:"string",width:85},
					{id:"nnnetproctime", header:"净处理时间", width:85,css:'bgcolor1'},
                     {id:"nnbuffertime", header:"缓冲时间", width:85,css:'bgcolor1'},
                     {id:"nnstateupdatefreq", header:"更新间隔", width:85,css:'bgcolor1'},
					{id:"nodeorder", header:"节点次序", editor:"text", sort:"string",width:85,css:'bgcolor1'},
					{id:"isnodeccr", header:"是否瓶颈", template:"{common.checkbox()}", sort:"string",width:85},
					{id:"isnodestatcs", header:"是否统计", template:"{common.checkbox()}", sort:"string",width:85},
					{id:"statcsway", header:"统计方式", editor:"select",
					options:[{id:"Total",value:"统计总量"},{id:"Detail",value:"统计明细"}],width:85,css:'bgcolor1'},
					{id:"statcscondition", header:"统计条件", editor:"select",
					options:[{id:"PNS",value:"前节点启动"},{id:"PNF",value:"前节点完成"}],width:100,css:'bgcolor1'},
					{id:"nodedesc", header:"节点描述", editor:"text", sort:"string",width:120,css:'bgcolor1'},
					
				],
				onClick:{
					webix_icon:function(e,id,node){
						webix.confirm({
							text:"你将删除本条记录.<br/>确定吗?", ok:"确定", cancel:"取消",
							callback:function(res){
								if(res){
									webix.$$("dt_Node").remove(id);
								}
							}
						});
					}
				},
			}
		]

	};

					
	var layout = {
		type: "line",
		rows:[
			titleBar,
			grid_Node,
		]

	};


	return {
		$ui: layout,
		$oninit:function(){
			var hasWriteAuth = checkWriteAuth();
				$$("dt_Node").define("editable",hasWriteAuth);
				
				$$("bn_EditNode").define("disabled",!hasWriteAuth);
				$$("bn_AddNode").define("disabled",!hasWriteAuth);
						
			$$("dt_Node").clearAll();
			$$("dt_Node").parse(resourceobject.getNodeList());
			
			webix.dp.$$("dt_Node").attachEvent("onAfterInsert", function(response, id, object){
			    $$("dt_Node").getItem(id)._identify = response;
				$$("dt_Node").refresh();   
			}); 

		}
	};

});