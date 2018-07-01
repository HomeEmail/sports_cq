/*
  playObj为new的playAudio对象，注意new playAudio时用的哪个对象名
*/
var myMedia=null;
function playAudio(_playUrl,_errMsgDiv){
	this.playUrl = typeof(_playUrl)  != "undefined" ? _playUrl : "";
	this.errMsgDiv = typeof(_errMsgDiv)  != "undefined" ? _errMsgDiv : "";
	myMedia = null;
	this.timers = null;
	this.totalTime = 0;
	this.currTime = 0;
	this.index = 0;
	this.$ = function(id) {
		return document.getElementById(id);
	}
	this.createPlayer = function(){//创建播放实例
		try{
			myMedia = new MediaPlayer();
			this.mediaId = myMedia.createPlayerInstance("audio",0);
			myMedia.bindPlayerInstance(this.mediaId);
			myMedia.source = this.playUrl;
			if(typeof(CA) == "undefined")myMedia.setPlaySrc(this.playUrl);	
		}catch(err){
			if(this.errMsgDiv !== "")this.$(this.errMsgDiv).innerHTML = err;
		}	
	}
	this.releasePlayer = function(){//销毁播放实例
		if(!!myMedia){
			try{
				myMedia.releasePlayerInstance();
				try{
					myMedia.unBindPlayerInstance();
				}catch(e){
					//	
				}
				myMedia = null;
			}catch(err){
				if(this.errMsgDiv !== "")this.$(this.errMsgDiv).innerHTML = err;
			}
		}
	}
	this.startPlayer = function(){//启动播放器
		this.createPlayer();
		this.play();
		this.startTimer();
		this.initVolume(this.getPlayStatusObj());
	}
	this.stopPlayer = function(_function){//停止播放
		this.clearTimer();
		this.pause();
		if(typeof(_function) !== "undefined")_function();
	}
	this.play = function(_function){//播放
		myMedia.play();
		// this.status='play';
		// debug('播放结果：'+s+'<br/>');
		if(typeof(_function) !== "undefined")_function();
	}
	this.pause = function(_function){//暂停播放
		myMedia.pause(1);
		// this.status='pause';
		// debug('暂停结果：'+s+'<br/>');
		if(typeof(_function) !== "undefined")_function();
	}
	this.startTimer = function(){
		var _self=this;
		if(this.timers == null)this.timers = setInterval(function(){_self.getCurrentPoint();},1000);	
	}
	this.clearTimer = function(){
		//console.log("clear");
		if(!!this.timers){
			try{
				clearInterval(this.timers);
				this.timers = null;
			}catch(err){
				
			}
		}
	}
	this.setCurrentPoint = function(_point){
		myMedia.currentPoint = _point;
		if(typeof(myMedia.setCurrentPoint) == "function")myMedia.setCurrentPoint(_point);
	}
	this.ii=0;
	this.getCurrentPoint = function(){//得到当前进度参数
		//$('debugShowTime').innerHTML="ii:"+(this.ii++)+" currentPoint:"+myMedia.currentPoint;
		this.currTime =	parseInt(myMedia.currentPoint);
		this.totalTime = String(myMedia.getMediaDuration()).formatSecond();
		this.index = parseFloat(this.currTime/this.totalTime);
		this.showProgress(this.index);
		this.showPlayTime(this.getPlayStatusObj());
		if(!!isHasGetAuthor&&!orderStrtus && contentPad.currentPageData[currentPlayIndex].isFree==0 && playCtl.player.playObj.currTime>=contentPad.currentPageData[currentPlayIndex].freeTime){
			gotoOrderPageAction();
			return 0;
		}
	}
	this.getPlayStatusObj = function(){//返回播放状态
		var playStatus = {};
		playStatus.currTime = this.currTime;
		playStatus.totalTime = this.totalTime;
		playStatus.volume = this.getVolume();
		return playStatus;
	}
	this.setPlayUrl = function(_playUrl){//写入播放url
		this.playUrl = _playUrl;
		myMedia.source = this.playUrl;
		if(typeof(CA) == "undefined")myMedia.setPlaySrc(this.playUrl);
	}
	this.reloadAudio = function(_function){//重新加载播放
		try{
			this.clearTimer();
			//this.pause();
			myMedia.refresh();
			//this.play();
			this.startTimer();
			if(typeof(_function) !== "undefined")_function();
		}catch(e){
			alert("切换歌曲失败");	
		}
	}
	this.mute = function(_function){
		var _vol = this.getVolume();//静音之前保存当前音量
		if(myMedia.getMute() == 0){//当前值1为静音，0为非静音
			myMedia.audioMute();//静音
		}else{//取消静音 同时重新设置音量
			myMedia.audioUnmute();//恢复
		}
		//DataAccess.setInfo ("MediaSetting","OutputVolumn",_vol.toString());
		myMedia.volume = _vol;

		if(typeof(_function) === "function"){
			_function();
		}
	}
	this.getVolume = function(){
		return parseInt(DataAccess.getInfo ("MediaSetting","OutputVolumn"));	
	}
	this.setVolume = function(_value,_function){
		myMedia.audioUnmute();//解除静音
		//myMedia.volume = _value;
		DataAccess.setInfo ("MediaSetting","OutputVolumn",_value+'');
		if(typeof(_function) === "function"){
			_function();
		}
	}
	this.plusVolume = function(_function){//加音量
		var _vol = this.getVolume() + 1;
		_vol = (_vol >= 32) ? 32 : _vol;
		this.setVolume(_vol,_function);
	}
	this.reduceVolume = function(_function){//减音量	
		var _vol = this.getVolume() - 1;
		_vol = (_vol <= 0) ? 0 : _vol;
		this.setVolume(_vol,_function);
	}
	this.showProgress = function(_index){}
	this.showPlayTime = function(_obj){}
	this.initVolume = function(_obj){}
	this.last = function(){}
	this.next = function(){}
}

