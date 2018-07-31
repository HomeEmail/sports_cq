

var listData = {////存储每一页最终内容渲染数据 
	//'page1':[] //demo
};

var contentDataDemo={ //动态数据demo
	imageProfix:'',
	pageNo:1,
	totalPage:2,
	data:[
		
		{
			imgUrl:'./images_second/list1/list_img.png',
			name:'哈德森的发生发射点发射点等',
			id:''
		},
		{
			imgUrl:'./images_second/list1/list_img.png',
			name:'哈德森的发生发射点发射点等',
			id:''
		},
		{
			imgUrl:'./images_second/list1/list_img.png',
			name:'哈德森的发生发射点发射点等',
			id:''
		},
		{
			imgUrl:'./images_second/list1/list_img.png',
			name:'哈德森的发生发射点发射点等',
			id:''
		},
		{
			imgUrl:'./images_second/list1/list_img.png',
			name:'哈德森的发生发射点发射点等',
			id:''
		},
		{
			imgUrl:'./images_second/list1/list_img.png',
			name:'哈德森的发生发射点发射点等',
			id:''
		},
		{
			imgUrl:'./images_second/list1/list_img.png',
			name:'哈德森的发生发射点发射点等',
			id:''
		},
		{
			imgUrl:'./images_second/list1/list_img.png',
			name:'哈德森的发生发射点发射点等',
			id:''
		},
		{
			imgUrl:'./images_second/list1/list_img.png',
			name:'哈德森的发生发射点发射点等',
			id:''
		}
	]
};




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
	getLeftMenuData();
};

//销毁页面
function pageOnunload(){

}


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
		{name:'英超观瞻',id:1},
		{name:'中超吐口秀',id:2},
		{name:'英超秀',id:3},
		{name:'星耀中超',id:4},
		{name:'中超故事',id:5},
		{name:'十分中超',id:6},
		{name:'中超一分钟',id:7},
		{name:'其他bb节目',id:7}

	];
	var initIndex=0;
	for(var i=0,len=menuPad.menuData.length;i<len;i++){
		if(menuPad.menuData[i].id===leftMenuId){
			initIndex=i;
		}
	}
	
	loadingObj.hide();

	var s='';
	if(menuPad.menuData.length<=0){
		s='<div style="height:60px;color: #cccccc;font-size: 20px;text-align: center;padding-top: 200px;">无数据（小编会努力补上的~~）</div>';
		$('contentWrapper').innerHTML=s;
		return 0;
	}else{
		init();  //初始化页面控制
		menuPad.init(initIndex);
		contral=menuPad;//控制交接给菜单  
		contral.focus();  
	}
	

	

	
}

