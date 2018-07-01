
function eventInit(_event){
	if (_event.type=='keydown') {
		document.onkeypress=null;
	};
	var code = Event(_event);
	switch(code){
		case "KEY_EXIT":
			window.location.href = portalUrl||backUrl;
			return 0;
		case "KEY_BACK": //
			//window.location.href = iPanel.eventFrame.portal_url;	
			if(!!backUrl){
				location.href=backUrl;
			}else{
				history.back();
			}
			return false;
			break;
		default:
			break;
	}
}
if(document.onkeypress!==null){
	document.onkeypress = eventInit;
}
document.onkeydown = eventInit; 

function grabEvent(_event){
	if (_event.type=='keydown') {
		document.onkeypress=null;
	};
	var code = Event(_event);
	var keyCode = _event.which;
	switch(code){
		case "KEY_UP": //
			contral.up&&contral.up();
			return 0;
			break;
		case "KEY_DOWN": //
			contral.down&&contral.down();
			return 0;
			break;
		case "KEY_LEFT": //
			contral.left&&contral.left();
			return 0;
			break;
		case "KEY_RIGHT": //
			contral.right&&contral.right();
			return 0;
			break;
		case "KEY_SELECT": //	
			contral.enter&&contral.enter();
			return 0;
			break;
		case "KEY_EXIT":
			window.location.href = portalUrl||backUrl;
			return 0;
		case "KEY_BACK": //
			clearInterval(timer1);
			if(contral.back){
				contral.back();
			}else{
				if(!!backUrl){
					location.href=backUrl;
				}else{
					history.back();
				}
			}
			return false;
			break;
		case "KEY_NUMBER1":
		case "KEY_NUMBER2":
		case "KEY_NUMBER3":
		case "KEY_NUMBER4":
		case "KEY_NUMBER5":
		case "KEY_NUMBER6":
		case "KEY_NUMBER7":
		case "KEY_NUMBER8":
		case "KEY_NUMBER9":
		case "KEY_NUMBER0":
			contral.inputNum&&contral.inputNum(keyCode-48);
			return 0;
			break;
		default:
			break;
	}
}
var contral={};

var timer1 = null;

//页面dom加载完成
function pageOnload(){
	showLoadingDiv();
	if(document.onkeypress!==null){
		document.onkeypress = grabEvent;
	}
	document.onkeydown = grabEvent;
	contral=menuPad;
	menuPad.focus();

	ajaxObj.newSession(function(){
		timer1 = setInterval(function(){
			ajaxObj.pollResult();
		},5000)
	});
	hideLoadingDiv();
};
//销毁页面
function pageOnunload(){

}

//左边菜单 begin
var menuPad={
	focusPos:0
	,timer:null
	,menuData:[
		
	]
	,init:function(){

	}
	,initList:function(o){
		
	}
	,focus:function(){
		$('newSession_f_'+this.focusPos).style.display='block';
	}
	,blur:function(){
		$('newSession_f_'+this.focusPos).style.display='none';
	}
	,updateArrow:function(){//更新箭头指示
		
	}
	,updateContent:function(){//更新右边内容
		
	}
	,outUp:function(){}//将要跳出本交互模块的处理
	,outDown:function(){}//将要跳出本交互模块的处理
	,outLeft:function(){}//将要跳出本交互模块的处理
	,outRight:function(){
		
	}//将要跳出本交互模块的处理
	,left:function(){

	},
	right:function(){
		
	},
	up:function(){
		if(this.focusPos==0){
			return 0;
		}else{
			this.blur();
			this.focusPos--;
		}
		this.focus();
	},
	down:function(){
		if(this.focusPos==1){
			return 0;
		}else{
			this.blur();
			this.focusPos++;
		}
		this.focus();
	},
	enter:function(){
		if(this.focusPos==0){
			if(!timer1){
				ajaxObj.newSession(function(){
					timer1 = setInterval(function(){
						ajaxObj.pollResult();
					},5000)
				});
			}else if(timer1==1){
				showTips("绑定成功！",2000);
			}else{
				showTips("二维码未失效！",1000);
			}
		}else if(this.focusPos==1){
			if(!!backUrl){
				location.href=backUrl;
			}else{
				history.back();
			}
		}
	},
	inputNum:function(i){

	}
};
//左边菜单 end

