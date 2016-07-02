define([
	"data/resourceobject",
	"data/projectobject",
	],
function(resourceobject,projectobject){
	
	checkauthorization(false);
	var nodeResArray=[];
    var selpathcode;
    var selpathname;
    
         var popup = webix.ui({
            view:"gridsuggest",
            maxHeight:200,
            body:{
            	   id:'popupid101',
            	   scroll:true,
            	   autoheight:false,
            	   autofocus:true,
               yCount:10,
               rowHeight:_RowHeight,
			   headerRowHeight:_HeaderRowHeight,
			   url:urlstr+"/WBResourceMng/getPopupNodeList",
                columns:[
                    {id:"nodetype", header:["节点类型",{content:"selectFilter"}], width:85},
                    {id:"id", header:["节点编号",{content:"textFilter"}], width:100},
                    {id:"nodename", header:"节点名称", width:100},
                    {id:"nnnetproctime", header:"净处理时间", width:70},
                    {id:"nnbuffertime", header:"缓冲时间", width:70},
                    {id:"nnstateupdatefreq", header:"更新间隔", width:70},   
                ]
            }
        });
        
          var popup2 = webix.ui({
            view:"gridsuggest",
            maxHeight:100,
            body:{
            	   id:'popupid102',
            	   scroll:true,
            	   autoheight:false,
            	   autofocus:true,
               yCount:10,
               rowHeight:_RowHeight,
			   headerRowHeight:_HeaderRowHeight,
                columns:[
                    {id:"id", header:"责任人编号", width:100},
                    {id:"value", header:"责任人名称", width:100},   
                ]
            }
        });
	var grid_path = {
		maxWidth:350,
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
								$$("dt_path101").clearAll();
								$$("dt_path101").parse(resourceobject.getPathList());
									}},
							{  view: "label",label:"路径列表"},
							{ view: "button", type: "iconButton", icon: "save",id:"button", label: "保存", width: 80, 
							click: function(){
								webix.message("保存成功！");
								resourceobject.savePrevilege();
							}},
							
					]
				},
				{
					view:"datatable", 
					id:"dt_path101",
					maxHeight:250,
					rowHeight:_RowHeight,
					headerRowHeight:_HeaderRowHeight,
					headermenu:{width:250,autoheight:false,scroll:true},
					resizeColumn:true,
					editable:true,
					select:"row",
					navigation:true,
//					save:urlstr+"/WBCURDMng/savePath",
					columns:[
						{id:"pathcode", header:"路径编号", sort:"string",width:85},
						{id:"pathname", header:"路径名称", sort:"string",width:85},
						{id:"buffertype", header:"缓冲类型", sort:"string",width:85},
						{id:"pathdesc", header:"路径描述", sort:"string",width:150}
					],
				}
		]};

var tree_node={
	maxWidth:260,
	rows:[
		    		{
							view: "toolbar",
							css: "highlighted_header header5",
							paddingX:0,
							paddingY:0,
							height:_ToolBarHeight,
							cols:[
								{  view: "label",label:"节点列表"}
							]
				},
				
				{
					view:"tree",
					id:"tree_node101",
					template:"{common.icon()} {common.checkbox()} {common.folder()} #value#",
					threeState: false,
					disabled:true,
					url:urlstr+"/WBOrderMng/getOrderTree",
					on:{
						onItemCheck:function(id){
//							console.log("test:"+selpathcode);

							if(!selpathcode)  return;
							
							var isChecked = $$("tree_node101").isChecked(id);						
							if(!isChecked){
								var arr = $$("dt_project101").find(function(row){
										return row.taskobjectcode == id;
									});
									
									if(arr.length) $$("dt_project101").remove(arr[0].id);
								return;
							}
							
							var selNode = $$("tree_node101").getItem(id);
							var arr = $$("dt_project101").find(function(row){
									return row.taskobjectcode == selNode.id;
							});
									
							if(!arr.length)
								$$("dt_project101").add({
									projectcode:'Prj'+selNode.id+parseInt(Math.random()*100),
									projecttype:selNode.ordertype,
									createpathcode:selpathcode,
									createpathname:selpathname,
									taskobjectcode:selNode.id,
									initduedate:selNode.duedate,
									projectbufferstate:0,
									projectenabled:1
								});


						},
					}
				}

			]
};


