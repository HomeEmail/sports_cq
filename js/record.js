
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
var channelId=0; //频道ID
var labelId=0; //标签ID
var labelPos=2; //标签位置
var labelPosOld=2; //旧标签位置
var channelName='';
var hasData = false;  //是否有数据

//页面dom加载完成
function pageOnload(){

	if(document.onkeypress!==null){
		document.onkeypress = grabEvent;
	}
	document.onkeydown = grabEvent; 
	showLoadingDiv();

	channelId = Q.getInt("channelId",1);
	labelId = Q.getInt("labelId",0);
	
	contentPad.pageSize=12;
	contral=contentPad;

	// checkOrder(function(){
		ajaxObj.collectRecords(
			function(){
				if(hasData){
					contentPad.init();
					contentPad.render();
					contentPad.resetFocusInfo();
					contentPad.focus();
				}else{
					s='<div style="height:60px;color: #cccccc;font-size: 28px;text-align: center;padding-top: 200px;">您还没播放记录，快去播放节目吧！</div>';
					$('contentWrapper').innerHTML=s;
				}
			},
			12,
			1
		);
	// });
};
//销毁页面
function pageOnunload(){

}

//删除内容 begin
var contentDel={
	isShowTip:false,
	timerTip:null,
	init:function(){
		
	},
	focus:function(){
		$('contentDel').style.display='block';
	},
	blur:function(){
		$('contentDel').style.display='none';
	},
	outDown:function(){//下一页
		this.blur();
		contral=contentPad;
		contentPad.focus();
	},//将要跳出本交互模块的处理
	left:function(){
		return 0;
	},
	right:function(){
		return 0;
	},
	up:function(){
		return 0;
	},
	down:function(){
		if(contentPad.currentPageData.length==0){
			return 0;
		}else{
			this.outDown();
		}
	},
	enter:function(){
		
		clearTimeout(this.timerTip);
		if(!this.isShowTip){
			this.isShowTip = true;
			$('tips').innerHTML='<span style="position:absolute;left:25px;top:20px;width:378px;height:132px;color:#eeeeee;font-size:22px;line-height:132px;text-align:center;">再点一次确定将清空记录！</span>';
			$('tips').style.display='block';
		}else{
			ajaxObj.deletePlayRecord(function(){
				contentPad.currentPageData = [];
				contentPad.render();
			});
			contentDel.isShowTip = false;
			$('tips').style.display='none';
		}
		this.timerTip = setTimeout(function(){
			contentDel.isShowTip = false;
			$('tips').style.display='none';
		},3000);
	}
};
//删除内容 end

//右边内容 begin
var contentPad={
	wrapperId:'contentWrapper',//外层div id
	itemId:'listItem',//每项 dom id的名称前缀
	rowNum:2,//行数
	colNum:6,//列数
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
			s='<div style="height:60px;color: #cccccc;font-size: 20px;text-align: center;padding-top: 200px;">您还没有观看记录，快去看看节目吧！</div>';
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
		ajaxObj.collectRecords(
			function(){
				contentPad.init();
				contentPad.render();
				contentPad.resetFocusInfo();
				contentPad.focus();
			},
			contentPad.pageSize,
			contentPad.currentPage
		);
	},//将要跳出本交互模块的处理
	outDown:function(){//下一页
		this.currentPage++;
		ajaxObj.collectRecords(
			function(){
				contentPad.init();
				contentPad.render();
				contentPad.resetFocusInfo();
				contentPad.focus();
			},
			contentPad.pageSize,
			contentPad.currentPage
		);
	},//将要跳出本交互模块的处理
	outLeft:function(){
		return 0;
		// this.blur();
		// contral=menuPad;
		// menuPad.focus();
	},//将要跳出本交互模块的处理
	outRight:function(){
		return 0;
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
		}else if(this.currentPage==1 && this.isTouchTop()){
			this.blur();
			contral=contentDel;
			contentDel.focus();
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
		//alert(this.currentPageData[this.index].name);
		// if(!isAllowGotoDetail){
		// 	var url='playPage.html?multiSetType='+this.currentPageData[this.index].multiSetType+'&channelId='+channelId+'&pkId='+this.currentPageData[this.index].pkId+'&videoId=0&point=0';
		// }else{
		// 	var url='detail.html?multiSetType='+this.currentPageData[this.index].multiSetType+'&channelId='+channelId+'&pkId='+this.currentPageData[this.index].pkId;
		// }
		var url=generatePlayPageUrl(this.index);
		var backUrl=location.href;//'index.html?menuPos='+menuBox.position;
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
	collectRecords: function (_fn,_pageSize,_pageNo){
		ajaxObj.ajaxGo(
			serverPath+"/media/video/playRecords.utvgo?keyNo="+keyNo+"&pageSize="+_pageSize+"&pageNo="+_pageNo,
			function(_data){
				contentPad.currentPageData = [];
				if(_data.data.length>0){
					hasData=true;
					for(var i=0;i<_data.data.length;i++){
						var aaa = {};
						aaa.img = _data.data[i].imageSmall||_data.data[i].imageMid||_data.data[i].imageBig;
						aaa.name = _data.data[i].titleName;
						// aaa.href = "";
						aaa.pkId = _data.data[i].videoId;
						aaa.videoId = _data.data[i].contentId;
						aaa.number = _data.data[i].number;
						aaa.audioStreamUrl = _data.data[i].audioStreamUrl;
						aaa.multiSetType = _data.data[i].multiSetType;
						aaa.contentType = _data.data[i].contentType;
						aaa.isFree = _data.data[i].isFree;
						contentPad.currentPageData.push(aaa);
					}
					contentPad.totalPage=_data.totalPage;
					contentPad.currentPage=_data.currentPage;
				}else{
					hasData=false;
					contentPad.totalPage=0;
					contentPad.currentPage=0;
				}
				!!_fn&&_fn();
			}
		)
	},
	deletePlayRecord: function (_fn){
		ajaxObj.ajaxGo(
			serverPath+"/media/video/deletePlayRecord.utvgo?keyNo="+keyNo,
			function(_data){
				if(_data.code==1){
		            !!_fn&&_fn();
		        }else{
		        	return 0;
		        };
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
		        	hasData=false;
		        	showTips('服务器繁忙...',2000);
		        };
		    },
		    onComplete:function(){
		        ajaxObj.req = null;
		        hideLoadingDiv();
		    },
		    onError:function(){
		    	ajaxObj.req = null;
		    	hasData=false;
		        showTips('服务器繁忙...',2000);
		        !!failFn&&failFn();
		    },
		    post:"",
		    timeout:9000
		});
	}
}

