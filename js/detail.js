
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
				if(!!backUrl){
					location.href=backUrl;
				}else{
					history.back();
				}
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
			if(isShowTip){
				
			}else{
				contral.up&&contral.up();
			}
			return 0;
			break;
		case "KEY_DOWN": //
			if(isShowTip){
				
			}else{
				contral.down&&contral.down();
			}
			return 0;
			break;
		case "KEY_LEFT": //
			if(isShowTip){
				
			}else{
				contral.left&&contral.left();
			}
			return 0;
			break;
		case "KEY_RIGHT": //
			if(isShowTip){
				
			}else{
				contral.right&&contral.right();
			}
			return 0;
			break;
		case "KEY_SELECT": //	
			if(isShowTip){
				
			}else{
				contral.enter&&contral.enter();
			}
			return 0;
			break;
		case "KEY_EXIT":
			window.location.href = portalUrl||backUrl;
			return 0;
		case "KEY_BACK": //
			if(isShowTip){
				isShowTip = false;
				$('tips_jj').style.visibility = 'hidden';
			}else{
				if(contral.back){
					contral.back();
				}else{
					if(!!backUrl){
						location.href=backUrl;
					}else{
						if(!!backUrl){
							location.href=backUrl;
						}else{
							history.back();
						}
					}
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
			if(isShowTip){
				
			}else{
				contral.inputNum&&contral.inputNum(keyCode-48);
			}
			return 0;
			break;
		default:
			break;
	}
}
var contral={};

var isOne=true;//是否是单集
var multiSetType=0;//"0":单集,  "1":只有集数的,  "2": 有独立标题, "3"：有独立标题又有图片
var channelId=1;//频道id
var pkId=0;//节目id
var detailData={data:[]};//详情数据
var detailDatas={name:'',mainRole:'',currentset:'',languageName:'',descript:'',img:'',isCollected:''};//详情数据
var likeData={};//猜你喜欢数据
var collectId=0;//收藏id，不为0代表收藏了
var isShowTip = false;

//页面dom加载完成
function pageOnload(){
	showLoadingDiv();

	multiSetType=Q.getInt('multiSetType');
	channelId=Q.getInt('channelId');
	pkId=Q.getInt('pkId');

	if(multiSetType==0){
		isOne=true;
	}else{
		isOne=false;
	}

	// checkOrder(function(){
		checkCollect(function(){
			getDetailData();
			//统计
			sendPageStatistic({
				vipCode:vipCode,
				vipName:vipName,
				orderStatus:0,
				channelId:'',
				channelName:'',
				labels:'',
				labelIds:'',
				pageName:'详情页-熊猫乐园',
				pageTitle:'详情页'+'-'+detailDatas.name
			},function(){});			
		});
	// })

	if(document.onkeypress!==null){
		document.onkeypress = grabEvent;
	}
	document.onkeydown = grabEvent; 

	hideLoadingDiv();
	
};

//销毁页面
function pageOnunload(){

}
function generatePlayPageUrlByHistory(){
	var url='play_video.html?multiSetType='+detailData.data.history.multiSetType+'&channelId='+detailData.data.history.channelId+'&pkId='+detailData.data.history.programId;
	url+='&videoId='+detailData.data.history.videoId+'&point='+detailData.data.history.playPoint;
	return url;
}
function generatePlayPageUrl(index){
	var pkId=0;
	var videoId=0;
	var point=0;
	if(multiSetType==0){
		pkId=detailData.data.videoId;
		videoId=detailData.data.pk_id;
	}else if((multiSetType==1||multiSetType==2||multiSetType==3)&&!!detailData.data[index||0]){
		pkId=detailData.data[index||0].pkId;
		videoId=detailData.data[index||0].videoId;
	}
	// if((multiSetType==1||multiSetType==2||multiSetType==3)&&!!detailData.data[index||0]){
	// 	videoId=detailData.data[index||0].videoId;
	// }
	var url='play_video.html?multiSetType='+multiSetType+'&channelId='+channelId+'&pkId='+pkId;
	url+='&videoId='+videoId+'&point='+point;
	return url;
}
function appendBackUrl(url){
	var backUrl=location.href;//'index.html?menuPos='+menuBox.position;
	if(url.indexOf('?')>-1){
		url+='&backUrl='+Q.encode(backUrl);
	}else{
		url+='?backUrl='+Q.encode(backUrl);
	}
	return url;
}

