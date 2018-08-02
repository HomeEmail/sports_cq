

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

var listData = {////存储每一页最终内容渲染数据 
	//'page1':[] //demo
};

var contentDataDemo={ //动态数据demo
	imageProfix:'',
	pageNo:1,
	totalPage:2,
	data:[
		{
			imgUrl:'./images_second/player1.png',
			name:'哈德森菲尔德瑟都等',
			id:'',
			index:1,
			sessionIndex:3,
			jifen:3,
			sheng:1,
			ping:2,
			fu:3,
			jinqiu:3,
			shiqiu:2,
			jingshengqiu:2
		},
		{
			imgUrl:'./images_second/player1.png',
			name:'哈德森菲尔德瑟都等',
			id:'',
			index:1,
			sessionIndex:3,
			jifen:3,
			sheng:1,
			ping:2,
			fu:3,
			jinqiu:3,
			shiqiu:2,
			jingshengqiu:2
		},
		{
			imgUrl:'./images_second/player1.png',
			name:'哈德森菲尔德瑟都等',
			id:'',
			index:1,
			sessionIndex:3,
			jifen:3,
			sheng:1,
			ping:2,
			fu:3,
			jinqiu:3,
			shiqiu:2,
			jingshengqiu:2
		},
		{
			imgUrl:'./images_second/player1.png',
			name:'哈德森菲尔德瑟都等',
			id:'',
			index:1,
			sessionIndex:3,
			jifen:3,
			sheng:1,
			ping:2,
			fu:3,
			jinqiu:3,
			shiqiu:2,
			jingshengqiu:2
		},
		{
			imgUrl:'./images_second/player1.png',
			name:'哈德森菲尔德瑟都等',
			id:'',
			index:1,
			sessionIndex:3,
			jifen:3,
			sheng:1,
			ping:2,
			fu:3,
			jinqiu:3,
			shiqiu:2,
			jingshengqiu:2
		},
		{
			imgUrl:'./images_second/player1.png',
			name:'哈德森菲尔德瑟都等',
			id:'',
			index:1,
			sessionIndex:3,
			jifen:3,
			sheng:1,
			ping:2,
			fu:3,
			jinqiu:3,
			shiqiu:2,
			jingshengqiu:2
		},
		{
			imgUrl:'./images_second/player1.png',
			name:'哈德森菲尔德瑟都等',
			id:'',
			index:1,
			sessionIndex:3,
			jifen:3,
			sheng:1,
			ping:2,
			fu:3,
			jinqiu:3,
			shiqiu:2,
			jingshengqiu:2
		},
		{
			imgUrl:'./images_second/player1.png',
			name:'哈德森菲尔德瑟都等',
			id:'',
			index:1,
			sessionIndex:3,
			jifen:3,
			sheng:1,
			ping:2,
			fu:3,
			jinqiu:3,
			shiqiu:2,
			jingshengqiu:2
		},
		{
			imgUrl:'./images_second/player1.png',
			name:'哈德森菲尔德瑟都等',
			id:'',
			index:1,
			sessionIndex:3,
			jifen:3,
			sheng:1,
			ping:2,
			fu:3,
			jinqiu:3,
			shiqiu:2,
			jingshengqiu:2
		},
		{
			imgUrl:'./images_second/player1.png',
			name:'哈德森菲尔德瑟都等',
			id:'',
			index:1,
			sessionIndex:3,
			jifen:3,
			sheng:1,
			ping:2,
			fu:3,
			jinqiu:3,
			shiqiu:2,
			jingshengqiu:2
		}

	]
};


var contentDataDemo1={ //动态数据demo //射手榜
	imageProfix:'',
	pageNo:1,
	totalPage:2,
	data:[
		{
			name:'哈德森菲尔德瑟都等',
			id:'',
			index:1,
			qiudui:'莱斯特城',
			totalNum:3,
			putongNum:1,
			dianqiuNum:2,
			wulongNum:3
		},
		{
			name:'哈德森菲尔德瑟都等',
			id:'',
			index:1,
			qiudui:'莱斯特城',
			totalNum:3,
			putongNum:1,
			dianqiuNum:2,
			wulongNum:3
		},
		{
			name:'哈德森菲尔德瑟都等',
			id:'',
			index:1,
			qiudui:'莱斯特城',
			totalNum:3,
			putongNum:1,
			dianqiuNum:2,
			wulongNum:3
		},
		{
			name:'哈德森菲尔德瑟都等',
			id:'',
			index:1,
			qiudui:'莱斯特城',
			totalNum:3,
			putongNum:1,
			dianqiuNum:2,
			wulongNum:3
		},
		{
			name:'哈德森菲尔德瑟都等',
			id:'',
			index:1,
			qiudui:'莱斯特城',
			totalNum:3,
			putongNum:1,
			dianqiuNum:2,
			wulongNum:3
		},
		{
			name:'哈德森菲尔德瑟都等',
			id:'',
			index:1,
			qiudui:'莱斯特城',
			totalNum:3,
			putongNum:1,
			dianqiuNum:2,
			wulongNum:3
		},
		{
			name:'哈德森菲尔德瑟都等',
			id:'',
			index:1,
			qiudui:'莱斯特城',
			totalNum:3,
			putongNum:1,
			dianqiuNum:2,
			wulongNum:3
		},
		{
			name:'哈德森菲尔德瑟都等',
			id:'',
			index:1,
			qiudui:'莱斯特城',
			totalNum:3,
			putongNum:1,
			dianqiuNum:2,
			wulongNum:3
		},
		{
			name:'哈德森菲尔德瑟都等',
			id:'',
			index:1,
			qiudui:'莱斯特城',
			totalNum:3,
			putongNum:1,
			dianqiuNum:2,
			wulongNum:3
		},
		{
			name:'哈德森菲尔德瑟都等',
			id:'',
			index:1,
			qiudui:'莱斯特城',
			totalNum:3,
			putongNum:1,
			dianqiuNum:2,
			wulongNum:3
		}

	]
};

