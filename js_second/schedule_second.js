

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
			imgUrl1:'./images_second/player1.png',
			name1:'哈德森等',
			imgUrl2:'./images_second/player2.png',
			name2:'上海绿地申花',
			name:'中超第32轮',
			scoreText:'3 - 2',//'3-2',//3-2 VS
			status:1,//结束1 未开播-1 正在直播0
			startTime:'08-18 03:33',//'08-18 09:23',
			reserve:false,//false,//已预约true 未预约false
			id:''
		},
		{
			imgUrl1:'./images_second/player1.png',
			name1:'哈德森菲尔德',
			imgUrl2:'./images_second/player2.png',
			name2:'上海绿地申',
			name:'中超第32轮',
			scoreText:'VS',
			status:-1,
			startTime:'08-18 03:33',
			reserve:true,
			id:''
		},
		{
			imgUrl1:'./images_second/player1.png',
			name1:'德瑟都等',
			imgUrl2:'./images_second/player2.png',
			name2:'上海绿地申花',
			name:'中超第32轮',
			scoreText:'3 - 2',
			status:0,
			startTime:'08-18 03:33',
			reserve:false,
			id:''
		},
		{
			imgUrl1:'./images_second/player1.png',
			name1:'哈德森菲尔德瑟都等',
			imgUrl2:'./images_second/player2.png',
			name2:'上海绿地申花',
			name:'中超第32轮',
			scoreText:'3 - 2',
			status:1,
			startTime:'08-18 03:33',
			reserve:false,
			id:''
		},
		{
			imgUrl1:'./images_second/player1.png',
			name1:'哈德',
			imgUrl2:'./images_second/player2.png',
			name2:'上海绿地申花',
			name:'中超第32轮',
			scoreText:'VS',
			status:-1,
			startTime:'08-18 03:33',
			reserve:true,
			id:''
		},
		{
			imgUrl1:'./images_second/player1.png',
			name1:'哈德森菲尔德瑟都等',
			imgUrl2:'./images_second/player2.png',
			name2:'地申花',
			name:'中超第32轮',
			scoreText:'32 - 22',
			status:0,
			startTime:'08-18 03:33',
			reserve:false,
			id:''
		}
	]
};


var menuPos = 0;//当前选择的菜单位置
menuPos=Q.getInt("menuPos",0);
var menuId=0;//当前选择的菜单id
menuId=Q.getInt('menuId',0);
var leagueId =0;
leagueId = Q.getInt('leagueId',0);
var pageNoInit=Q.getInt('pageNo',1);
var leftMenuId=0;//左边菜单id
leftMenuId=Q.getInt('leftMenuId',0);

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

	for(var i=0,len=mainMenu.length;i<len;i++){
		if(mainMenu[i].id===menuId){
			menuPos=i; //设置选择的菜单位置
		}
	}

	
	menuObj.init();

	init();  //初始化页面控制

	loadingObj.hide();

	contral=menuObj;//控制交接给菜单  
	contral.focus();  

	//menuPad.init();
	getLeftMenuData();
	
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



