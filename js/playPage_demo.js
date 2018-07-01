
var videoDatas=[
    {videoId:11,nickname:'第1集',videoName:'我滴个神啊',img:'./images/set-img.jpg',isSelected:false,playUrl:['http://172.16.146.69:17553/1200/guangdongxiongmaoleyuan/xiaobenxiongzhizhongguomingzhu/xiaobenxiongzhizhongguomingzhu_01.mp4'],source:['PPTV5']},
    {videoId:12,nickname:'第2集',videoName:'寒战',img:'./images/set-img.jpg',isSelected:false,playUrl:['http://172.16.146.69:17553/1200/dwonload/tv/youku-zuilinglong/zllong1.mp4'],source:['PPTV4']}
];
var playUrl = "";
var programName='';//节目名称
var videoName = '';//当前视频名称，第一集，或者啥啥的
var nickname = '';//当前视频别名,第一集，或者啥啥的

var sourceIndex=0;//当前使用播放源列表下标
var currentVideoIndex=0;//当前播放列表下标

var isShowNextVideoTips=false;
var initPoint=0;//从几秒开始播放
var multiSetType=0;//"0":单集,  "1":只有集数的,  "2": 有独立标题, "3"：有独立标题又有图片
var channelId=0;//频道id
var channelName='';
var pkId=0;//节目id
var videoId=0;//视频id
var initVideoId=0;//初始播放的视频id

var flag_debug = false;//控制调试

var vipCode='';
var vipName='';

var logText='';


function setPlayData(){
    
    playUrl=videoDatas[currentVideoIndex].playUrl[sourceIndex];
    videoName = videoDatas[currentVideoIndex].videoName;
    nickname = videoDatas[currentVideoIndex].nickname;

    var showName= multiSetType==0 ? programName : videoName ;
    $('videoName').innerHTML=showName + ' '+ (nickname==showName ? '':nickname);


}

var loadingObj=new Loading({backgroundColor:'transparent'});

function pageOnload(){
    multiSetType=Q.getInt('multiSetType',0);
    channelId=Q.getInt('channelId',0);
    pkId=Q.getInt('pkId',0);
    initVideoId=Q.getInt('videoId',0);
    videoId=initVideoId;
    initPoint=Q.getInt('point',0);

    //getDetailData(formatVideoData);

    init();
    
}
function init(){
    setPlayData();
    onPlayKeyboardControlEvent();
    playInit();
}