var menuPos = 0;//当前选择的菜单位置
menuPos=Q.getInt("menuPos",0);
var menuId=0;//当前选择的菜单id
menuId=Q.getInt('menuId',0);
var leagueId =0;
leagueId = Q.getInt('leagueId',131897);
var pageNoInit=Q.getInt('pageNo',1);

var leagueName='';

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
	getMenuData();
};

//销毁页面
function pageOnunload(){

}

function getMenuData(){

	// formatMenuData();
	// return 0;

	loadingObj.show();
	var url=serverPath+'portalData/leagueCategoryTitle.utvgo?categoryCode='+leagueId+'&platform='+platform;
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
	//mainMenu=index_second_menu_data;
	if(!!json.data.index){
		mainMenu.push({
			name:json.data.index.blockName,
			id:json.data.index.categoryCode,
			link:'index_second.html'
		});
	}
	if(!!json.data.schedule){
		mainMenu.push({
			name:json.data.schedule.blockName,
			id:json.data.schedule.categoryCode,
			link:'schedule_second.html'
		});
	}
	if(!!json.data.lookBack){
		mainMenu.push({
			name:json.data.lookBack.blockName,
			id:json.data.lookBack.categoryCode,
			link:'lookBack_second.html'
		});
	}
	if(!!json.data.highlights){
		mainMenu.push({
			name:json.data.highlights.blockName,
			id:json.data.highlights.categoryCode,
			link:'matchCollection_second.html'
		});
	}
	if(!!json.data.rank){
		mainMenu.push({
			name:json.data.rank.blockName,
			id:json.data.rank.categoryCode,
			link:'topList_second.html'
		});
	}
	$('league_name').innerHTML=json.data.leagueName;
	$('league_logo').src=json.data.imageUrl;
	leagueName=json.data.leagueName;

	for(var i=0,len=mainMenu.length;i<len;i++){
		if(mainMenu[i].id==menuId){
			menuPos=i; //设置选择的菜单位置
		}
	}

	//订购状态
	$('leagueOrderStatus').style.display='none';

	
	menuObj.init();

	init();  //初始化页面控制

	loadingObj.hide();

	contral=menuObj;//控制交接给菜单  
	contral.focus();  

	menuPad.init();

	
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
		contral=menuPad;
		contral.focus();
	},
	enter:function(){
		// if(mainMenu[menuBox.position].id==menuId){
		// 	return 0;
		// }
		// alert(mainMenu[menuBox.position].link);
		// return 0;
		var url=mainMenu[menuBox.position].link+'?menuId='+mainMenu[menuBox.position].id+'&leagueId='+leagueId+'&backUrl='+Q.encode(backUrl);
		location.replace(url);
	}

};