if(typeof MediaPlayer == 'undefined'){
	MediaPlayer=function(){
		this.id=null;
		this.position='1,0,0,0,0';
		this.source='';
		this.currentPoint=0;//单位为秒
		this.player=null;
		this.currTimer=null;
		this.volume=20;
		this.isInstanceDom=false;
		this.init = function(){};
		this.createPlayerInstance = function(type,displayLevel){
			if(type=='audio'){
				this.player = document.createElement('audio');
				document.body.appendChild(this.player);
			}
			this.id=new Date().getTime();
			return this.id;
		};
		this.releasePlayerInstance = function(){
			this.id=null;
			this.player.remove();
			this.player=null;
		};
		this.bindPlayerInstance = function(id){
			this.id=id;
		};
		this.setVolume = function(v){
			//设置音量
		};
		this.getMute = function(){
			return 0;//0为非静音，1为静音
		};
		this.getMediaDuration = function(){
			// 获得媒体总长时间，如1:22:30
			var t = this.player.duration;//秒
			return t;
		};
		this.audioUnmute = function(){
			//取消静音
			this.volume=0;
		};
		this.audioMute = function(){
			this.volume=20;
		};
		this.setPlaySrc = function(){
			this.player.src = this.source;	
		};
		this.pause = function(){
			this.player.pause();
		};
		this.play = function(){
			//播放
			this.player.play();
			if(this.currTimer != null){
				clearInterval(this.currTimer);
				this.currTimer = null;
			}
			var _self = this;
			this.currTimer = setInterval(function(){_self.getCurrentPoint();},500);
		};
		this.getCurrentPoint = function(){
			this.currentPoint = this.player.currentTime;
			
			if(this.currentPoint == this.getMediaDuration()){//播放结束
				clearInterval(this.currTimer);
				this.currTimer = null;
				playCtl.player.autoNext();//下一曲
			}
		};
		this.setCurrentPoint = function(_point){
			this.player.currentTime = this.currentPoint;
		};
		this.refresh = function(){
			//刷新播放
			if(this.point===0){
				this.currentPoint = 0;
			} else {
				this.player.currentTime = 0;
			}
		};
		return this;
	};
	DataAccess = {
		getInfo : function(_str0,_str1,_str2){
				
		},
		setInfo : function(_str0,_str1){
				
		}
	};
}

Number.prototype.formatTime=function(){
    // 计算
    var h=0,i=0,s=parseInt(this);
    if(s>59){
        i=parseInt(s/60);
        s=parseInt(s%60);
        if(i > 59) {
            h=parseInt(i/60);
            i = parseInt(i%60);
        }
    }
    // 补零
    var zero=function(v){
        return (v>>0)<10?"0"+v:v;
    };
    return [zero(i),zero(s)].join(":");
};

String.prototype.formatSecond = function(){
	var seconde=0,s="";
	s=this.split(":");
	if(s.length == 0){
		seconde = 0;
	}else if(s.length == 1){
		seconde = parseInt(s[0]);	
	}else if(s.length == 2){
		seconde = parseInt(s[0])*60 + parseInt(s[1]);
	}else if(s.length == 3){
		seconde = parseInt(s[0])*3600 + parseInt(s[1])*60 + parseInt(s[2]);	
	}
	return seconde;
}



