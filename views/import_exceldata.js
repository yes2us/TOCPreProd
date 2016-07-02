define([
	"data/impobject"
], function(impobject){

	checkauthorization(false);

	var TargetTable="importsku";
	var TargetName = "SKU表";
	var PageIndex = 1;
	
	function showDatatable(){
		$$("uploaderid02").define("upload",urlstr+"/WBUpLoadFile/importExcel2DB/TargetTable/"+TargetTable+"/UserCode/"+_UserCode);
		$$("dt_loadedData02importsku").hide();
		$$("dt_loadedData02importparty").hide();
		$$("dt_loadedData02importstock").hide();
		$$("dt_loadedData02"+TargetTable).show();
		PageIndex = 1;
	};
	
	function loadData(PageIndex)
	{
		 $$("dt_loadedData02"+TargetTable).showOverlay("正在载入导入的前200条数据...");
		 $$("dt_loadedData02"+TargetTable).clearAll();
		 $$("dt_loadedData02"+TargetTable).parse(impobject.getImportData(TargetTable,PageIndex,$$('pagelen').getValue()));
	}
	
	var uploadForm={
		view: "toolbar",
		css: "highlighted_header header5",
		paddingX:2,
		paddingY:2,
//		width:350,
		rows:[
			 	{cols:[
			 	{
				 	view:"segmented", value:"importsku", label:"",inputWidth:300,
					options:[{ id:"importsku", value:"导入SKU"},{ id:"importparty", value:"导入仓库"},{ id:"importstock", value:"导入库存"}],
					click:function(){
						TargetTable = this.getValue();
						switch (TargetTable){
							case "importsku":
								TargetName="SKU表";
								break;
							case "importparty":
								TargetName="仓库表";
								break;
							case "importstock":
								TargetName="库存表";
								break;
						}
						showDatatable();
					}
				},
				{
					view:"uploader",
//					multiple:false,
					id: "uploaderid02",
//					type:"iconButton", 
					icon:"cloud-upload",
				  	name:"uploader", 
				  	value:"上传",
				  	link:"mylist",
				  	width:100,
				  	upload:urlstr+"/WBUpLoadFile/importExcel2DB/TargetTable/"+TargetTable+"/UserCode/"+_UserCode
				},				
				{view:"label",label:"导入Excel。务必保留第一行的表头，单次导入不超过10万行",css:"fontcolor"},
//				{},
			]},

			{view:"list",  id:"mylist", type:"uploader",autoheight:true, borderless:true}
			]};
	
	var dbToolbar = {
		view: "toolbar",
		css: "highlighted_header header5",
		paddingX:0,
		paddingY:0,
		height:_ToolBarHeight,
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
								 $$("dt_loadedData02"+TargetTable).clearAll();
								 webix.message("清空成功！");
							}}});}
			},
			{ view: "button",id:'bnsave', type: "iconButton", icon: "save", label: "保存", width: 70,
				click: function(){
				 impobject.saveImportData(TargetTable);
				 webix.message("保存成功！");
			}},

		]
	};
	

	
		var grid_sku = 
			{
				id:"dt_loadedData02importsku",
				view:"datatable",
				rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
				select:true,
				headermenu:{width:250,autoheight:false,scroll:true},
				columns:[					
//				    	{id:"_identify", header:"#",fillspace:0.5},
					{id:"商品号", header:"商品号", sort:"string", fillspace:1},
					{id:"款号", header:"款号", sort:"string", fillspace:1},	
					{id:"系列", header:"系列", sort:"string", fillspace:1},	
					{id:"杯", header:"杯", sort:"string",fillspace:1},
					{id:"色", header:"色", sort:"string",fillspace:1},
					{id:"码组", header:"码组", sort:"string",fillspace:1},
					{id:"码名", header:"码名", sort:"string",fillspace:1},
					{id:"物料组名称", header:"物料组名称", sort:"string",fillspace:1},
					{id:"上市日期", header:"上市日期", sort:"date",fillspace:1},
					{id:"商品级别", header:"商品级别", sort:"string",fillspace:1},
					{id:"价格类别", header:"价格类别", sort:"string",fillspace:1},
					{id:"吊牌价", header:"吊牌价", sort:"int",fillspace:1},
					{id:"安中零售价", header:"安中零售价", sort:"int",fillspace:1}
				],
				on:{onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");},}
			};
			
	var grid_party = 
			{
				id:"dt_loadedData02importparty",
				view:"datatable",
				rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
				select:true,
				headermenu:{width:250,autoheight:false,scroll:true},
				columns:[					
//				    	{id:"_identify", header:"#",fillspace:0.5},
					{id:"事业部编号", header:"事业部编号", sort:"string", fillspace:1},
					{id:"事业部名称", header:"事业部名称", sort:"string", fillspace:1},
					{id:"办事处编号", header:"办事处编号", sort:"string", fillspace:1},
					{id:"办事处名称", header:"办事处名称", sort:"string", fillspace:1},
					{id:"客户号", header:"客户号", sort:"string", fillspace:1},	
					{id:"客户名称", header:"客户名称", sort:"string", fillspace:1},	
					{id:"等级", header:"等级", sort:"string", fillspace:1},	
					{id:"补货频率", header:"补货频率", sort:"string", fillspace:1},	
//					{id:"商品级别", header:"商品级别", sort:"string",fillspace:1},
				],
				on:{onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");},}
			};
			
	var grid_stock = 
			{
				id:"dt_loadedData02importstock",
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
			
	var layout = {
		type: "line",
		rows:[uploadForm,grid_sku,grid_party,grid_stock,dbToolbar]
	};

	return {
		$ui: layout,
		$oninit:function(){
			var hasWriteAuth = checkWriteAuth();

			$$("uploaderid02").define("disabled",!hasWriteAuth);
			$$("bnclear").define("disabled",!hasWriteAuth);
			
			webix.extend($$("uploaderid02"), webix.ProgressBar);
			
			$$("dt_loadedData02importsku").show();
			$$("dt_loadedData02importparty").hide();
			$$("dt_loadedData02importstock").hide();
		
			$$("uploaderid02").attachEvent("onAfterFileAdd", function(){
	   			$$("uploaderid02").showProgress(); 
			});

			$$("uploaderid02").attachEvent("onUploadComplete", function(){
    				$$("uploaderid02").hideProgress(); 
    			 
    			 webix.message({type:"error",text:TargetName+"导入成功",expire:-1});
    			    		    	
    			loadData(1);
			});
		}
	};

});