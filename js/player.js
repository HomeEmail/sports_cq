/*
  playObj为new的playAudio对象，注意new playAudio时用的哪个对象名
*/
var myMedia=null;
function superPlayer(type,_playUrl,_errMsgDiv){
	this.playUrl = typeof(_playUrl)  != "undefined" ? _playUrl : "";
	this.errMsgDiv = typeof(_errMsgDiv)  != "undefined" ? _errMsgDiv : "";
	myMedia = null;
	this.timers = null;//定时器
	this.totalTime = 0;//秒
	this.currTime = 0;//秒
	this.index = 0;
	this.type=type||'video';
	this.isGetTotalTime=false;
	this.status='none';//none,pause,play
	this.$ = function(id) {
		return document.getElementById(id);
	}
	this.setPosition=function(mode,left,top,width,height){
        myMedia.setVideoDisplayArea(left,top,width,height);
		myMedia.setVideoDisplayMode(mode);//视频窗口显示模式，
        /*
            0
            按 setVideoDisplayArea()中设定的 Height, Width, Left, Top 属性所指定 的位置和大小来显示视频。
            1
            全屏显示，按全屏高度和宽度显示(默认值)。
            2
            按宽度显示，指在不改变原有图像纵横比的情况下按全屏宽度显示。
            3
            按高度显示，指在不改变原有图像纵横比的情况下按全屏高度显示。
            255
             视频显示窗口将被关闭。它将在保持媒体流连接的前提下，隐藏视频窗
            口。如果流媒体播放没有被暂停，将继续播放音频。
        */

        //this.refresh();

	};
	this.createPlayer = function(){//创建播放实例
	
		try{
			myMedia = new MediaPlayer();
			myMedia.stop();
			this.mediaId = (Utility.getEnv("nativePlayerInstanceId")||myMedia.getNativePlayerInstanceId());
			if( this.mediaId ){
	            myMedia.bindNativePlayerInstance(this.mediaId);
	        }
	        Utility.setEnv("nativePlayerInstanceId",this.mediaId);
	        myMedia.setAllowTrickmodeFlag(0);
	        myMedia.setCurrentAudioChannel("Stereo");
			this.setPlayUrl(this.playUrl);	
		}catch(err){
			if(this.errMsgDiv !== "") this.$(this.errMsgDiv).innerHTML = err;
			if(!!console&&console.log){
				console.log('createPlayer error:',err);
			}
		}	

	}
	this.releasePlayer = function(){//销毁播放实例
		if(!!myMedia){
			try{
				myMedia.stop();
				myMedia.releaseMediaPlayer(this.mediaId);
				myMedia = null;
			}catch(err){
				if(this.errMsgDiv !== "") this.$(this.errMsgDiv).innerHTML = err;
			}
		}
		this.clearTimer();
	}
	this.startPlayer = function(point){//启动播放器
		var _self=this;
		this.clearTimer();
		if(!point){
			this.playFromStart();
		}else{
			this.playFromStart();
			setTimeout(function(){
				_self.setCurrentPoint(point);
				_self.play();
			},3000);
			
		}
		
		this.startTimer();
		this.initVolume(this.getPlayStatusObj());
	}
	this.playFromStart=function(){
		this.currTime=0;
		this.clearTimer();
		myMedia.playFromStart(); //从媒体起点开始播放
		this.startTimer();
	}
	this.pausePlayer = function(_function){//停止播放
		this.clearTimer();
		this.pause();
		if(typeof(_function) !== "undefined")_function();
	}
	this.playPlayer = function(_function){//播放
		this.clearTimer();
		this.startTimer();
		this.play();
		if(typeof(_function) !== "undefined")_function();
	}
	this.play = function(_function){//播放
		var s=myMedia.resume();
		this.status='play';
		//debug('播放结果：'+s+'<br/>');
		if(typeof(_function) !== "undefined")_function();
	}
	this.pause = function(_function){//暂停播放
		var s=myMedia.pause();	
		this.status='pause';
		//debug('暂停结果：'+s+'<br/>');
		if(typeof(_function) !== "undefined")_function();
	}
	this.startTimer = function(){
		var _self=this;
		if(this.timers == null) this.timers = setInterval(function(){_self.getCurrentPoint();},1000);	
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
		myMedia.playByTime(1,''+_point+'',0);
		this.currTime=_point;
	}
	//this.ii=0;
	this.getCurrentPoint = function(){//得到当前进度参数
		//$('debugShowTime').innerHTML="ii:"+(this.ii++)+" currentPoint:"+myMedia.currentPoint;
		if(this.totalTime!=0){
			this.currTime =	parseInt(myMedia.getCurrentPlayTime(),10);
		}
		
		if(this.totalTime<=0||isNaN(this.totalTime)){
			this.totalTime = String(myMedia.getMediaDuration()).formatSecond();
		}
		if(this.currTime>=(this.totalTime-5)&&this.totalTime>0){
			!!this.playOver&&this.playOver();
			this.currTime=this.totalTime;
		}

		this.index = parseFloat(this.currTime/this.totalTime);
		this.showProgress(this.index);
		this.showPlayTime(this.getPlayStatusObj());
		if(!!!this.isGetTotalTime&&this.totalTime>0&&!isNaN(this.totalTime)){
			this.isGetTotalTime=true;
			this.hasGetTotalTime();//第一次获得了播放总时长
		}
	}
	this.hasGetTotalTime=function(){};//第一次获得了播放总时长
	this.getPlayStatusObj = function(){//返回播放状态
		var playStatus = {};
		playStatus.currTime = this.currTime;
		playStatus.totalTime = this.totalTime;
		playStatus.volume = this.getVolume();
		return playStatus;
	}
	this.setPlayUrl = function(_playUrl){//写入播放url
		this.playUrl = _playUrl;
		//myMedia.source = this.playUrl;
		myMedia.setSingleMedia(this.playUrl);
	}
	this.reload = function(_function){//重新加载播放
		try{
			
			//this.setCurrentPoint(this.currTime);
			this.refresh();
			this.playFromStart();
			this.status='play';
			if(typeof(_function) !== "undefined")_function();
		}catch(e){
			//alert("切换失败"+e);	
		}
	}
	this.refresh = function(){//只是为了刷新播放器
		try{
			myMedia.refreshVideoDisplay();
		}catch(e){

		}
	};
	this.mute = function(_mute,_unmute){
		var _vol = this.getVolume();//静音之前保存当前音量
		if(myMedia.getMuteFlag() == 0){//当前值1为静音，0为非静音
			myMedia.setMuteFlag(1);//静音
			if(typeof(_mute) === "function"){
				_mute();
			}
		}else{//取消静音 同时重新设置音量
			myMedia.setMuteFlag(0);//恢复
			if(typeof(_unmute) === "function"){
				_unmute();
			}
		}
		this.volume = _vol;

		
	}
	this.getVolume = function(){
		return myMedia.getVolume();	
	}
	this.setVolume = function(_value,_function){
		myMedia.setMuteFlag(0);//解除静音
		this.volume = _value;
		myMedia.setVolume(_value);//0-100

		if(typeof(_function) === "function"){
			_function();
		}
	}
	this.plusVolume = function(_function){//加音量
		var _vol = this.getVolume() + 2;
		_vol = (_vol >= 32) ? 32 : _vol;
		this.setVolume(_vol,_function);
		return _vol;
	}
	this.reduceVolume = function(_function){//减音量	
		var _vol = this.getVolume() - 2;
		_vol = (_vol <= 0) ? 0 : _vol;
		this.setVolume(_vol,_function);
		return _vol;
	}
	this.showProgress = function(_index){};
	this.showPlayTime = function(_obj){};
	this.initVolume = function(_obj){};
	this.playOver = function(){};//播放完了
}

