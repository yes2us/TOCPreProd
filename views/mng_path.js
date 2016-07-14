define([
	"data/resourceobject",
	"views/modules/modaladd/addpath"
	],
function(resourceobject,addpath){
	
	checkauthorization(false);
	
	var nodeResArray=[];
    var selpathcode;
 



       var popup = webix.ui({
            view:"gridsuggest",
            maxHeight:200,
            body:{
            	   id:'popupid100',
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
            	   id:'popupid101',
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
								$$("dt_path").clearAll();
								$$("dt_path").parse(resourceobject.getPathList());
									}},
							{  view: "label",label:"管理路径"},
							{},
							{ view: "button", type: "iconButton", icon: "plus",id:"addbutton", label: "增加",hidden:false, width: 80, 
							click: function(){this.$scope.ui(addpath.$ui).show();}},
							{ view: "button", type: "iconButton", icon: "save",id:"button", label: "保存", width: 80, 
							click: function(){
								webix.message("保存成功！");
								resourceobject.savePrevilege();
							}},
							
					]
				},
				{
					view:"datatable", 
					id:"dt_path",
					maxHeight:150,
					rowHeight:_RowHeight,
					headerRowHeight:_HeaderRowHeight,
					headermenu:{width:250,autoheight:false,scroll:true},
					resizeColumn:true,
					editable:true,
					select:"row",
					navigation:true,
					save:urlstr+"/WBCURDMng/savePath",
					columns:[
						{id:"deletebutton", header:"&nbsp;",hidden:false, width:35, template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"},
						{id:"pathenabled", header:"启用", template:"{common.checkbox()}", sort:"string",fillspace:0.5,enabled:false},
						{id:"pathcode", header:"路径编号", sort:"string",fillspace:1},
						{id:"pathname", header:"路径名称", sort:"string",fillspace:1},
						{id:"buffertype", header:"缓冲类型", editor:"combo", sort:"string",fillspace:1,collection:["HTT","RedLine","SDBR","DBR"],css:'bgcolor1'},
						{id:"headnodecode", header:"头节点", sort:"string",fillspace:1,editor:"richselect", popup:popup,css:'bgcolor1'},
						{id:"headnodename", header:"头节点", sort:"string",fillspace:1},
						{id:"tailnodecode", header:"尾节点", sort:"string",fillspace:1,editor:"richselect", popup:popup,css:'bgcolor1'},
						{id:"tailnodename", header:"尾节点", sort:"string",fillspace:1},
						{id:"pathdesc", header:"路径描述", editor:"text", sort:"string",fillspace:1}
					],
					onClick:{
					webix_icon:function(e,id,node){
						webix.confirm({
							text:"你将删除本条记录.<br/>确定吗?", ok:"确定", cancel:"取消",
							callback:function(res){
								if(res){
									webix.$$("dt_path").remove(id);
									}
								}
							});
						}
					}
				}
		]};

var tree_node={
	maxWidth:160,
	rows:[
		    		{
							view: "toolbar",
							css: "highlighted_header header4",
							paddingX:5,
							paddingY:5,
							height:35,
							cols:[
								{  view: "label",label:"节点列表"}
							]
				},
				
				{
					view:"tree",
					id:"tree_node",
					template:"{common.icon()} {common.checkbox()} {common.folder()} #value#",
					threeState: false,
					disabled:true,
					url:urlstr+"/WBResourceMng/getNodeTree",
					on:{
						onItemCheck:function(id){
//							console.log("test:"+selpathcode);

							if(!selpathcode)  return;

							var isChecked = $$("tree_node").isChecked(id);						
							if(!isChecked){
								var arr = $$("dt_pathnode").find(function(row){
										return row.nodecode == id;
									});
									
									if(arr.length) $$("dt_pathnode").remove(arr[0].id);
								return;
							}
							
							var selNode = $$("tree_node").getItem(id);

							var arr = $$("dt_pathnode").find(function(row){
									return row.nodecode == selNode.id;
							});
									
							if(!arr.length)
								$$("dt_pathnode").add({
									pathcode:selpathcode,
									nodecode:selNode.id,
									nodename:selNode.value,
									nodedesc:selNode.details,
									pnnetproctime:selNode.nnnetproctime,
									pnbuffertime:selNode.nnbuffertime,
									pnstateupdatefreq:selNode.nnstateupdatefreq
								});


						},
					}
				}

			]
};


