define([
	"data/prodobject",
	],
function(prodobject){
	 
	checkauthorization(false);
	
		var enddate = new Date();
		enddate.setDate(enddate.getDate()-7);
	    var regioncode = null;
	    
	var titleBar = {
			view:"toolbar",
			css: "highlighted_header header5",
			paddingX:0,
			paddingY:0,
			height:_ToolBarHeight,
			cols:[
				{view:"select",name:"brandcode", width:200,align: "left", label: '品牌',	labelWidth:60,
					options:urlstr+"/WBProdMng/getBrandList"},
			    {view:"select", id:"yearcode",name:"yearcode",width:200,align:"left", label:'年份',labelWidth:60,
			    		options:urlstr+"/WBProdMng/getYearList"},
			    	{view:"select", id:"seasoncode",name:"seasoncode",width:200,align:"left", label:'季节',labelWidth:60,
			    		options:urlstr+"/WBProdMng/getSeasonList"},
			    		
			    { view: "button", type: "iconButton", icon: "search", label: "查询", width: 70, 
				    click: function(){
				    	
				    	$$("dt_confskcinfo").showOverlay("正在加载......");
				    	
				    	var values =this.getParentView().getValues();
				    	
				    	var postData ={};
				    	if(values.brandcode != 'all') postData.BrandName=values.brandcode;
				    	if(values.yearcode != 'all') postData.YearName=values.yearcode;
				    	if(values.seasoncode != 'all') postData.SeasonName=values.seasoncode;
				    	
					$$("dt_confskcinfo").clearAll();
					$$("dt_confskcinfo").parse(prodobject.getProductList(postData));
				 }},
			    	 {},
			{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, 
			click:function(){webix.toExcel($$("dt_confskcinfo"));}},

		    ]
	};

	
	var grid = {
		margin:10,
		rows:[
			{
				view:"datatable", 
				id:"dt_confskcinfo",
				rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
				headermenu:{width:250,autoheight:false,scroll:true},
				editable:true,
				resizeColumn:true,
				select:true,
				navigation:true,
				leftSplit:3,
				save:urlstr+"/WBCURDMng/saveSKC",
				columns:[
					{ id:"_identify",header:"#", hidden:true},
					{ id:"rownum",header:"序号",sort:"int",width:50},
					{ id:"skccode",header:"款色", sort:"string",width:150,css:'bgcolor2'},
					{ id:"stylecode",header:"款式", sort:"string",width:100},
					{ id:"colorname",header:"颜色", sort:"string",width:50},
					{ id:"otherskucompname",header:"杯", sort:"string",fillspace:40},
					{ id:"brandname",header:"品牌", sort:"string",width:100},
					{ id:"yearname",header:"年份", sort:"string",width:60},
					{ id:"seasonname",header:"季节", sort:"string",width:60},
					{ id:"seasonstagename",header:"波段", sort:"string",width:60},
					{ id:"seriesname",header:"系列", sort:"string",width:100},
					{ id:"maintypename",header:"大类", sort:"string",width:100},
					{ id:"ticketprice",header:"吊牌价", sort:"string",width:100},
					{ id:"vcratio",header:"成本比例", sort:"float",width:100},
				],
				export: true,
				on: {
						onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");},
				},
//				pager:"confskc_pagerA"
			}
		]

	};

	var layout = {
		type: "line",
		rows:[
			titleBar,
			{
				rows:[
					grid,
				]
			}
		]

	};
	

	return {
		$ui: layout,
		$oninit:function(){
			if(!checkWriteAuth())
			{
				$$("dt_confskcinfo").define("editable",false);
			}
		}
	};

});