function checkCollect(fn){
	var url=serverPath+'/media/video/multiSetDetail.utvgo?keyNo='+keyNo+'&videoId='+pkId;
	showLoadingDiv();
	ajax({
	    url: url,
	    type: "GET", //HTTP 请求类型,GET或POST
	    dataType: "html", //请求的文件类型html/xml
	    onSuccess: function(html){ //请求成功后执行[可选]
	        var json=eval('('+html+')');
	        likeData=json.videoRecommendList;
	        hideLoadingDiv();
	        if(parseInt(json.code,10)==1){
	        	if(parseInt(json.data.isFree)==0){//是收费
					albumFree=false;
				}else{
					albumFree=true;
				}
	        	detailDatas.name=json.data.name;
	        	detailDatas.mainRole=json.data.mainRole;
				detailDatas.currentset=json.data.currentset;
				detailDatas.languageName=json.data.languageName;
				detailDatas.descript=json.data.descript;
				detailDatas.img=imgBasePath+json.data.imageSmall||json.data.imageMid||json.data.imageBig;
				detailDatas.isCollected=json.data.isCollected;
				detailDatas.isFree=json.data.isFree||0;
	        	// if(json.data.isCollected==1){
	        	// 	collectId=json.data.id||0;
	        	// }
	        	collectId = json.data.isCollected;
	        	if(isOne){
					$('oneSets_col').src = './images/collect_'+collectId+'.png';
				}else{
					$('manySets_col').src = './images/collect_'+collectId+'.png';
				}
	        	$('tips_jj_img').src = detailDatas.img;
	        	$('tips_jj_tit').innerHTML = detailDatas.name;
	        	$('tips_jj_inf').innerHTML = detailDatas.descript;
	        }else{
	        	showTips('服务器繁忙...',2000);
	        }
	        !!fn&&fn();
	    },
	    onComplete:function(){
	       
	    },
	    onError:function(){ //请求失败后执行[可选]
	    	showTips('服务器繁忙...',2000);
	    	!!fn&&fn();
	    },
	    post:"",  
	    timeout:70000  
	});
}
function saveCollect(fn){
	var url=serverPath+'/media/video/insertOneCollect.utvgo?keyNo='+keyNo+'&videoId='+pkId;
	showLoadingDiv();
	ajax({
	    url: url,
	    type: "GET", //HTTP 请求类型,GET或POST
	    dataType: "html", //请求的文件类型html/xml
	    onSuccess: function(html){ //请求成功后执行[可选]
	        var json=eval('('+html+')');
	        hideLoadingDiv();
	        if(parseInt(json.code,10)==1){
	        	// collectId=json.data.id||0;
	        	collectId=1;
	        	if(isOne){
					$('oneSets_col').src = './images/collect_'+collectId+'.png';
				}else{
					$('manySets_col').src = './images/collect_'+collectId+'.png';
				}
	        	!!fn&&fn();
	        }else{
	        	showTips('服务器繁忙...',2000);
	        }
	    },
	    onComplete:function(){
	       
	    },
	    onError:function(){ //请求失败后执行[可选]
	    	showTips('服务器繁忙...',2000);
	    },
	    post:'',
	    timeout:70000  
	});
}
function delCollect(fn){
	var url=serverPath+'/media/video/deleteOneCollect.utvgo?keyNo='+keyNo+'&videoId='+pkId;
	showLoadingDiv();
	ajax({
	    url: url,
	    type: "GET", //HTTP 请求类型,GET或POST
	    dataType: "html", //请求的文件类型html/xml
	    onSuccess: function(html){ //请求成功后执行[可选]
	        var json=eval('('+html+')');
	        hideLoadingDiv();
	        if(parseInt(json.code,10)==1){
	        	collectId=0;
	        	if(isOne){
					$('oneSets_col').src = './images/collect_'+collectId+'.png';
				}else{
					$('manySets_col').src = './images/collect_'+collectId+'.png';
				}
	        	!!fn&&fn();
	        }else{
	        	showTips('服务器繁忙...',2000);
	        }
	    },
	    onComplete:function(){
	       
	    },
	    onError:function(){ //请求失败后执行[可选]
	    	showTips('服务器繁忙...',2000);
	    },
	    post:'',  
	    timeout:70000  
	});
}

