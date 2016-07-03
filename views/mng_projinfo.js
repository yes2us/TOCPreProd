define([
	"data/resourceobject",
	"data/projectobject",
	],
function(resourceobject,projectobject){
	
	checkauthorization(false);
	var nodeResArray=[];

 
	var titleBar = {
			view:"toolbar",
			css: "highlighted_header header5",
			paddingX:0,
			paddingY:0,
			height:_ToolBarHeight,
			cols:[
			    	{view:"select", id:"projecttype",name:"projecttype",width:180,align:"left", label:'项目类型',labelWidth:85,
			    		options:urlstr+"/WBProjectMng/getProjectTypeList"},
			    	{ view:"radio", id:"isprojectfinished", label:"", options:[{id:0,value:"未完成"},{id:1,value:"已完成"}],value:0,width:200},
			    	
			    { view: "button", type: "iconButton", icon: "search", label: "查询", width: 70, 
				    click: function(){
				    	
				    	$$("dt_project210").showOverlay("正在加载......");
				    	
				    	var values =this.getParentView().getValues();
				    	
				    	var postData ={};
				    postData.IsProjectFinished=$$("isprojectfinished").isprojectfinished;
				    	if(values.projecttype != 'all') postData.ProjectType=values.projecttype;
				    				    	
					$$("dt_project210").clearAll();
					$$("dt_project210").parse(projectobject.getProjectList(postData));
				 }},

			    	 {},
			{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, 
				click:function(){webix.toExcel($$("dt_project210"));}},

		    ]
	};
	
        
          var popup = webix.ui({
            view:"gridsuggest",
            maxHeight:100,
            body:{
            	   id:'popupid120',
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
	
		
	var grid_project={
		view:"datatable",
		 id:"dt_project210",
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
						{id:"deletebutton", header:"&nbsp;",hidden:false, width:35, template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"},
						{id:"_identify",header:"",width:30,hidden:true},
					    	{id:"bufferstate",header:"缓冲状态",width:60,sort:"float"},	
					    {id:"buffertype",header:"方式",sort:"string",width:60},
					    	
					    	{id:"isprojectfinished",header:"完成",width:60,template:"{common.checkbox()}"},
					    	{id:"projecttype",header:"类型",width:60},	
					    {id:"projectcode",header:"项目编号",width:100},
					    
//					    	{id:"taskobjectcode",header:"任务对象",width:100},
					    
					    	{id:"initduedate",header:"交付日期",width:90,editor:"date",css:'bgcolor1'},
					    	{id:"skccode",header:["款色",{content:"textFilter"}],width:140},
					    	{id:"orderqty",header:"数量",width:60},


	 	],
	 		on: {
						onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");},
				},
	 		onClick:{
					webix_icon:function(e,id,node){
						webix.confirm({
							text:"你将删除本项目以及所有节点.<br/>确定吗?", ok:"确定", cancel:"取消",
							callback:function(res){
								if(res){
										projectobject.deleteProjectNode($$("dt_project210").getItem(id).projectcode);
										webix.$$("dt_project210").remove(id);
										$$("dt_projectnode210").clearAll();
									}
								}
							});
						}
					}
	};
	
		
	var grid_projectnode={
		view:"datatable",
		 id:"dt_projectnode210",
		maxWidth:400,
		rowHeight:_RowHeight,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{width:250,autoheight:false,scroll:true},
		resizeColumn:true,
		editable:true,
		leftSplit:3,
		select:"row",
		save:urlstr+"/WBCURDMng/saveProjectNode",
		footer:false, header:true,
		columns:[
						{id:"_identify",header:"",width:30,hidden:true},
					    {id:"projectcode",header:"项目编号",width:100,hidden:true},
					    {id:"nodecode",header:"节点编号",width:90,hidden:true},
					    {id:"nodename",header:"节点名称",width:90},
					    {id:"netproctime",header:"净处理",sort:"int",width:60,editor:"text",css:'bgcolor1'},
					    {id:"buffertime",header:"缓冲",sort:"int",width:60,editor:"text",css:'bgcolor1'},
					    {id:"nodeleadercode",header:"责任人",sort:"string",width:75,editor:"richselect",popup:popup,css:'bgcolor1'},
	 	]
	};
	var layout = {
		type: "line",
		rows:
		[
		  titleBar,
		  {cols:[grid_project,{view:"resizer",width:1},grid_projectnode]}
	 	]
	};


	return {
		$ui: layout,
		$oninit:function(){

			resourceobject.getNodeResource().then(function(response){
				nodeResArray=response.json();
			});
			
			$$("dt_project210").attachEvent("onSelectChange",function(){
				 if(!this.getSelectedItem()) return;
			
				  $$("dt_projectnode210").clearAll();
				  projectobject.getProjectObj(this.getSelectedItem().projectcode).then(function(response){
				  	if(response)
				  	   $$("dt_projectnode210").parse(response.json().nodelist);
				  });
			});
			
			
			$$("dt_projectnode210").attachEvent("onSelectChange",function(){
				if(!this.getSelectedItem()) return;
			var nodecode = this.getSelectedItem().nodecode;
			var _resLeader=[];
			 nodeResArray.forEach(function(item){
				  	if(item.nodecode===nodecode) 
				  	_resLeader.push({id:item.resleadercode,value:item.resleadername});
				 });
				  $$("popupid120").clearAll();
				  $$("popupid120").parse(_resLeader);
			});
			
			webix.dp.$$("dt_project210").attachEvent("onAfterUpdate", function(response, id, object){
				var projectcode = $$("dt_project210").getItem(id).projectcode;
				projectobject.updateProjectPath(projectcode).then(function(){
			    		 projectobject.updateProjBufferState(projectcode);
			    });
			}); 
			
			webix.dp.$$("dt_projectnode210").attachEvent("onAfterUpdate", function(response, id, object){
				var projectcode = $$("dt_projectnode210").getItem(id).projectcode;
			    projectobject.updateProjectPath(projectcode).then(function(){
			    		 projectobject.updateProjBufferState(projectcode);
			    });
			}); 
			
		}
	};

});