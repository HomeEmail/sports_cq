document.onkeyup = keyupEvent;
document.onkeydown = grabEvent;
if(document.onkeypress!==null){
	document.onkeypress = grabEvent;
}
// document.onsystemevent = grabEvent;
function grabEvent(_event){
	// if(_event.type=='keydown'){
	// 	document.onkeypress = null;
	// }
	var code = Event(_event);
	switch(code){
		case "KEY_UP": //
			// if(orderStrtus){
				playCtl.player.previous();
			// }
			return 0;
			break;
		case "KEY_DOWN": //
			// if(orderStrtus){
				playCtl.player.next();
			// }
			return 0;
			break;
		case "KEY_LEFT": //
			// if(orderStrtus){
				if(playCtl.player.playObj.totalTime<=0){
	                return 0;
	            }
				if(playCtl.player.playObj.status=='play' || playCtl.player.playObj.status=='pause'){
	                forward(-1);//快进
	            }
			// }
			return 0;
			break;
		case "KEY_RIGHT": //
			// if(orderStrtus){
				if(playCtl.player.playObj.totalTime<=0){
	                return 0;
	            }
	            if(playCtl.player.playObj.status=='play' || playCtl.player.playObj.status=='pause'){
	                forward(1);//快退
	            }
			// }
			return 0;
			break;
		case "KEY_PAGE_UP": //
			return 0;
			break;
		case "KEY_PAGE_DOWN": //
			return 0;
			break;
		case "KEY_VOLUME_UP": //音量+
			playCtl.player.playObj.plusVolume(function(){
				$("mute").style.visibility = "visible";
				var volumeValue = playCtl.player.playObj.getVolume();
				$("sound_icon").style.background = (volumeValue == 0) ? "url(images/sound-off_l.png)" : "url(images/sound_l.png)";
				$("volumeValue").innerHTML = volumeValue;
				$("volume_active").style.top = 250 - parseFloat(playCtl.player.playObj.getVolume()/32)*250 +"px";
				$("volume_active").style.height = 25 + parseFloat(playCtl.player.playObj.getVolume()/32)*250 +"px";
				clearTimeout(playCtl.volumeTimer);
				playCtl.volumeTimer = null;
				playCtl.volumeTimer = setTimeout(function(){$("mute").style.visibility = "hidden"},2000);
			});
			return false;
			break;	
		case "KEY_VOLUME_DOWN": //音量-
			playCtl.player.playObj.reduceVolume(function(){
				$("mute").style.visibility = "visible";
				var volumeValue = playCtl.player.playObj.getVolume();
				$("sound_icon").style.background = (volumeValue == 0) ? "url(images/sound-off_l.png)" : "url(images/sound_l.png)";
				$("volumeValue").innerHTML = volumeValue;
				$("volume_active").style.top = 250 - parseFloat(volumeValue/32)*250 +"px";
				$("volume_active").style.height = 25 + parseFloat(volumeValue/32)*250 +"px";
				clearTimeout(playCtl.volumeTimer);
				playCtl.volumeTimer = null;
				playCtl.volumeTimer = setTimeout(function(){$("mute").style.visibility = "hidden"},2000);
			});
			return false;
			break;
		case "KEY_VOLUME_MUTE": //静音
			playCtl.player.playObj.mute(function(){
				$("mute").style.visibility = "visible";
				var volumeValue = playCtl.player.playObj.getVolume();
				$("sound_icon").style.background = (myMedia.getMute() == 1) ? "url(images/sound-off_l.png)" : "url(images/sound_l.png)";
				clearTimeout(playCtl.volumeTimer);
				playCtl.volumeTimer = null;
				playCtl.volumeTimer = setTimeout(function(){$("mute").style.visibility = "hidden"},2000);
			});
			return false;
			break;
		case "KEY_NUMBER0":
			//control.play.changeFullStatus();
			return 0;
			break;
		case "KEY_SELECT": //
			control.clickSelect();
			return 0;
			break;
		case "KEY_EXIT":
		case "KEY_BACK":
			control.clickDoBack();
			return false;
			break;
		default:
			//if(_event.which > 5000 && _event.which < 6000)$("debugShow").innerText += "-d-"+_event.which;
			break;
	}
}

