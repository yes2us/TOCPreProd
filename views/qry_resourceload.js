define([
	"data/projectobject",
	],
function(projectobject){
	
	checkauthorization(false);
     
	var grid_deptload = {
		rows:[
		    		{
					view: "toolbar",
					css: "highlighted_header header5",
					paddingX:0,
					paddingY:0,
					height:_ToolBarHeight,
					cols:[
							{  view: "label",label:"部门负荷"},					
					]
				},
				{
					view:"datatable", 
					id:"dt_deptload",
//					maxHeight:300,
					rowHeight:_RowHeight,
					headerRowHeight:_HeaderRowHeight,
					headermenu:{width:250,autoheight:false,scroll:true},
					resizeColumn:true,
					select:"row",
					navigation:true,
					url:urlstr+"/WBProjectMng/getProjectNodeStatcs",
					columns:[
					    {id:"belongdeptcode",header:"部门编号",width:100,hidden:true},
					    {id:"belongdeptname",header:"部门",fillspace:2},
					    {id:"ordercount",header:"总订单",fillspace:1},
					    {id:"notstartcount",header:"未启动",fillspace:1},
					    	{id:"blackcount",header:"黑单",fillspace:1},
					    {id:"redcount",header:"红单",fillspace:1},
					    {id:"yellowcount",header:"黄单",fillspace:1},
					    {id:"greencount",header:"绿单",fillspace:1},
					    {id:"bluecount",header:"蓝单",fillspace:1},
					],
				}
		]};

var grid_staffload = {
		rows:[
		    		{
					view: "toolbar",
					css: "highlighted_header header5",
					paddingX:0,
					paddingY:0,
					height:_ToolBarHeight,
					cols:[
							{  view: "label",label:"员工负荷"},					
					]
				},
				{
					view:"datatable", 
					id:"dt_staffload",
					rowHeight:_RowHeight,
					headerRowHeight:_HeaderRowHeight,
					headermenu:{width:250,autoheight:false,scroll:true},
					resizeColumn:true,
					select:"row",
					navigation:true,
					url:urlstr+"/WBProjectMng/getStaffNodeStatcs",
					columns:[
					    {id:"nodeleadercode",header:"部门",width:100,hidden:true},
					    {id:"nodeleadername",header:"部门",fillspace:2},
					    {id:"ordercount",header:"总订单",fillspace:1},
					    {id:"notstartcount",header:"未启动",fillspace:1},
					    {id:"blackcount",header:"黑单",fillspace:1},
					    {id:"redcount",header:"红单",fillspace:1},
					    {id:"yellowcount",header:"黄单",fillspace:1},
					    {id:"greencount",header:"绿单",fillspace:1},
					    {id:"bluecount",header:"蓝单",fillspace:1},
					],
				}
		]};

	var layout = {
		type: "line",
		rows:[
			  {cols:[grid_deptload,{ template: "<div id='chartid140' style='margin:0 auto;'></div>"}]},  	  
			  {cols:[grid_staffload,{ template: "<div id='chartid141' style='margin:0 auto;'></div>"}]},  	  
			]
	};
	

	return {
		$ui: layout,
		$oninit:function(){
				$$("dt_deptload").attachEvent("onSelectChange",function(){
			   		var selRow = this.getSelectedItem();
					if(!selRow)	return;
					
					projectobject.getNodeRGBStatcs({DeptCode:selRow.belongdeptcode}).then(function(response){
						 if(response) drawResLoad('chartid140',response.json(),'部门负荷');
					});
					
				});
				
				$$("dt_staffload").attachEvent("onSelectChange",function(){
			   		var selRow = this.getSelectedItem();
					if(!selRow)	return;
				
					projectobject.getNodeRGBStatcs({StaffCode:selRow.nodeleadercode}).then(function(response){
						 if(response) drawResLoad('chartid141',response.json(),'人员负荷');
					});
					
				});
		}
	};

});