/*
播放弹窗模块
playCtl.createHtml();//加入html
playCtl.init({
	data:albumData,//专辑数据
	play_menuPos:listObj.listPos//播放哪首歌 顺序列表时的 索引位置
});
playCtl.onEventHandle(grabEvent);//托管事件
data:{
	data:{
		trackList:[
			{flacUrl : "",mp3Url : "",trackBigImg : "",trackDuration : "0:03:41",trackId : 3717 ,trackName : "王妃",trackSmallImg : ""} 
		],
		albumName:'王妃专辑',
		albumBigImg : "0b5bfc68d7333c5d9c5cff8878b74307.jpg",
		albumId : 256 
	},
	code:"0"
}

*/
var currentPlayIndex = 0;//当前播放下标
var playCtl = {
	flag : false,//是否显示中
	isPlay : false,//是否播放中
	playIndex : 0,//播放下标
	createHtml : function(){
		if(!!document.getElementById('play_layer')){
			//已经初始化 播放弹层 html了
		}else{
			var html='';
			this.toDom(html);
		}
	},
	appendDom : function(n,node){
		if(!!!node){
			node=document.body;
		}
		node.appendChild(n);
	},
	//字符串转换成dom节点、元素,有些机顶盒不支持，用时请检查
	toDom : function(str){
		var div = doc.createElement("div")
			,i = 0
			,_nodes
			,len = 0
			//,re = []
		;
		div.innerHTML = str;
		_nodes = div.childNodes;
		len = _nodes.length;
		for(;i<len;i++){
			//re.push(_nodes[i]);
			this.appendDom(_nodes[i]);
		}
		//return re;
	},
	init : function(o){
		this.createHtml();
	},
	show : function(){
		
	},
	hide : function(){
		
	},
	release : function(){
		if(!!playCtl.player.playObj){
			playCtl.player.playObj.releasePlayer();
			playCtl.player.playObj=null;
		}
	},
	showData : function(){
			this.isPlay = true;
			$('menu_0').style.background='url(images/chapterList/l_1_0.png) no-repeat';
			$('menu_3').innerHTML='<marquee scrollamount="3" width="180" style="width:180px;height:30px;line-height:30px;">'+contentPad.currentPageData[contentPad.index].name+'</marquee>';
			playCtl.playIndex = contentPad.pageSize*(contentPad.currentPage-1)+contentPad.index;
			var videoId=contentPad.currentPageData[contentPad.index].videoId;
			videoName=contentPad.currentPageData[contentPad.index].name;
			currentPlayIndex=contentPad.index;

			var titlePage = $('contentTW_span1').innerHTML||'';

			//加播放记录统计
			startPlayTimeRecord(function(){
				return {
					currTime:playPoint,
					totalTime:totalTime,
					videoId:videoId,
					pkId:pkId,
					videoName:videoName,
					programName:titlePage,
					spId:supplierId+'0000',
					spName:supplierId+'0000'
				};
			});

		
	},
	preEventFn : null,
	onEventHandle : function(preEventFn){
		this.preEventFn = preEventFn;
		document.onkeydown = this.delegateEvent;
		document.onsystemevent = this.delegateEvent;
	},
	offEventHandle : function(){
		document.onkeydown = this.preEventFn;
		document.onsystemevent = this.preEventFn;
		this.preEventFn=null;
	},
	volumeTimer : null,
	delegateEvent : function(_event){

	},
	pause : function(){
		playCtl.player.playObj.pause();
		this.isPlay = false;
		// playCtl.player.pause();
		$('menu_0').style.background='url(images/chapterList/l_1_1.png) no-repeat';
	},
	play : function(){
		playCtl.player.playObj.play();
		this.isPlay = true;
		// playCtl.player.play();
		$('menu_0').style.background='url(images/chapterList/l_1_0.png) no-repeat';
	},
	button : {
		pos : 1,
		cangFlag : false,
		selectList : [
			{"txt":"上一首","left":-10},
			{"txt":"播放","left":120,"checked":false},
			{"txt":"下一首","left":240},
			{"txt":"列表循环","left":372},
			{"txt":"收藏","left":495}		
		],
		init : function(){
			this.pos = 1;
			$("play_focus").style.left = this.selectList[this.pos].left +"px";
			$("play_txt").innerText = this.selectList[this.pos].txt;
		},
		changeFocus : function(_num){
			if(parseInt($("tips_play").style.opacity,10) == 1){//关闭单曲收藏弹层
				$("tips_play").style.opacity = 0;
				return 0;
			}

			this.pos += _num;
			if(this.pos < 0){
				this.pos = 0;
				return;
			}else if(this.pos > this.selectList.length - 1){
				this.pos = this.selectList.length - 1;
			}
			$("play_focus").style.left = this.selectList[this.pos].left +"px";
			$("play_txt").innerText = this.selectList[this.pos].txt;
			
		},
		doSelect : function(){

		}
	},
	fRandomBy : function(under, over){ 
		switch(arguments.length){ 
			case 1: return parseInt(Math.random()*under+1); 
			case 2: return parseInt(Math.random()*(over-under+1) + under); 
			default: return 0; 
		} 
	} 
};

