define([
	"data/impobject"
], function(impobject){

	checkauthorization(false);

	var TargetTable="importstock";
	var TargetName = "库存表";
	var PageIndex = 1;
	
	function showDatatable(){
		$$("uploaderid01").define("upload",urlstr+"/WBUpLoadFile/importCSV2DB/TargetTable/"+TargetTable+"/UserCode/"+_UserCode);
		$$("dt_loadedDataimportstock").hide();
		$$("dt_loadedDataimportsale").hide();
		$$("dt_loadedData"+TargetTable).show();
		PageIndex = 1;
	};

	function loadData(PageIndex)
	{
		 $$("dt_loadedData"+TargetTable).showOverlay("正在载入导入的前200条数据...");
		 $$("dt_loadedData"+TargetTable).clearAll();
		 $$("dt_loadedData"+TargetTable).parse(impobject.getImportData(TargetTable,PageIndex,$$('pagelen').getValue()));
	}
	
	var uploadForm={
		view: "toolbar",
		css: "highlighted_header header5",
		paddingX:0,
		paddingY:0,
//		width:350,
		rows:[
			 	{cols:[
			 	{
				 	view:"segmented", value:"importstock", label:"",inputWidth:200,
					options:[{ id:"importstock", value:"导入库存"},{ id:"importsale", value:"导入销售"}],
					click:function(){
						TargetTable = this.getValue();
						switch (TargetTable){
							case "importstock":
								TargetName="库存表";
								break;
							case "importsale":
								TargetName="销售表";
								break;
						}
						showDatatable();
					}
				},
				{
					view:"uploader",
//					multiple:false,
					id: "uploaderid01",
//					type:"iconButton", 
					icon:"cloud-upload",
				  	name:"uploader", 
				  	value:"上传",
				  	link:"mylist",
				  	width:100,
				  	upload:urlstr+"/WBUpLoadFile/importCSV2DB/TargetTable/"+TargetTable+"/UserCode/"+_UserCode
				},
				
				{view:"button",id:"execReplenish",value:"拉式补货", width:100,
				click:function(){
						$$("execReplenish").define("disabled",true);
						
						webix.ajax().post(urlstr+"/Index/getImportStatistics").then(function(respones){
							var countJson = respones.json();
							if(countJson.length){
								var msg = "今天已经导入如下数据:<br/>";
								      msg = msg+"	库存:"+countJson[0].stockwhnum+"家<br/>";
								      msg = msg +"	销售:"+countJson[0].saleswhnum+"家<br/>";
									webix.confirm({
										title:"执行补货，生成补货和退货计划",
										text:msg, ok:"确定", cancel:"取消",
										callback:function(res){
											if(res){
													$$("execReplenish").showProgress();
													webix.ajax().post(urlstr+"/Index/execReplenish",function(response){
															$$("execReplenish").hideProgress();
															$$("execReplenish").define("disabled",false);
													});
											}
											else
											{
												$$("execReplenish").define("disabled",false);
											}
										}
									});
							}
						});					
				}},
				{view:"label",label:"快速导入CSV。必删除多余列和第一行的表头！",css:"fontcolor"},
//				{}
				
			 	]},

			{view:"list",  id:"mylist", type:"uploader",autoheight:true, borderless:true}
			]};
	
	var dbToolbar = {
		view: "toolbar",
		css: "highlighted_header header5",
		paddingX:0,
		paddingY:0,
		height:25,
		cols:[		 
			{ view: "text", type: "iconButton",  label: "单页条数",id:"pagelen",value:200,width: 150,labelWidth:80,maxHeight:40},
			{view:"button",value:"查询", width:100,click:function(){loadData(1);}},
			
			{ view: "button", type: "iconButton", icon: "arrow-circle-left", label: "上一页", width: 100,height:40,
			click: function(){
				 PageIndex = PageIndex - 1;
				 if(PageIndex<1) PageIndex = 1;
				 loadData(PageIndex);
			}},
			{ view: "button", type: "iconButton", icon: "arrow-circle-right", label: "下一页", width: 100,height:40,
			click: function(){
				 PageIndex = PageIndex + 1;
				 if(PageIndex<1) PageIndex = 1;
				 loadData(PageIndex);
			}},
			{},
			{ view: "button",id:"bnclear", type: "iconButton", icon: "times", label: "清空", width: 70,height:40,
				click: function(){
				 		webix.confirm({title:"提醒",text:"清除导入的数据", ok:"确定", cancel:"取消",
							callback:function(res){
							if(res){
								 impobject.clearImportData(TargetTable);
								 $$("dt_loadedData"+TargetTable).clearAll();
								 webix.message("清空成功！");
							}}});}
			},

		]
	};
	
	var grid_stock = 
			{
				id:"dt_loadedDataimportstock",
				view:"datatable",
				rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
				select:true,
				navigation:true,
				headermenu:{width:250,autoheight:false,scroll:true},
				footer:true, header:true,
				columns:[					
//				    	{id:"_identify", header:"#",fillspace:0.5},
					{id:"客户号", header:"客户号", sort:"string", fillspace:1,footer:{text:"总计:", colspan:2}},
					{id:"商品号", header:"商品号", sort:"string", fillspace:1},	
					{id:"可用库存", header:"可用库存", sort:"int",fillspace:1,footer:{ content:"summColumn" }},
					{id:"在途库存", header:"在途库存", sort:"int",fillspace:1,footer:{ content:"summColumn" }}
				],
				on:{onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");},}
			};
	
	var grid_sale = 
			{
				id:"dt_loadedDataimportsale",
				view:"datatable",
				rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
				select:true,
				footer:true, header:true,
				headermenu:{width:250,autoheight:false,scroll:true},
				columns:[					
//				    	{id:"_identify", header:"#",fillspace:0.5},
					{id:"客户号", header:"客户号", sort:"string", fillspace:1,footer:{text:"总计:", colspan:3}},
					{id:"商品号", header:"商品号", sort:"string", fillspace:1},	
					{id:"单据日期", header:"单据日期", sort:"string", fillspace:1},
					{id:"销售数量", header:"销售数量", sort:"int",fillspace:1,footer:{ content:"summColumn" }},
					{id:"实售金额", header:"实售金额", sort:"int",fillspace:1,footer:{ content:"summColumn" }}
				],
				on:{onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");},}
			};
			
	

	var layout = {
		type: "line",
		rows:[uploadForm,grid_stock,grid_sale,dbToolbar]
	};

	return {
		$ui: layout,
		$oninit:function(){
			var hasWriteAuth = checkWriteAuth();
			$$("execReplenish").define("disabled",!hasWriteAuth);
			$$("uploaderid01").define("disabled",!hasWriteAuth);
			$$("bnclear").define("disabled",!hasWriteAuth);
			
			webix.extend($$("execReplenish"), webix.ProgressBar);
			webix.extend($$("uploaderid01"), webix.ProgressBar);
			
			$$("dt_loadedDataimportstock").show();
			$$("dt_loadedDataimportsale").hide();
		
			$$("uploaderid01").attachEvent("onAfterFileAdd", function(){
	   			$$("uploaderid01").showProgress(); 
			});

			$$("uploaderid01").attachEvent("onUploadComplete", function(){
    				$$("uploaderid01").hideProgress(); 
    			 
    			 webix.message({type:"error",text:TargetName+"导入成功",expire:-1});
    			    		    	
    			loadData(1);
			});
		}
	};

});