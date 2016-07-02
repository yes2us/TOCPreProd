define([
	"data/orderobject",
	],
function(orderobject){
	 
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
				    	
				    	$$("dt_preprodorder").showOverlay("正在加载......");
				    	
				    	var values =this.getParentView().getValues();
				    	
				    	var postData ={};
				    	if(values.brandcode != 'all') postData.BrandName=values.brandcode;
				    	if(values.yearcode != 'all') postData.YearName=values.yearcode;
				    	if(values.seasoncode != 'all') postData.SeasonName=values.seasoncode;
				    	
					$$("dt_preprodorder").clearAll();
					$$("dt_preprodorder").parse(orderobject.getProProdOrder(postData));
				 }},
			    	 {},
			{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, 
			click:function(){webix.toExcel($$("dt_preprodorder"));}},

		    ]
	};
				
	var grid = {
		margin:10,
		rows:[
			{
				view:"datatable", 
				id:"dt_preprodorder",
				rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
				headermenu:{width:250,autoheight:false,scroll:true},
				editable:true,
				resizeColumn:true,
				select:true,
				navigation:true,
				leftSplit:5,
				save:urlstr+"/WBCURDMng/savePreProdOrder",
				columns:[
					{ id:"_identify",header:"#", hidden:true},
					{ id:"rownum",header:"序号",sort:"int",width:60},
					{ id:"ordercode",header:"订单编号",sort:"int",width:150},
					{ id:"skccode",header:"款色", sort:"string",width:150},
					{ id:"stylecode",header:"款式", sort:"string",width:100},
					{ id:"colorname",header:"颜色", sort:"string",width:60},
					{ id:"otherskucompname",header:"杯", sort:"string",width:60},
					{ id:"ordertype",	header:["订单类型",{content:"selectFilter"}], sort:"width",width:85},
					{ id:"brandname",header:"品牌", sort:"string",width:70},
					{ id:"yearname",header:"年份", sort:"string",width:70},
					{ id:"seriesname",header:"系列", sort:"string",width:100},
					{ id:"maintypename",header:"大类", sort:"string",width:100},
					{ id:"orderqty",header:"数量", sort:"int",width:100},
					{ id:"duedate",header:"上货日期", width:90},
				],
				export: true,
				on: {
						onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");},
				},
			}
		]

	};
	


	var layout = {
		type: "line",
		rows:[
			titleBar,
			grid
		]

	};
	

	return {
		$ui: layout,
		$oninit:function(){
			if(!checkWriteAuth())
			{
				$$("dt_preprodorder").define("editable",false);
			}
			
			var columnCfg = [
					{ id:"_identify",header:"#", hidden:true},
					{ id:"rownum",header:"序号",sort:"int",width:60},
					{ id:"ordercode",header:"订单编号",sort:"int",width:150},
					{ id:"skccode",header:"款色", sort:"string",width:150},
					{ id:"stylecode",header:"款式", sort:"string",width:100},
					{ id:"colorname",header:"颜色", sort:"string",width:60},
					{ id:"otherskucompname",header:"杯", sort:"string",width:60},
					{ id:"ordertype",	header:["订单类型",{content:"selectFilter"}], sort:"width",width:85},
					{ id:"brandname",header:"品牌", sort:"string",width:70},
					{ id:"yearname",header:"年份", sort:"string",width:70},
					{ id:"seriesname",header:"系列", sort:"string",width:100},
					{ id:"maintypename",header:"大类", sort:"string",width:100},
					{ id:"orderqty",header:"数量", sort:"int",width:100},
					{ id:"duedate",header:"上货日期", width:90},
				];
				
			_SizeGroupName.forEach(function(item){
				columnCfg.push({
					id:item.sizegroup.toLowerCase()+'qty',
					header:item.sizename,
					sort:"int",
					width:70
				});
			})
//			console.log(columnCfg);
			$$("dt_preprodorder").refreshColumns(columnCfg);
			
		}
	};

});