var uuid = '';
// var token = '';
var ajaxObj = {
	req: null,
	newSession: function (_fn){
		ajaxObj.ajaxGo(
			serverPath+"/doll/dollForwardController/showQrcode.utvgo",
			// "http://192.168.4.37:8088/cqedu-client-web/doll/dollForwardController/showQrcode.utvgo",
			function(_data){
				$('newSession_img').src = _data.data.qrcodeUrl;
				uuid = _data.data.uuid;
				!!_fn&&_fn();
			},
			function(_data){
				clearInterval(timer1);
				timer1=null;
				showTips(_data.msg,2000);
				!!_fn&&_fn();
			}
		)
	},
	pollResult: function (_fn){
		ajaxObj.ajaxGo2(
			serverPath+"/doll/dollForwardController/getInfoByUUID.utvgo?keyNo="+keyNo+"&uuid="+uuid,
			// "http://192.168.4.37:8088/cqedu-client-web/doll/dollForwardController/getInfoByUUID.utvgo?keyNo="+keyNo+"&uuid="+uuid,
			function(_data){
				clearInterval(timer1);
				timer1=1;
				showTips('绑定成功!',2000);
				// token=_data.value.token;
				// ajaxObj.userInfo();
				!!_fn&&_fn();
			},
			function(_data){
				clearInterval(timer1);
				timer1=null;
				showTips(_data.msg,2000);
				!!_fn&&_fn();
			}
		)
	},
	userInfo: function (_fn){
		ajaxObj.ajaxGo2(
			serverPath+"/doll/dollForwardController/userInfo.utvgo?keyNo="+keyNo,
			function(_data){
				showTips('绑定成功!',2000);
				!!_fn&&_fn();
			},
			function(_data){
				timer1=null;
				showTips('绑定失败!',2000);
				!!_fn&&_fn();
			}
		)
	},
	unbundDevice: function (_fn){
		ajaxObj.ajaxGo(
			serverPath+"/doll/dollForwardController/unbundlingDevice.utvgo?keyNo="+keyNo,
			function(_data){
				showTips('解除绑定成功!',3000);
				!!_fn&&_fn();
			}
		)
	},
	ajaxGo: function (_url,successFn,failFn){
		showLoadingDiv();
		if(ajaxObj.req != null){
			ajaxObj.req.abort();
			ajaxObj.req = null;
		}
		ajaxObj.req =ajax({
		    url: _url,
		    type: "GET",
		    dataType: "html",
		    onSuccess: function(_data){
		    	ajaxObj.req = null;
		        var data = eval('('+_data+')');
		        if(data.msg=="ok"){
		            !!successFn&&successFn(data);
		        }else{
		        	showTips('服务器繁忙...',2000);
		        };
		    },
		    onComplete:function(){
		        ajaxObj.req = null;
		        hideLoadingDiv();
		    },
		    onError:function(){
		    	ajaxObj.req = null;
		        showTips('服务器繁忙...',3000);
		        !!failFn&&failFn();
		    },
		    post:"",
		    timeout:9000
		});
	},
	ajaxGo2: function (_url,successFn,failFn){
		if(ajaxObj.req != null){
			ajaxObj.req.abort();
			ajaxObj.req = null;
		}
		ajaxObj.req =ajax({
		    url: _url,
		    type: "GET",
		    dataType: "html",
		    onSuccess: function(_data){
		    	ajaxObj.req = null;
		        var data = eval('('+_data+')');
		        if(data.msg=="ok"){
		            !!successFn&&successFn(data);
		        }else if(data.msg=="error"){
		        	!!failFn&&failFn(data);
		        }else{
		        	return 0;
		        };
		    },
		    onComplete:function(){
		        ajaxObj.req = null;
		    },
		    onError:function(){
		    	ajaxObj.req = null;
		        showTips('服务器繁忙...',3000);
		    },
		    post:"",
		    timeout:9000
		});
	}
}