function keyupEvent(_event){
    var code = Event(_event);
	switch(code){
        case "KEY_RIGHT":{//右键
            if(playCtl.player.playObj.totalTime<=0){
                return 0;
            }
            forwardOver();//快进完成
            break;
        }
        case "KEY_LEFT":{//左键
            if(playCtl.player.playObj.totalTime<=0){
                return 0;
            }
            forwardOver();//快退完成
            break;
        }
        default:{//用来调试
            //alert("eventvalue="+eventvalue+"，messageId="+messageId+"，type="+type);
            break;
        }
    }
}


//设置系统发出的事件由grabeven函数处理
document.onsystemevent = grabevents;
//document.onirkeypress = grabevent;
//遥控器按钮的事件处理函数 
function grabevents(event) {
    var eventvalue = event.which;
    var messageId = event.modifiers;
    //var eventStr = SysSetting.getEventInfo(messageId);
    var type = event.type;
    //alert("eventvalue="+eventvalue+"，messageId="+messageId+"，type="+type);
    switch (eventvalue) {
        case 10932: {//
			//myMedia.position = "1,0,0,0,0";
			savePlayRecord();        	
			break;
        }
        case 10935: {//
            // $("tipsss").innerHTML = $("tipsss").innerHTML+'<div>播放失败</div>';
			// return false;
			break;
        }
        case 10901:
        case 10936: {//10901 是yinnisi中间件的事件
            // $("tipsss").innerHTML = $("tipsss").innerHTML+'<div>当前流媒体已经播放结束</div>';
			playCtl.player.autoNext();//自动的下一曲
			// return false;
			break;
        }
        default:{//用来调试
            // logText+="<br/> eventvalue="+eventvalue+"，messageId="+messageId+"，type="+type;
            // deBug(logText);
            break;
        }
    }
}

window.onload = init;
var pkId = "";  //专辑id
var videoId = "";  //单个视频id

var dgCode = 3;  //0成功 1失败 2放弃 3无
var msg = "";


var multiSetType = "";  //集类型
var supplierId=0;  //供应商id

function init(){
	loadingDiv = $('loadingDiv');
	pkId = Q.getDecoded("pkId");  //专辑id
	
	videoId = Q.getDecoded("videoId");
	multiSetType = Q.getInt("multiSetType",0);

	dgCode = Q.getInt("code",3);
	msg = Q.getDecoded("msg");


	control.init();
	
	//audio_control.player.play();
	//initList();
}

function release(){
	playCtl.release();//释放播放器资源
}

var control = {
	init : function(){
		labelList(function(){
			ajaxGetAlbumData();
			checkVipAuthor();
		});
	},
	showInfo : function(){
		
	},
	play : {  //播放弹层对象
		pauseFlag : false,
		fullScreenControlTimer : null,
		playBtnTimer : null,
		playTimer : null,
		show : function(){
			this.doSelect();
		},
		showStatu : function(){
			$("pv_fullScreen").style.display = "block";
			$("pv_fullScreen").style.visibility = "visible";
			$("pv_fullScreen").style.opacity = 1;
			$("pv_fullScreen_status").style.visibility = "visible";
		},
		hideStatu : function(){
			$("pv_fullScreen").style.display = "none";
			$("pv_fullScreen").style.visibility = "hidden";
			$("pv_fullScreen").style.opacity = 0;
			$("pv_fullScreen_status").style.visibility = "hidden";
		},
		showData : function(){
			var that = this;
			that.pauseFlag = false;
			$("pv_fullScreen_status").style.background = "url(images/index/pv_play.png)";
			playCtl.init();
			playCtl.player.init();
			that.showStatu();
			that.playBtnTimer = setTimeout(function(){
				that.hideStatu();
				clearTimeout(that.playBtnTimer);
				that.playBtnTimer=null;
			},3000);
			// playCtl.play();
			this.changeFullStatus();
		},
		changeFullStatus : function(){
			// media.video.fullScreen();
			$("pv_mediaName").innerText = json_album.data.trackList[playPos].trackName;
		},
		doSelect : function(){
			var that = this;
			clearTimeout(that.playTimer)
			
			if(!that.pauseFlag){
				that.pauseFlag = true;
				$("pv_fullScreen_status").style.background = "url(images/index/pv_pause.png)";
				that.showStatu();
				playCtl.pause();
			}else{
				that.pauseFlag = false;
				$("pv_fullScreen_status").style.background = "url(images/index/pv_play.png)";
				that.showStatu();
				that.playTimer=setTimeout(function(){that.hideStatu();},3000);
				playCtl.play();
			}
		}
	},
	clickSelect : function(){
		this.play.doSelect();
	},
	clickDoBack : function(){
		// savePlayRecord(function(){
	        if(!!backUrl){
	            location.href=backUrl;
	        }else{
	            history.back();
	        }
	    // });
	    return 0;
	}
}