var grid_pathnode ={
		 view:"datatable",
		 id:"dt_pathnode",
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
					    	{id:"pnnextnodecode",header:"后节点",width:100, editor:"richselect",popup:popup,css:'bgcolor1'},
					    	{id:"pnnodeleadercode",header:"责任人",width:85,editor:"richselect", popup:popup2,css:'bgcolor1'},
					    	
					    	{id:"pnnetproctime",header:"净处理时间",width:85,editor:"text"},
					    	{id:"pnbuffertime",header:"缓冲时间",width:85,editor:"text"},
					    	{id:"pnstateupdatefreq",header:"更新间隔",width:85,editor:"text"},

	 	],
}


	var layout = {
		type: "line",
		rows:
			[
			{cols:[
				tree_node,
				{view:"resizer"},
				{rows:[
						grid_path,
						{
							view: "toolbar",
							css: "highlighted_header header4",
							paddingX:5,
							paddingY:5,
							height:35,
							cols:[
							{  view: "button", type: "iconButton", icon: "refresh", label: "刷新",hidden:false, width: 80, 
								click: function(){
									$$("dt_pathnode").clearAll();
									$$("dt_pathnode").parse(resourceobject.getPathNode(selpathcode));
							}},
							{ view: "label",label:"路径节点"}]
						},
						grid_pathnode
				]}
				]},
//			{view:"resizer"},
		   	{ template: "<div id='chartid120' style='margin:0 auto;'></div>",maxHeight:230},
			]
		}



	return {
		$ui: layout,
		$oninit:function(){
			
			resourceobject.getNodeResource().then(function(response){
				nodeResArray=response.json();
			});
			
			$$("dt_path").clearAll();
			$$("dt_path").parse(resourceobject.getPathList());
			
			
			$$("dt_path").attachEvent("onSelectChange",function(){
			   				var selRow = this.getSelectedItem();
							if(!selRow)	return;
							selpathcode = selRow.pathcode;
							
							$$("tree_node").define('disabled',false);
							$$("tree_node").clearAll();
							webix.ajax().post(urlstr+"/WBResourceMng/getNodeTree").then(function(response1){
								$$("tree_node").parse(response1.json());
								return resourceobject.getPathNode(selpathcode);
							}).then(function(response2){
								if(!response2) return;
								response2 = response2.json();
								$$("dt_pathnode").clearAll();
								$$("dt_pathnode").parse(response2);
									
								response2.forEach(function(item){ if($$("tree_node").exists(item.nodecode))  $$("tree_node").checkItem(item.nodecode);});	
								drawPath("chartid120","dt_path","dt_pathnode",7);
							});
			});

			webix.dp.$$("dt_pathnode").attachEvent("onAfterInsert", function(response, id, object){
			    $$("dt_pathnode").getItem(id)._identify = response;
				$$("dt_pathnode").refresh();   
			}); 
			
			$$("dt_pathnode").attachEvent("onSelectChange",function(){
			var nodecode = this.getSelectedItem().nodecode;
			var _resLeader=[];
			 nodeResArray.forEach(function(item){
				  	if(item.nodecode===nodecode) 
				  	_resLeader.push({id:item.resleadercode,value:item.resleadername});
				 });
				  $$("popupid101").clearAll();
				  $$("popupid101").parse(_resLeader);
			});
			
			$$("dt_pathnode").attachEvent("onAfterEditStop", function(state, editor, ignoreUpdate){
		    		if((editor.column==="pnnextnodecode" ) && state.value != state.old){   		
		         drawPath("chartid120","dt_path","dt_pathnode",7);
		    }  
			});
		}
	};

});