playCtl.player = {
	timers : null,
	currTime : 0,
	totalTime : 0,
	index : 0,
	playObj : null, //播放器实例
	playUrl : '',
	init : function(){
		if(!!!this.playObj){
			var _self=this;
			_self.setPlayUrl();
			_self.playObj=new playAudio(_self.playUrl);
			_self.playObj.showProgress = function(index){
				$("p_index").style.width = index*188 +"px";
				$("p_currIndex").style.left = (index*188-3) +"px";
			};
			_self.playObj.showPlayTime = function(statusObj){
				$("currTime").innerHTML = isNaN(statusObj.currTime) ? "00:00" : Number(statusObj.currTime).formatTime();
				$("totalTime").innerHTML = isNaN(statusObj.totalTime) ? "00:00" : Number(statusObj.totalTime).formatTime();
				playPoint = statusObj.currTime;
				totalTime = statusObj.totalTime;
			};
			_self.playObj.initVolume = function(statusObj){
				$("volumeValue").innerHTML = statusObj.volume;
				$("volume_active").style.top = 250 - parseFloat(statusObj.volume/32)*250 +"px";
				$("volume_active").style.height = 25 + parseFloat(statusObj.volume/32)*250 +"px";
			};
			if(_self.playObj.playUrl !== ""){
				playCtl.showData();
				_self.playObj.startPlayer();
			};
			// if(playCtl.button.json_single){
			// 	$('play_face').innerHTML = '<img src="'+imgRecordPath+playCtl.button.json_single.data.bigImg +'" width="320" />';
			// }
		}
	},
	setPlayUrl : function(){
		this.playUrl=contentPad.currentPageData[contentPad.index].mp3Url;//flacUrl;//还是用mp3，兼容好点
		if(!!!this.playUrl) this.playUrl='http://172.16.146.74:17553/zizhi/5934.mp3';//test
	},
	play : function(){
		this.playObj.play(function(){
			//$('debugShow').innerHTML+='play';
		});
	},
	pause : function(){
		this.playObj.pause(function(){
		});
	},
	gotoPlay : function(){
		this.setPlayUrl();
		this.playObj.setPlayUrl(this.playUrl);
		this.playObj.reloadAudio(function(){
			playCtl.showData();
			playCtl.play();
		});
	},
	autoNext : function(){
		this.next();
	},
	previous : function(){ //上一首
		contentPad.index--;
		if(playCtl.play_menuPos < 0){
			contentPad.index = 9;
			//alert("已经是播放列表第一首");
		}
		this.gotoPlay();
	},
	next : function(){ //下一首
		if(playCtl.playIndex==setNums-1){
			return 0;
		}else{
			playCtl.playIndex++;
		}
		contentPad.blur();
		if(parseInt(playCtl.playIndex/contentPad.pageSize)+1 == contentPad.currentPage){
			if(contentPad.index >= (contentPad.currentPageData.length - 1) && contentPad.currentPage==contentPad.totalPage){
				//contentPad.outDown();
				return 0;
			}
			contentPad.index=playCtl.playIndex%contentPad.pageSize;
			contentPad.setCurrentColAndRowByIndex();
			if(contral==contentPad){
				contentPad.focus();
			}
			playCtl.player.gotoPlay();
		}else{
			contentPad.currentPage=parseInt(playCtl.playIndex/contentPad.pageSize)+1;
			ajaxObj.programList1(
				function(){
					contentPad.init();
					contentPad.render();
					contentPad.index=playCtl.playIndex%contentPad.pageSize;
					contentPad.setCurrentColAndRowByIndex();
					if(contral==contentPad){
						contentPad.focus();
					}
					playCtl.player.gotoPlay();
				},
				contentPad.pageSize,
				contentPad.currentPage
			);
		}
	}
};

