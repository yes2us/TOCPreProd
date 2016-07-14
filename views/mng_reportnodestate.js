define([
	"data/projectobject",
	],
function(projectobject){
	 
	checkauthorization(false);
	
	function updateNode(row){
		    	var postData = row;
		    	postData.webix_operation='update';  	
		    	postData.UserCode = _UserCode;
    	  	 	webix.ajax().post(urlstr+"/WBCURDMng/saveProjectNode",postData);
    	  	 	
    	  	 	projectobject.updateProjBufferState(row.projectcode);
	}
	
    function setNodeState(nodestate){
    	  $$("dt_reportnodestate").eachRow(function(rowid){
    	  	 var row = $$("dt_reportnodestate").getItem(rowid);
    	  	 if(row.check)
    	  	 {
    	  	 	row.nodestate = nodestate;
    	  	 	$$("dt_reportnodestate").updateItem(row);
    	  	 	updateNode(row);
    	  	 }
    	  });
    	
    }
	 		
	var titleBar = {
			view:"toolbar",
			css: "highlighted_header header5",
			paddingX:0,
			paddingY:0,
			height:_ToolBarHeight,
			cols:[
					{
				 	view:"menu",
				  	data:[{ id:"1",value:"设置状态", 
				  	  submenu:[{id:"NotStart",value:"未启动"}, {id:"InProcess",value:"进行中"},{id:"Finished",value:"已完成"}]}
				  	],
				 	on:{
						onMenuItemClick:function(id){
							if(id==='1') return;
							setNodeState(this.getMenuItem(id).id);
						}
					},
	                type:{
	                    subsign:true
	                }
				 },
				 
				{view:"select",name:"nodestate", width:170,align: "right", label: '节点状态',	labelWidth:85,
					options:[{id:"InProcess",value:"进行中"},{id:"NotStart",value:"未启动"},{id:"Finished",value:"已完成"},{id:"all",value:"所有"}]},
				{view:"select",name:"deptcode", width:200,align: "left", label: '部门',	labelWidth:50,
					options:urlstr+"/WBResourceMng/getProjectDeptList"},
			    {view:"select", id:"projectstaff",name:"projectstaff",width:150,align:"left", label:'人员',labelWidth:50,
			    		options:urlstr+"/WBResourceMng/getProjectStaffList"},
			    	{view:"select", id:"projecttype",name:"projecttype",width:160,align:"left", label:'项目类型',labelWidth:85,
			    		options:urlstr+"/WBProjectMng/getProjectTypeList"},
			    		
			    { view: "button", type: "iconButton", icon: "search", label: "查询", width: 70, 
				    click: function(){
				    	
				    	$$("dt_reportnodestate").showOverlay("正在加载......");
				    	
				    	var values =this.getParentView().getValues();
				    	
				    	var postData ={};
				    	if(values.nodestate != 'all') postData.NodeState=values.nodestate;
				    	if(values.deptcode != 'all') postData.DeptCode=values.deptcode;
				    	if(values.projectstaff != 'all') postData.ProjectStaff=values.projectstaff;
				    	if(values.projecttype != 'all') postData.ProjectType=values.projecttype;
				    	
					$$("dt_reportnodestate").clearAll();
					$$("dt_reportnodestate").parse(projectobject.getProjectNode(postData));
				 }},
			    	 {},
			{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, 
			click:function(){webix.toExcel($$("dt_reportnodestate"));}},

		    ]
	};
				
	var grid = {
		margin:10,
		rows:[
			{
				view:"datatable", 
				id:"dt_reportnodestate",
				rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
				headermenu:{width:250,autoheight:false,scroll:true},
				editable:true,
				checkboxRefresh:true, 
				resizeColumn:true,
				select:true,
				navigation:true,
				leftSplit:5,
//				save:urlstr+"/WBCURDMng/saveProjectNode",
				columns:[
					{ id:"_identify",header:"#", hidden:true},
					{ id:"check", header:{ content:"masterCheckbox" }, checkValue:1, uncheckValue:0, template:"{common.checkbox()}", width:40},
					{ id:"nodestate",header:"状态",sort:"string",width:60,template:function(obj){
							if (obj.nodestate==='Finished')
								return "<div style='color:green;'>已完成</div>";
							else if (obj.nodestate==='NotStart')
								return "<div style='color:black;'>未启动</div>";
							else return "<div style='color:red;'>进行中</div>";
						}
					},
					{ id:"bufferstate",header:"缓冲",sort:"int",width:60},
					{ id:"projectcode",header:"项目编号",sort:"int",width:100},
					{ id:"projecttype",header:["类型",{content:"selectFilter"}], sort:"string",width:60},
					{ id:"nodecode",header:"节点编号", sort:"string",width:75,hidden:true},
					{ id:"nodename",header:"节点", sort:"string",width:75},
					
					{ id:"taskobjectcode",header:"订单号", sort:"string",width:100},
					{ id:"skccode",header:["款色",{content:"textFilter"}], sort:"string",width:140},
//					{ id:"stylecode",header:"款式", sort:"string",width:100},
//					{ id:"ordertype",	header:["订单类型",{content:"selectFilter"}], sort:"width",width:85},
					{ id:"orderqty",header:"订单数量", sort:"string",width:85},
					{ id:"nodetenseplanfinishdate",header:"压力完工", sort:"string",width:90},
					{ id:"nodeuserplanfinishdate",header:"计划完工", sort:"string",width:90,editor:"date", css:'bgcolor1'},
					{ id:"belongdeptname",header:"部门", sort:"string",width:100},
					{ id:"nodeleadername",header:"责任人", sort:"string",width:70},
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

			$$("dt_reportnodestate").define("editable",checkWriteAuth());
			
			$$("dt_reportnodestate").attachEvent("onAfterEditStop", function(state, editor, ignoreUpdate){
		    		if((editor.column==="nodeuserplanfinishdate" ) && state.value != state.old)		
		        {
		        		updateNode($$("dt_reportnodestate").getItem(editor.row));
		        }
		    
			});
		
		}
	};

});