define([
	"data/paraobject",
	],
function(paraobject){

checkauthorization(false);

	var toolbar = {
		view: "toolbar",
		id:"toolbar",
		css: "highlighted_header header5",
		paddingX:0,
		paddingY:0,
		height:_ToolBarHeight,
		cols:[
			{  view: "button", type: "iconButton", icon: "refresh", label: "刷新",hidden:false, width: 80, 
			click: function(){
				$$("dt_debugrecord").clearAll();
				$$("dt_debugrecord").parse(paraobject.getDebugRecord());
				}},
			{},
			{},
		]
	};
	
	var grid = {
		margin:10,
		rows:[
			{
				id:"dt_debugrecord",
				view:"datatable", 
				rowHeight:_RowHeight+5,
				headerRowHeight:_HeaderRowHeight,
				headermenu:{width:250,autoheight:false,scroll:true},
				resizeColumn:true,
				leftSplit:4,
				editable:true,
				select:"row",
				columns:[
					{id:"usercode", header:["usercode",{content:"selectFilter"}],width:100},
					{id:"recordlabel", header:["recordlabel",{content:"textFilter"}], width:100},
					{id:"modulename", header:["modulename",{content:"selectFilter"}], width:200},
					{id:"moduledesc", header:"moduledesc", width:200},
					{id:"recordvalue", header:"recordvalue", width:100},
					{id:"recorddate", header:"recorddate", width:100},
					{id:"recordtime", header:"recordtime", width:200},
				],
				pager:"para_pagerA"
			}
		]

	};

	var page = {
						view: "toolbar",
						css: "highlighted_header header6",
						paddingX:5,
						paddingY:5,
						height:40,
						cols:[{
							view:"pager", id:"para_pagerA",
							template:"{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
							autosize:true,
							height: 35,
							group:5
						}]
					};
					
	
							
	var layout = {
		type: "line",
		rows:[
			toolbar,
			grid,
			page
		]

	};


	return {
		$ui: layout,
		$oninit:function(){
			$$("dt_debugrecord").parse(paraobject.getDebugRecord());
		}
	};

});