var detailReq=null;
function getDetailData(fn){
	if(!!detailReq) return 0;
	showLoadingDiv();
	var pageNo=1;//多集 当前第几页
	var pageSize=9000;//多集 每页几项
	var totalPage=1;//多集 总共几页
	if(multiSetType==0){
		var url=serverPath+'/media/videoContent/oneSet.utvgo?videoId='+pkId+'&pageNo='+pageNo+'&pageSize='+pageSize;
	}else if(multiSetType==1||multiSetType==2||multiSetType==3){
		var url=serverPath+'/media/videoContent/multiSet.utvgo?videoId='+pkId+'&pageNo='+pageNo+'&pageSize='+pageSize;
	}
	detailReq=ajax({
	    url: url,
	    type: "GET", //HTTP 请求类型,GET或POST
	    dataType: "html", //请求的文件类型html/xml
	    onSuccess: function(html){ //请求成功后执行[可选]
	    	detailReq=null;
	        var json=eval('('+html+')');
	        hideLoadingDiv();
	        if(parseInt(json.code,10)==1){
	        	if(multiSetType==0){
					detailData.data.videoId = json.data.videoId;
					detailData.data.pk_id = json.data.pk_id;
					detailData.data.isFree=json.data.isFree;
				}else if(multiSetType==1||multiSetType==2||multiSetType==3){
					detailData.data = [];
		        	for(var i=0;i<json.data.length;i++){
		        		detailData.data.push({pkId:"",videoId:""});
		        		detailData.data[i].pkId = json.data[i].videoId;
		        		detailData.data[i].videoId = json.data[i].pkId;
		        		detailData.data[i].isFree = json.data[i].isFree;
		        	}
				}
	        	// detailData=json;
	        	if(isOne){
					setOnlyNumberPad.init();
					contral=setOnlyNumberPad;
				}else{
					setWithImgTitlePad.init();
					contral=setWithImgTitlePad;
				}
				likePad.init();
	        	fn&&fn();
	        }else{
	        	showTips('服务器繁忙...',2000);
	        }
	    },
	    onComplete:function(){
	       
	    },
	    onError:function(){ //请求失败后执行[可选]
	       detailReq=null;
	       showTips('服务器繁忙...',2000);
	    },
	    post:"",  
	    timeout:70000  
	});
}