var playPos = -1;

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

function play_ajax(_audioId){
	if(req != null){
		req.abort();
		req = null;
		release();
	}
	req = ajax({
		url: iPanel.eventFrame.pre_epg_url +"/defaultHD/en/go_authorization.jsp?playType=1&progId="+ _audioId +"&contentType=0&business=1&baseFlag=0&idType=FSN",
		type: "GET", //HTTP 请求类型,GET或POST
		dataType: "html", //请求的文件类型html/xml
		onSuccess: function(html){ //请求成功后执行[可选]
			var json = eval("(" + html + ")");
			rtsp_url = json.playUrl.split("^")[4];
			media.AV.open(rtsp_url,"VOD");
		},
		onComplete:function(){
			req = null;
		},
		onError:function(){ //请求失败后执行[可选]
			showTipss('数据有误!',2000);
		},
        post:"",  
        timeout:7000  
	});	
}

var json_album = {
	code: "0",
	data: {
		tjList: [

		],
		trackList: [

		]
	}
};

function ajaxGetAlbumData(){
	var urls='';
	if(multiSetType==0){
		urls=serverPath+'/media/videoContent/oneSet.utvgo?videoId='+pkId+'&pageNo=1&pageSize=111111';
	}else if(multiSetType==1||multiSetType==2||multiSetType==3){
		urls=serverPath+'/media/videoContent/multiSet.utvgo?videoId='+pkId+'&pageNo=1&pageSize=111111';
	}
	showLoadingDiv();
	if(req != null){
		req.abort();
		req = null;
	}
	req = ajax({
		url: urls,
		type: "GET", //HTTP 请求类型,GET或POST
		dataType: "html", //请求的文件类型html/xml
		onSuccess: function(html){ //请求成功后执行[可选]
			hideLoadingDiv();
			json_albums = eval("(" + html + ")");
			if(multiSetType==0){
				json_album.data.trackList[0] = {trackId:"",trackName:"",vodId:"",isFree:"",freeTime:""};
				json_album.data.trackList[0].trackId = json_albums.data.pk_id;
				json_album.data.trackList[0].pkId=json_albums.data.videoId;
				json_album.data.trackList[0].trackName = json_albums.data.title_name;
				json_album.data.trackList[0].isFree = json_albums.data.isFree;
				json_album.data.trackList[0].freeTime = json_albums.data.freeTime;
				json_album.data.trackList[0].mp4Url = (json_albums.data.video_high_url||json_albums.data.video_fluency_url);
				playPos=0;
				ajaxGetSingleData(0,json_album.data.trackList[playPos].trackId);
			}else if(multiSetType==1||multiSetType==2||multiSetType==3){
				for(var j=0;j<json_albums.data.length;j++){
					json_album.data.trackList[j] = {trackId:"",trackName:"",vodId:"",isFree:"",freeTime:""};
					json_album.data.trackList[j].trackId = json_albums.data[j].pkId;
					json_album.data.trackList[j].pkId = json_albums.data[j].videoId;
					json_album.data.trackList[j].trackName = json_albums.data[j].titleName;
					json_album.data.trackList[j].isFree = json_albums.data[j].isFree;
					json_album.data.trackList[j].freeTime = json_albums.data[j].freeTime;
					json_album.data.trackList[j].mp4Url = (json_albums.data[j].videoHighUrl||json_albums.data[j].videoFluencyUrl);
				}
				if(json_album.code == 0){
					var len=json_album.data.trackList.length;
					var i=0;
					playPos=i;
					for(;i<len;i++){
						if(parseInt(videoId,10)==parseInt(json_album.data.trackList[i].trackId,10)){
							playPos=i;
							break;
						}
					}
					ajaxGetSingleData(0,json_album.data.trackList[playPos].trackId);
				}
			}
		},
		onComplete:function(){
			req = null;
		},
		onError:function(){ //请求失败后执行[可选]
			hideLoadingDiv();
			showTipss('数据有误!',2000);
		},
        post:"",  
        timeout:7000  
	});	
}

var json_single;
function ajaxGetSingleData(_vodId,_videoId){
	videoId = _videoId;
	// play_ajax(_vodId);
	control.play.showData();
};

