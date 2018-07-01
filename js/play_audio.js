
function eventInit(_event){
	if (_event.type=='keydown') {
		document.onkeypress=null;
	};
	var code = Event(_event);
	switch(code){
		case "KEY_EXIT":
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
document.onsystemevent = grabEvent;

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
		case "KEY_BACK": //
			// ajaxObj.playHistory();
			// setTimeout(function(){
			// 	if(contral.back){
			// 		contral.back();
			// 	}else{
			// 		if(!!backUrl){
			// 			location.href=backUrl;
			// 		}else{
			// 			history.back();
			// 		}
			// 	}
			// },200);
			// if(orderStrtus || albumFree || playPos!=-1){
			// 	savePlayRecord(function(){
			//         if(!!backUrl){
			//             location.href=backUrl;
			//         }else{
			//             history.back();
			//         }
			//     });
			// }else{
				if(!!backUrl){
		            location.href=backUrl;
		        }else{
		            history.back();
		        }
			// }
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
		case "KEY_VOLUME_UP": //音量+
			playCtl.player.playObj.plusVolume(function(){
				$("mute").style.visibility = "visible";
				var volumeValue = playCtl.player.playObj.getVolume();
				$("sound_icon").style.background = (volumeValue == 0) ? "url(images/sound-off_l.png)" : "url(images/sound_l.png)";
				$("volumeValue").innerHTML = volumeValue;
				$("volume_active").style.top = 250 - parseFloat(playCtl.player.playObj.getVolume()/32)*250 +"px";
				$("volume_active").style.height = 25 + parseFloat(playCtl.player.playObj.getVolume()/32)*250 +"px";
				clearTimeout(playCtl.volumeTimer);
				playCtl.volumeTimer = null;
				playCtl.volumeTimer = setTimeout(function(){$("mute").style.visibility = "hidden"},2000);
			});
			return false;
			break;	
		case "KEY_VOLUME_DOWN": //音量-
			playCtl.player.playObj.reduceVolume(function(){
				$("mute").style.visibility = "visible";
				var volumeValue = playCtl.player.playObj.getVolume();
				$("sound_icon").style.background = (volumeValue == 0) ? "url(images/sound-off_l.png)" : "url(images/sound_l.png)";
				$("volumeValue").innerHTML = volumeValue;
				$("volume_active").style.top = 250 - parseFloat(volumeValue/32)*250 +"px";
				$("volume_active").style.height = 25 + parseFloat(volumeValue/32)*250 +"px";
				clearTimeout(playCtl.volumeTimer);
				playCtl.volumeTimer = null;
				playCtl.volumeTimer = setTimeout(function(){$("mute").style.visibility = "hidden"},2000);
			});
			return false;
			break;
		case "KEY_VOLUME_MUTE": //静音
			playCtl.player.playObj.mute(function(){
				$("mute").style.visibility = "visible";
				var volumeValue = playCtl.player.playObj.getVolume();
				$("sound_icon").style.background = (myMedia.getMute() == 1) ? "url(images/sound-off_l.png)" : "url(images/sound_l.png)";
				clearTimeout(playCtl.volumeTimer);
				playCtl.volumeTimer = null;
				playCtl.volumeTimer = setTimeout(function(){$("mute").style.visibility = "hidden"},2000);
			});
			return false;
			break;
		default:
			break;
	}
}

//设置系统发出的事件由grabeven函数处理
document.onsystemevent = grabevents;
//document.onirkeypress = grabevent;
//遥控器按钮的事件处理函数 
function grabevents(event) {
    var eventvalue = event.which;
    var messageId = event.modifiers;
    //var eventStr = SysSetting.getEventInfo(messageId);
    var type = event.type;
    //alert("eventvalue="+eventvalue+"，messageId="+messageId+"，type="+type);
    switch (eventvalue) {
        case 10932: {//
            // $("tipsss").innerHTML = $("tipsss").innerHTML+'<div>播放成功</div>';
			// return false;
			savePlayRecord();
			break;
        }
        case 10935: {//
            // $("tipsss").innerHTML = $("tipsss").innerHTML+'<div>播放失败</div>';
			// return false;
			break;
        }
        // case 10901:
        case 10936: {//10901 是yinnisi中间件的事件
            // $("tipsss").innerHTML = $("tipsss").innerHTML+'<div>当前流媒体已经播放结束</div>';
			playCtl.player.autoNext();//自动的下一曲
			// return false;
			break;
        }
        default:{//用来调试
            // logText+="<br/> eventvalue="+eventvalue+"，messageId="+messageId+"，type="+type;
            // deBug(logText);
            break;
        }
    }
}

