

var mainMenu = [ //菜单
	{
		"name": "首页"
	},
	{
		"name": "赛程安排"
	},
	{
		"name": "回看"
	},
	{
		"name": "赛事集锦"
	},
	{
		"name": "榜单"
	}
];

var subMenu = [ ////存储最终内容渲染数据 包含动态数据和布局模版数据
	
];

var contentDataDemo={ //动态数据demo
	imageProfix:'',
	data:[
		{
			imgUrl:'./images_second/index_img1.png',
			name:'运营推广位',
			href:''
		},
		{
			imgUrl:'./images_second/index_img2.png',
			name:'运营推广位',
			href:''
		},
		{
			imgUrl:'./images_second/index_img3.png',
			name:'《新药中超》包里呢奥替身与美女大干一场',
			href:''
		},
		{
			imgUrl:'./images_second/index_img3.png',
			name:'《新药中超》包里呢奥替身与美女大干一场',
			href:''
		},
		{
			imgUrl:'',
			name:'回看$$中超第22轮 江苏苏宁易购 VS 广州恒大淘宝||回看$$中超第22轮 北京国安 VS 大连阿尔滨||点击观看更多赛事>',
			href:''
		},
		{
			imgUrl:'./images_second/index_img3.png',
			name:'《新药中超》包里呢奥替身与美女大干一场',
			href:''
		},
		{
			imgUrl:'./images_second/index_img3.png',
			name:'《新药中超》包里呢奥替身与美女大干一场',
			href:''
		}

	]
};

var contentLayoutModeData={ //内容布局模版数据
	tpl0:[ //typeContent 1:图文滚动文字 0:文字不滚动文字 focusImg:为空光标用css边框，不为空用图片作为光标 
		{"focusImg":"",'left':70,'top':120,'width':566,'height':331,"typeContent":1,'textBg':'./images_second/index_word_bg1.png'}
		,{"focusImg":"",'left':643,'top':120,'width':280,'height':331,"typeContent":1,'textBg':'./images_second/index_word_bg2.png'}
		,{"focusImg":"",'left':930,'top':120,'width':280,'height':162,"typeContent":1,'textBg':'./images_second/index_word_bg2.png'}
		,{"focusImg":"",'left':930,'top':289,'width':280,'height':162,"typeContent":1,'textBg':'./images_second/index_word_bg2.png'}
		,{"focusImg":"",'left':70,'top':458,'width':566,'height':162,"typeContent":0,'textBg':'./images_second/index_word_item_bg.png'}
		,{"focusImg":"",'left':643,'top':458,'width':280,'height':162,"typeContent":1,'textBg':'./images_second/index_word_bg2.png'}
		,{"focusImg":"",'left':930,'top':458,'width':280,'height':162,"typeContent":1,'textBg':'./images_second/index_word_bg2.png'}
	],
	tpl1:[

	]
};


var menuPos = 0;//当前选择的菜单位置
menuPos=Q.getInt("menuPos",0);
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

	contral=menuObj;//控制交接   
	contral.focus();          
}

//页面dom加载完成
function pageOnload(){
	loadingObj.show();
	getMenuData();
};

//销毁页面
function pageOnunload(){

}