function checkOrder(_fn){
	showLoadingDiv();
	if(req != null){
		req = null;
	}
	req = ajax({
		url: userPath +'/chongqing/cqUserController/authorization.utvgo?keyNo='+keyNo+'&cmboIds='+cmboIds,
		type: "GET", //HTTP 请求类型,GET或POST
		dataType: "html", //请求的文件类型html/xml
		onSuccess: function(html){ //请求成功后执行[可选]
			hideLoadingDiv();
			var datas = eval("(" + html + ")");
			if(datas.code == 0){ //订购了
				orderStrtus = true;
			}
			!!_fn&&_fn();
		},
		onComplete : function(){
			req = null;
		},
		onError:function(){ //请求失败后执行[可选]
			showTips("系统繁忙...",2000);
		},
		post:"",
		timeout:9000
	});
}

function showOrder(_fn,_grabEvent){  //活动确定按钮直接订购,成功后回调
	orderFlow.init();//模块初始化
	orderFlow.onEventHandle(_grabEvent);//事件接管
	orderFlow.show();//显示模块
	orderFlow.successTipsDivCallBack=function(){

	};//订购成功关闭弹层回调
	orderFlow.failureTipsDivCallBack=function(){

	};//订购失败关闭弹层回调
	orderFlow.orderSuccessCallBack = function(){
		!!_fn&&_fn();
	};//订购成功回调
	orderFlow.orderFailureCallBack=function(){

	};//订购失败回调
	orderFlow.showStep('orderTipsDiv');//显示哪一步
}

function generatePlayPageUrl(index){
	var pkId=contentPad.currentPageData[index].pkId;
	var videoId=contentPad.currentPageData[index].videoId;
	var point=0;
	var multiSetType=contentPad.currentPageData[index].multiSetType;
	var videoNo=contentPad.currentPageData[index].number;
	if(contentPad.currentPageData[index].contentType==0){
		var url='play_audio.html?multiSetType='+multiSetType+'&channelId='+channelId+'&pkId='+pkId+'&videoNo='+videoNo;
	}else if(contentPad.currentPageData[index].contentType==1){
		if(parseInt(contentPad.currentPageData[index].isFree)==0){//是收费
			albumFree=false;
		}else{
			albumFree=true;
		}
		// if(orderStrtus || albumFree){
			var url='play_video.html?multiSetType='+multiSetType+'&channelId='+channelId+'&pkId='+pkId;
		// }else{
		// 	showOrder(function(){orderStrtus = true;},grabEvent);
		// 	return 0;
		// }
	}
	// if(multiSetType==0){
	// 	videoId=detailData.data.videoId;
	// }
	// if((multiSetType==1||multiSetType==2||multiSetType==3)&&!!detailData.data[index||0]){
	// 	videoId=detailData.data[index||0].videoId;
	// }
	url+='&videoId='+videoId+'&point='+point;
	return url;
}