var detailData={};
var detailReq=null;
function getDetailData(fn){
    if(!!detailReq) return 0;

    loadingObj.show();

    var pageNo=1;//多集 当前第几页
    var pageSize=10000;//多集 每页几项

    var url=apiBasePath+'/tv/pageCenter/program_content.utvgo?multiSetType='+multiSetType+'&channelId='+channelId+'&pkId='+pkId+'&pageNo='+pageNo+'&pageSize='+pageSize+'&keyNo='+keyNo;
    detailReq=ajax({
        url: url,
        type: "GET", //HTTP 请求类型,GET或POST
        dataType: "html", //请求的文件类型html/xml
        onSuccess: function(html){ //请求成功后执行[可选]
            detailReq=null;
            var json=eval('('+html+')');
            loadingObj.hide();
            if(parseInt(json.code,10)==1){
                detailData=json;
                fn&&fn(json);
            }else{
                alert(json.message);
            }
        },
        onComplete:function(){
           
        },
        onError:function(){ //请求失败后执行[可选]
           detailReq=null;
        },
        post:"",  
        timeout:70000  
    });
}
function formatVideoData(json){
    videoDatas=[];
    programName=json.data.name;//节目名称

    vipCode=json.data.vipCode;
    vipName=json.data.vipName;

    if(!!!vipCode||vipCode=='null'||vipCode=='vip_code_0'){
        vipCode='';
        vipName='电视上网功能';
    }

    if(multiSetType==0){//单集
        videoDatas.push(
            {videoId:json.data.videoId,nickname:json.data.name,name:json.data.name,supplierId:json.data.supplierId,titleSecond:json.data.titleSecond,freeSecond:json.data.freeSecond,isFree:json.data.isFree,img:json.data.imageProfix+(json.data.imageBig||json.data.imageMid||json.data.imageSmall),isSelected:false,playUrl:[json.data.videoUrlHigh||json.data.videoUrlFluency],source:[json.data.playSourceName||'UTVGO']}
        );
    }else{//多集
        videoDatas=json.data.videos||[];
    }

    
    if(multiSetType==1){//多集 电视剧
        for(var i=0,len=videoDatas.length;i<len;i++){
            // videoDatas[i].isFree=videoDatas[i].isFree;
            // videoDatas[i].titleSecond=videoDatas[i].titleSecond;
            // videoDatas[i].freeSecond=videoDatas[i].freeSecond;
            videoDatas[i].name=programName;
            videoDatas[i].nickname='第'+videoDatas[i].number+'集';
            videoDatas[i].img=json.data.imageProfix+(json.data.imageBig||json.data.imageMid||json.data.imageSmall);
            videoDatas[i].isSelected=false;
            videoDatas[i].playUrl=[videoDatas[i].videoUrlHigh||videoDatas[i].videoUrlFluency];
            videoDatas[i].source=[json.data.playSourceName||'UTVGO'];
            videoDatas[i].supplierId=json.data.supplierId;

            if(initVideoId==videoDatas[i].videoId){//找到初始播放视频的数组下标
                currentVideoIndex=i;
            }
        }
    }
    if(multiSetType==2||multiSetType==3){//多集 只有标题,或者有图片又有标题
        for(var i=0,len=videoDatas.length;i<len;i++){
            // videoDatas[i].isFree=videoDatas[i].isFree;
            // videoDatas[i].titleSecond=videoDatas[i].titleSecond;
            // videoDatas[i].freeSecond=videoDatas[i].freeSecond;
            videoDatas[i].nickname=videoDatas[i].aliasName;
            videoDatas[i].name=programName;
            videoDatas[i].img=json.data.imageProfix+(videoDatas[i].imageBig||videoDatas[i].imageMid||videoDatas[i].imageSmall||'');
            videoDatas[i].isSelected=false;
            videoDatas[i].playUrl=[videoDatas[i].videoUrlHigh||videoDatas[i].videoUrlFluency];
            videoDatas[i].source=[json.data.playSourceName||'UTVGO'];
            videoDatas[i].supplierId=json.data.supplierId;

            if(initVideoId==videoDatas[i].videoId){//找到初始播放视频的数组下标
                currentVideoIndex=i;
            }
        }
    }

    init();
}


