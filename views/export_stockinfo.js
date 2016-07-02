define([
	"data/stockobject",
	],
function(stockobject){
	 var bizUnitCode;
	 var TargetTable = "HTarget";
	 
	checkauthorization(false);
	
	function showDatatable(){
		$$("dt_HTarget").hide();
		$$("dt_VTarget").hide();
		$$("dt_"+TargetTable).show();

	};
	
	function loadData(){
		$$("dt_"+TargetTable).showOverlay("正在载入...");
		$$("dt_"+TargetTable).clearAll();
		var values = $$("toolbar_exportstock").getValues();
		
		var postData = {UserCode:_UserCode};
		if(values.storeCode && values.storeCode.indexOf('all')<0 && values.storeCode !="") 
			postData.WHCode=values.storeCode;
		else if(values.branchCode && values.branchCode.indexOf('all')<0  && values.branchCode !="") 
			postData.BranchCode=values.branchCode;
		else if(values.bizUnitCode && values.bizUnitCode.indexOf('all')<0  && values.bizUnitCode !="")  
		postData.BizUnitCode = values.bizUnitCode;
						
		if(TargetTable==="HTarget")
			$$("dt_"+TargetTable).parse(stockobject.getFGWHCrossTSInfo(postData));	
		else
			$$("dt_"+TargetTable).parse(stockobject.getFGWHTSInfo(postData));	
		
	};
	
	var titleBar = {
			view:"toolbar",
			id:"toolbar_exportstock",
			css: "highlighted_header header5",
			paddingX:0,
			paddingY:0,
			height:_ToolBarHeight,
			cols:[
				{
					 view:"segmented", value:"HTarget", label:"",inputWidth:150,
						options:[{ id:"HTarget", value:"横表"},{ id:"VTarget", value:"竖表"}],
						click:function(){
							TargetTable = this.getValue();
							showDatatable();
						}
				},
				{view:"multiselect",name:"bizUnitCode", width:150,align: "left", label: '事业部',labelWidth:60,
				options:urlstr+"/WBPartyMng/getBizUnitList/UserCode/"+_UserCode,
				on:{
					onChange:function(newv,oldv){
						if(newv)
						{
								bizUnitCode = newv;
								if(newv.indexOf('all')>=0)
								$$("branchCode").define('options',urlstr+"/WBPartyMng/getBranchList/UserCode/"+_UserCode);
								else
								$$("branchCode").define('options',urlstr+"/WBPartyMng/getBranchList/BizUnitCode/"+newv+"/UserCode/"+_UserCode);
						}
					}
				}
				},
			    {view:"multiselect", id:"branchCode",name:"branchCode",width:150,align: "left", label: '办事处',labelWidth:60,
			    options:[],
			    	on:{
						onChange:function(newv,oldv){
							if(newv)
							{
								if(newv.indexOf('all')>=0)
								$$("storeCode").define('options',urlstr+"/WBPartyMng/getBlgRelPartyList/BizUnitCode/"+bizUnitCode+"/UserCode/"+_UserCode);
								else
								$$("storeCode").define('options',urlstr+"/WBPartyMng/getBlgRelPartyList/BizUnitCode/"+bizUnitCode+"/BranchCode/"+newv+"/UserCode/"+_UserCode);
							}
						}
					}
			    },
			    {view:"multiselect", id:"storeCode",name:"storeCode",width:250,align: "left", label: '门店',	labelWidth:60,options:[]},
			    
			    { view: "button", type: "iconButton", icon: "search", label: "查询", width: 70,
				    click: function(){
				    	loadData();
				 }},
			    {},
			{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, 
			click:function(){

						var targeturl=null;
						var values =this.getParentView().getValues();
						var _s = TargetTable === "HTarget"?  "getFGWHCrossTSInfo":"getFGWHTSInfo";
						if(values.storeCode && values.storeCode.indexOf('all')<0)
							targeturl= urlstr+"/WBStockMng/"+_s+"/CSV/1/WHCode/"+values.storeCode+"/UserCode/"+_UserCode;
						else
						{
							if(values.branchCode && values.branchCode.indexOf('all')<0)
								targeturl= urlstr+"/WBStockMng/"+_s+"/CSV/1/BranchCode/"+values.branchCode+"/UserCode/"+_UserCode;
							else
							{
								if(values.bizUnitCode && values.bizUnitCode.indexOf('all')<0)
								targeturl= urlstr+"/WBStockMng/"+_s+"/CSV/1/BizUnitCode/"+values.bizUnitCode+"/UserCode/"+_UserCode;
								else
								targeturl= urlstr+"/WBStockMng/"+_s+"/CSV/1/UserCode/"+_UserCode;
								
							}
						}
								window.open(targeturl,"_blank");
					
			}},
		    ]
	};

	
	var grid_HTarget = 
			{
				id:"dt_HTarget",
				view:"datatable", 
				rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
				headermenu:{width:250,autoheight:false,scroll:true},
				resizeColumn:true,
				editable:false,
				select:true,
				navigation:true,
				leftSplit:3,
				export: true,
				footer:true, header:true,
				columns:[
					{ id:"rownum",header:"",sort:"int",width:60,footer:{text:"总计:", colspan:1}},
					{ id:"partycode",header:["客户号",{content:"textFilter"}], sort:"string",width:60,css:"bgcolor2"},
				    	{ id:"skccode",header:["款色",{content:"textFilter"}],width:120},

//					{ id:"partyname",header:"门店", sort:"string",width:120,css:"bgcolor2"},
					{ id:"saletype",header:["销售分类",{content:"selectFilter"}], sort:"string",width:60},
					{ id:"lifestage",header:["新旧",{content:"selectFilter"}], sort:"string",width:60},
					{ id:"maintypename", header:["大类",{content:"selectFilter"}], width:60},
					{ id:"onshelfdays",header:"到仓天数", sort:"int",width:60},
					
					{ id:"stock1",header:[{ content:"columnGroup", closed:false, batch:"stock",
							groupText:"库存", colspan:9, width: 45},"65/S/3"],sort:"int",width:60,footer:{ content:"summColumn" }},
					{ id:"stock2",batch:"stock",header:[null,"70/M/5"], sort:"int",width:45,footer:{ content:"summColumn" }},
					{ id:"stock3",batch:"stock",header:[null,"75/L/7"], sort:"int",width:45,footer:{ content:"summColumn" }},
					{ id:"stock4",batch:"stock",header:[null,"80/XL/9/EL"], sort:"int",width:45,footer:{ content:"summColumn" }},
					{ id:"stock5",batch:"stock",header:[null,"85/2XL/11/EEL"], sort:"int",width:45,footer:{ content:"summColumn" }},
					{ id:"stock6",batch:"stock",header:[null,"90/3XL/13/EEEL"], sort:"int",width:45,footer:{ content:"summColumn" }},
					{ id:"stock7",batch:"stock",header:[null,"95/4XL/15"], sort:"int",width:45,footer:{ content:"summColumn" }},
					{ id:"stock8",batch:"stock",header:[null,"100/FREE"], sort:"int",width:45,footer:{ content:"summColumn" }},
					{ id:"stock9",batch:"stock",header:[null,"105/XS"], sort:"int",width:45,footer:{ content:"summColumn" }},

					
					{ id:"target1",header:[{ content:"columnGroup", closed:false, batch:"target",
							groupText:"目标库存", colspan:9, width: 45},"65/S/3"],sort:"int",width:60,footer:{ content:"summColumn" }},
					{ id:"target2",batch:"target",header:[null,"70/M/5"], sort:"int",width:45,footer:{ content:"summColumn" }},
					{ id:"target3",batch:"target",header:[null,"75/L/7"], sort:"int",width:45,footer:{ content:"summColumn" }},
					{ id:"target4",batch:"target",header:[null,"80/XL/9/EL"], sort:"int",width:45,footer:{ content:"summColumn" }},
					{ id:"target5",batch:"target",header:[null,"85/2XL/11/EEL"], sort:"int",width:45,footer:{ content:"summColumn" }},
					{ id:"target6",batch:"target",header:[null,"90/3XL/13/EEEL"], sort:"int",width:45,footer:{ content:"summColumn" }},
					{ id:"target7",batch:"target",header:[null,"95/4XL/15"], sort:"int",width:45,footer:{ content:"summColumn" }},
					{ id:"target8",batch:"target",header:[null,"100/FREE"], sort:"int",width:45,footer:{ content:"summColumn" }},
					{ id:"target9",batch:"target",header:[null,"105/XS"], sort:"int",width:45,footer:{ content:"summColumn" }},
				],
				export: true,
				on: {
					onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");},
				},
	};


var grid_VTarget = {
		view:"datatable",
		id:"dt_VTarget",
		rowHeight:_RowHeight,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{width:250,autoheight:false,scroll:true},
		resizeColumn:true,
		navigation:true,
		leftSplit:4,
		editable:true,
		select: true,
		footer:true, header:true,
		columns:[
			{ id:"_identify",header:"#",width:35,hidden:true},
		
			{ id:"rownum",header:"",sort:"int",width:50,footer:{text:"总计:", colspan:1}},
			{ id:"partycode",	header:["门店",{content:"selectFilter"}], sort:"string",width:70,css:"bgcolor2"},
			{ id:"skucode",	header:["SKU",{content:"textFilter"}], sort:"string",width:100,css:"bgcolor2"},
			
			{ id:"skccode",	header:["款色",{content:"textFilter"}], sort:"string",width:150},
			{ id:"colorname",header:"颜色", sort:"string",width:100},
			{ id:"sizename",	header:"尺码", sort:"string",width:60},
			
			{ id:"pricetype",	header:["价格类别",{content:"selectFilter"}], sort:"string",width:85},
			{ id:"seriesname",header:["系列",{content:"selectFilter"}], sort:"string",width:100},
			{ id:"maintypename",	header:["大类",{content:"selectFilter"}], sort:"string",width:100},
			
			{ id:"targetqty",	header:["目标库存",{content:"numberFilter"}],sort:"int", width:100,editor:"text",css:"bgcolor1",footer:{ content:"summColumn" }},
			{ id:"stockqty",	header:["实际库存",{content:"numberFilter"}],sort:"int", width:100,footer:{ content:"summColumn" }},
			{ id:"sugrepqty",	header:["理论补退",{content:"numberFilter"}],sort:"int",align:"right", width:100,footer:{ content:"summColumn" }}
		],
		on:{onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");}}
	};
	
	var layout = {
		type: "line",
		rows:[
			titleBar,
			grid_HTarget,
			grid_VTarget
		]

	};
	

	return {
		$ui: layout,
		$oninit:function(){
			showDatatable();
		}
	};

});