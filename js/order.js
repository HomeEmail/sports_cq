/*
订购流程 模块
*/
var orderAPIControl={
	fee : 20, //单位元
	cmboId:'xmly01',//计费id
	vipName:'熊猫乐园',
	contentInfo:'',//内容id
	sourceType:'0',//订购来源，字符串 0:TV  1:安卓
	$ : function(id){
		return document.getElementById(id);
	},
	$append : function(n,node){
		if(!!!node){
		node=document.body;
		}
		node.appendChild(n);
	},
	formDiv : null,
	init : function(){
	},
	isUnOrderCallBack:function(){},
	isOrderCallBack:function(){},
	isBlackUserCallBack:function(){location.href='./blackPage.html';return 0;},
	isErrorCallBack:function(msg){},
	checkAuthor : function(_fn){
		
		var url=orderBasePath+'/tianjin/tjUserController/authorization.utvgo?keyNo='+keyNo+'&contentInfo='+this.contentInfo+'&cmboIds='+this.cmboId+'&time='+new Date().getTime();
		
		ajax({
			url : url,
			type : 'GEt',
			dataType : 'html',
			onSuccess : function(html){
				try{
					var json = eval("(" + html + ")");
					var status = json.code;
					//-2，服务异常， -1参数不合法（卡号为空异常或用户信息异常）,0 已订购，1没订购，2白名单，3黑名单,4订购了，但是是欠费状态
					if(status==1){//未订购
						orderAPIControl.isUnOrderCallBack();
					}else if(status==2||status==0||status==4){//已订购
						orderAPIControl.isOrderCallBack();
					}else if(status==3){//黑名单
						orderAPIControl.isBlackUserCallBack();
					}else{
						orderAPIControl.isErrorCallBack(json.message);
					}
				}catch(err){
					orderAPIControl.isErrorCallBack('服务异常');
				}
				
				!!_fn&&_fn(json);
			},
			onError:function(json){
				!!_fn&&_fn();
			},
			post:"",
			timeout:100000
		});
	},
	orderAjax:function(obj){//订购
		if(!obj){
			obj={};
			obj.success=function(){};
			obj.hasOrdered=function(){};
			obj.isBlackUser=function(msg){};
			obj.failure=function(msg){};
			obj.error=function(msg){};
			obj.final=function(){};
		}
		var url=orderBasePath+'/tianjin/tjUserController/purchaseProduct.utvgo?keyNo='+keyNo+'&sourceType='+this.sourceType+'&cmboId='+this.cmboId+'&time='+new Date().getTime();
		ajax({
			url : url,
			type : 'GEt',
			dataType : 'html',
			onSuccess : function(html){
				try{
					var data = eval("(" + html + ")");
					if(data.code == 200){ //200: 订购成功
						obj.success&&obj.success();
					}else if(data.code == 201){ //201: 已订购
						obj.hasOrdered&&obj.hasOrdered();
					}else if(data.code == 202){ //202: 黑名单不能订购
						obj.isBlackUser&&obj.isBlackUser(data.msg);
					}else if(data.code == 300 || data.code == 302){//订购失败
						obj.failure&&obj.failure(data.msg);
					}else{ //-2：接口异常
						obj.error&&obj.error(data.msg);
					}
				}catch(err){
					obj.error&&obj.error('服务异常');
				}
				obj.final&&obj.final();
			},
			onError:function(json){
				obj.error&&obj.error('服务异常');
				obj.final&&obj.final();
			},
			post:"",
			timeout:100000
		});
	},
	outOrderAjax:function(obj){//退订
		if(!obj){
			obj={};
			obj.success=function(msg){};
			obj.cannotOutOrder=function(msg){};//不符合退订条件，不能退订
			obj.failure=function(msg){};
			obj.error=function(msg){};
			obj.final=function(){};
		}
		var url=orderBasePath+'/tianjin/tjUserController/cancelProduct.utvgo?keyNo='+keyNo+'&sourceType='+this.sourceType+'&cmboId='+this.cmboId+'&time='+new Date().getTime();
		ajax({
			url : url,
			type : 'GEt',
			dataType : 'html',
			onSuccess : function(html){
				try{
					var data = eval("(" + html + ")");

					if(data.code==200){ //200退订成功
						obj.success&&obj.success(data.msg);
					}else if(data.code==201||data.code==202){ //201：没退订 202：不能退订
						obj.cannotOutOrder&&obj.cannotOutOrder(data.msg);
					}else if(data.code==203){ //203：退订失败
						obj.failure&&obj.failure(data.msg);
					}else{ //-2：接口异常
						obj.error&&obj.error(data.msg);
					}
				}catch(err){
					obj.error&&obj.error('服务异常');
				}
				obj.final&&obj.final();
				
			},
			onError:function(json){
				obj.error&&obj.error('服务异常');
				obj.final&&obj.final();
			},
			post:"",
			timeout:100000
		});
	},
	getParentLockerInfo:function(dealType,password,newPassword,success,failure){
		/*
		dealType:
		1---------查询家长锁
		2---------添加家长锁
		3---------修改家长锁
		4---------取消家长锁
		password
		家长锁密码，dealType=2或3时都要传入该字段
		newPassword
		dealType=3时传
		*/
		var url=orderBasePath+'/tianjin/tjUserController/optParentLocker.utvgo?keyNo='+keyNo+'&custId=&dealType='+dealType+'&password='+password+'&newPassword='+newPassword+'&sourceType='+this.sourceType+'&time='+new Date().getTime();
		ajax({
			url : url,
			type : 'GEt',
			dataType : 'html',
			onSuccess : function(html){
				try{
					var data = eval("(" + html + ")");
					if(data.status==0&&parseInt(data.result.code,10)==200){
						//data.result.passwd;//密码为空就是没开启家长锁
						success&&success(data);
					}else{
						failure&&failure(data.result.msg);
					}
				}catch(err){
					failure&&failure('服务异常');
				}
				
			},
			onError:function(json){
				failure&&failure('服务异常');
			},
			post:"",
			timeout:100000
		});
	},
	isHasParentLocker:function(has,no,error,final){//检查是否有家长锁
		this.getParentLockerInfo(1,'','',function(data){
			if(data.result.passwd==''){
				no&&no();
			}else{
				has&&has(data.result.passwd);
			}
			final&&final();
		},function(msg){
			error&&error(msg);
			final&&final();
		});
	},
	addParentLocker:function(password,success,error,final){//添加家长锁
		this.getParentLockerInfo(2,password,'',function(data){
			success&&success(data);
			final&&final();
		},function(msg){
			error&&error(msg);
			final&&final();
		});
	},
	editParentLocker:function(password,newPassword,success,error,final){//修改家长锁
		this.getParentLockerInfo(3,password,newPassword,function(data){
			success&&success(data);
			final&&final();
		},function(msg){
			error&&error(msg);
			final&&final();
		});
	},
	deleteParentLocker:function(password,success,error,final){//取消家长锁
		this.getParentLockerInfo(4,password,'',function(data){
			success&&success(data);
			final&&final();
		},function(msg){
			error&&error(msg);
			final&&final();
		});
	},
};