var playObj={};
function playInit(){

    playObj=new superPlayer('video',playUrl);
    playObj.currTime=initPoint;//当前秒，切换视频源时必须重置此值
    playObj.totalTime=0;//总时长，切换视频源时必须重置此值
    playObj.position='0,0,0,1279,719';
    playObj.startPlayer();//启动播放
    //playObj.setPlayUrl(playUrl);//更改播放地址
    //playObj.reload();//重新加载播放，启动播放后才能调用此方法,比如更改播放地址,视窗，播放时间后;
    //playObj.pausePlayer();//暂停
    //playObj.playPlayer();//播放
    //playObj.isGetTotalTime=false;//重置获得播放总时长状态
    //playObj.startTimer();//启动进度条计时器
    //playObj.clearTimer();//清除进度条计时器
    //playObj.status;//播放状态
    playObj.showProgress=function(index){//0-1之间 进度条更新回调，每秒都会执行此方法,
       updateProgressNav(index);
    };
    playObj.showPlayTime=function(obj){ //进度条更新回调，每秒都会执行此方法
        //this.currTime;
        //this.totalTime;
        
        updateTimeNav(this.currTime,this.totalTime);
        showNextVideoTips(this.currTime,this.totalTime);

        autoNextVideo(this.currTime,this.totalTime);
    };
    playObj.playOver=function(){//本视频播放完后，的处理
        playOverAction();
    };
    playObj.hasGetTotalTime=function(){//第一次获得了播放总时长 回调
        hideLoading();
        setTimeout(function(){
            hidePlayControlNav();
        },3000);
        $('nextVideoTips').style.display='none';//

        playObj.position='1,0,0,0,0';//真正的全屏播放
        //this.reload();
        this.setPosition(this.position);
        this.refresh();

        

    };


}
function showLoading(){
    loadingObj.show();
    $('loadingTip').style.display='block';
}
function hideLoading(){
    loadingObj.hide();
    $('loadingTip').style.display='none';
}
function changeVideoPlayAction(o){//选择视频，上一个，下一个,切换源 视频
    var o=o||{};
    var currTime=o.currTime||0;
    playObj.clearTimer();//清除进度条计时器
    
    setPlayData();
    onPlayKeyboardControlEvent();
    showLoading();
    playObj.isGetTotalTime=false;
    playObj.setPlayUrl(playUrl);
    playObj.currTime=currTime;//当前秒，切换视频源时必须重置此值
    playObj.totalTime=0;//总时长，切换视频源时必须重置此值
    playObj.position='0,0,0,1279,719';//先重置下播放区域，解决新版银河机顶盒数码中间件播放bug
    playObj.reload();//重新加载播放，启动播放后才能调用此方法,比如更改播放地址,视窗，播放时间后;

    playObj.startTimer();//启动进度条计时器


}
function nextAction(){
    if(currentVideoIndex>=(videoDatas.length-1)){
        //没有下一集了
        //goBack();
        /*pauseAction();
        offPlayKeyboardControlEvent();
        onPlayOverControlEvent();
        playOverNavBtControl.playOverFlag=0;//最后一集了
        playOverNavBtControl.playNextBtCallback=function(){//重新播放
            changeVideoPlayAction();
        };
        playOverNavBtControl.init();*/
    }else{
        pauseAction();
        // offPlayKeyboardControlEvent();
        // onPlayOverControlEvent();
        // playOverNavBtControl.playOverFlag=1;//下一集
        // playOverNavBtControl.playNextBtCallback=function(){//播放下一集
            showLoading();
            currentVideoIndex++;
            showPlayControlNav();
            changeVideoPlayAction();
            setTimeout(function(){
                hidePlayControlNav();
            },5000);
        // };
        // playOverNavBtControl.init();

        
    }
}
function lastAction(){

    if(currentVideoIndex<=0){
        //没有上一集了
        //goBack();
        /*pauseAction();
        offPlayKeyboardControlEvent();
        onPlayOverControlEvent();
        playOverNavBtControl.playOverFlag=0;//最后一集了
        playOverNavBtControl.playNextBtCallback=function(){//重新播放
            changeVideoPlayAction();
        };
        playOverNavBtControl.init();*/
    }else{

        pauseAction();
        // offPlayKeyboardControlEvent();
        // onPlayOverControlEvent();
        // playOverNavBtControl.playOverFlag=-1;//上一集
        // playOverNavBtControl.playNextBtCallback=function(){//播放上一集
            showLoading();
            currentVideoIndex--;
            showPlayControlNav();
            changeVideoPlayAction();
            setTimeout(function(){
                hidePlayControlNav();
            },5000);
        // };
        // playOverNavBtControl.init();
    }
}

function goBack(){
    
    pageOnunload();
    if(!!backUrl){
        location.href=backUrl;
    }else{
        history.back();
    }
    
    return 0;
}
//播完，自动出提示
function playOverAction(){
    //playObj.pausePlayer();//暂停
   // nextAction();//播放下一集
   if(currentVideoIndex>=(videoDatas.length-1)){
        //没有下一集了
        goBack();
       
    }else{
        pauseAction();

        showLoading();
        currentVideoIndex++;
        showPlayControlNav();
        changeVideoPlayAction();
        setTimeout(function(){
            hidePlayControlNav();
        },6000);
    }
}

//自动播放下一集
function autoNextVideo(currTime,totalTime){
    if(!!currTime&&!!totalTime&&currTime>=totalTime){//快进到视频最后了
        playObj.clearTimer();
        playObj.playOver();
        return 0;
    }
}

