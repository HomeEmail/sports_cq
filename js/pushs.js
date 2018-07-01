
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
	showLoadingDiv();

	channelId = Q.getInt("channelId",1);
	labelId = Q.getInt("labelId",0);

	contentPad.pageSize=6;
	contral=contentDel;

	userDevice(function(){
		ajaxObj.collectRecords(
			function(){
				if(document.onkeypress!==null){
					document.onkeypress = grabEvent;
				}
				document.onkeydown = grabEvent;
				if(hasData){
					changeGZ.init();
					contentPad.init();
					contentPad.render();
					contentPad.resetFocusInfo();
					contentDel.focus();
				}else{
					s='<div style="height:60px;color: #cccccc;font-size: 28px;text-align: center;padding-top: 200px;">您还没推送记录，快去推送节目吧！</div>';
					$('contentWrapper').innerHTML=s;
					contentDel.focus();
				}
				if(contentDel.pos==0){
					contral=changeGZ;
					changeGZ.show();
				}
			},
			6,
			1
		);
	})
};
//销毁页面
function pageOnunload(){

}

//解除绑定 begin
var contentDel={
	isShowTip:false,
	timerTip:null,
	pos:0,
	init:function(){
		$('contentDelbg').style.background='url(images/index/push_bind_'+this.pos+'.png) no-repeat';
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
		if(this.pos==0){
			contral=changeGZ;
			changeGZ.show();
			// var url='login.html';
			// var backUrl=location.href;
			// if(url.indexOf('?')>-1){
			// 	url+='&backUrl='+Q.encode(backUrl);
			// }else{
			// 	url+='?backUrl='+Q.encode(backUrl);
			// }
			// location.href = url;
		}else if(this.pos==1){
			clearTimeout(this.timerTip);
			if(!this.isShowTip){
				this.isShowTip = true;
				$('tips').innerHTML='<span style="position:absolute;left:25px;top:20px;width:378px;height:132px;color:#eeeeee;font-size:24px;line-height:132px;text-align:center;">再点一次确定将解绑设备！</span>';
				$('tips').style.display='block';
			}else{
				unbundDevice(function(){
					contentDel.pos=0;
					contentDel.init();
					// contentPad.currentPageData = [];
					// contentPad.render();
				});
				contentDel.isShowTip = false;
				$('tips').style.display='none';
			}
			this.timerTip = setTimeout(function(){
				contentDel.isShowTip = false;
				$('tips').style.display='none';
			},3000);
		}
	}
};
//解除绑定 end

//公仔选择 begin
var changeGZ={
	isShowTip:false,
	pos:0,
	onPos:[172,486,804],
	init:function(){
		this.pos = 0;
		this.changeFocus();
	},
	changeFocus:function(){
		$('tips_gz_f').style.left = this.onPos[this.pos]+'px';
	},
	show:function(){
		$('tips_gz').style.visibility = 'visible';
	},
	hide:function(){
		$('tips_gz').style.visibility = 'hidden';
	},
	focus:function(){
		$('tips_gz_f').style.visibility = 'visible';
	},
	blur:function(){
		$('tips_gz_f').style.visibility = 'hidden';
	},
	left:function(){
		this.pos--;
		if(this.pos<=0){
			this.pos=0;
		}
		this.changeFocus();
		return 0;
	},
	right:function(){
		this.pos++;
		if(this.pos>=2){
			this.pos=2;
		}
		this.changeFocus();
		return 0;
	},
	up:function(){
		return 0;
	},
	down:function(){
		return 0;
	},
	enter:function(){
		if(this.pos==0 || this.pos==1){
			var url='login.html';
		}else if(this.pos==2){
			var url='login_al.html';
		}
		var backUrl=location.href;
		if(url.indexOf('?')>-1){
			url+='&backUrl='+Q.encode(backUrl);
		}else{
			url+='?backUrl='+Q.encode(backUrl);
		}
		location.href = url;
	},
	back:function(){
		if(contentDel.pos==0){
			if(!!backUrl){
				location.href=backUrl;
			}else{
				history.back();
			}
		}else{
			changeGZ.hide();
			contral=contentDel;
		}
	}
};
//公仔选择 end