//左边菜单 begin
var menuPad={
	listObj:null,
	initLeft:66,
	itemWidth:215,
	initTop:128,
	itemHeight:71,
	showItemCount:7,//可视个数
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
			s+='<div id="menuLeft_'+i+'" class="menu" style="position:absolute; top:'+(this.initTop+(i*this.itemHeight))+'px; left:'+(this.initLeft)+'px; width:'+this.itemWidth+'px; height:'+this.itemHeight+'px;overflow:hidden;line-height: '+this.itemHeight+'px;"><div id="menuLeftText_'+i+'" style="padding:0px 20px;color:#ffffff;font-size:26px;text-align:left;z-index:3;position:relative;"></div></div>';
		}
		
		$('menuLeft_content').innerHTML=s;
	}
	,initList:function(o){
		var o=o||{};
		var dataLen=this.menuData.length;//列表数据总总长度
		var focusIndex=o.initFocusDataIndex||0;//初始化focus第几个数据
		var itemHigh=this.itemHeight;//每项的高度或宽度
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
			$("menuLeftText_" + list.idPos).innerHTML = menuPad.menuData[list.dataPos].name; 
			// if(list.dataPos==menuPad.listObj.position){
			// 	$("menuLeft_" + list.idPos).style.background='url(images_second/list1/menu_select.png) center center no-repeat';
				
			// }else{
			// 	$("menuLeft_" + list.idPos).style.background='none';
				
			// }
		};
		this.listObj.notData  = function(list){
			$("menuLeft_" + list.idPos).style.visibility = "hidden";
			$("menuLeftText_" + list.idPos).innerHTML = "";
		};
		this.listObj.startShow();//去掉不移动
	},
	updateSelect:function(){
		
		// $("menuLeft_" + this.listObj.lastFocusPos).style.background='none';
		// //$("menuLeft_" + this.listObj.lastFocusPos).style.color='#ffffff';

		// $("menuLeft_" + this.listObj.focusPos).style.background='url(images_second/list1/menu_select.png) center center no-repeat';
		// //$("menuLeft_" + this.listObj.focusPos).style.color='#ffffff';

	}
	,focus:function(){
		$('menuLeft_focus').style.opacity=1;
		$('menuLeft_focus').style.background='url(images_second/list1/menu_focus.png) center center no-repeat';
	}
	,blur:function(){
		$('menuLeft_focus').style.opacity=1;
		$('menuLeft_focus').style.background='url(images_second/list1/menu_select.png) center center no-repeat';
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
			img:json.data[i].imgUrl,
			name:json.data[i].name,//
			id:json.data[i].id
		
		});
		//缓存此页数据
		listData['page'+contentPad.currentPage].push({
			img:json.data[i].imgUrl,
			name:json.data[i].name,//
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
	rowNum:3,//行数
	colNum:3,//列数
	itemWidth:277,//每一项的宽度px
	itemHeight:174,//每一项的高度px
	initTop:96,//初始top值px
	initLeft:320,//初始left值px
	rowMargin:20,//行之间间隙距离px
	colMargin:20,//列之间间隙距离px
	focusDivLeftOffset:-4,//光标left偏移值px
	focusDivTopOffset:-4,//光标top偏移值px
	pageSize:9,
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


		for(var i=0;i<this.rowNum;i++){
			for(var j=0;j<this.colNum;j++){
				dataIndex=i*this.colNum+j;//数据数组下标
				if(!!!this.currentPageData[dataIndex]) break;//没数据了
				item=[
					'<div id="'+this.itemId+'_'+(dataIndex)+'" style="position:absolute;top:'+(this.initTop+(this.itemHeight*i)+(i*this.rowMargin))+'px;left:'+(this.initLeft+(this.itemWidth*j)+(j*this.colMargin))+'px;width:'+(this.itemWidth+0)+'px;height:'+(this.itemHeight+0)+'px;display:block;">',
						'<div style="width:'+(this.itemWidth+0)+'px;height:'+(this.itemHeight+0)+'px;overflow:hidden;"><img src="'+this.currentPageData[dataIndex].img+'" width="'+(this.itemWidth+0)+'" /></div>',

						'<div id="'+this.itemId+'TextMask'+(dataIndex)+'" style="width:'+(this.itemWidth+0)+'px;height:39px;line-height:39px;font-size:18px;position:absolute;left:0px;top:135px;background:url(./images_second/list1/text_bg.png);color:#ffffff;overflow:hidden;">',
							'<!-- <marquee scrollamount="2" behavior="alternate" width="'+(this.itemWidth+0)+'" style="width: '+(this.itemWidth+0)+'px;">冰河世纪4</marquee> -->',
							'<span style="padding-left:10px;padding-right:10px;">'+this.currentPageData[dataIndex].name+'</span>',
						'</div>',
						'<div id="'+this.itemId+'Focus'+(dataIndex)+'" class="smooth" style="position:absolute; top:-4px; left:-4px; width:277px; height:174px; z-index:5; display:none;opacity:1;visibility: visible;  border:4px #ffffff solid; "></div>',
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

		backUrl=createUrlByObject(backUrl,{pageNo:this.currentPage,leftMenuId:menuPad.menuData[menuPad.listObj.position].id});

		var url='detail_second.html?id='+this.currentPageData[this.index].id;		

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