//显示下一集播放提示
function showNextVideoTips(currTime,totalTime){
    if((currTime+10)<totalTime || totalTime<=0 || isNaN(totalTime)) return 0;
    if(!!!isShowNextVideoTips&&currentVideoIndex<(videoDatas.length-1)){
        isShowNextVideoTips=true;
        $('nextVideoTips').style.display='block';
        setTimeout(function(){
            $('nextVideoTips').style.display='none';
            isShowNextVideoTips=false;
        },10000);
    }
}

//更新进度条位置
function updateProgressNav(index){//0-1之间
    var width=1160;//进度条总长度
    var newW=parseInt(width*index,10);
    newW+=10;
    $('playProcess').style.width=newW+'px';
}
//更新显示时间
function updateTimeNav(currTime,totalTime){//秒
    $('playTime').innerHTML=currTime.formatTime()+' / '+totalTime.formatTime();
    
}
//移动拖动指示点和时间
function updateDragNav(index,currTime){//0-1之间；秒
    var left=1160;//进度条总长度
    var newLeft=parseInt(left*index,10);
    
    $('dragIcon').style.left=(newLeft+10)+'px';
    $('dragTimeText').style.left=(newLeft-35)+'px';
    $('dragTimeText').innerHTML=currTime.formatTime();
}
function showDragNav(){
    $('dragIcon').style.display='inline';
    $('dragTimeText').style.display='block';
}
function hideDragNav(){
    $('dragIcon').style.display='none';
    $('dragTimeText').style.display='none';
}
//显示进度条
function showPlayControlNav(){
    $('playControlNavWrapper').style.display='block';
}
//隐藏进度条
function hidePlayControlNav(){
    $('playControlNavWrapper').style.display='none';
}

function pageOnunload(){
    if(playObj.releasePlayer){
        playObj.releasePlayer();//释放播放资源
    }
}


function deBug(s){
    if(flag_debug){
        logText += "<br/>" + s;
        $('divTest').innerHTML=logText;
        $('divTest').style.display='block';
    }
}

var forwardOrRewindTimer=null;//快进快退时的定时器
function rewind(){//快退
    playObj.clearTimer();//清除进度条计时器
    var newTime=playObj.currTime-timeStep();
    if(newTime<=0){
        newTime=0;
    }
    showDragNav();//显示拖动指示
    showPlayControlNav();

    playObj.currTime=newTime;
    updateProgressNav(parseFloat(newTime/playObj.totalTime,10));
    updateTimeNav(newTime,playObj.totalTime);
    updateDragNav(parseFloat(newTime/playObj.totalTime,10),newTime);

    if(!!forwardOrRewindTimer){
        clearTimeout(forwardOrRewindTimer);
        forwardOrRewindTimer=null;
    }
    forwardOrRewindTimer=setTimeout(function(){rewind();},200);
}
function rewindOver(){//快退完成
    clearTimeout(forwardOrRewindTimer);
    forwardOrRewindTimer=null;
    playObj.reload();//刷新播放
    setTimeout(function(){
        playObj.startTimer();////启动进度条计时器
        hideDragNav();//隐藏拖动指示
        if(playObj.status=='play') hidePlayControlNav();
    },3000);
}
function forward(){//快进
    playObj.clearTimer();//清除进度条计时器
    var newTime=playObj.currTime+timeStep();
    if(newTime>=playObj.totalTime){
        newTime=playObj.totalTime;
    }
    showDragNav();//显示拖动指示
    showPlayControlNav();

    playObj.currTime=newTime;
    updateProgressNav(parseFloat(newTime/playObj.totalTime,10));
    updateTimeNav(newTime,playObj.totalTime);
    updateDragNav(parseFloat(newTime/playObj.totalTime,10),newTime);

    if(!!forwardOrRewindTimer){
        clearTimeout(forwardOrRewindTimer);
        forwardOrRewindTimer=null;
    }
    /*if(newTime>=playObj.totalTime){//快进到视频最后了
        playObj.playOver();
        return 0;
    }*/
    forwardOrRewindTimer=setTimeout(function(){forward();},200);
}
function forwardOver(){//快进完成
    clearTimeout(forwardOrRewindTimer);
    forwardOrRewindTimer=null;
    
    playObj.reload();//刷新播放
    setTimeout(function(){
        playObj.startTimer();////启动进度条计时器
        hideDragNav();//隐藏拖动指示
        if(playObj.status=='play') hidePlayControlNav();
    },3000);
    
}
function timeStep(){//每次快进快退多少秒
    if(playObj.totalTime<=(60*15)){//总时长小于15分钟的
        return 5;
    }
    if(playObj.totalTime<=(60*30)){//总时长小于30分钟的
        return 10;
    }
    if(playObj.totalTime<=(60*60)){//总时长小于60分钟的
        return 20;
    }
    if(playObj.totalTime<=(60*90)){//90分钟
        return 40;
    }else{
        return 60;
    }
}
function soundPlus(){//声音加
    //playObj.getVolume();//获得声音值
    playObj.plusVolume();
    var vol=playObj.plusVolume();
    updateSoundNav(vol);
}
function soundReduce(){//声音减
    playObj.reduceVolume();
    var vol=playObj.reduceVolume();
    if(vol<=0){//静音
        myMedia.audioMute();//静音
    }
    updateSoundNav(vol);
}
function updateSoundNav(vol){
    //vol最多32
    var i=Math.ceil(vol/32*250);
    var top=250-i;
    $('soundProcess').style.top=top+'px';
    $('soundText').innerHTML=vol;
    if(top<250){//当前有声音
        $('soundMuteNavIcon').src='./images/play/sound_l.png';
    }else{
        $('soundMuteNavIcon').src='./images/play/sound-off_l.png';
        soundNavAutoShowHide();
        clearTimeout(soundTimer);
        soundTimer=null;
    }
}
function soundMute(){//静音切换
   if(myMedia.getMute() == 0){//当前值1为静音，0为非静音
        myMedia.audioMute();//静音
        $('soundMuteNavIcon').src='./images/play/sound-off_l.png';
        $('soundWrapper').style.display='block';
    }else{//取消静音 同时重新设置音量
        myMedia.audioUnmute();//恢复
        $('soundMuteNavIcon').src='./images/play/sound_l.png';
        soundNavAutoShowHide();
    }
}