var contral={};

var channelId=0; //频道ID
var labelId=0; //标签ID
var multiSetType = 0;
var pkId = 0; //专辑id
var videoId=0; //单个id
var labelPos=2; //标签位置
var labelPosOld=2; //旧标签位置
var channelName='';
var playPoint=0;
var programName=0;
var totalTime=0;
var videoName=0;
var programId=0;
var setNums=0;
var isFreeA=0;
var videoNo=0;
var isPush=false;
var supplierId=0;  //供应商id

//页面dom加载完成
function pageOnload(){
	showLoadingDiv();
	multiSetType = Q.getInt("multiSetType",0);
	channelId = Q.getInt("channelId",1);
	pkId = Q.getInt("pkId",0);
	videoId = Q.getInt("videoId",0);
	videoNo = Q.getInt("videoNo",0);

	contentPad.pageSize=6;
	labelPos = 2;
	labelPosOld = 2;
	userDevice(function(){
		ajaxObj.labelList(function(){
			 checkVipAuthor(function(){
			// ajaxObj.checkCollect(function(){
				ajaxObj.programList1(
					function(){
						if(document.onkeypress!==null){
							document.onkeypress = grabEvent;
						}
						document.onkeydown = grabEvent;
						if(videoNo>0){
							videoNo-=1;
							// if(menuPad.isOrder==false){
							// 	videoNo=0;
							// }
						}
						contentPad.init();
						contentPad.render();
						contentPad.resetFocusInfo();
						contentPad.index=videoNo%contentPad.pageSize;
						contentPad.currentPage=parseInt(videoNo/contentPad.pageSize)+1;
						contentPad.setCurrentColAndRowByIndex();
						playCtl.init();
						playCtl.player.init();
						// playPos=contentPad.pageSize*(contentPad.currentPage-1)+contentPad.index;
						// playPos=-1;
						contral=contentPad;
						contentPad.focus();
					},
					6,
					parseInt(videoNo/contentPad.pageSize)+1
				)
			// });
			});
		});
	});

	menuPad.init();

	hideLoadingDiv();
};
//销毁页面
function pageOnunload(){
	playCtl.release();//释放播放器资源
}