if(typeof MediaPlayer == 'undefined'){
	MediaPlayer=function(){
		this.id=null;
		this.currentPoint=0;//单位为秒
		this.player=null;
		this.volume=20;
		this.isInstanceDom=false;
		this.type='video';
		this.init = function(){};
		this.getNativePlayerInstanceId = function(){
			
			this.player = document.createElement('video');
			document.body.appendChild(this.player);
			this.player.style.position='absolute';
			this.player.style.zIndex='-1';
			this.player.style.backgroundColor='#000000';
			this.player.setAttribute('webkit-playsinline','true');
			this.player.setAttribute('x-webkit-airplay','true');
			
			this.player.onended=function(){
				if(typeof playObj !='undefined'){
					!!playObj.playOver&&playObj.playOver();
				}
			};
			this.id=new Date().getTime();
			return this.id;
		};
		this.releaseMediaPlayer = function(){
			
			this.id=null;
			this.player.remove();
			this.player=null;
		};
		this.bindNativePlayerInstance = function(id){
			this.id=id;
		};
		this.setVideoDisplayMode =function(mode){

		};
		this.setVideoDisplayArea=function(left,top,width,height){
			this.player.style.left=left+'px';
			this.player.style.top=top+'px';
			this.player.style.width=width+'px';
			this.player.style.height=height+'px';
			
		};
		this.setCurrentAudioChannel=function(s){

		};
		this.setVolume = function(v){
			//设置音量
		};
		this.getVolume = function(){

		};
		this.getMuteFlag = function(){
			return 0;//0为非静音，1为静音
		};
		this.setMuteFlag = function(value){
			//0取消静音,1静音
			if(value==0){
				this.volume=0;
			}
		};
		// this.audioUnmute = function(){
		// 	//取消静音
		// 	this.volume=0;
		// };
		// this.audioMute = function(){
		// 	this.volume=20;
		// };
		this.getMediaDuration = function(){
			// 获得媒体总长时间，如1:22:30
			var t = this.player.duration;//秒
			return t;
		};
		this.setAllowTrickmodeFlag=function(flag){

		};
		this.setSingleMedia = function(src){
			this.player.src = src;	
		};
		this.playFromStart=function(){
			this.play();
		};
		this.stop=function(){
			this.pause();
		};
		this.pause = function(){
			if(!this.player) return 0;
			this.player.pause();
		};
		this.play = function(){
			//播放
			if(!this.player) return 0;
			this.player.play();
		};
		this.resume = function(){
			this.play();
		};
		this.getCurrentPlayTime = function(){
			this.currentPoint = this.player.currentTime;
			return this.currentPoint;
		};
		this.playByTime = function(type,_point,k){
			this.player.currentTime = _point;
			this.play();
		};
		this.refreshVideoDisplay = function(){
			//刷新播放
			this.play();
		};
		return this;
	};
	Utility = {
		getEnv : function(_str0,_str1,_str2){
				
		},
		setEnv : function(_str0,_str1){
				
		},
		store:{}
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
    return [zero(h),zero(i),zero(s)].join(":");
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