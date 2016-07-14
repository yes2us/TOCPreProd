define(function(){

	return {
		$ui:{
			view:"window", modal:true, id:"modaladd-dept", position:"center",
			head:"增加部门",
			body:{
				view:"form", 
				id:"dept-form",
				paddingY:20, 
				paddingX:30, 
				elementsConfig:{labelWidth: 140}, 
				elements:[
					{ view:"text",id:"deptcode",name:"deptcode",label:"部门编号", required:true,width:500},
					{ view:"text",id:"deptname",name:"deptname", label:"部门名称", required:true,width:500},
					{
						margin:10,
						cols:[
							{},
							{ view:"button", label:"增加", type:"form", align:"center", width:120, click:function(){
								
								if(!this.getFormView().validate()) {webix.message("请填充带红色*的内容");return;}
								
								$$("dt_Dept").add(this.getFormView().getValues());
								webix.message('保存成功!');
//								var values = this.getFormView().getValues();
//								values.webix_operation = 'insert';
//								webix.ajax().post(urlstr+"/WBCURDMng/saveParameter",values);
//								webix.message(JSON.stringify(values));

								webix.$$("modaladd-dept").close();
							}},
							{ view:"button", label:"取消",align:"center", width:120, click:function(){
								webix.$$("modaladd-dept").close();
							}}
						]
					}

				]
			}
		}
	};

});