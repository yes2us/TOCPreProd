define([
	"data/billobject"
], function(billobject){

	checkauthorization(false);

	var TargetTable="ExportRepPlan";
	var PageIndex = 1;
	var startDate = new Date(new Date().toString("yyyy/M/d"));
	var endDate  = startDate;

	
	function showDatatable(){
		$$("dt_ExportRepPlan").hide();
		$$("dt_ExportMovPlan").hide();
		$$("dt_"+TargetTable).show();
		if(TargetTable=="ExportRepPlan")
		{
			$$("bottomtoolbar").hide();
		}
		else
		{
			$$("bottomtoolbar").show();
		}
	};

	function loadData(){
		var postData={StartDate:startDate,EndDate:endDate};
		if(TargetTable=="ExportRepPlan")
		{
			postData.PlanType='自动补货';
			$$("dt_ExportRepPlan").clearAll();
			$$("dt_ExportRepPlan").showOverlay("正在加载......");
			$$("dt_ExportRepPlan").parse(webix.ajax().post(urlstr+"/WBBillMng/getExportRepBill",postData));
		}
		else
		{
			postData.DealState='未处理';
			postData._string = "PlanType not in ('自动补货','自动退货')";
			$$("dt_ExportMovPlan").clearAll();
			$$("dt_ExportMovPlan").parse(webix.ajax().post(urlstr+"/WBBillMng/getMovSKUPlanItem",postData));			
		}
	};
	
	var exportForm={
		view: "toolbar",
		css: "highlighted_header header5",
//		paddingX:2,
//		paddingY:2,
		height:_ToolBarHeight,
		cols:[
			{
				 	view:"segmented", value:"ExportRepPlan", label:"",inputWidth:150,
					options:[{ id:"ExportRepPlan", value:"补货单"},{ id:"ExportMovPlan", value:"调拨单"}],
					click:function(){
						TargetTable = this.getValue();
						showDatatable();
					}
			},
			{view:"datepicker", id:"startdate_input",label:"开始日期",value:startDate,
					 on:{onChange:function(newdate,olddate){startDate = newdate;}}},
			{view:"datepicker", id:"enddate_input",label:"结束日期",value:endDate,
					 on:{onChange:function(newdate,olddate){endDate = newdate;}}},
			{view:"button",value:"查询",width:100,click:function(){loadData();}},
			{},
			{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, 
				click:function(){
					var targeturl= urlstr+"/WBBillMng/getExportRepBill/CSV/1/StartDate/"+startDate+"/EndDate/"+endDate;
					window.open(targeturl, "_blank");
				}
			}
			]
	};
	
	
	var grid_ExportRepPlan = 
			{
				id:"dt_ExportRepPlan",
				view:"datatable",
				rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
				select:true,
				leftSplit:10,
				export:true,
				navigation:true,
				footer:true, header:true,
				headermenu:{width:250,autoheight:false,scroll:true},
				columns:[					
					{ id:"rownum",header:"",sort:"int",width:60,footer:{text:"总计:", colspan:1}},
					{id:"补货日期", header:"补货日期", sort:"string", width:100},
					{id:"老供应商", header:"老供应商", sort:"string", width:85,hidden:true},	
					{id:"类型", header:"类型", sort:"string", width:60,hidden:true},	
					{id:"pmc", header:"PMC", sort:"string", width:60,hidden:true},	
					{id:"老工厂", header:["门店",{content:"textFilter"}], sort:"string", width:75},	
					{id:"0001", header:"0001", sort:"string", width:60,hidden:true},	
					{id:"单据类型", header:"单据类型", sort:"string", width:85,hidden:true},	
					{id:"商品号", header:["商品号",{content:"textFilter"}], sort:"string", width:100},	
					{id:"款杯色", header:["款杯色",{content:"textFilter"}], sort:"string", width:140},	
					{id:"总仓在手", header:"总仓在手", sort:"string", width:85},	
					{id:"目标库存", header:"目标库存", sort:"string", width:85},	
					{id:"门店在手", header:"门店在手", sort:"string", width:85},	
					{id:"门店在途", header:"门店在途", sort:"string", width:85},	
					{id:"门店四周销售", header:"门店四周销售", sort:"string", width:85},	
					{id:"补货件数", header:"补货件数", sort:"int",width:85,footer:{ content:"summColumn"}},
				],
				on:{onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");},}
			};
	
	var grid_ExportMovPlan = 
			{
				id:"dt_ExportMovPlan",
				view:"datatable",
				rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
				select:true,
				export:true,
				navigation:true,
				save:urlstr+"/WBCURD/saveMovSKUPlan",
				headermenu:{width:250,autoheight:false,scroll:true},
				footer:true, header:true,
				columns:[					
					{ id:"rownum",header:"",sort:"int",width:60,footer:{text:"总计:", colspan:1}},
				    	{id:"_identify", header:"#",hidden:true},
				    	{id:"checkbox",header:"选择",template:"{checkbox}"},
					{id:"makedate", header:"日期", sort:"string", fillspace:1},
					{id:"srcpartycode", header:"出货仓编号", sort:"string", fillspace:1},
					{id:"srcpartyname", header:"出货仓库", sort:"string", fillspace:1},
					{id:"trgpartycode", header:"接收仓编号", sort:"string", fillspace:1},
					{id:"trgpartyname", header:"接收仓库", sort:"string", fillspace:1},
					{id:"skucode", header:"SKU", sort:"string", fillspace:1},	
					{id:"movqty", header:"数量", sort:"int",fillspace:1},
					{id:"dealstate", header:"状态", sort:"string",fillspace:1,footer:{ content:"summColumn"}}
				],
				on:{onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");},}
			};
			

	var bottomToolbar = {
		view: "toolbar",
		id:'bottomtoolbar',
		css: "highlighted_header header5",
//		paddingX:2,
//		paddingY:2,
		height:_ToolBarHeight,
		cols:[		 
			{ view: "checkbox", label: "全选",id:"chkall",value:false,width:130,labelWidth:50},

			{ view: "button",id:"bndelete", type: "iconButton", icon: "times", label: "删除", width: 70,height:40,
				click: function(){
					 $$("dt_ExportMovPlan").eachRow(function(rowid){
					 	var row = $$("dt_ExportMovPlan").getItem(rowid);
					 	if(row.checkid) $$("dt_ExportMovPlan").remove(row.id);
					 });
					 webix.message("删除成功！");
				}
			},
			{ view: "button", id:'bnedit',type: "iconButton", icon: "edit", label: "处理", width: 70,height:40,
				click: function(){
					 $$("dt_ExportMovPlan").eachRow(function(rowid){
					 	var row = $$("dt_ExportMovPlan").getItem(rowid);
					 	if(row.checkid) {row.dealstate='已处理';$$("dt_ExportMovPlan").updateItem(row.id,row);}
					 });
					 webix.message("修改成功！");
				}
			},			
			{},

		]
	};
	
	var layout = {
		type: "line",
		rows:[exportForm,grid_ExportRepPlan,grid_ExportMovPlan,bottomToolbar]
	};

	return {
		$ui: layout,
		$oninit:function(){
			if(!checkWriteAuth()){
				$$("chkall").define("disabled",true);
				$$("bndelete").define("disabled",true);
				$$("bnedit").define("disabled",true);
			}
			
			$$("dt_ExportRepPlan").show();
			$$("dt_ExportMovPlan").hide();
			$$("bottomtoolbar").hide();
		}
	};

});