//右边内容 begin
var contentPad={
	wrapperId:'contentWrapper',//外层div id
	itemId:'listItem',//每项 dom id的名称前缀
	rowNum:6,//行数
	colNum:1,//列数
	itemWidth:618,//每一项的宽度px
	itemHeight:117,//每一项的高度px
	initTop:30,//初始top值px
	initLeft:110,//初始left值px
	rowMargin:-52,//行之间间隙距离px
	colMargin:0,//列之间间隙距离px
	focusDivLeftOffset:-54,//光标left偏移值px
	focusDivTopOffset:-54,//光标top偏移值px
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
					'<div id="'+this.itemId+'_'+(dataIndex)+'" style="position:absolute;top:'+(this.initTop+(this.itemHeight*i)+(i*this.rowMargin))+'px;left:'+(this.initLeft+(this.itemWidth*j)+(j*this.colMargin))+'px;width:'+this.itemWidth+'px;height:'+this.itemHeight+'px;">',
						'<img id="'+this.itemId+'Focus'+(dataIndex)+'" style="position:absolute;left:0px;top:0px;width:'+this.itemWidth+'px;height:'+this.itemHeight+'px;display:none;" src="./images/index/playlist_list_focus.png" />',
						'<div id="'+this.itemId+'TextMask'+(dataIndex)+'" style="width:'+(this.itemWidth-58)+'px;height:'+this.itemHeight+'px;line-height:'+this.itemHeight+'px;font-size:24px;position:absolute;left:0px;top:0px;color:#ffffff;overflow:hidden;">',
							'<span style="padding-left:60px;padding-right:10px;">'+(this.pageSize*(this.currentPage-1)+dataIndex+1)+'</span>',
							'<span style="padding-left:10px;padding-right:10px;">'+this.currentPageData[dataIndex].name+'</span>',
						'</div>',
					'</div>'
				];
				s+=item.join('');
			}
		}
		if(this.currentPageData.length<=0){
			s='<div style="height:60px;color: #cccccc;font-size: 20px;text-align: center;padding-top: 200px;">您还没有推送记录，快去推送节目吧！</div>';
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
		// var s='';
		// if(Util.str.getStrBite(this.currentPageData[this.index].name)>15){
		// 	s=this.generateMarquee(this.currentPageData[this.index].name);
		// }else{
		// 	s=this.generateItemName(this.currentPageData[this.index].name);
		// }
		// $(this.itemId+'TextMask'+this.index).innerHTML=s;
	},
	afterBlur:function(){
		// $(this.itemId+'TextMask'+this.index).innerHTML=this.generateItemName(this.currentPageData[this.index].name);
	},
	focus:function(){
		$(this.itemId+'Focus'+this.index).style.display='block';
		// $(this.itemId+'_'+this.index).style.transform='scale(1.06,1.06)';
		// $(this.itemId+'_'+this.index).style.webkitTransform='scale(1.06,1.06)';
		this.afterFocus&&this.afterFocus();
	},
	blur:function(){
		$(this.itemId+'Focus'+this.index).style.display='none';
		// $(this.itemId+'_'+this.index).style.transform='scale(1,1)';
		// $(this.itemId+'_'+this.index).style.webkitTransform='scale(1,1)';
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
		// var url=generatePlayPageUrl(this.index);
		// var backUrl=location.href;//'index.html?menuPos='+menuBox.position;
		// if(url.indexOf('?')>-1){
		// 	url+='&backUrl='+Q.encode(backUrl);
		// }else{
		// 	url+='?backUrl='+Q.encode(backUrl);
		// }
		// location.href = url;
	},
	inputNum:function(i){

	}
};
//右边内容 end

var ajaxObj = {
	req: null,
	collectRecords: function (_fn,_pageSize,_pageNo){
		ajaxObj.ajaxGo(
			serverPath+"/doll/dollConterController/pushAudioHistory.utvgo?keyNo="+keyNo+"&pageSize="+_pageSize+"&pageNo="+_pageNo,
			function(_data){
				contentPad.currentPageData = [];
				if(_data.data.length>0){
					hasData=true;
					for(var i=0;i<_data.data.length;i++){
						var aaa = {};
						// aaa.img = imgBasePath+_data.data[i].imageSmall;
						aaa.name = _data.data[i].name;
						// aaa.href = "";
						// aaa.pkId = _data.data[i].id;
						// aaa.videoId = _data.data[i].contentId;
						// aaa.videoHighUrl = _data.data[i].videoHighUrl;
						// aaa.audioStreamUrl = _data.data[i].audioStreamUrl;
						// aaa.multiSetType = _data.data[i].multiSetType;
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

function userDevice(fn){ //推送检查
    var url=serverPath+'/doll/dollForwardController/userDevice.utvgo?keyNo='+keyNo;
    if(ajaxObj.req != null){
		ajaxObj.req.abort();
		ajaxObj.req = null;
	}
	ajaxObj.req = ajax({
        url: url,
        type: "GET", //HTTP 请求类型,GET或POST
        dataType: "html", //请求的文件类型html/xml
        onSuccess: function(html){ //请求成功后执行[可选]
            var json=eval('('+html+')');
            if(json.msg=="ok"){
                if(!!json.userInfo.token){
                    contentDel.pos=1;
                }else{
                	contentDel.pos=0;
                }
            }else{
                contentDel.pos=0;
            }
            contentDel.init();
            if(!json.userInfo.deviceId){
            	$('deviceId').innerHTML="未绑定";
            }else{
            	$('deviceId').innerHTML=json.userInfo.deviceId;
            }
            !!fn&&fn();
        },
        onComplete:function(){
            ajaxObj.req = null;
        },
        onError:function(){ //请求失败后执行[可选]
           !!fn&&fn();
        },
        post:'',
        timeout:7000
    });
}

function unbundDevice(fn){ //解绑设备
    var url=serverPath+'/doll/dollForwardController/unbundlingDevice.utvgo?keyNo='+keyNo;
    if(ajaxObj.req != null){
		ajaxObj.req.abort();
		ajaxObj.req = null;
	}
	ajaxObj.req = ajax({
        url: url,
        type: "GET", //HTTP 请求类型,GET或POST
        dataType: "html", //请求的文件类型html/xml
        onSuccess: function(html){ //请求成功后执行[可选]
            var json=eval('('+html+')');
            if(json.msg=="ok"){
                showTips('解除绑定成功!',3000);
                !!fn&&fn();
            }else{
                showTips('解除绑定失败!',3000);
            }
        },
        onComplete:function(){
            ajaxObj.req = null;
        },
        onError:function(){ //请求失败后执行[可选]
           showTips('服务器繁忙...',2000);
        },
        post:'',
        timeout:7000
    });
}

function generatePlayPageUrl(index){
	var pkId=contentPad.currentPageData[index].pkId;
	var multiSetType=contentPad.currentPageData[index].multiSetType;
	var url='detail.html?multiSetType='+contentPad.currentPageData[index].multiSetType+'&channelId='+channelId+'&pkId='+contentPad.currentPageData[index].pkId;
	return url;
}