//猜你喜欢内容 begin
var likePad={
	wrapperId:'likeListWrapper',//外层div id
	itemId:'likeItem',//每项 dom id的名称前缀
	rowNum:1,//行数
	colNum:6,//列数
	itemWidth:170,//每一项的宽度px
	itemHeight:229,//每一项的高度px
	initTop:0,//初始top值px
	initLeft:0,//初始left值px
	rowMargin:10,//行之间间隙距离px
	colMargin:22,//列之间间隙距离px
	focusDivLeftOffset:-3,//光标left偏移值px
	focusDivTopOffset:-4,//光标top偏移值px
	pageSize:0,
	currentPage:1,
	totalPage:1,
	currentPageData:[
		// {img:'./images/list-item2.png',name:'冰河世纪4',pkId:'', multiSetType:'',channelId:'',href:''},
		// {img:'./images/list-item2.png',name:'冰河世纪4斯蒂芬斯蒂芬',href:''},
		// {img:'./images/list-item2.png',name:'冰河世纪4试点范围的发',href:''},
		// {img:'./images/list-item2.png',name:'冰河世纪4',href:''},
		// {img:'./images/list-item2.png',name:'冰河世纪4斯蒂芬斯蒂芬',href:''},
		// {img:'./images/list-item2.png',name:'冰河世纪4试点范围的发',href:''},
		// {img:'./images/list-item2.png',name:'冰河世纪4',href:''},
		// {img:'./images/list-item2.png',name:'冰河世纪4',href:''}
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
		likePad.currentPageData=[];
		for(var i=0,len=likeData.length;i<len;i++){
			likePad.currentPageData.push({
				img:(likeData[i].imageSmall||likeData[i].imageMid||likeData[i].imageBig),
				name:likeData[i].name,
				pkId:likeData[i].id,
				multiSetType:likeData[i].multiSetType,
				channelId:likeData[i].channelId,
				doubanScore:likeData[i].doubanScore,
				isFree:likeData[i].isFree,
				maxSet:likeData[i].maxSet,
				href:''
			});
		}
		this.setPageSize();
		this.resetFocusInfo();
		this.setIndex();
		this.setCurrentColAndRowByIndex();
		this.renderHtml();
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
					'<div style="position:absolute;top:'+(this.initTop+(this.itemHeight*i)+(i*this.rowMargin))+'px;left:'+(this.initLeft+(this.itemWidth*j)+(j*this.colMargin))+'px;width:'+(this.itemWidth+10)+'px;height:'+(this.itemHeight+10)+'px;">',
						'<div style="width:'+this.itemWidth+'px;height:'+this.itemHeight+'px;overflow:hidden;"><img src="'+(!this.currentPageData[dataIndex].img?'./images/index/list_bg.png':imgBasePath+this.currentPageData[dataIndex].img)+'" width="'+this.itemWidth+'" /></div>',
						'<div id="'+this.itemId+'TextMask'+(dataIndex)+'" style="width:'+this.itemWidth+'px;height:56px;line-height:70px;font-size:22px;position:absolute;left:0px;top:'+(this.itemHeight-56)+'px;background:url(./images/list-item-text-mask.png);color:#ffffff;overflow:hidden;">',
							'<span style="padding-left:10px;padding-right:10px;">'+this.currentPageData[dataIndex].name+'</span>',
						'</div>',
						'<img id="'+this.itemId+'Focus'+(dataIndex)+'" style="position:absolute;left:'+this.focusDivLeftOffset+'px;top:'+this.focusDivTopOffset+'px;width:'+(this.itemWidth+6)+'px;height:'+(this.itemHeight+6)+'px;display:none;" src="./images/index/movie_focus.png" />',
					'</div>'
				];
				s+=item.join('');
			}
		}

		if(this.currentPageData.length<=0){
			s='<div style="height:60px;color: #cccccc;font-size: 20px;text-align: center;padding-top: 100px;">无数据（小编会努力补上的~~）</div>';
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
		this.afterFocus&&this.afterFocus();
	},
	blur:function(){
		$(this.itemId+'Focus'+this.index).style.display='none';
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
	outUp:function(){
		this.blur();
		if(isOne){
			contral=setOnlyNumberPad;
			setOnlyNumberPad.focus();
		}else{
			contral=setWithImgTitlePad;
			setWithImgTitlePad.focus();
		}
	},//将要跳出本交互模块的处理
	outDown:function(){
		//下一页

	},//将要跳出本交互模块的处理
	outLeft:function(){
		// this.blur();
		// contral=menuPad;
		// menuPad.focus();
	},//将要跳出本交互模块的处理
	outRight:function(){
		if(rightAdPad.data.length<=0) return 0;
		this.blur();
		contral=rightAdPad;
		rightAdPad.focus();
		rightAdPad.fromPad='likePad';

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
			// this.outRight();
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
		var url='detail.html?multiSetType='+this.currentPageData[this.index].multiSetType+'&channelId='+this.currentPageData[this.index].channelId+'&pkId='+this.currentPageData[this.index].pkId;
		//url=appendBackUrl(url);
		//var backUrl=location.href;//'index.html?menuPos='+menuBox.position;
		if(url.indexOf('?')>-1){
			url+='&backUrl='+Q.encode(backUrl);
		}else{
			url+='?backUrl='+Q.encode(backUrl);
		}
		location.href=url;
	},
	inputNum:function(i){

	}
};
//猜你喜欢内容 end