var soundTimer=null;
function soundNavAutoShowHide(){
    $('soundWrapper').style.display='block';
    clearTimeout(soundTimer);
    soundTimer=null;
    soundTimer = setTimeout(function (){
        $('soundWrapper').style.display='none';
    },3000);
}


//设置系统发出的事件由grabeven函数处理
document.onsystemevent = grabevent;
//document.onirkeypress = grabevent;
//遥控器按钮的事件处理函数 
function grabevent(event) {
    var eventvalue = event.which;
    //var messageId = event.modifiers;
    //var eventStr = SysSetting.getEventInfo(messageId);
    var type = event.type;
    //alert("eventvalue="+eventvalue+"，messageId="+messageId+"，type="+type);
    switch (eventvalue) {
        case 10931: {//
            //alert("10931  开始加载流媒体");
            //deBug("10931   开始加载流媒体");
            break;
        }
        case 10932: {//
            //alert("10932  成功加载流媒体");
            //deBug( "10932   成功加载流媒体");
            break;
        }
        case 10933: {//
            ///alert("10933 加载流媒体失败");
            //deBug(" 10933   加载流媒体失败");
            break;
        }
        case 10934: {//
            //alert("10934  成功获取流媒体视频长度，调用MediaPlayer.getMediaDuration视频长度。得到长度："+mymedia.getMediaDuration());
            //deBug( "10934   成功获取流媒体视频长度"+myMedia.getMediaDuration());
        break;
        }
        case 10935: {//
            //alert("10935  流媒体视频播放失败");
            //deBug("10935   流媒体视频播放失败");
            break;
        }
        //case 10901://10901 是yinnisi旧中间件的事件，现在没用了
        case 10936: {
            //播放结束事件会重复触发
            //alert("10936  当前流媒体已经播放结束");
            //alert(myMedia.currentPoint);
            deBug(eventvalue+" 当前流媒体已经播放结束");
            //定时器也有个判断是否播放完
            if(!!playObj&&!!playObj.isGetTotalTime){
                playObj.clearTimer();
                playObj.playOver();
            }
            
            break;
        }
        default:{//用来调试
            deBug("eventvalue="+eventvalue+" type="+type);
            break;
        }
    }
}