function getLeftMenuData(){

	formatLeftMenuData();
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
	        	formatLeftMenuData(json);
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
function formatLeftMenuData(json){
	menuPad.menuData=[];
	menuPad.menuData=[ //demo data 
		{name:'8月17号',id:1},
		{name:'8月18号',id:2},
		{name:'8月19号',id:3},
		{name:'8月20号',id:4},
		{name:'8月21号',id:5},
		{name:'8月22号',id:6},
		{name:'8月23号',id:7},
		{name:'8月24号',id:8},
		{name:'8月25号',id:9},
		{name:'8月26号',id:10},
		{name:'8月27号',id:11},
		{name:'8月28号',id:12},
		{name:'8月29号',id:13},
		{name:'8月30号',id:14}

	];
	var initIndex=0;
	for(var i=0,len=menuPad.menuData.length;i<len;i++){
		if(menuPad.menuData[i].id===leftMenuId){
			initIndex=i;
		}
	}
	

	menuPad.init(initIndex);

	
}

//左边菜单 begin
var menuPad={
	listObj:null,
	initLeft:80,
	itemWidth:123,
	initTop:108,
	itemHeight:63,
	showItemCount:9,//可视个数
	initDataPos:0,//初始化数据下标
	menuData:[
		{name:'8月17号',id:1},
		{name:'8月18号',id:2}
	],
	init:function(initIndex){
		this.render();
		this.initList({initFocusDataIndex:initIndex||0});
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
		//this.listObj.focusFixed=true;//焦点固定，自动循环
	    this.listObj.focusLoop = focusLoop;  
	    this.listObj.focusPos=4;//当前列表焦点的位置；
	    this.initDataPos=focusIndex;
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
	formatContentData(contentDataDemo,fn);
	return 0;

	if(contentReq){
		contentReq.abort();
		contentReq=null;
	}
	loadingObj.show();
	//menuPad.menuData[menuPad.listObj.position].id //左边菜单id
	var url=apiBasePath+'/ui/tv/index/select?menuId='+menuId+'&leagueId='+leagueId+'&pageNo='+pageNo;
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
	contentPad.currentPage=json.pageNo||1;
	contentPad.totalPage=json.totalPage||1;
	menuPad.menuData[menuPad.listObj.position].currentPage=contentPad.currentPage;
	menuPad.menuData[menuPad.listObj.position].totalPage=contentPad.totalPage;
	contentPad.currentPageData=[];
	listData['page'+contentPad.currentPage]=[];//缓存此页数据
	for(var i=0,len=json.data.length;i<len;i++){
		contentPad.currentPageData.push({
			img1:json.data[i].imgUrl1,
			name1:json.data[i].name1,
			img2:json.data[i].imgUrl2,
			name2:json.data[i].name2,
			name:json.data[i].name,//中超第几轮
			scoreText:json.data[i].scoreText,//'3-2',//3-2 VS
			status:json.data[i].status,//1,//结束1 未开播-1 正在直播0
			startTime:json.data[i].startTime,//'08-18 09:23',
			reserve:json.data[i].reserve,//0,//已预约1 未预约0
			id:json.data[i].id
		
		});
		//缓存此页数据
		listData['page'+contentPad.currentPage].push({
			img1:json.data[i].imgUrl1,
			name1:json.data[i].name1,
			img2:json.data[i].imgUrl2,
			name2:json.data[i].name2,
			name:json.data[i].name,//中超第几轮
			scoreText:json.data[i].scoreText,//'3-2',//3-2 VS
			status:json.data[i].status,//1,//结束1 未开播-1 正在直播0
			startTime:json.data[i].startTime,//'08-18 09:23',
			reserve:json.data[i].reserve,//0,//已预约1 未预约0
			id:json.data[i].id
		});
	}

	contentPad.init();
	contentPad.render();
	contentPad.resetFocusInfo();
	!!fn&&fn();

}



//右边内容 begin
var contentPad={
	wrapperId:'contentWrapper',//外层div id
	itemId:'listItem',//每项 dom id的名称前缀
	rowNum:6,//行数
	colNum:1,//列数
	itemWidth:990,//每一项的宽度px
	itemHeight:90,//每一项的高度px
	initTop:108,//初始top值px
	initLeft:223,//初始left值px
	rowMargin:6,//行之间间隙距离px
	colMargin:0,//列之间间隙距离px
	focusDivLeftOffset:-34,//光标left偏移值px
	focusDivTopOffset:-42,//光标top偏移值px
	pageSize:6,
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
		var item=[];
		var dataIndex=0;

		var colTitleAry=[
			{
				w:160,name:'联赛轮次'
			},
			{
				w:150,name:'比赛状态'
			},
			{
				w:92,name:'队伍图标1'
			},
			{
				w:140,name:'队伍名字1'
			},
			{
				w:108,name:'比分'
			},
			{
				w:140,name:'队伍名字2'
			},
			{
				w:92,name:'队伍图标2'
			},
			{
				w:108,name:'预约状态'
			}
		];
		
		var newLeft=0;
		for(var ii=0;ii<colTitleAry.length;ii++){
			colTitleAry[ii].left=newLeft;
			
			newLeft+=colTitleAry[ii].w;
		}
		

		for(var i=0;i<this.rowNum;i++){
			for(var j=0;j<this.colNum;j++){
				dataIndex=i*this.colNum+j;//数据数组下标
				if(!!!this.currentPageData[dataIndex]) break;//没数据了
				item=[
					'<div id="'+this.itemId+'_'+(dataIndex)+'" style="position:absolute;z-index:2;top:'+(this.initTop+(this.itemHeight*i)+(i*this.rowMargin))+'px;left:223px;width:990px;height:90px;background: url(images_second/schedule_bg.png) no-repeat;display:block;">',
						'<div id="'+this.itemId+'Focus'+(dataIndex)+'" class="smooth" style="position:absolute; top:'+this.focusDivTopOffset+'px; left:'+this.focusDivLeftOffset+'px; width:1057px; height:173px; z-index:2; display:none;opacity:1;visibility: visible;  background: url(images_second/schedule_bg_on.png) no-repeat;"></div>',
						'<div id="'+this.itemId+'Col_0_'+(dataIndex)+'" style="position: absolute;height: 90px;line-height: 90px;color: #989caf;font-size: 20px;width: '+colTitleAry[0].w+'px;left:'+colTitleAry[0].left+'px;top: 0px;text-align: left;z-index: 3;overflow: hidden;"><div style="padding-left:20px; padding-right: 10px;">'+this.currentPageData[dataIndex].name+'</div></div>',
						'<div style="position: absolute;height: 90px;line-height: 90px;color: '+(this.currentPageData[dataIndex].status==-1?'#989caf':(this.currentPageData[dataIndex].status==0?'#44c711':'#1c8cff'))+';font-size: 20px;width: '+colTitleAry[1].w+'px;left:'+colTitleAry[1].left+'px;top: 0px;text-align: left;z-index: 3;overflow: hidden;"><div style="padding-left:0px; padding-right: 10px;">'+(this.currentPageData[dataIndex].status==-1?this.currentPageData[dataIndex].startTime:(this.currentPageData[dataIndex].status==0?'正在直播':'已结束'))+'</div></div>',

						'<div style="position: absolute;height: 90px;line-height: 90px;color: #989caf;font-size: 20px;width: '+colTitleAry[2].w+'px;left:'+colTitleAry[2].left+'px;top: 0px;text-align: center;z-index: 3;overflow: hidden;">'+'<div style="position: absolute;left:0px;top:0px;width: '+colTitleAry[2].w+'px;height: 60px;line-height: 60px;padding: 15px 0px;overflow: hidden;text-align: center;"><img src="'+this.currentPageData[dataIndex].img1+'" height="60" /></div>'+'</div>',
						'<div id="'+this.itemId+'Col_3_'+(dataIndex)+'" style="position: absolute;height: 90px;line-height: 90px;color: #989caf;font-size: 20px;width: '+colTitleAry[3].w+'px;left:'+colTitleAry[3].left+'px;top: 0px;text-align: right;z-index: 3;overflow: hidden;"><div style="padding-left:10px;padding-right:10px;">'+this.currentPageData[dataIndex].name1+'</div></div>',
						'<div id="'+this.itemId+'Col_4_'+(dataIndex)+'" style="position: absolute;height: 90px;line-height: 90px;color: #bfc1cd;font-size: 26px;width: '+colTitleAry[4].w+'px;left:'+colTitleAry[4].left+'px;top: 0px;text-align: center;z-index: 3;overflow: hidden;"><div style="padding-left:0px;padding-right:0px;">'+this.currentPageData[dataIndex].scoreText+'</div></div>',
						'<div id="'+this.itemId+'Col_5_'+(dataIndex)+'" style="position: absolute;height: 90px;line-height: 90px;color: #989caf;font-size: 20px;width: '+colTitleAry[5].w+'px;left:'+colTitleAry[5].left+'px;top: 0px;text-align: left;z-index: 3;overflow: hidden;"><div style="padding-left:10px;padding-right:10px;">'+this.currentPageData[dataIndex].name2+'</div></div>',
						'<div style="position: absolute;height: 90px;line-height: 90px;color: #989caf;font-size: 20px;width: '+colTitleAry[6].w+'px;left:'+colTitleAry[6].left+'px;top: 0px;text-align: center;z-index: 3;overflow: hidden;">'+'<div style="position: absolute;left:0px;top:0px;width: '+colTitleAry[6].w+'px;height: 60px;line-height: 60px;padding: 15px 0px;overflow: hidden;text-align: center;"><img src="'+this.currentPageData[dataIndex].img2+'" height="60" /></div>'+'</div>',
						
						'<div style="position: absolute;height: 90px;line-height: 90px;color: '+(this.currentPageData[dataIndex].reserve?'#1c8cff':'#6d77a2')+';font-size: 20px;width: '+colTitleAry[7].w+'px;left:'+colTitleAry[7].left+'px;top: 0px;text-align: center;z-index: 3;overflow: hidden;"><div style="padding-left:10px;padding-right:10px;">'+(this.currentPageData[dataIndex].status==1?'':(this.currentPageData[dataIndex].reserve?'已预约':'预约'))+'</div></div>',

					'</div>'
				];

			
				s+=item.join('');
			}
		}
		if(this.currentPageData.length<=0){
			s='<div style="height:60px;color: #cccccc;font-size: 20px;text-align: center;padding-top: 200px;">无数据（小编会努力补上的~~）</div>';
		}
		$(this.wrapperId).innerHTML=s;
	},
	generateMarquee:function(text){
		return '<marquee scrollamount="3" behavior="alternate" width="'+this.itemWidth+'" style="width: '+this.itemWidth+'px;">'+text+'</marquee>';
	},
	generateItemName:function(text){
		return '<span style="padding-left:10px;padding-right:10px;">'+text+'</span>';
	},
	afterFocus:function(){
		$(this.itemId+'Col_5_'+this.index).style.color='#ffffff';
		$(this.itemId+'Col_4_'+this.index).style.color='#ffffff';
		$(this.itemId+'Col_3_'+this.index).style.color='#ffffff';
		$(this.itemId+'Col_0_'+this.index).style.color='#ffffff';
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
		$(this.itemId+'Col_5_'+this.index).style.color='#989caf';
		$(this.itemId+'Col_4_'+this.index).style.color='#bfc1cd';
		$(this.itemId+'Col_3_'+this.index).style.color='#989caf';
		$(this.itemId+'Col_0_'+this.index).style.color='#989caf';
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
		if(!!listData['page'+this.currentPage]){
			this.currentPageData=listData['page'+this.currentPage];
			contentPad.init();
			contentPad.render();
			contentPad.resetFocusInfo();
			contentPad.focus();
			return 0;
		}

		// getContentData(
		// 	contentPad.currentPage,
		// 	function(){
		// 		contentPad.focus();
		// 	}
		// );
	
	},
	nextPage:function(){
		console.log('next page');
		this.currentPage++;
		menuPad.menuData[menuPad.listObj.position].currentPage=this.currentPage;
		
		if(!!listData['page'+this.currentPage]){
			this.currentPageData=listData['page'+this.currentPage];
			contentPad.init();
			contentPad.render();
			contentPad.resetFocusInfo();
			contentPad.focus();
			return 0;
		}

		// getContentData(
		// 	contentPad.currentPage,
		// 	function(){
		// 		contentPad.focus();
		// 	}
		// );
		

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