function getMenuData(){

	formatMenuData();
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
	        	formatMenuData(json);
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
function formatMenuData(json){
	mainMenu=[];
	//mainMenu=json.indexJson;
	mainMenu=index_second_menu_data;
	// for(var i=0,len=mainMenu.length;i<len;i++){
		//id
		//name
		//link
	// }
	
	menuObj.init();

	init();  //初始化页面控制

	loadingObj.hide();

	getContentData();
}


var menuBox = null;
function initMenuBox(){ //调用 showlist函数配置导航列表
	menuBox = new showList(menuObj.showItemCount, mainMenu.length, menuPos, 299, window);
	menuBox.focusDiv = "menu_focus";
	menuBox.listHigh = menuObj.itemWidth; //left值
	menuBox.listSign = 1;//左右模式
    menuBox.focusLoop = true;  // 导航循环
	menuBox.haveData = function(List){ //List.idPos:对象id,List.dataPos:数据id      
		$("menu_" + List.idPos).style.visibility = "visible";
		//$("menu_" + List.idPos).style.background ='url('+ mainMenu[List.dataPos].name +')  no-repeat';    
		$("menu_" + List.idPos).innerText = mainMenu[List.dataPos].name;

	};
	menuBox.notData  = function(List){
		$("menu_" + List.idPos).style.visibility = "hidden";
		$("menu_" + List.idPos).innerText = "";
	};
	menuBox.startShow();//去掉不移动

	// sendPageStatistic({
	// 	vipCode:'',
	// 	vipName:'',
	// 	channelId:'',
	// 	channelName:'',
	// 	labels:'',
	// 	labelIds:'',
	// 	pageName:'首页',
	// 	pageTitle:'首页'+'-'+mainMenu[menuPos].name
	// },function(){});

	
}



var menuObj={
	initLeft:287,
	itemWidth:182,
	showItemCount:5,//可视个数
	init : function(){
		this.render();
		initMenuBox();
		
	},
	render:function(){
		var s='';
		for(var i=0;i<this.showItemCount;i++){
			s+='<div id="menu_'+i+'" class="menu" style="position:absolute; top:31px; left:'+(this.initLeft+(i*this.itemWidth))+'px; width:'+this.itemWidth+'px; height:55px;line-height: 55px;'+(i==menuPos?'background:url(images_second/menu-on2.png) center center no-repeat;color:#ffffff;':'')+'"></div>';
		}
		
		$('menu_content').innerHTML=s;
	},
	focus:function(){
		$("menu_focus").style.opacity = 1;
	},
	blur:function(){
		$("menu_focus").style.opacity = 0;
	},
	changeMenu : function(_num){
		var index_temp=0;
		//$('menu_'+index_temp).style.color = '#ffffff';
		var tmpPos = menuBox.position;
		menuBox.changeList(_num);
		index_temp = _num + tmpPos;
		if(index_temp == -1){
			index_temp = 4;
		}else if(index_temp == 5){
			index_temp = 0;
		}
		//$('menu_'+index_temp).style.color = '#fe8011';
		
	},
	left:function(){
		this.changeMenu(-1);
	},
	right:function(){
		this.changeMenu(1);
	},
	up:function(){
	},
	down:function(){
		this.outDown();
	},
	outDown:function(){
		this.blur();
		contral=subMenuObj;
		contral.focus();
	},
	enter:function(){
		alert(mainMenu[menuBox.position].link);
		return 0;
		var url=mainMenu[menuBox.position].link+'?leagueId='+leagueId+'&backUrl='+Q.encode(backUrl);
		location.replace(url);
	}

};

var contentReq=null;
function getContentData(){//通过ajxa获取数据
	formatContentData(contentDataDemo);
	return 0;

	if(contentReq){
		contentReq.abort();
		contentReq=null;
	}
	loadingObj.show();
	var url=apiBasePath+'/ui/tv/index/select?typeId='+mainMenu[menuBox.position].typeId;
	contentReq=ajax({
	    url: url,
	    type: "GET", //HTTP 请求类型,GET或POST
	    dataType: "html", //请求的文件类型html/xml
	    onSuccess: function(html){ //请求成功后执行[可选]
	    	contentReq=null;
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
	    	contentReq=null;
	    },
	    post:"",  
	    timeout:70000  
	});
}
function formatContentData(json){//绑定内容数据
	var templateId=mainMenu.templateId||0;//模版id
	subMenu=contentLayoutModeData['tpl'+templateId];
	for(var i=0,len=subMenu.length;i<len;i++){
		if(!!!json.data[i]&&!!!json.data[i].imgUrl&&!!!json.data[i].name&&!!!json.data[i].href){
			subMenu[i]=0;
			continue;
		}
		//subMenu[i].imgUrl=json.data[i].imgUrl;//原始图片地址
		subMenu[i].img=(!!json.data[i].imgUrl ? json.imageProfix+json.data[i].imgUrl:'');//拼接后的图片地址
		subMenu[i].name=json.data[i].name;
		subMenu[i].href=json.data[i].href;
	}

	subMenuObj.init();	
	
}


var subMenuObj = {
	leftV:0,
	topV:0,
	subPos:0,
	sm : null,//光标寻找对象
	clear:function(){
		$("content").innerHTML = "";
		this.subPos = 0; //控制初始焦点
		this.topV = subMenu[this.subPos].top||0;
		this.leftV = subMenu[this.subPos].left||0;
	},
	init:function(){
		this.clear();
		this.sm = new SuperMouse(subMenu);//new  一个光标寻找对象
		this.render();
	},
	render:function(){

		var s = '';
		var subMenuNum = subMenu.length;
		for(var i = 0;i<subMenuNum;i++){
			if(!!!subMenu[i]) continue;
			s+='<div id="contentItem'+i+'" style="position:absolute; top:'+subMenu[i].top+'px; left:'+subMenu[i].left+'px; width:'+subMenu[i].width+'px; height:'+subMenu[i].height+'px; );">'+
				(!!subMenu[i].img&&subMenu[i].typeContent==1 ? '<img src="'+ subMenu[i].img +'" />' : '')+
				(subMenu[i].typeContent==0 ? 
					'<img src="'+ subMenu[i].textBg +'" />'+

					'<div style="position:absolute;left:0px;top:0px;height:54px;line-height:54px;width:94px;text-align:center;color:#6a708e;font-size:23px;">'+(subMenu[i].name.split('||')[0] ? subMenu[i].name.split('||')[0].split('$$')[0] : '')+'</div>'+
					'<div style="position:absolute;left:95px;top:0px;height:54px;line-height:54px;width:472px;text-align:left;color:#999cb0;font-size:23px;overflow:hidden;"><span style="padding-right:12px;padding-left:12px;">'+(subMenu[i].name.split('||')[0] ? subMenu[i].name.split('||')[0].split('$$')[1] : '')+'</span></div>'+
					'<div style="position:absolute;left:0px;top:55px;height:54px;line-height:54px;width:94px;text-align:center;color:#6a708e;font-size:23px;">'+(subMenu[i].name.split('||')[1] ? subMenu[i].name.split('||')[1].split('$$')[0] : '')+'</div>'+
					'<div style="position:absolute;left:95px;top:55px;height:54px;line-height:54px;width:472px;text-align:left;color:#999cb0;font-size:23px;overflow:hidden;"><span style="padding-right:12px;padding-left:12px;">'+(subMenu[i].name.split('||')[1] ? subMenu[i].name.split('||')[1].split('$$')[1] : '')+'</span></div>'+
					'<div style="position:absolute;left:0px;top:109px;height:54px;line-height:54px;width:566px;text-align:center;color:#999cb0;font-size:23px;">'+(subMenu[i].name.split('||')[2] ? subMenu[i].name.split('||')[2] : '')+'</div>'

					: 
					''
				)+
				(subMenu[i].typeContent==1 ? '<div id="contentItemText'+i+'" style="position:absolute;width:'+subMenu[i].width+'px;height:74px;line-height:104px;left:0px;top:'+(subMenu[i].height-74)+'px;overflow:hidden;text-align:left;font-size:21px;color:#ffffff;'+(!!subMenu[i].textBg ? 'background:url('+subMenu[i].textBg+') left bottom no-repeat;':'')+'"><!--<marquee scrollamount="3" behavior="alternate" width="'+subMenu[i].width+'" style="width: '+subMenu[i].width+'px;">'+subMenu[i].name+'</marquee>--><span style="padding-left:10px;padding-right:10px;">'+subMenu[i].name+'</span></div>' : '')
			+'</div>';
		}
		$("content").innerHTML = s;

		this.updateFocus();
		if(contral.focusArea==2){//当前焦点在内容区
			this.afterUpdateFocus();
		}
	},
	focus:function(){
		
		$("content_focus").style.opacity = 1;
		$("content_focus").style.visibility = 'visible';	

		this.afterUpdateFocus();
	},
	blur:function(){
		$("content_focus").style.opacity = 0;
		$("content_focus").style.visibility = 'hidden';
		this.beforeUpdateFocus();
	},
	outUp:function(){
		console.log('outUp');
		this.blur();
        contral=menuObj;
        contral.focus();

	},
	outDown:function(){
		console.log('outDown');
	},
	outLeft : function(){ //频道内容 到达左边切换频道
		console.log('outLeft');

	},
	outRight : function(){ //频道内容 到达右边切换频道
	    console.log('outRight');

	},
	changeX:function(_num){ //控制频道内容左右移动
		
		var last_subPos=this.subPos;

		this.beforeUpdateFocus();
		this.sm.setData(subMenu);
		//输入当前栏目内容数据
		this.subPos=this.sm.getSubPosX(_num,this.subPos);
		//this.subPos输出目标元素的索引值
		if(_num>0&&this.subPos===last_subPos){//右边界
			this.afterUpdateFocus();
			this.outRight();
			return 0;
		}
		if(_num<0&&this.subPos===last_subPos){//左边界
			this.afterUpdateFocus();
			this.outLeft();
			return 0;
		}
		this.updateFocus();
		this.afterUpdateFocus();
		console.log('x',this.subPos);
	},
	afterUpdateFocus:function(){
		$('contentItem'+this.subPos).style.zIndex=1;
		$('contentItem'+this.subPos).style.transform='scale(1.08,1.08)';
		$('contentItem'+this.subPos).style.webkitTransform='scale(1.08,1.08)';
		// $('content_focus').style.transform='scale(1.08,1.08)';
		// $('content_focus').style.webkitTransform='scale(1.08,1.08)';
		if($('contentItemText'+this.subPos)){//滚动
			$('contentItemText'+this.subPos).innerHTML='<marquee scrollamount="3" behavior="alternate" width="'+subMenu[this.subPos].width+'" style="width: '+subMenu[this.subPos].width+'px;">'+subMenu[this.subPos].name+'</marquee>';
		}
	},
	beforeUpdateFocus:function(){
		$('contentItem'+this.subPos).style.zIndex=0;
		$('contentItem'+this.subPos).style.transform='scale(1,1)';
		$('contentItem'+this.subPos).style.webkitTransform='scale(1,1)';

		if($('contentItemText'+this.subPos)){//普通文字
			$('contentItemText'+this.subPos).innerHTML='<span style="padding-left:10px;padding-right:10px;">'+subMenu[this.subPos].name+'</span>';
		}
		// $('content_focus').style.transform='scale(1,1)';
		// $('content_focus').style.webkitTransform='scale(1,1)';
	},
	updateFocus:function(){
		//$("content_focus").style.backgroundImage="url("+ subMenu[this.subPos].focusImg +")";
		var item = subMenu[this.subPos];
		var focusDiv = $("content_focus");

		var	width=item.width-8;
		var height=item.height-8;
		var	left=item.left;
		var top=item.top;

		this.leftV=item.left;
		this.topV=item.top;

		focusDiv.style.width  = width  + "px";
		focusDiv.style.height = height + "px";
		focusDiv.style.left   = left   + "px";
		focusDiv.style.top    = top    + "px";

	},
	changeY:function(_num){
		var last_subPos=this.subPos;

		this.beforeUpdateFocus();
		this.sm.setData(subMenu);
		//输入当前栏目内容数据
		this.subPos=this.sm.getSubPosY(_num,this.subPos);
		//this.subPos输出目标元素的索引值
		if(_num>0&&this.subPos===last_subPos){//下边界
			this.afterUpdateFocus();
			this.outDown();
			return 0;
		}
		if(_num<0&&this.subPos===last_subPos){//上边界
			this.afterUpdateFocus();
			this.outUp();
			return 0;
		}

		this.updateFocus();
		this.afterUpdateFocus();

		console.log('y',this.subPos);
	},
	left:function(){
		this.changeX(-1);
	},
	right:function(){
		this.changeX(1);
	},
	up:function(){
		this.changeY(-1);
	},
	down:function(){
		this.changeY(1);
	},
	enter:function(){
		if(!!!subMenu[this.subPos].href||subMenu[this.subPos].href=='#'){
			return 0;
		}
		var url = subMenu[this.subPos].href;
		//url='list.html';
		var backUrl=location.href;//'index.html?menuPos='+menuBox.position;
		if(url.indexOf('?')>-1){
			url+='&backUrl='+Q.encode(backUrl);
		}else{
			url+='?backUrl='+Q.encode(backUrl);
		}
		location.href = url;
	}
};