//左边菜单 begin
var menuPad={
	listObj:null,
	initLeft:80,
	itemWidth:123,
	initTop:150,
	itemHeight:63,
	showItemCount:5,//可视个数
	initDataPos:0,
	menuData:[
		{name:'积分榜'},
		{name:'射手榜'}
	],
	init:function(){
		this.render();
		this.initList({initFocusDataIndex:0});
		this.updateContent();
	},
	render:function(){
		var s='';
		for(var i=0;i<this.showItemCount;i++){
			s+='<div id="menuLeft_'+i+'" class="menu" style="position:absolute; top:'+(this.initTop+(i*this.itemHeight))+'px; left:'+(this.initLeft)+'px; width:'+this.itemWidth+'px; height:'+this.itemHeight+'px;z-index:3;line-height: '+this.itemHeight+'px;color:#7a8096;"></div>';
		}
		
		$('menuLeft_content').innerHTML=s;
	}
	,initList:function(o){
		var o=o||{};
		var dataLen=this.menuData.length;//列表数据总总长度
		var focusIndex=o.initFocusDataIndex||0;//初始化focus第几个数据
		var itemHigh=63;//每项的高度或宽度
		var sign=0;//1左右模式，0上下模式
		var focusLoop=false;//true为循环，false为不循环
		this.listObj=null;
		this.listObj = new showList(this.showItemCount, dataLen, focusIndex,0, window);
		this.listObj.focusDiv = 'menuLeft_focus';
		this.listObj.listHigh = itemHigh; 
		this.listObj.listSign = sign;
	    this.listObj.focusLoop = focusLoop;  
	    this.listObj.focusPos=0;//当前列表焦点的位置；
	    this.listObj.position=this.initDataPos;//当前数据焦点的位置；
		this.listObj.haveData = function(list){ //list.idPos:对象id,list.dataPos:数据id      
			$("menuLeft_" + list.idPos).style.visibility = "visible";
			$("menuLeft_" + list.idPos).innerHTML = menuPad.menuData[list.dataPos].name; 
			if(list.dataPos==menuPad.listObj.position){
				$("menuLeft_" + list.idPos).style.background='url(images_second/left_menu_bg.png) center center no-repeat';
				$("menuLeft_" + list.idPos).style.color='#ffffff';
			}else{
				$("menuLeft_" + list.idPos).style.background='none';
				$("menuLeft_" + list.idPos).style.color='#7a8096';
			}
		};
		this.listObj.notData  = function(list){
			$("menuLeft_" + list.idPos).style.visibility = "hidden";
			$("menuLeft_" + list.idPos).innerHTML = "";
		};
		this.listObj.startShow();//去掉不移动
	},
	updateSelect:function(){
		
		$("menuLeft_" + this.listObj.lastFocusPos).style.background='none';
		$("menuLeft_" + this.listObj.lastFocusPos).style.color='#7a8096';

		$("menuLeft_" + this.listObj.focusPos).style.background='url(images_second/left_menu_bg.png) center center no-repeat';
		$("menuLeft_" + this.listObj.focusPos).style.color='#ffffff';

	}
	,focus:function(){
		$('menuLeft_focus').style.opacity=1;
	}
	,blur:function(){
		$('menuLeft_focus').style.opacity=0;
	}
	,updateContent:function(){//更新右边内容
		var that = this;
		
		if(this.listObj.position==0){//积分榜
			if(!!menuPad.menuData[menuPad.listObj.position].currentPage&&!!listData['page'+menuPad.menuData[menuPad.listObj.position].currentPage]){
				contentPad.currentPage=menuPad.menuData[menuPad.listObj.position].currentPage;
				contentPad.totalPage=menuPad.menuData[menuPad.listObj.position].totalPage;
				contentPad.currentPageData=listData['page'+contentPad.currentPage];
				contentPad.init();
				contentPad.render();
				contentPad.resetFocusInfo();
				return 0;
			}
			getContentData(pageNoInit,function(){//此区域初始化 光标位置

				/*if(rFpos!==''){ //表示页面初始光标在内容列表里
					contral.blur();
					contentPad.index=rFpos;
					contentPad.setCurrentColAndRowByIndex();
					contral=contentPad;//控制交接   
					contral.focus();   
				}*/
				
			});
		}
		if(this.listObj.position==1){//射手榜
			if(!!menuPad.menuData[menuPad.listObj.position].currentPage&&!!listData['pages'+menuPad.menuData[menuPad.listObj.position].currentPage]){
				contentPad.currentPage=menuPad.menuData[menuPad.listObj.position].currentPage;
				contentPad.totalPage=menuPad.menuData[menuPad.listObj.position].totalPage;
				contentPad.currentPageData=listData['pages'+contentPad.currentPage];
				contentPad.init();
				contentPad.render1();
				contentPad.resetFocusInfo();
				return 0;
			}
			getContentData1(pageNoInit,function(){//此区域初始化 光标位置
				
			});
		}
	}
	,outUp:function(){
		this.blur();
		contral=menuObj;
		contral.focus();
	}//将要跳出本交互模块的处理
	,outDown:function(){}//将要跳出本交互模块的处理
	,outLeft:function(){}//将要跳出本交互模块的处理
	,outRight:function(){

		if(menuPad.listObj.position==0&&!!!listData['page'+menuPad.menuData[menuPad.listObj.position].currentPage]){//右边没内容
			return 0;
		}
		if(menuPad.listObj.position==1&&!!!listData['pages'+menuPad.menuData[menuPad.listObj.position].currentPage]){//右边没内容
			return 0;
		}

		this.blur();
		contral=contentPad;
		contentPad.focus();
	}//将要跳出本交互模块的处理
	,left:function(){

	},
	right:function(){
		this.outRight();
	},
	up:function(){
		if(this.listObj.position<=0){
			this.outUp();
		}
		this.listObj.up();
		this.updateSelect();
		this.updateContent();
	},
	down:function(){
		if(this.listObj.position==this.menuData.length-1){
			return 0;
		}
		this.listObj.down();
		this.updateSelect();
		this.updateContent();
	},
	enter:function(){
		return 0;
		
		// alert(this.menuData[this.listObj.position].name);
	},
	inputNum:function(i){

	}
};
//左边菜单 end


