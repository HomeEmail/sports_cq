

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
			imgUrl:'./images_second/lookBack_img1.png',
			name:'中超第22轮 江苏苏宁易购-广州恒大的雷锋精神的放松',
			id:''
		},
		{
			imgUrl:'./images_second/lookBack_img1.png',
			name:'中超第22轮 江苏苏宁易购-广州恒大的雷锋精神的放松',
			id:''
		},
		{
			imgUrl:'./images_second/lookBack_img1.png',
			name:'中超第22轮 江苏苏宁易购-广州恒大的雷锋精神的放松',
			id:''
		},
		{
			imgUrl:'./images_second/lookBack_img1.png',
			name:'中超第22轮 江苏苏宁易购-广州恒大的雷锋精神的放松',
			id:''
		},
		{
			imgUrl:'./images_second/lookBack_img1.png',
			name:'中超第22轮 江苏苏宁易购-广州恒大的雷锋精神的放松',
			id:''
		},
		{
			imgUrl:'./images_second/lookBack_img1.png',
			name:'中超第22轮 江苏苏宁易购-广州恒大的雷锋精神的放松',
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
var rFpos=Q.getInt('rFpos','');

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

	getContentData(pageNoInit,function(){//此区域初始化 光标位置
		if(rFpos!==''){ //表示页面初始光标在内容列表里
			contral.blur();
			listObj.index=rFpos;
			listObj.setCurrentColAndRowByIndex();
			contral=listObj;//控制交接   
			contral.focus();   
		}
		
	});
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
		contral=listObj;
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

var contentReq=null;
function getContentData(pageNo,fn){//通过ajxa获取数据
	formatContentData(contentDataDemo,fn);
	return 0;

	if(contentReq){
		contentReq.abort();
		contentReq=null;
	}
	loadingObj.show();
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
	listObj.currentPage=json.pageNo||1;
	listObj.totalPage=json.totalPage||1;
	listObj.currentPageData=[];
	listData['page'+listObj.currentPage]=[];//缓存此页数据
	for(var i=0,len=json.data.length;i<len;i++){
		listObj.currentPageData.push({
			img:json.data[i].imgUrl,
			name:json.data[i].name,
			id:json.data[i].id
		});
		//缓存此页数据
		listData['page'+listObj.currentPage].push({
			img:json.data[i].imgUrl,
			name:json.data[i].name,
			id:json.data[i].id
		});
	}

	listObj.init();
	listObj.render();
	listObj.resetFocusInfo();
	!!fn&&fn();

}

//listObj

//右边内容 begin
var listObj={
	wrapperId:'contentWrapper',//外层div id
	itemId:'listItem',//每项 dom id的名称前缀
	rowNum:2,//行数
	colNum:3,//列数
	itemWidth:333,//每一项的宽度px
	itemHeight:237,//每一项的高度px
	initTop:133,//初始top值px
	initLeft:103,//初始left值px
	rowMargin:37,//行之间间隙距离px
	colMargin:37,//列之间间隙距离px
	focusDivLeftOffset:-4,//光标left偏移值px
	focusDivTopOffset:-4,//光标top偏移值px
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
			$('contentArrowLeft').style.display='none';
		}else{
			$('contentArrowLeft').style.display='block';
		}
		if(this.currentPage>=this.totalPage){
			$('contentArrowRight').style.display='none';
		}else{
			$('contentArrowRight').style.display='block';
		}
	},
	renderHtml : function(){
		var s='';
		var item=[];
		var dataIndex=0;
		for(var i=0;i<this.rowNum;i++){
			for(var j=0;j<this.colNum;j++){
				dataIndex=i*this.colNum+j;//数据数组下标
				if(!!!this.currentPageData[dataIndex]) break;//没数据了
				item=[
					'<div id="'+this.itemId+'_'+(dataIndex)+'" style="position:absolute;top:'+(this.initTop+(this.itemHeight*i)+(i*this.rowMargin))+'px;left:'+(this.initLeft+(this.itemWidth*j)+(j*this.colMargin))+'px;width:'+(this.itemWidth+0)+'px;height:'+(this.itemHeight+0)+'px;">',
						'<div style="width:'+this.itemWidth+'px;height:'+this.itemHeight+'px;overflow:hidden;"><img src="'+(!this.currentPageData[dataIndex].img?'':this.currentPageData[dataIndex].img)+'" width="'+this.itemWidth+'" /></div>',
						'<div id="'+this.itemId+'TextMask'+(dataIndex)+'" style="width:'+this.itemWidth+'px;height:50px;line-height:50px;font-size:20px;position:absolute;left:0px;top:'+(this.itemHeight-50)+'px;background:url(./images_second/lookBack_word_bg.png);color:#a2a9c6;overflow:hidden;">',
							'<span style="padding-left:10px;padding-right:10px;">'+this.currentPageData[dataIndex].name+'</span>',
						'</div>',
						'<div id="'+this.itemId+'Focus'+(dataIndex)+'" style="position:absolute;left:'+this.focusDivLeftOffset+'px;top:'+this.focusDivTopOffset+'px;width:'+(this.itemWidth+0)+'px;height:'+(this.itemHeight+0)+'px;display:none;z-index:5;border:4px #ffffff solid;"></div>',
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
		var s='';
		if(Util.str.getStrBite(this.currentPageData[this.index].name)>15){
			s=this.generateMarquee(this.currentPageData[this.index].name);
		}else{
			s=this.generateItemName(this.currentPageData[this.index].name);
		}
		$(this.itemId+'TextMask'+this.index).innerHTML=s;
	},
	afterBlur:function(){
		$(this.itemId+'TextMask'+this.index).innerHTML=this.generateItemName(this.currentPageData[this.index].name);
	},
	focus:function(){
		$(this.itemId+'Focus'+this.index).style.display='block';
		$(this.itemId+'_'+this.index).style.transform='scale(1.06,1.06)';
		$(this.itemId+'_'+this.index).style.webkitTransform='scale(1.06,1.06)';
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
	nextPage:function(){//下一页
		console.log('next page');
		this.currentPage++;
		if(!!listData['page'+this.currentPage]){
			this.currentPageData=listData['page'+this.currentPage];
			listObj.init();
			listObj.render();
			listObj.resetFocusInfo();
			listObj.focus();
			return 0;
		}

		// getContentData(
		// 	listObj.currentPage,
		// 	function(){
		// 		listObj.focus();
		// 	}
		// );

	},
	lastPage:function(){//上一页
		console.log('last page');
		this.currentPage--;
		if(!!listData['page'+this.currentPage]){
			this.currentPageData=listData['page'+this.currentPage];
			listObj.init();
			listObj.render();
			listObj.resetFocusInfo();
			listObj.focus();
			return 0;
		}
		// getContentData(
		// 	listObj.currentPage,
		// 	function(){
		// 		listObj.focus();
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
		
	},//将要跳出本交互模块的处理
	outRight:function(){
		
	},//将要跳出本交互模块的处理
	left:function(){
		if(this.isTouchLeft()){
			if(this.currentPage<=1){
				this.outLeft();
				return 0;
			}
			this.lastPage();
			return 0;
		}
		this.blur();
		this.currentColIndex--;
		this.setIndex();
		this.focus();
	},
	right:function(){
		if(this.isTouchRight()||!!!this.currentPageData[this.index+1]){
			if(this.currentPage==this.totalPage){
				this.outRight();
				return 0;
			}
			this.nextPage();
			return 0;
		}
		this.blur();
		this.currentColIndex++;
		this.setIndex();
		this.focus();
	},
	up:function(){
		if(this.isTouchTop()){
			this.outUp();
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

		backUrl=createUrlByObject(backUrl,{pageNo:this.currentPage,menuId:menuId,rFpos:this.index});

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



