define([
	"data/roleobject",
	],
function(roleobject){
	
	checkauthorization(false);
	
    var selrolecode;
    
	var grid_role = {
		rows:[
		    		{
					view: "toolbar",
					css: "highlighted_header header5",
					paddingX:0,
					paddingY:0,
					height:_ToolBarHeight,
					cols:[
							{  view: "label",label:"管理角色显示的页面和可操作的数据"},
//							{},
							{ view: "button", type: "iconButton", icon: "save",id:"button", label: "保存", width: 80, 
							click: function(){
								webix.message("保存成功！");
								roleobject.savePrevilege();
							}},
							
					]
				},
				{
					view:"datatable", 
					id:"dt_role",
					maxHeight:250,
					rowHeight:_RowHeight,
					headerRowHeight:_HeaderRowHeight,
					headermenu:{width:250,autoheight:false,scroll:true},
					resizeColumn:true,
					editable:false,
					select:"row",
					navigation:true,
					columns:[
						{id:"roleenabled", header:"启用", template:"{common.checkbox()}", sort:"string",fillspace:1,enabled:false},
						{id:"rolecode", header:"角色", sort:"string",fillspace:1},
						{id:"rolename", header:"角色", sort:"string",fillspace:1},
						{id:"roletype", header:"类型", editor:"text", sort:"string",fillspace:1}
					],
					on: {
						onSelectChange:function(){
							var selRow = this.getSelectedItem();
							if(!selRow)	return;
							$$("tree_module").define('disabled',false);

							
							selrolecode = selRow.rolecode;
							
							$$("tree_module").clearAll();
							
							webix.ajax().post(urlstr+"/WBModuleMng/getModuleTree").then(function(response1){
								$$("tree_module").parse(response1.json());
								
								return roleobject.getRolePrevilege(selrolecode);
							}).then(function(response2){
								if(!response2) return;
								
								var response = response2.json();
								$$("dt_roleprevilege").clearAll();
								$$("dt_roleprevilege").parse(response);
									
									response.forEach(function(item){

										if(item.resourcetype && item.resourcetype==='Module' && $$("tree_module").exists(item.resourcecode)) 
										$$("tree_module").checkItem(item.resourcecode);
										
									});
									
							});
							
							}
						}
				}
		]};

var grid_module={
	maxWidth:200,
	rows:[
		    		{
							view: "toolbar",
							css: "highlighted_header header4",
							paddingX:5,
							paddingY:5,
							height:35,
							cols:[
								{  view: "label",label:"模块列表"}
							]
				},
				
				{
					view:"tree",
					id:"tree_module",
					template:"{common.icon()} {common.checkbox()} {common.folder()} #value#",
					threeState: false,
					disabled:true,
					url:urlstr+"/WBModuleMng/getModuleTree",
					on:{
						onItemCheck:function(id){
//							console.log("test:"+selrolecode);

							if(!selrolecode)  return;

							
							
							var isChecked = $$("tree_module").isChecked(id);						
							if(!isChecked){
								var arr = $$("dt_roleprevilege").find(function(row){
										return row.resourcecode == id;
									});
									
									if(arr.length) $$("dt_roleprevilege").remove(arr[0].id);
								return;
							}
							
							var selNode = $$("tree_module").getItem(id);

							var arr = $$("dt_roleprevilege").find(function(row){
									return row.resourcecode == selNode.id;
							});
									
							if(!arr.length)
								$$("dt_roleprevilege").add({
									rolecode:selrolecode,
									resourcecode:selNode.id,
									resourcename:selNode.value,
									resourcedesc:selNode.details,
									resourcetype:'Module'
								});


						},
					}
				}

			]
};


var grid_rolepreviledge ={
		 view:"datatable",
		 id:"dt_roleprevilege",
		rowHeight:_RowHeight,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{width:250,autoheight:false,scroll:true},
		resizeColumn:true,
		editable:true,
		leftSplit:3,
		select:"row",
		save:urlstr+"/WBCURDMng/savePrevilege",
		columns:[
						{id:"_identify",header:"",width:30,hidden:true},
					    {id:"rolecode",header:"角色",width:100,hidden:true},
					    {id:"resourcelevel",header:["级别",{content:"textFilter"}],width:70},
					    {id:"resourcecode",header:["资源编号",{content:"textFilter"}],width:150},
					    {id:"resourcename",header:"资源名称",width:100},
					    	{id:"resourcedesc",header:"模块描述",width:200},
					    	{id:"resourcetype",header:["资源类型",{content:"textFilter"}],width:85},
					    {id:"open",header:"展示状态",width:85,template:"{common.checkbox()}"},
					    {id:"operation",header:"操作",width:60,editor:"select",options:[{id:"r",value:"只读"},{id:"rw",value:"读写"}]},
	 	],
}


	var layout = {
		type: "line",
		cols:[
		grid_module,{view:"resizer"},
		{rows:[
			grid_role,
			{
			view: "toolbar",
			css: "highlighted_header header4",
			paddingX:5,
			paddingY:5,
			height:35,
			cols:[{ view: "label",label:"权限列表"}]
		},
			grid_rolepreviledge]
		}]

	};


	return {
		$ui: layout,
		$oninit:function(){
			$$("dt_role").clearAll();
			$$("dt_role").parse(roleobject.getRoleList());
			
			webix.dp.$$("dt_roleprevilege").attachEvent("onAfterInsert", function(response, id, object){
			    $$("dt_roleprevilege").getItem(id)._identify = response;
				$$("dt_roleprevilege").refresh();   
			}); 
		}
	};

});