//左边菜单 begin
var menuPad={
	yPos:0
	,isCol:0
	,isOrder:false //模拟是否订购
	,menuData:[
		{name:'播放暂停',icon:'./images/list-filter-icon.png'},
		{name:'收藏书籍',icon:'./images/list-search-icon.png'},
		{name:'内容简介',icon:'./images/list-filter-icon.png'},
	]
	,init:function(){
		// $('contentTW_span1').innerHTML='拉束带结发';
		// $('contentTW_span2').innerHTML='block';
		// $('contentTW_span3').innerHTML='block';
		// $('contentTW_span4').innerHTML='block';
	}
	,focus:function(){
		$('menu_focus'+this.yPos).style.display='block';
	}
	,blur:function(){
		$('menu_focus'+this.yPos).style.display='none';
	}
	,updateArrow:function(){//更新箭头指示

	}
	,updateContent:function(){//更新右边内容

	}
	,outUp:function(){}//将要跳出本交互模块的处理
	,outDown:function(){}//将要跳出本交互模块的处理
	,outLeft:function(){}//将要跳出本交互模块的处理
	,outRight:function(){
		if(contentPad.currentPageData.length==0){//右边没内容
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
		var aaa = this.yPos;
		if(this.yPos<=0){
			return 0;
		}else{
			this.yPos--;
		}
		$('menu_focus'+aaa).style.display='none';
		$('menu_focus'+this.yPos).style.display='block';
	},
	down:function(){
		var aaa = this.yPos;
		if(this.yPos>=2){
			return 0;
		}else{
			this.yPos++;
		}
		$('menu_focus'+aaa).style.display='none';
		$('menu_focus'+this.yPos).style.display='block';
	},
	enter:function(){
		if(this.yPos==0){
			
				if(playCtl.isPlay){
					// playCtl.player.playObj.pause();
					playCtl.pause();
				}else{
					// playCtl.player.playObj.play();
					playCtl.play();
				}
		}else if(this.yPos==1){
			if(this.isCol==1){
				ajaxObj.delCollect(function(){
					menuPad.isCol=0;
					$('menu_5').src='images/chapterList/l_2_0.png';
				});
			}else if(this.isCol==0){
				ajaxObj.saveCollect(function(){
					menuPad.isCol=1;
					$('menu_5').src='images/chapterList/l_2_1.png';
				});
			}
		}else if(this.yPos==2){
			this.blur();
			contral=Contabs;
			Contabs.init();
			Contabs.focus();
		}
	},
	inputNum:function(i){
		
	}
};
//左边菜单 end

//右边内容 begin
var contentPad={
	wrapperId:'contentWrapper',//外层div id
	itemId:'listItem',//每项 dom id的名称前缀
	rowNum:6,//行数
	colNum:1,//列数
	itemWidth:500,//每一项的宽度px
	itemHeight:64,//每一项的高度px
	initTop:0,//初始top值px
	initLeft:0,//初始left值px
	rowMargin:10,//行之间间隙距离px
	colMargin:30,//列之间间隙距离px
	focusDivLeftOffset:0,//光标left偏移值px
	focusDivTopOffset:0,//光标top偏移值px
	pageSize:0,
	currentPage:1,
	totalPage:1,
	numPage:0,
	timerTip:null,
	isLeft:true,
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
					'<div id="'+this.itemId+'_'+(dataIndex)+'" style="position:absolute;top:'+(this.initTop+(this.itemHeight*i)+(i*this.rowMargin))+'px;left:'+(this.initLeft+(this.itemWidth*j)+(j*this.colMargin))+'px;width:'+this.itemWidth+'px;height:'+this.itemHeight+'px;color:#ffffff;">',
						'<img src="./images/chapterList/titlebar_bg.png" style="position:absolute;top:0;left:0px;width:650px;height:70px;">',
						'<div id="'+this.itemId+'A'+(dataIndex)+'" style="padding-left:10px;width:80px;height:'+this.itemHeight+'px;line-height:71px;text-align:center;overflow:hidden;font-size:26px;">'+((this.currentPage-1)*this.pageSize+j+1+i)+'</div>',
						// '<img id="'+this.itemId+'B'+(dataIndex)+'" style="position:absolute;left:38px;top:24px;width:24px;height:24px;" src="./images/chapterList/r_cont_0.png" />',
						'<div style="width:'+(this.itemWidth+40)+'px;height:'+this.itemHeight+'px;position:absolute;top:0;left:90px;line-height:70px;overflow:hidden;font-size:24px;">'+this.currentPageData[i+j].name+'</div>',
						'<img id="'+this.itemId+'Focus'+(dataIndex)+'" style="position:absolute;left:'+this.focusDivLeftOffset+'px;top:'+this.focusDivTopOffset+'px;width:650px;height:70px;display:none;" src="./images/chapterList/titlebar_focus.png" />',
						'<img id="'+this.itemId+'FocusR'+(dataIndex)+'" style="position:absolute;left:660px;top:'+(this.focusDivTopOffset+4)+'px;width:120px;height:66px;" src="./images/chapterList/titlebar_bg_r.png" />',
						'<div style="position:absolute;top:0px;left:680px;width:80px;height:'+this.itemHeight+'px;line-height:68px;text-align:center;font-size:24px;color:#111111;font-weight:bold;">'+(isPush==0?'绑定':'推送')+'</div>',
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
		return '<marquee scrollamount="1" behavior="alternate" width="'+this.itemWidth+'" style="width: '+this.itemWidth+'px;">'+text+'</marquee>';
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
		if(this.isLeft){
			$(this.itemId+'Focus'+this.index).style.display='block';
			// $(this.itemId+'A'+this.index).style.display='none';
			// $(this.itemId+'B'+this.index).src='images/chapterList/r_cont_1.png';
			this.afterFocus&&this.afterFocus();
		}else{
			this.focus1();
		}
	},
	blur:function(){
		if(this.isLeft){
			$(this.itemId+'Focus'+this.index).style.display='none';
			// $(this.itemId+'A'+this.index).style.display='block';
			// $(this.itemId+'B'+this.index).src='images/chapterList/r_cont_0.png';
			this.afterBlur&&this.afterBlur();
		}else{
			this.blur1();
		}
	},
	focus1:function(){
		$(this.itemId+'FocusR'+this.index).src='images/chapterList/titlebar_bg_rf.png';
	},
	blur1:function(){
		$(this.itemId+'FocusR'+this.index).src='images/chapterList/titlebar_bg_r.png';
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
		ajaxObj.programList1(
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
		if(this.isLeft){
			this.blur();
			contral=menuPad;
			menuPad.focus();
		}else{
			this.blur1();
			this.isLeft = true;
			this.focus();
		}
	},//将要跳出本交互模块的处理
	outRight:function(){
		//自动focus下一行
		// if(!!this.currentPageData[this.index+1]){
		// 	this.blur();
		// 	this.index++;
		// 	this.setCurrentColAndRowByIndex();
		// 	this.focus();
		// }
		if(this.isLeft){
			this.blur();
			this.isLeft = false;
			this.focus1();
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
		
		
		if(this.isLeft){
			// if(contentPad.pageSize*(contentPad.currentPage-1)+this.index==playPos){
			// 	if(playCtl.isPlay){
			// 		playCtl.pause();
			// 	}else{
			// 		playCtl.play();
			// 	}
			// }else{
			// 	playPos=contentPad.pageSize*(contentPad.currentPage-1)+this.index;
			// 	audio_control.player.gotoPlay();
			// }
			if(contentPad.pageSize*(contentPad.currentPage-1)+this.index==playCtl.playIndex){
				if(playCtl.isPlay){
					playCtl.pause();
				}else{
					playCtl.play();
				}
			}else{
				playCtl.player.gotoPlay();
			}
		}else{
			if(!isHasGetAuthor){
				return 0;
			}
			if(!!isHasGetAuthor&&!orderStrtus){
				gotoOrderPageAction();
				return 0;
			}
			if(isPush){
				pushAudios();
			}else{
				var url='pushs.html';
				var backUrl=location.href;//'index.html?menuPos='+menuBox.position;
				if(url.indexOf('?')>-1){
					url+='&backUrl='+Q.encode(backUrl);
				}else{
					url+='?backUrl='+Q.encode(backUrl);
				}
				location.href = url;
			}
		}
		
	},
	inputNum:function(i){
		var oldcurrentPage
		clearTimeout(contentPad.timerTip);
		if(contentPad.numPage == 0){
			if(i==0)return 0;
			contentPad.numPage = i;
			// contentPad.currentPage = contentPad.numPage;
			$('tips').style.display='block';
		}else{
			contentPad.numPage = parseInt(contentPad.numPage+""+i);
			// contentPad.currentPage = contentPad.numPage;
		}
		if(contentPad.numPage>contentPad.totalPage){
			$('tips').innerHTML='<span style="position:absolute;left:25px;top:20px;width:378px;height:132px;color:#eeeeee;font-size:30px;line-height:132px;text-align:center;">超出了总页数!</span>';
			contentPad.numPage = 0;
			$('tips').style.display='none';
		}else{
			$('tips').innerHTML='<span style="position:absolute;left:25px;top:20px;width:378px;height:132px;color:#eeeeee;font-size:30px;line-height:132px;text-align:center;">跳转至第'+contentPad.numPage+'页</span>';
			contentPad.timerTip = setTimeout(function(){
				contentPad.currentPage=contentPad.numPage;
				ajaxObj.programList1(
					function(){
						contentPad.init();
						contentPad.render();
						contentPad.resetFocusInfo();
						contentPad.focus();
					},
					contentPad.pageSize,
					contentPad.currentPage
				);
				contentPad.numPage = 0;
				$('tips').style.display='none';
			},2000)
		}
	}
};
//右边内容 end

//内容简介 begin
var Contabs={
	isShow:false
	,yPos:0
	,menuData:[
		
	]
	,init:function(){
		this.yPos=0;
	}
	,focus:function(){
		this.isShow=true;
		$('contentAbstract').style.display='block';
	}
	,blur:function(){
		this.isShow=false;
		$('contentAbstract').style.display='none';
	}
	,updateArrow:function(){//更新箭头指示
		
	}
	,updateContent:function(){//更新右边内容
		
	}
	,outUp:function(){}//将要跳出本交互模块的处理
	,outDown:function(){}//将要跳出本交互模块的处理
	,outLeft:function(){}//将要跳出本交互模块的处理
	,outRight:function(){
		
	}//将要跳出本交互模块的处理
	,left:function(){

	},
	right:function(){
		
	},
	up:function(){
		
	},
	down:function(){
		
	},
	enter:function(){
		if(this.isShow){
			this.blur();
			contral=menuPad;
			menuPad.focus();
		}
	}
};
//内容简介 end

var ajaxObj = {
	req: null,
	labelList: function (_fn){
		ajaxObj.ajaxGo(
			serverPath+'/media/video/multiSetDetail.utvgo?keyNo='+keyNo+'&videoId='+pkId,
			function(_data){
				$('menu_4').src=imgBasePath+_data.data.imageSmall;
				$('contentTW_span1').innerHTML=_data.data.name;
				$('contentTW_span2').innerHTML=_data.data.currentset;
				$('contentTW_span3').innerHTML=_data.data.mainRole;
				$('contentTW_span4').innerHTML=_data.data.director;
				$('contentA_A').innerHTML=_data.data.name;
				$('contentA_B').innerHTML=_data.data.descript;
				supplierId=_data.data.supplierId;
				if(parseInt(_data.data.isCollected)==0){
					menuPad.isCol=0;
					$('menu_5').src='images/chapterList/l_2_0.png';
				}else{
					menuPad.isCol=1;
					$('menu_5').src='images/chapterList/l_2_1.png';
				}
				if(parseInt(_data.data.isFree)==0){//是收费
					albumFree=false;
				}else{
					albumFree=true;
				}
				!!_fn&&_fn();
			}
		)
	},
	programList1: function (_fn,_pageSize,_pageNo){
		if(multiSetType==0){
			var url=serverPath+'/media/videoContent/oneSet.utvgo?videoId='+pkId+'&pageNo='+_pageNo+'&pageSize='+_pageSize;
		}else if(multiSetType==1||multiSetType==2||multiSetType==3){
			var url=serverPath+'/media/videoContent/multiSet.utvgo?videoId='+pkId+'&pageNo='+_pageNo+'&pageSize='+_pageSize;
		}
		ajaxObj.ajaxGo(
			url,
			function(_data){
				contentPad.currentPageData = [];
				programName=_data.data.name;
				programId=_data.data.pkId;
				setNums=_data.data.setNums;
				if(_data.data.length>0){
					for(var i=0;i<_data.data.length;i++){
						var aaa = {};
						// aaa.img = _data.data.imageProfix + (_data.data.videos[i].imageBig||_data.data.videos[i].imageMid||_data.data.videos[i].imageSmall);
						aaa.name = _data.data[i].titleName;
						aaa.pkId = _data.data[i].videoId;  //专辑id
						aaa.videoId = _data.data[i].pkId;  //单个id
						aaa.mp3Url = ( _data.data[i].videoHighUrl|| _data.data[i].videoFluencyUrl);
						// aaa.multiSetType = _data.data.videos[i].multiSetType;
						// aaa.doubanScore = _data.data.videos[i].doubanScore;
						// aaa.maxSet = _data.data.videos[i].maxSet;
						aaa.isFree = _data.data[i].isFree;
						aaa.freeTime = _data.data[i].freeTime;
						contentPad.currentPageData.push(aaa);
					}
					// menuPad.menuData[menuPad.listObj.position].totalPage=_data.totalPage;
					// menuPad.menuData[menuPad.listObj.position].currentPage=_data.currentPage;
					contentPad.totalPage=_data.totalPage;
					contentPad.currentPage=_data.currentPage;
				}else{
					// menuPad.menuData[menuPad.listObj.position].totalPage=0;
					// menuPad.menuData[menuPad.listObj.position].currentPage=0;
					contentPad.totalPage=0;
					contentPad.currentPage=0;
				}
				// channelName=_data.data.channelName||'';
				// $('contentTW_span1').innerHTML = channelName + " - "+menuPad.menuData[menuPad.listObj.position].name;
				!!_fn&&_fn();
			}
		)
	},
	checkCollect: function (_fn){
		ajaxObj.ajaxGo(
			serverPath+'/media/video/multiSetDetail.utvgo?keyNo='+keyNo+'&videoId='+pkId,
			function(_data){
				if(_data.code=='1'){
					if(_data.data.isCollect=="no"){
						menuPad.isCol=0;
						$('menu_5').src='images/chapterList/l_2_0.png';
					}else{
						menuPad.isCol=1;
						$('menu_5').src='images/chapterList/l_2_1.png';
					}
					!!_fn&&_fn();
				}else{
					return 0;
				}
			}
		)
	},
	saveCollect: function (_fn){
		ajaxObj.ajaxGo(
			serverPath+'/media/video/insertOneCollect.utvgo?keyNo='+keyNo+'&videoId='+pkId,
			function(_data){
				if(_data.code=='1'){
					!!_fn&&_fn();
				}else{
					return 0;
				}
			}
		)
	},
	delCollect: function (_fn){
		ajaxObj.ajaxGo(
			serverPath+'/media/video/deleteOneCollect.utvgo?keyNo='+keyNo+'&videoId='+pkId,
			function(_data){
				if(_data.code=='1'){
					!!_fn&&_fn();
				}else{
					return 0;
				}
			}
		)
	},
	playHistory: function (_fn){
		ajaxObj.ajaxGo3(
			serverPath+"/video/playhistory.utvgo",
			"keyNo="+keyNo+"&playPoint="+playPoint+"&videoId="+videoId+"&programName="+programName+"&totalTime="+totalTime+"&videoName="+videoName+"&multiSetType="+multiSetType+"&programId="+programId+"&channelId="+channelId+"&videoNumber="+(playCtl.playIndex+1),
			function(_data){
				if(_data.code=='1'){
					!!_fn&&_fn();
				}else{
					return 0;
				}
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
		    	hideLoadingDiv();
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
		    },
		    onError:function(){
		    	hideLoadingDiv();
		    	ajaxObj.req = null;
		        showTips('服务器繁忙...',2000);
		        !!failFn&&failFn();
		    },
		    post:"",
		    timeout:9000
		});
	},
	ajaxGo3: function (_url,_datas,successFn,failFn){
		if(ajaxObj.req != null){
			ajaxObj.req.abort();
			ajaxObj.req = null;
		}
		ajaxObj.req =ajax({
		    url: _url,
		    type: "POST",
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
		    },
		    onError:function(){
		    	ajaxObj.req = null;
		        showTips('服务器繁忙...',2000);
		        !!failFn&&failFn();
		    },
		    post:_datas,
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
                    isPush = true;
                }else{
                	isPush = false;
                }
            }else{
                isPush = false;
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
var pushReq=null;
function pushAudios(fn){ //推送
	showLoadingDiv();
    if(!!pushReq){
        pushReq.abort();
        pushReq=null;
    };
    var contentId = contentPad.currentPageData[contentPad.index].videoId
    if(!contentId)return 0;
    var url=serverPath+'/doll/dollForwardController/pushAudio.utvgo?keyNo='+keyNo+'&contentId='+contentId;
    pushReq=ajax({
        url: url,
        type: "GET", //HTTP 请求类型,GET或POST
        dataType: "html", //请求的文件类型html/xml
        onSuccess: function(html){ //请求成功后执行[可选]
        	hideLoadingDiv();
            var json=eval('('+html+')');
            if(json.msg=="ok"){
            	clearTimeout(timerTip);
				$('tips').innerHTML='<span style="position:absolute;left:25px;top:20px;width:378px;height:132px;color:#eeeeee;font-size:30px;line-height:132px;text-align:center;">推送成功!</span>';
				$('tips').style.display='block';
				timerTip = setTimeout(function(){
					$('tips').style.display='none';
				},2000);
            }else{
                clearTimeout(timerTip);
				$('tips').innerHTML='<span style="position:absolute;left:25px;top: 36px;width:378px;height:132px;color:#eeeeee;font-size: 28px;line-height: 40px;text-align:center;">'+json.msg+'</span>';
				$('tips').style.display='block';
				timerTip = setTimeout(function(){
					$('tips').style.display='none';
				},3000);
            }
            !!fn&&fn(json);
        },
        onComplete:function(){
            pushReq=null;
        },
        onError:function(){ //请求失败后执行[可选]
        	hideLoadingDiv();
        	showTips('服务器繁忙...',2000);
           	!!fn&&fn();
        },
        post:'',
        timeout:7000
    });
}


function savePlayRecord(fn){
	if(ajaxObj.req != null){
		ajaxObj.req.abort();
		ajaxObj.req = null;
	}
    var url=serverPath+'/media/video/updateRecord.utvgo?keyNo='+keyNo+'&videoId='+pkId+'&playId='+videoId+'&supplierId='+supplierId+'&contentType=0';
    ajaxObj.req = ajax({
        url: url,
        type: "GET", //HTTP 请求类型,GET或POST
        dataType: "html", //请求的文件类型html/xml
        onSuccess: function(html){ //请求成功后执行[可选]
            var json=eval('('+html+')');
            !!fn&&fn(json);
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

var isHasGetAuthor=false;//是否已经拿到鉴权
function checkVipAuthor(_fn){
	orderStrtus = true;
	!!_fn&&_fn();
	return 0;

	orderAuthor.checkVipAuthor({
		_supplierId:'',
		_vipCode:'vip_code_28',
		_regionCodeInt:regionCodeInt,
		orderedCallBack:function(data){
			//订购
			orderStrtus = true;
			isHasGetAuthor=true;
			//统计
			var titlePage = $('contentTW_span1').innerHTML;
			sendPageStatistic({
				vipCode:vipCode,
				vipName:vipName,
				orderStatus:1,
				channelId:'',
				channelName:'',
				labels:'',
				labelIds:'',
				pageName:'音频播放页-熊猫乐园',
				pageTitle:'音频播放页'+'-'+titlePage
			},function(){});			
		},
		unOrderedCallBack:function(data){
			isHasGetAuthor=true;
			//未订购
			//console.log(data);
			if(data.limit.limitStatus == 1){
				if(data.limit.type == 2){
					//是黑名单
					location.href='blackPage.html?backUrl='+Q.encode(portalUrl);
                    return 0;	
				}				
			}
			if(data.status == 2){
				//该用户已开通基础包,未开通任何VIP包
				
			}else if(data.status == 3){
				//未开通基础包和任何VIP包
				
			}else{//当成已开通了基础包处理

			}
			//统计
			var titlePage = $('contentTW_span1').innerHTML;
			sendPageStatistic({
				vipCode:vipCode,
				vipName:vipName,
				orderStatus:0,
				channelId:'',
				channelName:'',
				labels:'',
				labelIds:'',
				pageName:'音频播放页-熊猫乐园',
				pageTitle:'音频播放页'+'-'+titlePage
			},function(){});			
		},
		otherOrderedVipCallBack:function(data){
			isHasGetAuthor=true;
			//订购其他vip包
			//console.log(data);
			//统计
			var titlePage = $('contentTW_span1').innerHTML;
			sendPageStatistic({
				vipCode:vipCode,
				vipName:vipName,
				orderStatus:0,
				channelId:'',
				channelName:'',
				labels:'',
				labelIds:'',
				pageName:'音频播放页-熊猫乐园',
				pageTitle:'音频播放页'+'-'+titlePage
			},function(){});			
		}
	});
	!!_fn&&_fn();
}
function gotoOrderPageAction(vipCode,vipName,fee){//发起订购,基础包参数传空
    var currentUrl=location.href;
    orderAuthor.gotoOrderPage({
        vipCode:vipCode||'vip_code_28',
        vipName:vipName||'熊猫乐园',
        fee:fee||20,
        returnUrl:currentUrl,
        homeUrl:currentUrl||location.href,
        cancelUrl:currentUrl||location.href
    });
}
