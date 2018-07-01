
function eventInit(_event){
	if (_event.type=='keydown') {
		document.onkeypress=null;
	};
	var code = Event(_event);
	switch(code){
		case "KEY_EXIT":
			window.location.href = portalUrl||backUrl;
			return 0;
		case "KEY_BACK": //
			//window.location.href = iPanel.eventFrame.portal_url;	
			if(!!backUrl){
				location.href=backUrl;
			}else{
				history.back();
			}
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

function grabEvent(_event){
	if (_event.type=='keydown') {
		document.onkeypress=null;
	};
	var code = Event(_event);
	var keyCode = _event.which;
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
			window.location.href = portalUrl||backUrl;
			return 0;
		case "KEY_BACK": //
			if(contral.back){
				contral.back();
			}else{
				if(!!backUrl){
					location.href=backUrl;
				}else{
					history.back();
				}
			}
			return false;
			break;
		case "KEY_NUMBER1":
		case "KEY_NUMBER2":
		case "KEY_NUMBER3":
		case "KEY_NUMBER4":
		case "KEY_NUMBER5":
		case "KEY_NUMBER6":
		case "KEY_NUMBER7":
		case "KEY_NUMBER8":
		case "KEY_NUMBER9":
		case "KEY_NUMBER0":
			contral.inputNum&&contral.inputNum(keyCode-48);
			return 0;
			break;
		default:
			break;
	}
}
var contral={};

var isMusicStyle=0; //是否是音乐横图风格列表 0非 1是
var channelId=0; //频道ID  c
var groupId=1; //标签组合ID
var labelId=0; //标签ID  c
var labelPos=1; //标签位置
var labelPosOld=2; //旧标签位置
var channelName='';


var pageNo=0;//右边页码记录
var rFpos=-1;//右边光标位置记录 -1光标不处理默认在左边菜单

// var isAllowGotoDetail=true;//是否允许去详情页 

function checkLongImageChannel(){
	var c=[1,2];
	for(var i=0,len=c.length;i<len;i++){
		if(channelId==c[i]){
			isMusicStyle=0;//此频道是竖图列表
			return 0;
		}
	}
	isMusicStyle=1;//此频道是音乐风格列表
	return 0;
}
function checkAllowGotoDetailChannel(){
	var c=[4,15,11];
	for(var i=0,len=c.length;i<len;i++){
		if(channelId==c[i]){
			isAllowGotoDetail=false;//此频道不允许去详情页
			return 0;
		}
	}
	isAllowGotoDetail=true;//此频道允许去详情页
	return 0;
}

//页面dom加载完成
function pageOnload(){
	showLoadingDiv();
	channelId = Q.getInt("channelId",1);
	labelId = Q.getInt("labelId",0);
	groupId = Q.getInt("groupId",1);
	channelId=groupId;

	pageNo = Q.getInt('pageNo',0);
	rFpos = Q.getInt('rFpos',-1);
	// checkLongImageChannel();
	// checkAllowGotoDetailChannel();

	// if(isMusicStyle==1){
	// 	contentPad.pageSize=12;
	// 	labelPos = 1;
	// 	labelPosOld = 1;
	// }else{
	// 	contentPad.pageSize=10;
	// 	labelPos = 2;
	// 	labelPosOld = 2;
	// }
	contentPad.pageSize=10;
	checkVipAuthor(function(){
		ajaxObj.labelList(function(){
			if(document.onkeypress!==null){
				document.onkeypress = grabEvent;
			}
			document.onkeydown = grabEvent;
			contral=menuPad;
			menuPad.init();
			menuPad.focus();
			hideLoadingDiv();
		});
	});
		
};
//销毁页面
function pageOnunload(){

}

//左边菜单 begin
var menuPad={
	listObj:null
	,menuData:[
		{name:'筛选',icon:'./images/list-filter-icon.png',href:''},
		{name:'搜索',icon:'./images/list-search-icon.png',href:''},
		{name:'最近更新',labelId:32,dataApi:''},
		{name:'同步剧',labelId:32,dataApi:''},
		{name:'热门剧场',labelId:32,dataApi:''},
		{name:'海外剧场',labelId:32,dataApi:''},
		{name:'偶像剧',labelId:32,dataApi:''},
		{name:'古代武打',labelId:32,dataApi:''},
		{name:'战争主题',labelId:32,dataApi:''},
		{name:'TVB专区',labelId:32,dataApi:''},
		{name:'港台',labelId:32,dataApi:''},
		{name:'欧美',labelId:32,dataApi:''},
		{name:'日韩',labelId:32,dataApi:''},
		{name:'抗战',labelId:32,dataApi:''},
		{name:'恐怖',labelId:32,dataApi:''},
		{name:'悬疑',labelId:32,dataApi:''}
	]
	,init:function(){
		this.initList({initFocusDataIndex:8});
		this.updateContent();
	}
	,initList:function(o){
		var o=o||{};
		var listSize=8;//列表最多可以显示多少项
		var dataLen=this.menuData.length;//列表数据总总长度
		var focusIndex=o.initFocusDataIndex||0;//初始化focus第几个数据
		var itemHigh=60;//每项的高度或宽度
		var sign=0;//1左右模式，0上下模式
		var focusLoop=false;//true为循环，false为不循环
		this.listObj=null;
		this.listObj = new showList(listSize, dataLen, focusIndex,5, window);
		this.listObj.focusDiv = 'menu_focus';
		this.listObj.listHigh = itemHigh; 
		this.listObj.listSign = sign;
	    this.listObj.focusLoop = focusLoop;  
	    this.listObj.focusPos=isMusicStyle?1:2;//当前列表焦点的位置；
	    this.listObj.position=labelPos;//当前数据焦点的位置；
		this.listObj.haveData = function(list){ //list.idPos:对象id,list.dataPos:数据id      
			$("menu_" + list.idPos).style.visibility = "visible";
			if(!!menuPad.menuData[list.dataPos].icon){
				$("menu_" + list.idPos).innerHTML = '<img style="vertical-align: text-bottom;" src="'+menuPad.menuData[list.dataPos].icon+'" /> <span>'+menuPad.menuData[list.dataPos].name+'</span>'; 
			}else{
				$("menu_" + list.idPos).innerHTML = menuPad.menuData[list.dataPos].name; 
			}
			
			//$("menu_" + list.idPos).style.background ='url('+ menuPad.menuData[list.dataPos].name +')  no-repeat' ;     

		};
		this.listObj.notData  = function(list){
			$("menu_" + list.idPos).style.visibility = "hidden";
			$("menu_" + list.idPos).innerHTML = "";
		};
		this.listObj.startShow();//去掉不移动
	}
	,focus:function(){
		$('menu_focus').style.opacity=1;
	}
	,blur:function(){
		$('menu_focus').style.opacity=0.5;
	}
	,updateArrow:function(){//更新箭头指示
		if(this.listObj.position>0){
			$('menuArrowUp').style.display='block';
		}else{
			$('menuArrowUp').style.display='none';
		}
		if(this.listObj.position>=(this.menuData.length-1)){
			$('menuArrowDown').style.display='none';
		}else{
			$('menuArrowDown').style.display='block';
		}
	}
	,updateContent:function(){//更新右边内容
		var that = this;
		$('contentTW_span').innerHTML = channelName + menuPad.menuData[menuPad.listObj.position].name;
		if(this.listObj.position>0){//不是筛选和搜索按钮时，上下按键就自动切换右边内容
			// console.log('右边内容：'+this.menuData[this.listObj.position].name);
			if(!!this.menuData[this.listObj.position].content){//此菜单内容有缓存
				//contentPad.currentPageData;//需要更新当前页数据
				contentPad.currentPageData=that.menuData[that.listObj.position].content;
				contentPad.totalPage=menuPad.menuData[menuPad.listObj.position].totalPage;
				contentPad.currentPage=menuPad.menuData[menuPad.listObj.position].currentPage;
				contentPad.init();
				contentPad.render();
			}else{//ajax 获得菜单内容
				var rFpos_temp=rFpos;
				ajaxObj.programList1(
					function(){
						that.menuData[that.listObj.position].content=contentPad.currentPageData;//测试用
						contentPad.init();
						contentPad.render();
						if(rFpos_temp!=-1&&contentPad.currentPageData.length>0){ //光标初始在右边列表
							contentPad.index=rFpos_temp;
							contentPad.setCurrentColAndRowByIndex();
							menuPad.blur();
							contral=contentPad;
							contentPad.focus();
						}
					},
					that.menuData[that.listObj.position].labelId,
					contentPad.pageSize,
					pageNo
				);
				pageNo=0;//重置右边初始页码记录
				rFpos=-1;//重置初始右边光标位置记录
			}
		}
		this.updateArrow();
	}
	,outUp:function(){}//将要跳出本交互模块的处理
	,outDown:function(){}//将要跳出本交互模块的处理
	,outLeft:function(){}//将要跳出本交互模块的处理
	,outRight:function(){
		if(!!!this.menuData[this.listObj.position].content[0]){//右边没内容
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
		this.listObj.up();
		this.updateContent();
	},
	down:function(){
		if(this.listObj.position==this.menuData.length-1){
			return 0;
		}
		this.listObj.down();
		this.updateContent();
	},
	enter:function(){
		if(this.listObj.position==0){//筛选和搜索按钮
			if(orderStrtus){
				showTips("您已订购本产品,谢谢!",2000);
			}else{
				var url='./order.html?';//订购
				if(url.indexOf('?')>-1){
					url+='&backUrl='+Q.encode(location.href);
				}else{
					url+='?backUrl='+Q.encode(location.href);
				}
				location.href = url;
			}
			
		}
	},
	inputNum:function(i){

	},
	getDateStr: function (nowDayCount,AddDayCount) {
    	if(nowDayCount==undefined){
    		var dd = new Date();
    	}else{
    		var dd = new Date(nowDayCount);
    	}
    	if(AddDayCount!=undefined){
    		dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    	}
	    var y = dd.getFullYear(); 
	    var m = dd.getMonth()+1;//获取当前月份的日期
	    var d = dd.getDate(); 
	    //判断 月
	    if(m < 10){
	      m = "0" + m;
	    }else{
	      m = m;
	    }
	    //判断 日n     
	    if(d < 10){//如果天数<10
	      d = "0" + d;
	    }else{
	      d = d;
	    }
	    return y+"-"+m+"-"+d; 
	}
};
//左边菜单 end


//右边内容 begin
var contentPad={
	wrapperId:'contentWrapper',//外层div id
	itemId:'listItem',//每项 dom id的名称前缀
	rowNum:2,//行数
	colNum:5,//列数
	itemWidth:180,//每一项的宽度px
	itemHeight:240,//每一项的高度px
	initTop:0,//初始top值px
	initLeft:0,//初始left值px
	rowMargin:20,//行之间间隙距离px
	colMargin:20,//列之间间隙距离px
	focusDivLeftOffset:2,//光标left偏移值px
	focusDivTopOffset:2,//光标top偏移值px
	pageSize:0,
	currentPage:1,
	totalPage:1,
	currentPageData:[
		{img:'./images/list-item2.png',name:'冰河世纪4',href:''},
		{img:'./images/list-item2.png',name:'冰河世纪4斯蒂芬斯蒂芬',href:''},
		{img:'./images/list-item2.png',name:'冰河世纪4试点范围的发',href:''},
		{img:'./images/list-item2.png',name:'冰河世纪4',href:''},
		{img:'./images/list-item2.png',name:'冰河世纪4斯蒂芬斯蒂芬',href:''},
		{img:'./images/list-item2.png',name:'冰河世纪4试点范围的发',href:''},
		{img:'./images/list-item2.png',name:'冰河世纪4',href:''},
		{img:'./images/list-item2.png',name:'冰河世纪4试点范围的发',href:''},
		{img:'./images/list-item2.png',name:'冰河世纪4',href:''},
		{img:'./images/list-item2.png',name:'冰河世纪4试点范围的发',href:''},
		{img:'./images/list-item2.png',name:'冰河世纪4',href:''}
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
		if(isMusicStyle==1){//配置音乐列表样式参数
			this.rowNum=3;
			this.colNum=4;
			this.itemWidth=230;
			this.itemHeight=162;
			this.focusDivTopOffset=-54;
			this.focusDivLeftOffset=-54;
		}
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
		var s='';
		var item=[];
		var dataIndex=0;
		for(var i=0;i<this.rowNum;i++){
			for(var j=0;j<this.colNum;j++){
				dataIndex=i*this.colNum+j;//数据数组下标
				if(!!!this.currentPageData[dataIndex]) break;//没数据了
				item=[
					'<div id="'+this.itemId+'_'+(dataIndex)+'" style="position:absolute;top:'+(this.initTop+(this.itemHeight*i)+(i*this.rowMargin))+'px;left:'+(this.initLeft+(this.itemWidth*j)+(j*this.colMargin))+'px;width:'+(this.itemWidth+10)+'px;height:'+(this.itemHeight+10)+'px;">',
						'<div style="position:absolute;left:5px;top:5px;width:'+this.itemWidth+'px;height:'+this.itemHeight+'px;overflow:hidden;"><img src="'+(!this.currentPageData[dataIndex].img?'./images/index/list_bg.png':imgBasePath+this.currentPageData[dataIndex].img)+'" width="'+this.itemWidth+'" /></div>',
						'<div id="'+this.itemId+'TextMask'+(dataIndex)+'" style="width:'+this.itemWidth+'px;height:56px;line-height:70px;font-size:22px;position:absolute;left:5px;top:'+(this.itemHeight-50)+'px;background:url(./images/list-item-text-mask.png);color:#ffffff;overflow:hidden;">',
							'<span style="padding-left:10px;padding-right:10px;">'+this.currentPageData[dataIndex].name+'</span>',
						'</div>',
						'<img id="'+this.itemId+'Focus'+(dataIndex)+'" style="position:absolute;left:'+this.focusDivLeftOffset+'px;top:'+this.focusDivTopOffset+'px;width:'+(this.itemWidth+6)+'px;height:'+(this.itemHeight+6)+'px;display:none;" src="./images/index/movie_focus.png" />',
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
	outUp:function(){//上一页
		this.currentPage--;
		ajaxObj.programList1(
			function(){
				menuPad.menuData[menuPad.listObj.position].content=contentPad.currentPageData;
				contentPad.init();
				contentPad.render();
				contentPad.resetFocusInfo();
				contentPad.focus();
			},
			menuPad.menuData[menuPad.listObj.position].labelId,
			contentPad.pageSize,
			contentPad.currentPage
		);
	},//将要跳出本交互模块的处理
	outDown:function(){//下一页
		this.currentPage++;
		ajaxObj.programList1(
			function(){
				menuPad.menuData[menuPad.listObj.position].content=contentPad.currentPageData;
				contentPad.init();
				contentPad.render();
				contentPad.resetFocusInfo();
				contentPad.focus();
			},
			menuPad.menuData[menuPad.listObj.position].labelId,
			contentPad.pageSize,
			contentPad.currentPage
		);
	},//将要跳出本交互模块的处理
	outLeft:function(){
		this.blur();
		contral=menuPad;
		menuPad.focus();
	},//将要跳出本交互模块的处理
	outRight:function(){
		//自动focus下一行
		if(!!this.currentPageData[this.index+1]){
			this.blur();
			this.index++;
			this.setCurrentColAndRowByIndex();
			this.focus();
		}
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
		if(this.isTouchTop() && this.currentPage>1){
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
		if(this.isTouchBottom() && this.currentPage<this.totalPage){
			this.outDown();
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
		if(groupId==1){
			var url='detail.html?multiSetType='+this.currentPageData[this.index].multiSetType+'&channelId='+channelId+'&pkId='+this.currentPageData[this.index].pkId;
		}else if(groupId==2){
			var url='play_audio.html?multiSetType='+this.currentPageData[this.index].multiSetType+'&channelId='+channelId+'&pkId='+this.currentPageData[this.index].pkId;
		}
		var backUrl=location.href;//'index.html?menuPos='+menuBox.position;

		backUrl=createUrlByObject(backUrl,{pageNo:this.currentPage,labelId:menuPad.menuData[menuPad.listObj.position].labelId,rFpos:this.index});

		/*if(backUrl.indexOf('?')>-1){
			var backUrls = backUrl.split('&');
			backUrl = '';
			for(var i=0;i<backUrls.length;i++){
				if(backUrls[i].indexOf('labelId')>-1){
					if(i==backUrls.length-1){
						backUrl+='labelId='+menuPad.menuData[menuPad.listObj.position].labelId;
					}else{
						backUrl+='labelId='+menuPad.menuData[menuPad.listObj.position].labelId+'&';
					}
				}else{
					if(i==backUrls.length-1){
						backUrl += backUrls[i];
					}else{
						backUrl += backUrls[i]+'&';
					}
				}
			}
		}else{
			backUrl+='?labelId='+menuPad.menuData[menuPad.listObj.position].labelId;
		}*/

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

var ajaxObj = {
	req: null,
	labelList: function (_fn){
		ajaxObj.ajaxGo(
			serverPath+"/system/label/group/labels.utvgo?groupId="+groupId,
			function(_data){
				// if(isMusicStyle==1){
				menuPad.menuData = [
					{name:'订购',icon:'./images/list-search-icon.png',href:'',content:[]}
				];
				// }else{
				// 	menuPad.menuData = [
				// 		{name:'筛选',icon:'./images/list-filter-icon.png',href:'',content:[]},
				// 		{name:'搜索',icon:'./images/list-search-icon.png',href:'',content:[]},
				// 		{name:'最近更新',labelId:0,dataApi:'',content:null,totalPage:0,currentPage:0}
				// 	];
				// }
				for(var i=0;i<_data.data.length;i++){
					var aaa = {};
					aaa.name = _data.data[i].name;
					aaa.labelId = _data.data[i].labelId;
					aaa.dataApi = "";
					aaa.content = null;
					aaa.totalPage = 0;
					aaa.currentPage = 0;
					menuPad.menuData.push(aaa);
					if(aaa.labelId==labelId){
						// if(isMusicStyle==1){
							// labelPos = i+2;
						// }else{
							labelPos = i+1;
						// }
					}
				}
				!!_fn&&_fn();
			}
		)
	},
	programList1: function (_fn,_labelId,_pageSize,_pageNo){
		ajaxObj.ajaxGo(
			serverPath+"/system/label/videos.utvgo?channelId="+channelId+"&labelId="+_labelId+"&pageSize="+_pageSize+(!!_pageNo ? "&pageNo="+_pageNo:''),
			function(_data){
				contentPad.currentPageData = [];
				if(_data.data.length>0){
					for(var i=0;i<_data.data.length;i++){
						var aaa = {};
						aaa.img = _data.data[i].imageSmall;
						aaa.name = _data.data[i].name;
						aaa.href = "";
						aaa.pkId = _data.data[i].id;
						aaa.multiSetType = _data.data[i].multiSetType;
						aaa.doubanScore = _data.data[i].doubanScore;
						aaa.maxSet = _data.data[i].maxSet;
						aaa.isFree = _data.data[i].isFree||'1';
						contentPad.currentPageData.push(aaa);
					}
					menuPad.menuData[menuPad.listObj.position].totalPage=_data.totalPage;
					menuPad.menuData[menuPad.listObj.position].currentPage=_data.currentPage;
					contentPad.totalPage=_data.totalPage;
					contentPad.currentPage=_data.currentPage;
				}else{
					menuPad.menuData[menuPad.listObj.position].totalPage=0;
					menuPad.menuData[menuPad.listObj.position].currentPage=0;
					contentPad.totalPage=0;
					contentPad.currentPage=0;
				}
				channelName=_data.data.channelName||'';
				$('contentTW_span').innerHTML = channelName + menuPad.menuData[menuPad.listObj.position].name;
				!!_fn&&_fn();
			}
		)
	},
	programList2: function (_fn,_pStartTime,_pEndTime,_pageSize,_pageNo){
		ajaxObj.ajaxGo(
			serverPath+"/tv/pageCenter/programList?channelId="+channelId+(!!_pageNo==false?"":"&pageNo="+_pageNo)+"&pageSize="+_pageSize+"&labelId=0&areaId=0&orderId=2&pStartTime="+_pStartTime+"&pEndTime="+_pEndTime,
			function(_data){
				contentPad.currentPageData = [];
				if(_data.data.programs.length>0){
					for(var i=0;i<_data.data.programs.length;i++){
						var aaa = {};
						
						aaa.img = imgBasePath + (_data.data.programs[i].imageBig||_data.data.programs[i].imageMid||_data.data.programs[i].imageSmall);
						aaa.name = _data.data.programs[i].name;
						aaa.href = "";
						aaa.pkId = _data.data.programs[i].pkId;
						aaa.multiSetType = _data.data.programs[i].multiSetType;
						aaa.doubanScore = _data.data.programs[i].doubanScore;
						aaa.maxSet = _data.data.programs[i].maxSet;
						aaa.isFree = _data.data.programs[i].isFree||'1';
						contentPad.currentPageData.push(aaa);
					}
					menuPad.menuData[menuPad.listObj.position].totalPage=_data.totalPage;
					menuPad.menuData[menuPad.listObj.position].currentPage=_data.currentPage;
					contentPad.totalPage=_data.totalPage;
					contentPad.currentPage=_data.currentPage;
				}else{
					menuPad.menuData[menuPad.listObj.position].totalPage=0;
					menuPad.menuData[menuPad.listObj.position].currentPage=0;
					contentPad.totalPage=0;
					contentPad.currentPage=0;
				}
				channelName=_data.data.channelName||'';
				$('contentTW_span').innerHTML = channelName + menuPad.menuData[menuPad.listObj.position].name;
				!!_fn&&_fn();
			}
		)
	},
	ajaxGo: function (_url,successFn,failFn){
		showLoadingDiv();
		if(ajaxObj.req != null){
			ajaxObj.req.abort();
			ajaxObj.req = null;
		}
		ajaxObj.req =ajax({
		    url: _url,
		    type: "GET",
		    dataType: "html",
		    onSuccess: function(_data){
		    	ajaxObj.req = null;
		        var data = eval('('+_data+')');
		        if(data.code==1){
		            !!successFn&&successFn(data);
		        }else{
		        	showTips('服务器繁忙...',2000);
		        };
		    },
		    onComplete:function(){
		        ajaxObj.req = null;
		        hideLoadingDiv();
		    },
		    onError:function(){
		    	ajaxObj.req = null;
		        showTips('服务器繁忙...',2000);
		        !!failFn&&failFn();
		    },
		    post:"",
		    timeout:9000
		});
	}
}




function checkVipAuthor(_fn){
	// orderStrtus = true;
	// return 0;

	showLoadingDiv();
	orderAPIControl.isUnOrderCallBack=function(){
		orderStrtus=false;
	};
	orderAPIControl.isOrderCallBack=function(){
		orderStrtus = true;
	};
	orderAPIControl.isErrorCallBack=function(msg){
		msgTips({msg:msg,timeout:10000});
	};
	orderAPIControl.checkAuthor(function(data){
		
		hideLoadingDiv();
		_fn&&_fn();
	});
	
}