var keyUpPressNumFlag=0;//上键按下去的次数
var keyDownPressNumFlag=0;//下键按下去的次数

//设置遥控器按键事件 播放控制
function keydownEvent(_event){
    var code = Event(_event);
    var eventvalue = event.which;
    var messageId = event.modifiers;
    //var eventStr = SysSetting.getEventInfo(messageId);
    var type = event.type;
    //alert("eventvalue="+eventvalue+"，messageId="+messageId+"，type="+type);
    switch (code) {
        case "KEY_EXIT":
        case "KEY_BACK": {//返回
            //alert('child');
            goBack();
            return 0;
            break;
        }
        case "KEY_RIGHT":{//右键
            if(playObj.totalTime<=0){
                return 0;
            }
            
            forward();//快进
            break;
        }
        case "KEY_LEFT":{//左键
            if(playObj.totalTime<=0){
                return 0;
            }
            
            rewind();//快退
            break;
        }
        case "KEY_DOWN":{
            if(currentVideoIndex>=(videoDatas.length-1)){
                //没有下一集了
                $('withoutVideoTips').innerHTML='没有下一集了';
                $('withoutVideoTips').style.display='block';
                setTimeout(function(){
                    $('withoutVideoTips').style.display='none';
                },3000);
                return 0;
            }

            $('withoutVideoTips').style.display='none';
            keyDownPressNumFlag++;
            $('keyUpOrKeyDownPressNumTips').innerHTML='再按一次【下键】播下一集';
            $('keyUpOrKeyDownPressNumTips').style.display='block';
            if(keyDownPressNumFlag==2){
                $('keyUpOrKeyDownPressNumTips').innerHTML='正在努力加载视频...';
                showLoading();
                $('keyUpOrKeyDownPressNumTips').style.display='none';
                keyDownPressNumFlag=0;
                setTimeout(function(){nextAction();},300);
                return 0;
            }
            setTimeout(function(){
                $('keyUpOrKeyDownPressNumTips').style.display='none';
                keyDownPressNumFlag=0;
            },3000);


            
            return 0;
            break;
        }
        case "KEY_UP":{
            if(currentVideoIndex<=0){
                //没有上一集了
                $('withoutVideoTips').innerHTML='没有上一集了';
                $('withoutVideoTips').style.display='block';
                setTimeout(function(){
                    $('withoutVideoTips').style.display='none';
                },3000);
                return 0;
            }

            $('withoutVideoTips').style.display='none';
            keyUpPressNumFlag++;
            $('keyUpOrKeyDownPressNumTips').innerHTML='再按一次【上键】播上一集';
            $('keyUpOrKeyDownPressNumTips').style.display='block';
            if(keyUpPressNumFlag==2){
                $('keyUpOrKeyDownPressNumTips').innerHTML='正在努力加载视频...';
                showLoading();
                $('keyUpOrKeyDownPressNumTips').style.display='none';
                keyUpPressNumFlag=0;
                setTimeout(function(){lastAction();},300);
                return 0;
            }
            setTimeout(function(){
                $('keyUpOrKeyDownPressNumTips').style.display='none';
                keyUpPressNumFlag=0;
            },3000);
            
            return 0;
            break;
        }
        case "KEY_SELECT": {//确定
            if(playObj.status=='play'){
               pauseAction();
               offPlayKeyboardControlEvent();
               onPauseKeyboardControlEvent();
               pauseControl.init();
            }else{//当前在暂停
                //playAction();
            }
            break;
        }
        case "KEY_VOLUME_UP":{//加声音
            soundPlus();
            soundNavAutoShowHide();
            break;
        }
        case "KEY_VOLUME_DOWN":{//减声音
            soundReduce();
            soundNavAutoShowHide();
            break;
        }
        case "KEY_VOLUME_MUTE":{//静音
            soundMute();
            break;
        }
        case "KEY_RED":{

            break;
        }
        case "KEY_YELLOW":{
            break;
        }
        default:{//用来调试
            //alert("eventvalue="+eventvalue+"，messageId="+messageId+"，type="+type);
            break;
        }
    }
}