function savePlayRecord(fn){
	if(req != null){
		req.abort();
		req = null;
	}
    var url=serverPath+'/media/video/updateRecord.utvgo?keyNo='+keyNo+'&videoId='+pkId+'&playId='+videoId+'&supplierId='+supplierId+'&contentType=1';
    req = ajax({
        url: url,
        type: "GET", //HTTP 请求类型,GET或POST
        dataType: "html", //请求的文件类型html/xml
        onSuccess: function(html){ //请求成功后执行[可选]
            var json=eval('('+html+')');
            !!fn&&fn(json);
        },
        onComplete:function(){
           req = null;
        },
        onError:function(){ //请求失败后执行[可选]
           !!fn&&fn();
        },
        post:'',
        timeout:7000
    });
}

function labelList(fn){
	showLoadingDiv();
	if(req != null){
		req.abort();
		req = null;
	}
    var url=serverPath+'/media/video/multiSetDetail.utvgo?keyNo='+keyNo+'&videoId='+pkId;
    req = ajax({
        url: url,
        type: "GET", //HTTP 请求类型,GET或POST
        dataType: "html", //请求的文件类型html/xml
        onSuccess: function(html){ //请求成功后执行[可选]
        	hideLoadingDiv();
            var json=eval('('+html+')');
            supplierId=json.data.supplierId;
            !!fn&&fn();
        },
        onComplete:function(){
           req = null;
        },
        onError:function(){ //请求失败后执行[可选]
        	hideLoadingDiv();
			showTipss('数据有误!',2000);
           	!!fn&&fn();
        },
        post:'',
        timeout:7000
    });
}

function showTipss(strs,times){
	clearTimeout(timerTip);
	$('tips').innerHTML='<span style="position:absolute;left:25px;top:20px;width:378px;height:132px;color:#eeeeee;font-size:30px;line-height:132px;text-align:center;">'+strs+'</span>';
	$('tips').style.display='block';
	if(times==0){

	}else{
		timerTip = setTimeout(function(){
			$('tips').style.display='none';
		},times);
	}
}

function gotoOrderPageAction(vipCode,vipName,fee){//发起订购,基础包参数传空

    var currentUrl=location.href;
    orderAuthor.gotoOrderPage({
        vipCode:vipCode||'vip_code_28',
        vipName:vipName||'熊猫乐园',
        fee:fee||20,
        returnUrl:currentUrl,
        homeUrl:currentUrl||location.href,
        cancelUrl:backUrl||currentUrl
    });
}


function checkVipAuthor(){
	orderAuthor.checkVipAuthor({
		_supplierId:'',
		_vipCode:'vip_code_28',
		_regionCodeInt:regionCodeInt,
		orderedCallBack:function(data){
			//订购
			orderStrtus = true
			//统计
			sendPageStatistic({
				vipCode:vipCode,
				vipName:vipName,
				orderStatus:1,
				channelId:'',
				channelName:'',
				labels:'',
				labelIds:'',
				pageName:'视频播放页',
				pageTitle:'视频播放页'+'-'+json_album.data.trackList[0].trackName
			},function(){});			
		},
		unOrderedCallBack:function(data){
			//未订购
			//console.log(data);
			/*if(data.limit.limitStatus == 1){
				if(data.limit.type == 2){
					//是黑名单
					location.href='blackPage.html?backUrl='+Q.encode(portalUrl);
                    return 0;	
				}				
			}*/
			if(data.status == 2){
				//该用户已开通基础包,未开通任何VIP包
				
			}else if(data.status == 3){
				//未开通基础包和任何VIP包
				
			}else{//当成已开通了基础包处理

			}
			//统计
			sendPageStatistic({
				vipCode:vipCode,
				vipName:vipName,
				orderStatus:0,
				channelId:'',
				channelName:'',
				labels:'',
				labelIds:'',
				pageName:'视频播放页',
				pageTitle:'视频播放页'+'-'+json_album.data.trackList[0].trackName
			},function(){});			
		},
		otherOrderedVipCallBack:function(data){
			//订购其他vip包
			//console.log(data);
			//统计
			sendPageStatistic({
				vipCode:vipCode,
				vipName:vipName,
				orderStatus:0,
				channelId:'',
				channelName:'',
				labels:'',
				labelIds:'',
				pageName:'视频播放页',
				pageTitle:'视频播放页'+'-'+json_album.data.trackList[0].trackName
			},function(){});			
		}
	});
}