// 单集 begin
var setOnlyNumberPad={
	wrapperId:'oneSets',//外层div id
	itemId:'oneSets',//每项 dom id的名称前缀
	pos:0,
	oldPos:0,
	posXY:[
		{x:1065,y:175},
		{x:310,y:232},
		{x:474,y:232}
	],
	init:function(){
		this.pos = 1;
		$('oneSets_img').src = detailDatas.img;
		$('oneSets_tit').innerHTML = detailDatas.name;
		$('oneSets_yy').innerHTML = detailDatas.languageName||'';
		$('oneSets_pf').innerHTML = detailDatas.mainRole||'';
		$('oneSets_jj').innerHTML = detailDatas.descript||'小编会努力补上的~~';
		if(parseInt(detailDatas.isFree,10)==1&&$('oneSets_free_icon_big')){
			$('oneSets_free_icon_big').style.display='block';
		}
		this.changeFocus();
		this.focus();
		this.show();
	},
	focus:function(){
		$('oneSets_f').style.visibility = 'visible';
	},
	blur:function(){
		$('oneSets_f').style.visibility = 'hidden';
	},
	show:function(){
		$('oneSets').style.visibility = 'visible';
	},
	hide:function(){
		$('oneSets').style.visibility = 'hidden';
	},
	outUp:function(){

	},
	outDown:function(){
		this.blur();
		contral=likePad;
		likePad.focus();
	},
	outLeft:function(){

	},
	outRight:function(){
		
	},
	left:function(){
		this.oldPos = this.pos;
		if(this.pos==0){
			return 0;
		}else if(this.pos==1||this.pos==2){
			this.pos = this.pos==1?2:1;
		}
		this.changeFocus();
	},
	right:function(){
		this.oldPos = this.pos;
		if(this.pos==0){
			return 0;
		}else if(this.pos==1||this.pos==2){
			this.pos = this.pos==1?2:1;
		}
		this.changeFocus();
	},
	up:function(){
		this.oldPos = this.pos;
		if(this.pos==0){
			return 0;
		}else if(this.pos==1||this.pos==2){
			this.pos = 0;
		}
		this.changeFocus();
	},
	down:function(){
		this.oldPos = this.pos;
		if(this.pos==0){
			this.pos = 1;
		}else if(this.pos==1||this.pos==2){
			this.outDown();
			return 0;
		}
		this.changeFocus();
	},
	changeFocus:function(){
		if(this.pos==0){
			$('oneSets_f').src = './images/detail_f_0.png';
		}else if(this.pos==1||this.pos==2){
			$('oneSets_f').src = './images/detail_f_1.png';
		}
		$('oneSets_f').style.top = this.posXY[this.pos].y+'px';
		$('oneSets_f').style.left =  this.posXY[this.pos].x+'px';
	},
	enter:function(){
		if(this.pos==0){
			if(!isShowTip){
				isShowTip = true;
				$('tips_jj').style.visibility = 'visible';
			}
		}else if(this.pos==1){
			// if(orderStrtus || albumFree){
				var url=generatePlayPageUrl(0);
				url=appendBackUrl(url);
				location.href = url;
			// }else{
				// showOrder(function(){orderStrtus = true;},grabEvent);
			// }
		}else if(this.pos==2){
			if(collectId==0){
				saveCollect();
			}else if(collectId==1){
				delCollect();
			}
		}
	}
};
// 单集 end


