
function release(){//销毁播放实例
	if(!!playObj){
		playObj.releasePlayer();
	}
}

function eventInit(e){
	var code = Event(e);
	switch(code){
		case 'KEY_UP':
			break;
		case "KEY_EXIT":
		case "KEY_BACK":
			window.location.href = portalUrl||backUrl;
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
	var code = Event(_event);
	switch(code){
		case "KEY_UP": //
			control.clickTop();
			return 0;
			break;
		case "KEY_DOWN": //
			control.clickDown();
			return 0;
			break;
		case "KEY_LEFT": //
			control.clickLeft();
			return 0;
			break;
		case "KEY_RIGHT": //
			control.clickRight();
			return 0;
			break;
		case "KEY_PAGE_UP": //
			return false;
			break;
		case "KEY_PAGE_DOWN": //
			return false;
			break;
		case "KEY_SELECT": //
			control.clickSelect();
			return 0;
			break;
		case "KEY_EXIT":
		case "KEY_BACK":
			control.clickBack();
			// window.location.href = 'http://192.168.18.47/index.html';
			return 0;
			break;
		default:
			break;
	}
}
/*
document.onsystemevent = grabevent;
function grabevent(event) {
    var eventvalue = event.which;
    var type = event.type;
    switch (eventvalue) {
        case 10931: {//
            // alert("10931  开始加载流媒体");
            break;
        }
        case 10932: {//
            // $("tipsss").innerHTML = $("tipsss").innerHTML+'<div>播放成功</div>';
			// return false;
			break;
        }
        case 10933: {//
            ///alert("10933 加载流媒体失败");
            break;
        }
        case 10934: {//
            //alert("10934  成功获取流媒体视频长度，调用MediaPlayer.getMediaDuration视频长度。得到长度："+myMedia.getMediaDuration());
            
        	break;
        }
        case 10935: {//
            //alert("10935  流媒体视频播放失败");
            break;
        }
        //case 10901://10901 是yinnisi中间件的事件 没用了
        case 10936: {
            //alert("10936  当前流媒体已经播放结束");
            playNext();
            break;
        }
        default:{//用来调试
            break;
        }
    }
}
*/
window.onload = init;

var menuPos = 0;  //光标位置
// var vodId = 'utvgo-p1000021945';
var vodId = 'http://172.16.146.69:17553/1200/dwonload/yinyue/wohenwochixin.mp4';
var vodIds = ['http://172.16.146.69:17553/1200/dwonload/yinyue/wohenwochixin.mp4','http://172.16.146.69:17553/1200/dwonload/yinyue/wohenwochixin.mp4'];
var hrefs = ['http://172.16.146.69:17553/1200/dwonload/yinyue/wohenwochixin.mp4','http://172.16.146.69:17553/1200/dwonload/yinyue/wohenwochixin.mp4'];
var playPos = 0;
var showActFlag = 1; //[0,1]==["系统内进入进入","表示是系统外|系统外进入后弹出活动层"]

function init(){
	showLoadingDiv();
	
	
	checkVipAuthor(function(){
		control.init();
	});

	if(document.onkeypress!==null){
		document.onkeypress = grabEvent;
	}
	document.onkeydown = grabEvent;

	hideLoadingDiv();
};

var control = {
	focusArea : 0,//0:主菜单,1:推荐区，2:播放条
	init : function(){
		this.focusArea = 1;
		typesAll();
	},
	clickTop : function(){
		if(panelTop.isShow){
			panelTop.ups();
		}else{
			if(this.focusArea == 0){
				headsObj.ups();
			}else if(this.focusArea == 1){
				mainsObj.moveY(-1);
			}else if(this.focusArea == 2){
				footsObj.ups();
			}
		}
	},
	clickDown : function(){
		if(panelTop.isShow){
			panelTop.downs();
		}else{
			if(this.focusArea == 0){
				headsObj.downs();
			}else if(this.focusArea == 1){
				mainsObj.moveY(1);
			}else if(this.focusArea == 2){
				footsObj.downs();
			}
		}
	},
	clickRight : function(){
		if(panelTop.isShow){
			panelTop.rights();
		}else{
			if(this.focusArea == 0){
				headsObj.rights();
			}else if(this.focusArea == 1){
				mainsObj.moveX(1);
			}else if(this.focusArea == 2){
				footsObj.rights();
			}
		}
	},
	clickLeft : function(){
		if(panelTop.isShow){
			panelTop.lefts();
		}else{
			if(this.focusArea == 0){
				headsObj.lefts();
			}else if(this.focusArea == 1){
				mainsObj.moveX(-1);
			}else if(this.focusArea == 2){
				footsObj.lefts();
			}
		}
	},
	clickSelect : function(){
		if(panelTop.isShow){
			panelTop.doSelect();
		}else{
			if(this.focusArea == 0){
				headsObj.doSelect();
			}else if(this.focusArea == 1){
				mainsObj.doSelect();
			}else if(this.focusArea == 2){
				footsObj.doSelect();
			}
		}
	},
	clickBack : function(){
		window.location.href = portalUrl||backUrl;
		// if(panelTop.isShow){
		// 	panelTop.hide();
		// }else{
		// 	panelTop.show();
		// }
	}
};

var headsObj = {
	pos : 0,
	init : function(){
		this.pos = 0;
		// this.focuss();
	},
	focuss : function(){
		$("heads_focus").style.visibility = "visible";
	},
	blurs : function(){
		$("heads_focus").style.visibility = "hidden";
	},
	changeFocus : function(){
		$("heads_focus").style.left = this.pos*106+773+"px";
	},
	ups : function(){
		return 0;
	},
	downs : function(){
		this.blurs();
		control.focusArea = 1;
		mainsObj.changeFocus();
	},
	lefts : function(){
		this.pos--;
		if(this.pos<0){
			this.pos=0;
		}
		this.changeFocus();
	},
	rights : function(){
		this.pos++;
		if(this.pos>3){
			this.pos=3;
		}
		this.changeFocus();
	},
	doSelect : function(){
		var url = '';
		if(this.pos==0){
			
			if(orderStrtus){
				//showTips('您已订购本产品,谢谢!',1000);
				url='./outOrder.html?';//退订
			}else{
				url='./order.html?';//订购
			}
		}else if(this.pos==1){
			url ='record.html';
		}else if(this.pos==2){
			url ='collect.html';
		}else if(this.pos==3){
			url ='userInfo.html';
		}
		var backUrls = 'index.html?backUrl='+Q.encode(backUrl);
		if(url.indexOf('?')>-1){
			url+='&backUrl='+Q.encode(backUrls);
		}else{
			url+='?backUrl='+Q.encode(backUrls);
		}
		location.href = url;
	}
};

var mainsObj = {
	mainsPos : 0,
	oldMainsPos : 0,
	datas : [],
	init : function(){
		this.mainsPos = 1;
		this.changeFocus();
		this.showData();
	},
	showData : function(xy){
		for(var i=0;i<this.datas.length;i++){
			if(i==1){
				vodIds = this.datas[i].vodId.split(',');
				hrefs = this.datas[i].href.split(',');
			}else{
				$("mains_img_"+i).src = imgBasePath+this.datas[i].imgUrl;
			}
		}
	},
	changeFocus : function(){
		$("mains_f_"+this.oldMainsPos).style.visibility = "hidden";
		$("mains_f_"+this.mainsPos).style.visibility = "visible";
	},
	moveX:function(_num){
		this.oldMainsPos=this.mainsPos;
		if(_num>0){
			if(this.mainsPos==3 || this.mainsPos==6){
				return 0;
			}else if(this.mainsPos==4 || this.mainsPos==5){
				this.mainsPos=1;
			}else{
				this.mainsPos+=1;
			}
		}else if(_num<0){
			if(this.mainsPos==0 || this.mainsPos==4 || this.mainsPos==5){
				return 0;
			}else if(this.mainsPos==6){
				this.mainsPos=2;
			}else{
				this.mainsPos-=1;
			}
		}
		this.changeFocus();
	},
	moveY:function(_num){
		this.oldMainsPos=this.mainsPos;
		if(_num>0){
			if(this.mainsPos==0){
				this.mainsPos=4;
			}else if(this.mainsPos==4){
				this.mainsPos=5;
			}else if(this.mainsPos==3){
				this.mainsPos=6;
			}else if(this.mainsPos==1 || this.mainsPos==2 || this.mainsPos==5 || this.mainsPos==6){
				this.changeBottom();
				return 0;
			}
		}else if(_num<0){
			if(this.mainsPos<=3){
				this.changeTop();
				return 0;
			}else if(this.mainsPos==4){
				this.mainsPos=0;
			}else if(this.mainsPos==5){
				this.mainsPos=4;
			}else if(this.mainsPos==6){
				this.mainsPos=3;
			}
		}
		this.changeFocus();
	},
	changeTop : function(){
		control.focusArea = 0;
		$("mains_f_"+this.mainsPos).style.visibility = "hidden";
		headsObj.focuss();
	},
	changeBottom : function(){
		control.focusArea = 2;
		$("mains_f_"+this.mainsPos).style.visibility = "hidden";
		$("foots_f_"+footsObj.pos).style.visibility = "visible";
	},
	doSelect : function(){
		var url = "";
		if(this.mainsPos==1){
			url = hrefs[playPos];
		}else{
			url = this.datas[this.mainsPos].href;
		}
		// var backUrls = 'index.html?backUrl='+Q.encode(backUrl);
		var backUrls = location.href;
		if(url.indexOf('?')>-1){
			url+='&backUrl='+Q.encode(backUrls);
		}else{
			url+='?backUrl='+Q.encode(backUrls);
		}
		location.href = url;
	}
};

var footsObj = {
	pos:0,
	oldPos:0,
	datas : [],
	init : function(){
		this.pos = 0;
		// this.changeFocus();
		this.showData();
	},
	showData : function(xy){
		for(var i=0;i<this.datas.length;i++){
			$("foots_img_"+i).src = imgBasePath+this.datas[i].imgUrl;
		}
	},
	changeFocus : function(xy){
		$("foots_f_"+this.oldPos).style.visibility = "hidden";
		$("foots_f_"+this.pos).style.visibility = "visible";
	},
	outUp : function(){
		control.focusArea = 1;
		$("foots_f_"+this.pos).style.visibility = "hidden";
		mainsObj.changeFocus();
	},
	ups : function(){
		this.outUp();
	},
	downs : function(){
		return 0;
	},
	lefts : function(){
		this.oldPos = this.pos;
		if(this.pos==0){
			return 0;
		}else{
			this.pos--;
		}
		this.changeFocus();
	},
	rights : function(){
		this.oldPos = this.pos;
		if(this.pos==4){
			return 0;
		}else{
			this.pos++;
		}
		this.changeFocus();
	},
	doSelect : function(){
		var url = "";
		url = this.datas[this.pos].href;
		var backUrls = 'index.html?backUrl='+Q.encode(backUrl);
		if(url.indexOf('?')>-1){
			url+='&backUrl='+Q.encode(backUrls);
		}else{
			url+='?backUrl='+Q.encode(backUrls);
		}
		location.href = url;
	}
};

var panelTop = {  //弹层处理
	pos : 0,   //光标位置
	isShow : false,
	init : function(){
		
	},
	show : function(){
		panelTop.isShow = true;
		$("indexOut1").style.display = "block";
	},
	hide : function(){
		panelTop.isShow = false;
		$("indexOut1").style.display = "none";
	},
	changeFocus : function(){
		$("indexO1_fucus").src = './images/activity/step_0_pos_'+this.pos+'.png';
	},
	ups : function(){
		return 0;
	},
	downs : function(){
		return 0;
	},
	lefts : function(){
		this.pos = this.pos==0?1:0;
		this.changeFocus();
	},
	rights : function(){
		this.pos = this.pos==0?1:0;
		this.changeFocus();
	},
	doSelect : function(){
		if(this.pos == 0){
			window.location.href = backUrl;
		}else{
			this.hide();
		}
	}
}

var  playObj= null;
function createPlayer(_audioId){

	getRtsp(_audioId,function(rtsp){
		//success
		playObj = new superPlayer('video',rtsp);
		playObj.createPlayer();
		playObj.setPosition(0,294,160,458,298);
		playObj.refresh();//刷新播放区域
		playObj.startPlayer(0);//从几秒开始播
		playObj.hasGetTotalTime=function(){

		};
		playObj.showProgress=function(index){//0-1

		};
		playObj.showPlayTime=function(obj){
			obj.currTime;
			obj.totalTime;
			obj.volume;

		};
		playObj.playOver=function(){
			playNext();
		};
	},function(msg){
		//failure
		msgTips({msg:msg});
	},function(){
		//final
	});
	
		
	
}

function playNext(){
	playPos+=1;
	if(playPos>=vodIds.length){
		playPos = 0;
	}
	getRtsp(vodIds[playPos],function(rtsp){
		//success
		playObj.setPlayUrl(rtsp);

		playObj.reload();//重新加载播放 
	},function(msg){
		//failure
		msgTips({msg:msg});
	},function(){
		//final
	});

	

	
}


function typesAll(fn){
	showLoadingDiv();
	if(req != null){
		req.abort();
		req = null;
	}
    var url=serverPath+'/ui/tv/index/typesAll.utvgo?keyNo='+keyNo+'&platformId=0';
    req = ajax({
        url: url,
        type: "GET", //HTTP 请求类型,GET或POST
        dataType: "html", //请求的文件类型html/xml
        onSuccess: function(html){ //请求成功后执行[可选]
        	hideLoadingDiv();
            var json=eval('('+html+')');
            if(parseInt(json.code)==1){
            	for(var i=0;i<json.indexJson[0].list.length;i++){
            		if(i<=6){
            			mainsObj.datas.push(json.indexJson[0].list[i]);
            		}else if(i>=7 && i<=11){
            			footsObj.datas.push(json.indexJson[0].list[i]);
            		}
            	}
            	// mainsObj.datas = json.indexJson[0].list;
            	mainsObj.init();
            	headsObj.init();
            	footsObj.init();
            	createPlayer(vodIds[playPos]);
            }else{
            	showTips('服务器繁忙...',2000);
            }
            !!fn&&fn();
        },
        onComplete:function(){
           req = null;
        },
        onError:function(){ //请求失败后执行[可选]
        	hideLoadingDiv();
			showTips('服务器繁忙...',2000);
           	!!fn&&fn();
        },
        post:'',
        timeout:7000
    });
}



function checkVipAuthor(_fn){
	showLoadingDiv();
	orderAPIControl.isUnOrderCallBack=function(){
		orderStrtus=false;
		$('orderBt').src='./images/index/index_top_0.png';
		// contral.isOrder=false;
		// $(contral.icon.btData[1].id).src=contral.icon.btData[1].img;
	};
	orderAPIControl.isOrderCallBack=function(){
		orderStrtus = true;
		$('orderBt').src='./images/index/index_top_0_1.png';//退订按钮
		// contral.isOrder=true;
		// $(contral.icon.btData[1].id).src=contral.icon.btData[1].img1;
	};
	orderAPIControl.isErrorCallBack=function(msg){
		msgTips({msg:msg,timeout:10000});
	};
	orderAPIControl.checkAuthor(function(data){
		
		hideLoadingDiv();
		_fn&&_fn();
	});

}



