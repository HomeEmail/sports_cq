


var contentId=0;//id
contentId=Q.getInt('contentId',0);
var leagueId =0;
leagueId = Q.getInt('leagueId',0);

function eventInit(_event){
	if (_event.type=='keydown') {
		document.onkeypress=null;
	};
	var code = Event(_event);
	switch(code){
		case "KEY_EXIT":
		case "KEY_BACK": //
			goBack();	
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


var loadingObj=new Loading({
	zIndex:99999
});

var contral = {
	init:function(){

	},
	up : function(){
	},
	down : function(){ 
	},
	right : function(){
	},
	left : function(){
	},
	enter : function(){
	},
	back : function(){
		goBack();
	}
}
function goBack(){
	window.location.href = backUrl||portalUrl;
}

function grabEvent(_event){
	if (_event.type=='keydown') {
		document.onkeypress=null;
	};
	var code = Event(_event);

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
		case "KEY_BACK": //
			contral.back?contral.back():goBack();	
			return false;
			break;
		default:
			break;
	}
}


function init(){
	if(document.onkeypress!==null){
		document.onkeypress = grabEvent;
	}
	document.onkeydown = grabEvent; 

	       
}

//页面dom加载完成
function pageOnload(){
	loadingObj.show();
	timeNowStart();

	getContentData();

};

//销毁页面
function pageOnunload(){

}

function timeNowStart(){
	setInterval(function(){
		$('timeNow').innerHTML=new Date().Format('hh:mm:ss');
	},970);
}


function getContentData(){

	formatContentData();
	return 0;

	loadingObj.show();
	var url=apiBasePath+'/ui/tv/index/types';
	//alert(url);
	ajax({
	    url: url,
	    type: "GET", //HTTP 请求类型,GET或POST
	    dataType: "html", //请求的文件类型html/xml
	    onSuccess: function(html){ //请求成功后执行[可选]
	        var json=eval('('+html+')');
	        loadingObj.hide();
	        if(parseInt(json.code,10)==1){
	        	formatContentData(json);
	        }else{
	        	alert(json.message);
	        }
	    },
	    onComplete:function(){
	       
	    },
	    onError:function(){ //请求失败后执行[可选]
	       
	    },
	    post:"",  
	    timeout:70000  
	});
}

var finishStatus=-1;//-1未开始 0正在直播 1已结束
var isOrder=false;//是否订购
var isReserve=false;//是否预约
function formatContentData(json){

	detailBtPad.btData=[];
	detailBtPad.btData=[ //demo data 
		{name:'全屏',id:1},
		{name:'赛程',id:2},
		{name:'在线订购',id:3}

	];

	init();  //初始化页面控制

	if(finishStatus==-1){//未开始
		$('playImg').src='images_second/detail/notStart.png';
		$('playImgIcon').style.display='none';
		$('notStartText').style.display='block';

		$('contentName').innerHTML='美操 第14轮';
		$('sayerName').innerHTML='解说: 王洋';
		$('startTimeText').innerHTML='1月20日 22:33';

		$('startTimeBox').style.display='block';
	}
	if(finishStatus==1){//已结束
		$('playImg').src='images_second/detail/play_img.png';
		$('playImgIcon').style.display='block';
		$('notStartText').style.display='none';

		$('score1').innerHTML=3;
		$('score2').innerHTML=6;


		$('scoreBox').style.display='block';
		$('lookBackTips').style.display='block';
	}
	if(finishStatus==0){ //直播中
		$('playImg').src='images_second/detail/play_img.png';
		$('playImgIcon').style.display='block';
		$('notStartText').style.display='none';

		$('playingBox').style.display='block';
	}
 
	detailBtPad.init();

	loadingObj.hide();

	contral=detailBtPad;//控制交接  
	contral.focus(); 

	
}

//上边操作 begin
var detailBtPad={
	listObj:null,
	initLeft:725,
	itemWidth:155,
	initTop:378,
	itemHeight:60,
	showItemCount:3,//可视个数
	initDataPos:0,//初始化数据下标
	btData:[
		{name:'全屏',id:1},
		{name:'赛程',id:2},
		{name:'在线订购',id:3}
	],
	init:function(initIndex){
		this.render();
		this.initList({initFocusDataIndex:initIndex||0});
		this.updateContent();
	},
	render:function(){
		var s='';
		for(var i=0;i<this.showItemCount;i++){
			s+='<div id="detailBt_'+i+'" class="menu" style="position:absolute; top:'+(this.initTop)+'px; left:'+(this.initLeft+(i*this.itemWidth))+'px; width:'+this.itemWidth+'px; height:'+this.itemHeight+'px;z-index:3;line-height: '+this.itemHeight+'px;color:#ffffff;font-size:22px;"></div>';
		}
		
		$('detailBt_content').innerHTML=s;
	}
	,initList:function(o){
		var o=o||{};
		var dataLen=this.btData.length;//列表数据总总长度
		var focusIndex=o.initFocusDataIndex||0;//初始化focus第几个数据
		var itemHigh=this.itemWidth;//每项的高度或宽度
		var sign=1;//1左右模式，0上下模式
		var focusLoop=false;//true为循环，false为不循环
		this.listObj=null;
		this.listObj = new showList(this.showItemCount, dataLen, focusIndex,0, window);
		this.listObj.focusDiv = 'detailBt_focus';
		this.listObj.listHigh = itemHigh; 
		this.listObj.listSign = sign;
		//this.listObj.focusFixed=true;//焦点固定，自动循环
	    this.listObj.focusLoop = focusLoop;  
	    this.listObj.focusPos=0;//当前列表焦点的位置；
	    this.initDataPos=focusIndex;
	    this.listObj.position=this.initDataPos;//当前数据焦点的位置；
		this.listObj.haveData = function(list){ //list.idPos:对象id,list.dataPos:数据id      
			$("detailBt_" + list.idPos).style.visibility = "visible";
			$("detailBt_" + list.idPos).innerHTML = detailBtPad.btData[list.dataPos].name; 
			
			$("detailBt_" + list.idPos).style.background='url(images_second/detail/bt_'+list.idPos+'.png) center center no-repeat';
			$("detailBt_" + list.idPos).style.color='#ffffff';
			
		};
		this.listObj.notData  = function(list){
			$("detailBt_" + list.idPos).style.visibility = "hidden";
			$("detailBt_" + list.idPos).innerHTML = "";
		};
		this.listObj.startShow();//去掉不移动
	},
	updateSelect:function(){
		
		// $("detailBt_" + this.listObj.lastFocusPos).style.background='none';
		// $("detailBt_" + this.listObj.lastFocusPos).style.color='#7a8096';

		// $("detailBt_" + this.listObj.focusPos).style.background='url(images_second/left_menu_bg.png) center center no-repeat';
		// $("detailBt_" + this.listObj.focusPos).style.color='#ffffff';

	}
	,focus:function(){
		$('detailBt_focus').style.opacity=1;
	}
	,blur:function(){
		$('detailBt_focus').style.opacity=0;
	}
	,updateContent:function(){//更新右边内容
		var that = this;
		
		
		
	}
	,outUp:function(){
		
	}//将要跳出本交互模块的处理
	,outDown:function(){}//将要跳出本交互模块的处理
	,outLeft:function(){}//将要跳出本交互模块的处理
	,outRight:function(){

		
	}//将要跳出本交互模块的处理
	,left:function(){
		if(this.listObj.position<=0){
			this.outLeft();
		}
		this.listObj.left();
		//this.updateSelect();
		this.updateContent();
	},
	right:function(){
		if(this.listObj.position==this.btData.length-1){
			return 0;
		}
		this.listObj.right();
		//this.updateSelect();
		this.updateContent();
	},
	up:function(){
		
	},
	down:function(){
		this.outDown();
	},
	enter:function(){
		return 0;
		
		// alert(this.btData[this.listObj.position].name);
	},
	inputNum:function(i){

	}
};
//上边操作 end