function playAction(){
    playObj.playPlayer();//播放
    $('playStatusIcon').src='./images/play/play_icon.png';
    setTimeout(function(){
        if(playObj.status=='play') hidePlayControlNav();
    },2000);
}
function pauseAction(){
    playObj.pausePlayer();//暂停
    $('playStatusIcon').src='./images/play/pause_icon.png';
    showPlayControlNav();
}
function keyupEvent(_event){

    var code = Event(_event);
    var eventvalue = event.which;
    var messageId = event.modifiers;
    //var eventStr = SysSetting.getEventInfo(messageId);
    var type = event.type;
    //alert("eventvalue="+eventvalue+"，messageId="+messageId+"，type="+type);
    switch (code) {
        case "KEY_RIGHT":{//右键
            if(playObj.totalTime<=0){
                return 0;
            }
            forwardOver();//快进完成
            break;
        }
        case "KEY_LEFT":{//左键
            if(playObj.totalTime<=0){
                return 0;
            }
            rewindOver();//快退完成
            break;
        }
        case "KEY_SELECT": {//确定
            if(playObj.totalTime<=0){
                return 0;
            }
            break;
        }
        default:{//用来调试
            //alert("eventvalue="+eventvalue+"，messageId="+messageId+"，type="+type);
            break;
        }
    }
}

function offPlayKeyboardControlEvent(){
    document.onkeydown=null;
    document.onkeyup=null;
}
function onPlayKeyboardControlEvent(){
    document.onkeyup = keyupEvent;
    document.onkeydown = keydownEvent;
}
function onPauseKeyboardControlEvent(){
    document.onkeydown=pauseKeyDown;
}
function offPauseKeyboardControlEvent(){
    
}

function pauseKeyDown(_event){
    var code = Event(_event);
    var eventvalue = event.which;
    var messageId = event.modifiers;
    //var eventStr = SysSetting.getEventInfo(messageId);
    var type = event.type;
    //alert("eventvalue="+eventvalue+"，messageId="+messageId+"，type="+type);
    switch (code) {
        case "KEY_EXIT":
        case "KEY_BACK": {//返回
            //alert('child');
            goBack();
            return 0;
            break;
        }
        case "KEY_RIGHT":{//右键
           
            break;
        }
        case "KEY_LEFT":{//左键
           
            break;
        }
        case "KEY_DOWN":{
           pauseControl.down();
            break;
        }
        case "KEY_UP":{
            pauseControl.up();
            break;
        }
        case "KEY_SELECT": {//确定
            pauseControl.enter();
            return 0;
            break;
        }
        default:{//用来调试
            //alert("eventvalue="+eventvalue+"，messageId="+messageId+"，type="+type);
            break;
        }
    }
    return 0;
};

var pauseControl={
    focusDivIds:['pauseAdImgFocus','pauseBtFocus'],
    data:[
        {adImg:'./images/play/ad-pause.jpg',href:''},
        {}
    ],
    index:1,
    init:function(){
        this.index=1;//初始化焦点在继续播放按钮上
        this.render();
        this.blur();
        this.focus();
        this.show();
    },
    render:function(){
        $('pauseAdImg').innerHTML='<img src="'+this.data[0].adImg+'" />';
    },
    focus:function(){
        $(this.focusDivIds[this.index]).style.display='block';
    },
    blur:function(){
        $(this.focusDivIds[this.index]).style.display='none';
    },
    show:function(){
        $('pauseDiv').style.display='block';
    },
    hide:function(){
        $('pauseDiv').style.display='none';
    },
    up:function(){
        if(this.index<=0) return;
        this.blur();
        this.index--;
        this.focus();
    },
    down:function(){
        if(this.index>=(this.data.length-1)) return;
        this.blur();
        this.index++;
        this.focus();
    },
    enter:function(){
        if(pauseControl.index==1){
            pauseControl.hide();
            offPauseKeyboardControlEvent();
            onPlayKeyboardControlEvent();
            playAction();
        }
    }

};




