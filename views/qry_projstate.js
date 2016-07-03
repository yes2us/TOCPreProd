define([
	"data/projectobject",
	],
function(projectobject){
	
	checkauthorization(false);
     
	var grid_project = {
		rows:[
		    		{
					view: "toolbar",
					css: "highlighted_header header5",
					paddingX:0,
					paddingY:0,
					height:_ToolBarHeight,
					cols:[
								{  view: "button", type: "iconButton", icon: "refresh", label: "刷新",hidden:false, width: 80, 
								click: function(){
								$$("dt_project130").clearAll();
								$$("dt_project130").parse(projectobject.getProjectList({}));
									}},
							{  view: "label",label:"管理路径"},					
					]
				},
				{
					view:"datatable", 
					id:"dt_project130",
//					maxHeight:300,
					rowHeight:_RowHeight,
					headerRowHeight:_HeaderRowHeight,
					headermenu:{width:250,autoheight:false,scroll:true},
					resizeColumn:true,
					editable:true,
					select:"row",
					navigation:true,
					save:urlstr+"/WBCURDMng/saveProject",
					columns:[
						{id:"deletebutton", header:"&nbsp;",hidden:false, width:35, template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"},
						{id:"_identify",header:"",width:30,hidden:true},
					    	{id:"bufferstate",header:"缓冲状态",width:60,sort:"float"},	
					    	{id:"projectenabled",header:"有效状态",width:60,template:"{common.checkbox()}"},
					    	
					    	{id:"projecttype",header:["类型",{content:"selectFilter"}],width:60},	
					    {id:"projectcode",header:"项目编号",width:100},
					    	{id:"taskobjectcode",header:["订单号",{content:"textFilter"}],width:100},
					    	{id:"skccode",header:["款色",{content:"textFilter"}],width:150},
					    	{id:"orderqty",header:"订单数量",width:85},
					    
					    	{id:"initduedate",header:"交付日期",width:90,editor:"date",css:'bgcolor1'},

					],
					onClick:{
					webix_icon:function(e,id,node){
						webix.confirm({
							text:"你将删除本条记录.<br/>确定吗?", ok:"确定", cancel:"取消",
							callback:function(res){
								if(res){
										projectobject.deleteProjectNode($$("dt_project130").getItem(id).projectcode);
										webix.$$("dt_project130").remove(id);
									}
								}
							});
						}
					}
				}
		]};


	var layout = {
		type: "line",
		rows:[
			  {cols:[grid_project,
			  	{rows:[
			  	{ template: "<div id='chartid130' style='margin:0 auto;'></div>",maxHeight:250},	
			  	{ template: "<input id='width' type='range' value='500' min='100' max='1000' />",maxHeight:20},
			  	]
			  	}]},
		   	  { template: "<div id='chartid131' style='margin:0 auto;height:420px'></div>"},	  	  
			]
	};
	

	return {
		$ui: layout,
		$oninit:function(){
			
			$('#width').bind('input', function () {
			        $('#chartid130').highcharts().setSize(this.value, 400, false);
			});
    
			$$("dt_project130").clearAll();
			$$("dt_project130").parse(projectobject.getProjectList({}));
			
			
			$$("dt_project130").attachEvent("onSelectChange",function(){
			   		var selRow = this.getSelectedItem();
					if(!selRow)	return;
					
              		projectobject.getProjectObj(selRow.projectcode).then(function(response){
              			 if(response){
              			 	projObj = response.json();
              			 	drawFeverChart('chartid130',projObj); 
              				drawProjectNode('chartid131',projObj,6); 	
              			 }
              		});
              		
		   });

		}
	};

});