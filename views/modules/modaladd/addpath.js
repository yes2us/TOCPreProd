define(function(){

	return {
		$ui:{
			view:"window", modal:true, id:"modaladd-path", position:"center",
			head:"增加路径",
			body:{
				view:"form", 
				id:"path-form",
				paddingY:20, 
				paddingX:30, 
				elementsConfig:{labelWidth: 140}, 
				elements:[
					{ view:"text",id:"pathcode",name:"pathcode",label:"路径编号", required:true,width:500},
					{ view:"text",id:"pathname",name:"pathname", label:"路径名称", required:true,width:500},
					{ view:"text",id:"buffertype",name:"buffertype", label:"缓冲类型", required:true,width:500,value:'HTT'},
					{ view:"text",id:"pathdesc",name:"pathdesc",label:"描述",width:500},
					{
						margin:10,
						cols:[
							{},
							{ view:"button", label:"增加", type:"form", align:"center", width:120, click:function(){
								
								if(!this.getFormView().validate()) {webix.message("请填充带红色*的内容");return;}
								
								$$("dt_path").add(this.getFormView().getValues());
								webix.message('保存成功!');
//								var values = this.getFormView().getValues();
//								values.webix_operation = 'insert';
//								webix.ajax().post(urlstr+"/WBCURDMng/saveParameter",values);
//								webix.message(JSON.stringify(values));

								webix.$$("modaladd-path").close();
							}},
							{ view:"button", label:"取消",align:"center", width:120, click:function(){
								webix.$$("modaladd-path").close();
							}}
						]
					}

				]
			}
		}
	};

});