var contentReq=null;
function getContentData(pageNo,fn){//通过ajxa获取数据 积分榜
	// formatContentData(contentDataDemo,fn);
	// return 0;

	if(contentReq){
		contentReq.abort();
		contentReq=null;
	}
	loadingObj.show();
	var url=serverPath+'score/rank.utvgo?menuId='+menuId+'&leagueId='+leagueId+'&leagueName='+leagueName+'&pageNo='+pageNo+'&pageSize=10';
	contentReq=ajax({
	    url: url,
	    type: "GET", //HTTP 请求类型,GET或POST
	    dataType: "html", //请求的文件类型html/xml
	    onSuccess: function(html){ //请求成功后执行[可选]
	    	contentReq=null;
	        var json=eval('('+html+')');
	        loadingObj.hide();

	        if(parseInt(json.code,10)==1){
	        	formatContentData(json,fn);
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
function formatContentData(json,fn){//绑定内容数据
	contentPad.currentPage=json.currentPage||1;
	contentPad.totalPage=json.totalPage||1;
	menuPad.menuData[menuPad.listObj.position].currentPage=contentPad.currentPage;
	menuPad.menuData[menuPad.listObj.position].totalPage=contentPad.totalPage;
	contentPad.currentPageData=[];
	listData['page'+contentPad.currentPage]=[];//缓存此页数据
	for(var i=0,len=json.data.length;i<len;i++){
		contentPad.currentPageData.push({
			img:json.data[i].teamImageUrl,
			name:json.data[i].teamName,
			id:json.data[i].pkId,
			index:json.data[i].rank,
			sessionIndex:json.data[i].matchNum,
			jifen:json.data[i].score,
			sheng:json.data[i].winNum,
			ping:json.data[i].drawNum,
			fu:json.data[i].loseNum,
			jinqiu:json.data[i].goalsNum,
			shiqiu:json.data[i].loseGoalsNum,
			jingshengqiu:json.data[i].goalsNum-json.data[i].loseGoalsNum
		
		});
		//缓存此页数据
		listData['page'+contentPad.currentPage].push({
			img:json.data[i].teamImageUrl,
			name:json.data[i].teamName,
			id:json.data[i].pkId,
			index:json.data[i].rank,
			sessionIndex:json.data[i].matchNum,
			jifen:json.data[i].score,
			sheng:json.data[i].winNum,
			ping:json.data[i].drawNum,
			fu:json.data[i].loseNum,
			jinqiu:json.data[i].goalsNum,
			shiqiu:json.data[i].loseGoalsNum,
			jingshengqiu:json.data[i].goalsNum-json.data[i].loseGoalsNum
		});
	}

	contentPad.init();
	contentPad.render();
	contentPad.resetFocusInfo();
	!!fn&&fn();

}



function getContentData1(pageNo,fn){//通过ajxa获取数据 //射手榜
	// formatContentData1(contentDataDemo1,fn);
	// return 0;

	if(contentReq){
		contentReq.abort();
		contentReq=null;
	}
	loadingObj.show();
	var url=serverPath+'shoot/rank.utvgo?menuId='+menuId+'&leagueId='+leagueId+'&leagueName='+leagueName+'&pageNo='+pageNo+'&pageSize=10';
	contentReq=ajax({
	    url: url,
	    type: "GET", //HTTP 请求类型,GET或POST
	    dataType: "html", //请求的文件类型html/xml
	    onSuccess: function(html){ //请求成功后执行[可选]
	    	contentReq=null;
	        var json=eval('('+html+')');
	        loadingObj.hide();

	        if(parseInt(json.code,10)==1){
	        	formatContentData1(json,fn);
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
function formatContentData1(json,fn){//绑定内容数据
	contentPad.currentPage=json.currentPage||1;
	contentPad.totalPage=json.totalPage||1;
	menuPad.menuData[menuPad.listObj.position].currentPage=contentPad.currentPage;
	menuPad.menuData[menuPad.listObj.position].totalPage=contentPad.totalPage;
	contentPad.currentPageData=[];
	listData['pages'+contentPad.currentPage]=[];//缓存此页数据
	for(var i=0,len=json.data.length;i<len;i++){
		contentPad.currentPageData.push({
			name:json.data[i].playerName,
			id:json.data[i].pkId,
			index:json.data[i].rank,
			qiudui:json.data[i].teamName,
			totalNum:json.data[i].itemValue||'-',
			putongNum:json.data[i].putongNum||'-',
			dianqiuNum:json.data[i].dianqiuNum||'-',
			wulongNum:json.data[i].wulongNum||'-'
		
		});
		//缓存此页数据
		listData['pages'+contentPad.currentPage].push({
			name:json.data[i].playerName,
			id:json.data[i].pkId,
			index:json.data[i].rank,
			qiudui:json.data[i].teamName,
			totalNum:json.data[i].itemValue||'-',
			putongNum:json.data[i].putongNum||'-',
			dianqiuNum:json.data[i].dianqiuNum||'-',
			wulongNum:json.data[i].wulongNum||'-'
		});
	}

	contentPad.init();
	contentPad.render1();
	contentPad.resetFocusInfo();
	!!fn&&fn();

}

//右边内容 begin
var contentPad={
	wrapperId:'contentWrapper',//外层div id
	itemId:'listItem',//每项 dom id的名称前缀
	rowNum:10,//行数
	colNum:1,//列数
	itemWidth:990,//每一项的宽度px
	itemHeight:50,//每一项的高度px
	initTop:173,//初始top值px
	initLeft:223,//初始left值px
	rowMargin:0,//行之间间隙距离px
	colMargin:0,//列之间间隙距离px
	focusDivLeftOffset:-2,//光标left偏移值px
	focusDivTopOffset:-2,//光标top偏移值px
	pageSize:10,
	currentPage:1,
	totalPage:1,
	currentPageData:[
		{img:'./images/list-item2.png',name:'冰河世纪4',id:''},
		{img:'./images/list-item2.png',name:'冰河世纪4斯蒂芬斯蒂芬',id:''},
		{img:'./images/list-item2.png',name:'冰河世纪4试点范围的发',id:''},
		{img:'./images/list-item2.png',name:'冰河世纪4',id:''},
		{img:'./images/list-item2.png',name:'冰河世纪4斯蒂芬斯蒂芬',id:''},
		{img:'./images/list-item2.png',name:'冰河世纪4试点范围的发',id:''},
		{img:'./images/list-item2.png',name:'冰河世纪4',id:''},
		{img:'./images/list-item2.png',name:'冰河世纪4试点范围的发',id:''},
		{img:'./images/list-item2.png',name:'冰河世纪4',id:''},
		{img:'./images/list-item2.png',name:'冰河世纪4试点范围的发',id:''},
		{img:'./images/list-item2.png',name:'冰河世纪4',id:''}
	],////当前数据
	currentRowIndex:0,//当前行下标
	currentColIndex:0,//当前列下标
	index:0,////当前数据数组下标
	setIndex:function(){
		this.index=this.currentColIndex+(this.currentRowIndex*this.colNum);
		if(!!!this.currentPageData[this.index]){
			this.resetFocusInfo();
		}
	},
	setPageSize:function(){
		this.pageSize=this.rowNum*this.colNum;
	},
	setCurrentColAndRowByIndex:function(){//依靠现在的数组下标，设置对应的行列下标
		this.currentRowIndex=parseInt(this.index/this.colNum,10);
		this.currentColIndex=this.index-(this.currentRowIndex*this.colNum);
	},
	resetFocusInfo:function(){
		this.index=0;
		this.currentRowIndex=0;
		this.currentColIndex=0;
	},
	init:function(){
		
		this.setPageSize();
		this.resetFocusInfo();
		this.setIndex();
		this.setCurrentColAndRowByIndex();
	},
	render:function(){
		this.renderHtml();
		this.renderPageNav();
	},
	render1:function(){
		this.renderHtml1();
		this.renderPageNav();
	},
	renderPageNav:function(){
		$('pageNumNavText').innerHTML=this.currentPage+'/'+this.totalPage;
		if(this.currentPage<=1){
			$('contentArrowUp').style.display='none';
		}else{
			$('contentArrowUp').style.display='block';
		}
		if(this.currentPage>=this.totalPage){
			$('contentArrowDown').style.display='none';
		}else{
			$('contentArrowDown').style.display='block';
		}
	},
	renderHtml : function(){
		//return 0;
		var s='';
		var st='';
		var item=[];
		var dataIndex=0;

		var colTitleAry=[
			{
				w:80,name:'排名'
			},
			{
				w:250,name:'球队'
			},
			{
				w:80,name:'场次'
			},
			{
				w:80,name:'积分'
			},
			{
				w:80,name:'胜'
			},
			{
				w:80,name:'平'
			},
			{
				w:80,name:'负'
			},
			{
				w:80,name:'进球'
			},
			{
				w:80,name:'失球'
			},
			{
				w:100,name:'净胜球'
			}
		];
		st='<div style="position: absolute;z-index: 2;top: 107px;left: 223px;width: 990px;height: 66px;">';
		var newLeft=0;
		for(var ii=0;ii<colTitleAry.length;ii++){
			colTitleAry[ii].left=newLeft;
			st+='<div style="position: absolute;height: 66px;line-height: 66px;color: #a2abdf;font-size: 24px;width: '+colTitleAry[ii].w+'px;left:'+(newLeft)+'px;top: 0px;text-align: center;">'+colTitleAry[ii].name+'</div>'
			newLeft+=colTitleAry[ii].w;
		}
		st+='</div>';

		for(var i=0;i<this.rowNum;i++){
			for(var j=0;j<this.colNum;j++){
				dataIndex=i*this.colNum+j;//数据数组下标
				if(!!!this.currentPageData[dataIndex]) break;//没数据了
				item=[
					'<div id="'+this.itemId+'_'+(dataIndex)+'" style="position:absolute;z-index:2;top:'+(this.initTop+(this.itemHeight*i)+(i*this.rowMargin))+'px;left:223px;width:990px;height:50px;display:block;">',
						'<div id="'+this.itemId+'Focus'+(dataIndex)+'" class="smooth" style="position:absolute; top:-2px; left:-2px; width:990px; height:50px; z-index:2; display:none;opacity:1;visibility: visible;  border:2px #ffffff solid; background: url(images_second/topList_bg_on.png) no-repeat;"></div>',
						'<div style="position: absolute;height: 50px;line-height: 50px;color: #ffffff;font-size: 24px;width: '+colTitleAry[0].w+'px;left:'+colTitleAry[0].left+'px;top: 0px;text-align: center;z-index: 3;overflow: hidden;">'+this.currentPageData[dataIndex].index+'</div>',
						'<div style="position: absolute;height: 50px;line-height: 50px;color: #ffffff;font-size: 24px;width: '+colTitleAry[1].w+'px;left:'+colTitleAry[1].left+'px;top: 0px;text-align: center;z-index: 3;overflow: hidden;">',
							'<div style="position: absolute;left:0px;top:0px;width: 50px;height: 30px;line-height: 30px;padding: 10px 5px;overflow: hidden;text-align: center;"><img src="'+this.currentPageData[dataIndex].img+'" height="30" /></div><div style="position: absolute;left: 60px;top:0px;width: 170px;height: 50px;line-height: 50px;text-align: left;padding: 0px 10px;">'+this.currentPageData[dataIndex].name+'</div>',
						'</div>',
						'<div style="position: absolute;height: 50px;line-height: 50px;color: #ffffff;font-size: 24px;width: '+colTitleAry[2].w+'px;left:'+colTitleAry[2].left+'px;top: 0px;text-align: center;z-index: 3;overflow: hidden;">'+this.currentPageData[dataIndex].sessionIndex+'</div>',
						'<div style="position: absolute;height: 50px;line-height: 50px;color: #ffffff;font-size: 24px;width: '+colTitleAry[3].w+'px;left:'+colTitleAry[3].left+'px;top: 0px;text-align: center;z-index: 3;overflow: hidden;">'+this.currentPageData[dataIndex].jifen+'</div>',
						'<div style="position: absolute;height: 50px;line-height: 50px;color: #ffffff;font-size: 24px;width: '+colTitleAry[4].w+'px;left:'+colTitleAry[4].left+'px;top: 0px;text-align: center;z-index: 3;overflow: hidden;">'+this.currentPageData[dataIndex].sheng+'</div>',
						'<div style="position: absolute;height: 50px;line-height: 50px;color: #ffffff;font-size: 24px;width: '+colTitleAry[5].w+'px;left:'+colTitleAry[5].left+'px;top: 0px;text-align: center;z-index: 3;overflow: hidden;">'+this.currentPageData[dataIndex].ping+'</div>',
						'<div style="position: absolute;height: 50px;line-height: 50px;color: #ffffff;font-size: 24px;width: '+colTitleAry[6].w+'px;left:'+colTitleAry[6].left+'px;top: 0px;text-align: center;z-index: 3;overflow: hidden;">'+this.currentPageData[dataIndex].fu+'</div>',
						'<div style="position: absolute;height: 50px;line-height: 50px;color: #ffffff;font-size: 24px;width: '+colTitleAry[7].w+'px;left:'+colTitleAry[7].left+'px;top: 0px;text-align: center;z-index: 3;overflow: hidden;">'+this.currentPageData[dataIndex].jinqiu+'</div>',
						'<div style="position: absolute;height: 50px;line-height: 50px;color: #ffffff;font-size: 24px;width: '+colTitleAry[8].w+'px;left:'+colTitleAry[8].left+'px;top: 0px;text-align: center;z-index: 3;overflow: hidden;">'+this.currentPageData[dataIndex].shiqiu+'</div>',
						'<div style="position: absolute;height: 50px;line-height: 50px;color: #ffffff;font-size: 24px;width: '+colTitleAry[9].w+'px;left:'+colTitleAry[9].left+'px;top: 0px;text-align: center;z-index: 3;overflow: hidden;">'+this.currentPageData[dataIndex].jingshengqiu+'</div>',

					'</div>'
				];

			
				s+=item.join('');
			}
		}
		if(this.currentPageData.length<=0){
			s='<div style="height:60px;color: #cccccc;font-size: 20px;text-align: center;padding-top: 200px;">无数据（小编会努力补上的~~）</div>';
		}
		$(this.wrapperId).innerHTML=st+s;
	},
	renderHtml1 : function(){
		var s='';
		var st='';
		var item=[];
		var dataIndex=0;

		var colTitleAry=[
			{
				w:80,name:'排名'
			},
			{
				w:230,name:'球员'
			},
			{
				w:200,name:'球队'
			},
			{
				w:120,name:'总进球数'
			},
			{
				w:120,name:'普通球数'
			},
			{
				w:120,name:'点球'
			},
			{
				w:120,name:'乌龙球'
			}
		];
		st='<div style="position: absolute;z-index: 2;top: 107px;left: 223px;width: 990px;height: 66px;">';
		var newLeft=0;
		for(var ii=0;ii<colTitleAry.length;ii++){
			colTitleAry[ii].left=newLeft;
			st+='<div style="position: absolute;height: 66px;line-height: 66px;color: #a2abdf;font-size: 24px;width: '+colTitleAry[ii].w+'px;left:'+(newLeft)+'px;top: 0px;text-align: center;">'+colTitleAry[ii].name+'</div>'
			newLeft+=colTitleAry[ii].w;
		}
		st+='</div>';

		for(var i=0;i<this.rowNum;i++){
			for(var j=0;j<this.colNum;j++){
				dataIndex=i*this.colNum+j;//数据数组下标
				if(!!!this.currentPageData[dataIndex]) break;//没数据了
				item=[
					'<div id="'+this.itemId+'_'+(dataIndex)+'" style="position:absolute;z-index:2;top:'+(this.initTop+(this.itemHeight*i)+(i*this.rowMargin))+'px;left:223px;width:990px;height:50px;display:block;">',
						'<div id="'+this.itemId+'Focus'+(dataIndex)+'" class="smooth" style="position:absolute; top:-2px; left:-2px; width:990px; height:50px; z-index:2; display:none;opacity:1;visibility: visible;  border:2px #ffffff solid; background: url(images_second/topList_bg_on.png) no-repeat;"></div>',
						'<div style="position: absolute;height: 50px;line-height: 50px;color: #ffffff;font-size: 24px;width: '+(colTitleAry[0].w-20)+'px;padding:0px 10px;left:'+colTitleAry[0].left+'px;top: 0px;text-align: center;z-index: 3;overflow: hidden;">'+this.currentPageData[dataIndex].index+'</div>',
						'<div style="position: absolute;height: 50px;line-height: 50px;color: #ffffff;font-size: 24px;width: '+(colTitleAry[1].w-20)+'px;padding:0px 10px;left:'+colTitleAry[1].left+'px;top: 0px;text-align: center;z-index: 3;overflow: hidden;">'+this.currentPageData[dataIndex].name+'</div>',
						'<div style="position: absolute;height: 50px;line-height: 50px;color: #ffffff;font-size: 24px;width: '+(colTitleAry[2].w-20)+'px;padding:0px 10px;left:'+colTitleAry[2].left+'px;top: 0px;text-align: center;z-index: 3;overflow: hidden;">'+this.currentPageData[dataIndex].qiudui+'</div>',
						'<div style="position: absolute;height: 50px;line-height: 50px;color: #ffffff;font-size: 24px;width: '+(colTitleAry[3].w-20)+'px;padding:0px 10px;left:'+colTitleAry[3].left+'px;top: 0px;text-align: center;z-index: 3;overflow: hidden;">'+this.currentPageData[dataIndex].totalNum+'</div>',
						'<div style="position: absolute;height: 50px;line-height: 50px;color: #ffffff;font-size: 24px;width: '+(colTitleAry[4].w-20)+'px;padding:0px 10px;left:'+colTitleAry[4].left+'px;top: 0px;text-align: center;z-index: 3;overflow: hidden;">'+this.currentPageData[dataIndex].putongNum+'</div>',
						'<div style="position: absolute;height: 50px;line-height: 50px;color: #ffffff;font-size: 24px;width: '+(colTitleAry[5].w-20)+'px;padding:0px 10px;left:'+colTitleAry[5].left+'px;top: 0px;text-align: center;z-index: 3;overflow: hidden;">'+this.currentPageData[dataIndex].dianqiuNum+'</div>',
						'<div style="position: absolute;height: 50px;line-height: 50px;color: #ffffff;font-size: 24px;width: '+(colTitleAry[6].w-20)+'px;padding:0px 10px;left:'+colTitleAry[6].left+'px;top: 0px;text-align: center;z-index: 3;overflow: hidden;">'+this.currentPageData[dataIndex].wulongNum+'</div>',

					'</div>'
				];

			
				s+=item.join('');
			}
		}
		if(this.currentPageData.length<=0){
			s='<div style="height:60px;color: #cccccc;font-size: 20px;text-align: center;padding-top: 200px;">无数据（小编会努力补上的~~）</div>';
		}
		$(this.wrapperId).innerHTML=st+s;
	},
	generateMarquee:function(text){
		return '<marquee scrollamount="3" behavior="alternate" width="'+this.itemWidth+'" style="width: '+this.itemWidth+'px;">'+text+'</marquee>';
	},
	generateItemName:function(text){
		return '<span style="padding-left:10px;padding-right:10px;">'+text+'</span>';
	},
	afterFocus:function(){
		/*var s='';
		if(Util.str.getStrBite(this.currentPageData[this.index].name)>15){
			s=this.generateMarquee(this.currentPageData[this.index].name);
		}else{
			s=this.generateItemName(this.currentPageData[this.index].name);
		}
		$(this.itemId+'TextMask'+this.index).innerHTML=s;*/
	},
	afterBlur:function(){
		//$(this.itemId+'TextMask'+this.index).innerHTML=this.generateItemName(this.currentPageData[this.index].name);
	},
	focus:function(){
		$(this.itemId+'Focus'+this.index).style.display='block';
		$(this.itemId+'_'+this.index).style.transform='scale(1.02,1.02)';
		$(this.itemId+'_'+this.index).style.webkitTransform='scale(1.02,1.02)';
		this.afterFocus&&this.afterFocus();
	},
	blur:function(){
		$(this.itemId+'Focus'+this.index).style.display='none';
		$(this.itemId+'_'+this.index).style.transform='scale(1,1)';
		$(this.itemId+'_'+this.index).style.webkitTransform='scale(1,1)';
		this.afterBlur&&this.afterBlur();
	},
	isTouchLeft:function(){//是否到最左边了
		if(this.currentColIndex<=0) return true;
		return false;
	},
	isTouchRight:function(){//是否到最右边了
		if(this.currentColIndex>=(this.colNum-1)) return true;
		return false;
	},
	isTouchTop:function(){//是否到最顶了
		if(this.currentRowIndex<=0) return true;
		return false;
	},
	isTouchBottom:function(){//是否到最底了
		if(this.currentRowIndex>=(this.rowNum-1)) return true;
		return false;
	},
	lastPage:function(){
		console.log('last page');
		this.currentPage--;
		menuPad.menuData[menuPad.listObj.position].currentPage=this.currentPage;
		if(menuPad.listObj.position==0){
			if(!!listData['page'+this.currentPage]){
				this.currentPageData=listData['page'+this.currentPage];
				contentPad.init();
				contentPad.render();
				contentPad.resetFocusInfo();
				contentPad.focus();
				return 0;
			}

			getContentData(
				contentPad.currentPage,
				function(){
					contentPad.focus();
				}
			);
		}
		if(menuPad.listObj.position==1){
			if(!!listData['pages'+this.currentPage]){
				this.currentPageData=listData['pages'+this.currentPage];
				contentPad.init();
				contentPad.render1();
				contentPad.resetFocusInfo();
				contentPad.focus();
				return 0;
			}

			getContentData1(
				contentPad.currentPage,
				function(){
					contentPad.focus();
				}
			);
		}
	},
	nextPage:function(){
		console.log('next page');
		this.currentPage++;
		menuPad.menuData[menuPad.listObj.position].currentPage=this.currentPage;
		if(menuPad.listObj.position==0){
			if(!!listData['page'+this.currentPage]){
				this.currentPageData=listData['page'+this.currentPage];
				contentPad.init();
				contentPad.render();
				contentPad.resetFocusInfo();
				contentPad.focus();
				return 0;
			}

			getContentData(
				contentPad.currentPage,
				function(){
					contentPad.focus();
				}
			);
		}
		if(menuPad.listObj.position==1){
			if(!!listData['pages'+this.currentPage]){
				this.currentPageData=listData['pages'+this.currentPage];
				contentPad.init();
				contentPad.render1();
				contentPad.resetFocusInfo();
				contentPad.focus();
				return 0;
			}

			getContentData1(
				contentPad.currentPage,
				function(){
					contentPad.focus();
				}
			);
		}

	},
	outUp:function(){
		this.blur();
		contral=menuObj;
		menuObj.focus();
	},//将要跳出本交互模块的处理
	outDown:function(){
		
	},
	outLeft:function(){
		this.blur();
		contral=menuPad;
		contral.focus();
		
	},//将要跳出本交互模块的处理
	outRight:function(){
		
	},//将要跳出本交互模块的处理
	left:function(){
		if(this.isTouchLeft()){
			this.outLeft();
			return 0;
		}
		this.blur();
		this.currentColIndex--;
		this.setIndex();
		this.focus();
	},
	right:function(){
		if(this.isTouchRight()||!!!this.currentPageData[this.index+1]){
			this.outRight();
			return 0;
		}
		this.blur();
		this.currentColIndex++;
		this.setIndex();
		this.focus();
	},
	up:function(){
		if(this.isTouchTop()){
			if(this.currentPage==1){
				this.outUp();
			}else{
				this.lastPage();
			}
			
			return 0;
		}
		if(!!!this.currentPageData[this.index-this.colNum]){//无数据,光标不移动
			return 0;
		}
		this.blur();
		this.currentRowIndex--;
		this.setIndex();
		this.focus();
	},
	down:function(){
		if(this.isTouchBottom()){
			if(this.currentPage==this.totalPage){
				this.outDown();
				return 0;
			}
			this.nextPage();
			return 0;
		}
		if(!!!this.currentPageData[this.index+this.colNum]){//无数据,光标不移动
			return 0;
		}
		this.blur();
		this.currentRowIndex++;
		this.setIndex();
		this.focus();
	},
	enter:function(){
		return 0;

		var backUrl=location.href;//'index.html?menuPos='+menuBox.position;

		backUrl=createUrlByObject(backUrl,{pageNo:this.currentPage,menuId:menuId});

		var url='';		

		if(url.indexOf('?')>-1){
			url+='&backUrl='+Q.encode(backUrl);
		}else{
			url+='?backUrl='+Q.encode(backUrl);
		}
		location.href = url;
	},
	inputNum:function(i){

	}
};
//右边内容 end