var grid_pathnode ={
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
					$$("dt_pathnode101").clearAll();
					$$("dt_pathnode101").parse(resourceobject.getPathNode(selpathcode));
			}},
			{ view: "label",label:"路径节点"}]
		},
		{
		view:"datatable",
		 id:"dt_pathnode101",
		rowHeight:_RowHeight,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{width:250,autoheight:false,scroll:true},
		resizeColumn:true,
		editable:true,
		leftSplit:3,
		select:"row",
		save:urlstr+"/WBCURDMng/savePathNode",
		columns:[
						{id:"_identify",header:"",width:30,hidden:true},
					    {id:"pathcode",header:"路径编号",width:100,hidden:true},
					    {id:"nodecode",header:["节点编号",{content:"textFilter"}],sort:"string",width:100},
					    {id:"nodename",header:"节点名称",width:100},
					    	{id:"pnnextnodecode",header:"后节点",width:100,editor:"richselect",popup:popup,css:'bgcolor1'},
					    	{id:"pnnodeleadercode",header:"责任人",width:85,editor:"richselect", popup:popup2,css:'bgcolor1'},
					    	{id:"pnnetproctime",header:"净处理时间",width:75,editor:"text",css:'bgcolor1'},
					    	{id:"pnbuffertime",header:"缓冲时间",width:75,editor:"text",css:'bgcolor1'},
					    	{id:"pnstateupdatefreq",header:"更新间隔",width:75,editor:"text",css:'bgcolor1'},
					    	{id:"pnaccnetproctime",header:"累计净处理时间",width:75},
					    	{id:"pnaccbuffertime",header:"累计缓冲时间",width:75},

	 	]
		}
		]
}

		
	var grid_project={
		view:"datatable",
		 id:"dt_project101",
		rowHeight:_RowHeight,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{width:250,autoheight:false,scroll:true},
		resizeColumn:true,
		editable:true,
		leftSplit:3,
		select:"row",
		save:urlstr+"/WBCURDMng/saveProject",
		footer:false, header:true,
		columns:[
						{id:"_identify",header:"",width:30,hidden:true},
					    	{id:"projectbufferstate",header:"缓冲状态",width:75,sort:"float"},	
					    	{id:"projecttype",header:"项目类型",width:75},	
					    {id:"projectcode",header:"项目编号",width:160},
					    
					    {id:"createpathcode",header:"路径编号",sort:"string",width:100},
					    {id:"createpathname",header:"路径名称",width:100},
					    	{id:"taskobjectcode",header:"任务对象",width:130},
					    
					    	{id:"initduedate",header:"启动日期",width:90,editor:"date",css:'bgcolor1'},
					    	{id:"initduedate",header:"交付日期",width:90,editor:"date",css:'bgcolor1'},
					    	{id:"projectenabled",header:"有效状态",width:85,template:"{common.checkbox()}"},


	 	]
	};
	
	var layout = {
		type: "line",
		cols:
		[
		  tree_node,{view:"resizer"},
		  {
		  	rows:[
		  	{cols:[grid_path,grid_pathnode]},
		    { template: "<div id='chartid101' style='margin:0 auto;'></div>",maxHeight:220},
		    grid_project
		    ]
		  }
	 ]
	};


	return {
		$ui: layout,
		$oninit:function(){
			resourceobject.getNodeResource().then(function(response){
				nodeResArray=response.json();
			});
			
			$$("dt_path101").clearAll();
			$$("dt_path101").parse(resourceobject.getPathList());
			
			$$("dt_path101").attachEvent("onSelectChange",function(){
			   				var selRow = this.getSelectedItem();
							if(!selRow)	return;
							selpathcode = selRow.pathcode;
							selpathname = selRow.pathname;
							
							$$("tree_node101").define('disabled',false);
							$$("tree_node101").clearAll();
							webix.ajax().post(urlstr+"/WBOrderMng/getOrderTree").then(function(response1){
								$$("tree_node101").parse(response1.json());
								
								return resourceobject.getPathNode(selpathcode);
							}).then(function(response2){
								if(!response2) return;
								response2 = response2.json();
								$$("dt_pathnode101").clearAll();
								$$("dt_pathnode101").parse(response2);
								
								drawPath("chartid101","dt_path101","dt_pathnode101",6);
								
								$$("dt_project101").clearAll();
								return projectobject.getProjectList({PathCode:selpathcode});
							}).then(function(response3){
								if(!response3) return;
								response3 = response3.json();
								
								$$("dt_project101").parse(response3);

								response3.forEach(function(item){ if($$("tree_node101").exists(item.taskobjectcode))  $$("tree_node101").checkItem(item.taskobjectcode);});
								
							});
			});
			
			$$("dt_pathnode101").attachEvent("onSelectChange",function(){
			var nodecode = this.getSelectedItem().nodecode;
			var _resLeader=[];
			 nodeResArray.forEach(function(item){
				  	if(item.nodecode===nodecode) 
				  	_resLeader.push({id:item.resleadercode,value:item.resleadername});
				 });
				  $$("popupid102").clearAll();
				  $$("popupid102").parse(_resLeader);
			});
			
			webix.dp.$$("dt_project101").attachEvent("onAfterInsert", function(response, id, object){
			    $$("dt_project101").getItem(id)._identify = response;
				$$("dt_project101").refresh();   
			}); 
		}
	};

});