// 多集 begin
var setWithImgTitlePad={
	wrapperId:'manySets',//外层div id
	itemId:'manySets',//每项 dom id的名称前缀
	pos:0, //从0开始
	oldPos:0,
	pos1:0, //从0开始
	pos2:0, //从1开始
	oldPos2:0, //从1开始
	rowNum:2,//行数
	colNum:10,//列数
	itemWidth:70,//每一项的宽度px
	itemHeight:48,//每一项的高度px
	initTop:0,//初始top值px
	initLeft:10,//初始left值px
	rowMargin:8,//行之间间隙距离px
	colMargin:8,//列之间间隙距离px
	focusDivLeftOffset:-38,//光标left偏移值px
	focusDivTopOffset:-38,//光标top偏移值px
	pageSize:0,
	currentPage:1,
	totalPage:1,
	totalCount:1,
	currentPageData:[
		
	],
	posXY:[
		{x:974,y:73},
		{x:1015,y:163},
		{x:305,y:245},
		{x:310,y:365}
	],
	datasLen:0,
	currDatasLen:20,
	groupLen:0,
	init:function(){
		this.pos=2;
		this.pos1=0;
		this.pos2=0;
		$('manySets_img').src = detailDatas.img;
		$('manySets_tit').innerHTML = detailDatas.name;
		$('manySets_yy').innerHTML = detailDatas.languageName||'';
		$('manySets_js').innerHTML = detailDatas.currentset||'';
		$('manySets_jj').innerHTML = detailDatas.descript||'小编会努力补上的~~';
		$('manySets_col').src = './images/collect_'+collectId+'.png';
		if(parseInt(detailDatas.isFree,10)==1&&$('manySets_free_icon_big')){
			$('manySets_free_icon_big').style.display='block';
		}
		this.datasLen = detailData.data.length;
		this.groupLen = Math.ceil(detailData.data.length/20);
		// this.init1();
		// this.init2();
		this.changePage();
		this.changeFocus();
		this.focus();
		this.show();

	},
	init1:function(){
		var str = '';
		var i = this.pos2*20;
		var j = this.pos2*20+this.currDatasLen;
		if(this.pos2==(this.groupLen-1) && this.datasLen%20!=0){
			j = this.pos2*20+(this.datasLen%20);
		}
		for(i;i<j;i++){
			str += '<div style="width:'+this.itemWidth+'px; height:'+this.itemHeight+'px; line-height:'+this.itemHeight+'px; margin-right:'+this.colMargin+'px; margin-bottom:'+this.rowMargin+'px; background:url(./images/detail_1_bg.png) no-repeat; text-align:center; float:left;position:relative;"><span>'+(i+1)+'</span>'+(parseInt(detailData.data[i].isFree,10)==1&&parseInt(detailDatas.isFree,10)==0 ? '<img src="./images/detail_free_icon.png" style="left:0px;top:0px;position:absolute;" />':'')+'</div>';
		}
		$('manySets_1').innerHTML = str;
	},
	init2:function(){
		var str = '';
		for(var i=0;i<this.groupLen;i++){
			str += '<div id="manySets_2_'+i+'" style="width:92px; height:40px; margin-right:18px; line-height:40px; text-align:center; float:left;">'+(i*20+1)+'-'+(i+1)*20+'</div>';
		}
		$('manySets_2').innerHTML = str;
	},
	focus:function(){
		$('manySets_f').style.visibility = 'visible';
	},
	blur:function(){
		$('manySets_f').style.visibility = 'hidden';
	},
	show:function(){
		$('manySets').style.visibility = 'visible';
	},
	hide:function(){
		$('manySets').style.visibility = 'hidden';
	},
	outUp:function(){
		
	},
	outDown:function(){
		this.blur();
		contral=likePad;
		likePad.focus();
	},
	outLeft:function(){
		
	},
	outRight:function(){
		
	},
	left:function(){
		this.oldPos = this.pos;
		if(this.pos==0){
			return 0;
		}else if(this.pos==1){
			return 0;
		}else if(this.pos==2){
			if(this.pos1==0){
				if(this.pos2==0){
					return 0;
				}else{
					this.changePage(-1);
					return 0;
				}
			}else{
				this.pos1--;
			}
			this.changeFocus1();
			return 0;
		}else if(this.pos==3){
			this.oldPos2 = this.pos2;
			if(this.pos2==0){
				return 0;
			}else{
				// this.pos2--;
				this.changePage(-1);
				return 0;
			}
			this.changeFocus2();
			return 0;
		}
		this.changeFocus();
	},
	right:function(){
		this.oldPos = this.pos;
		if(this.pos==0){
			return 0;
		}else if(this.pos==1){
			return 0;
		}else if(this.pos==2){
			if(this.pos2==this.groupLen-1){
				if(this.datasLen%20==0){
					if((this.pos1+1)>=20){
						return 0;
					}
				}else{
					if((this.pos1+1)>(this.datasLen%20-1)){
						return 0;
					}
				}
				this.pos1++;
			}else{
				if(this.pos1==19){
					this.changePage(1);
					return 0;
				}else{
					this.pos1++;
				}
			}
			this.changeFocus1();
			return 0;
		}else if(this.pos==3){
			this.oldPos2 = this.pos2;
			if(this.pos2==(this.groupLen-1)){
				return 0;
			}else{
				this.changePage(1);
				return 0;
			}
			this.changeFocus2();
			return 0;
		}
		this.changeFocus();
	},
	up:function(){
		this.oldPos = this.pos;
		if(this.pos==0){
			return 0;
		}else if(this.pos==1){
			this.pos=0;
		}else if(this.pos==2){
			if(this.pos1<=9){
				this.pos=1;
				this.changeFocus();
				return 0;
			}else{
				this.pos1-=10;
			}
			this.changeFocus1();
			return 0;
		}else if(this.pos==3){
			this.pos=2;
		}
		this.changeFocus();
	},
	down:function(){
		this.oldPos = this.pos;
		if(this.pos==0){
			this.pos=1;
		}else if(this.pos==1){
			this.pos=2;
		}else if(this.pos==2){
			if(this.pos2==this.groupLen-1){
				if(this.datasLen%20==0){
					if((this.pos1+10)>(this.currDatasLen-1)){
						this.pos=3;
						this.changeFocus();
						return 0;
					}
				}else{
					if((this.pos1+10)>(this.datasLen%20-1)){
						this.pos=3;
						this.changeFocus();
						return 0;
					}
				}
				this.pos1+=10;
			}else{
				if(this.pos1<=9){
					this.pos1+=10;
				}else{
					this.pos=3;
					this.changeFocus();
					return 0;
				}
			}
			this.changeFocus1();
			return 0;
		}else if(this.pos==3){
			this.outDown();
			return 0;
		}
		this.changeFocus();
	},
	enter:function(){
		if(this.pos==0){
			if(collectId==0){
				saveCollect();
			}else if(collectId==1){
				delCollect();
			}
		}else if(this.pos==1){
			if(!isShowTip){
				isShowTip = true;
				$('tips_jj').style.visibility = 'visible';
			}
		}else if(this.pos==2){
			// if(orderStrtus || albumFree){
				var url=generatePlayPageUrl(this.pos2*20+this.pos1);
				url=appendBackUrl(url);
				location.href = url;
			// }else{
				// showOrder(function(){orderStrtus = true;},grabEvent);
			// }
		}else if(this.pos==3){
			
		}
	},
	changePage:function(num){
		if(num==1){
			this.pos2++;
		}else if(num==-1){
			this.pos2--;
		}else if(num==0){
			this.pos2=0;
		}
		this.currDatasLen = 20;
		if(this.pos2==this.groupLen-1){
			if(this.datasLen%20==0){
				this.currDatasLen = 20;
			}else{
				this.currDatasLen = this.datasLen%20;
			}
		}
		this.pos1=0;
		this.init1();
		this.init2();
		if(this.pos==2){
			this.changeFocus1();
		}
		this.changeFocus2();
		this.changeArrow();
	},
	changeArrow:function(num){
		if(this.groupLen==1){
			$('arrow_left').style.visibility = 'hidden';
			$('arrow_right').style.visibility = 'hidden';
		}else if(this.groupLen==2){
			if(this.pos2==0){
				$('arrow_left').style.visibility = 'hidden';
				$('arrow_right').style.visibility = 'visible';
			}else if(this.pos2==1){
				$('arrow_left').style.visibility = 'visible';
				$('arrow_right').style.visibility = 'hidden';
			}
		}else if(this.groupLen>2){
			if(this.pos2==0){
				$('arrow_left').style.visibility = 'hidden';
				$('arrow_right').style.visibility = 'visible';
			}else if(this.pos2==(this.groupLen-1)){
				$('arrow_left').style.visibility = 'visible';
				$('arrow_right').style.visibility = 'hidden';
			}else{
				$('arrow_left').style.visibility = 'visible';
				$('arrow_right').style.visibility = 'visible';
			}
		}
	},
	changeFocus:function(){
		if(this.pos==0){
			$('manySets_f').src = './images/detail_f_1.png';
		}else if(this.pos==1){
			$('manySets_f').src = './images/detail_f_0.png';
		}else if(this.pos==2){
			$('manySets_f').src = './images/detail_f_2.png';
			this.changeFocus1();
			return 0;
		}else if(this.pos==3){
			$('manySets_f').src = './images/detail_f_3.png';
			this.changeFocus2();
			return 0;
		}
		$('manySets_f').style.top = this.posXY[this.pos].y+'px';
		$('manySets_f').style.left =  this.posXY[this.pos].x+'px';
	},
	changeFocus1:function(){
		$('manySets_f').style.top = this.posXY[this.pos].y+Math.floor(this.pos1/10)*(this.itemHeight+this.rowMargin)+'px';
		$('manySets_f').style.left = this.posXY[this.pos].x+(this.pos1%10)*(this.itemWidth+this.colMargin)+'px';
	},
	changeFocus2:function(){
		if(this.pos==3){
			if(this.pos2<7){
				$('manySets_f').style.left = this.posXY[this.pos].x+this.pos2*110+'px';
				if(this.pos2==6){
					$('manySets_2').style.left = '0px';
				}
			}else{
				$('manySets_2').style.left = '-'+(this.pos2-6)*110+'px';
			}
			$('manySets_f').style.top = this.posXY[this.pos].y+'px';
		}
		$('manySets_2_'+this.oldPos2).style.color = '#aaaaaa';
		$('manySets_2_'+this.pos2).style.color = '#ffffff';
	}
};
// 多集  end

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