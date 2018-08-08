
/*
use demo:
var loadingObj=new Loading({
	zIndex:99999,
	left:'600px',
	top:'350px',
	backgroundColor:'#244f95',
	loadingImg:projectBasePath+'images/loading.gif'
});
loadingObj.show();
loadingObj.hide();
*/
function Loading(o){
	var o=o||{};
	this.zIndex=o.zIndex||10;
	this.left=o.left||'590px';
	this.top=o.top||'310px';
	this.backgroundColor=o.backgroundColor||'#244F95';
	this.loadingImg=o.loadingImg||projectBasePath+'images_second/loading.gif';
	this.el=null;
	if(!!!this.el){
		this.el=document.createElement('div');
		this.el.style.position='absolute';
		this.el.style.zIndex=this.zIndex;
		this.el.style.left=this.left;
		this.el.style.top=this.top;
		this.el.style.width='100px';
		this.el.style.height='100px';

		//this.el.style.padding='20px';
		this.el.style.backgroundColor=this.backgroundColor;
		//this.el.style.borderRadius='8px';
		this.el.style.display='none';
		$append(this.el);
		this.el.innerHTML='<img src="'+this.loadingImg+'" style="position:absolute;left:18px;top:18px;" />';
	}
	this.show=function(){
		if(this.el){
			this.el.style.display='block';
		}
	};
	this.hide=function(){
		if(this.el){
			this.el.style.display='none';
		}
	};

}

/*
msgTips({msg:'网络异常，请稍候重试！'})
*/
function msgTips(o){
	var o=o||{};
	var zIndex=o.zIndex||99999;
	var left=o.left||'80px';
	var top=o.top||'250px';
	var width=o.width||'1080px';
	var height=o.height||'auto';
	var timeout=o.timeout||6000;
	var msg=o.msg||'';

	//var backgroundColor=o.backgroundColor||'#244F95';
	var bgImage=o.bgImage||projectBasePath+'images_second/play_control_bg_l.png';

	var el=$('msgTips');
	if(!!!el){
		var el=document.createElement('div');
		
		el.style.position='absolute';
		
		el.style.zIndex=zIndex;
		el.id='msgTips';
		el.style.left=left;
		el.style.top=top;
		el.style.width=width;
		el.style.height=height;
		el.style.padding="20px";
		el.style.color='#ffffff';
		//el.style.backgroundColor=backgroundColor;
		el.style.background='url('+bgImage+')';
		el.style.borderRadius='8px';
		
		$append(el);
	}
	el.style.display='block';
	el.innerHTML='<div style="text-align:center;font-size:26px;line-height:50px;">系统提示</div><div style="text-align:center;font-size:24px;line-height:30px;">'+msg+'</div>';

	if(timeout>0){
		setTimeout(function(){
			el.style.display='none';
		},timeout);
	}
}



function showLoadingDiv(){
	if(!$('loadingDiv')) return 0;
	$('loadingDiv').style.visibility = "visible";
}
function hideLoadingDiv(){
	if(!$('loadingDiv')) return 0;
	$('loadingDiv').style.visibility = "hidden";
}

function delParameters(_url){
	var urls = _url;
	if(urls.indexOf("?")>-1){
		var urlsp = urls.split('?');
		var urlArr = urlsp[1].split('&');
		var urlArrs = [];
		for(var j=0;j<urlArr.length;j++){
			if(urlArr[j].indexOf("productId")>-1 || urlArr[j].indexOf("spId")>-1 || urlArr[j].indexOf("code")>-1 || urlArr[j].indexOf("msg")>-1){
			}else{
				urlArrs.push(urlArr[j]);
			}
		}
		urls = urlsp[0]+"?";
		for(var k=0;k<urlArrs.length;k++){
			if(k==(urlArrs.length-1)){
				urls+=urlArrs[k];
			}else{
				urls+=urlArrs[k]+"&";
			}
		}
	}
	return urls;
}

//传入地址，和对象参数，返回带新参数的地址
function createUrlByObject(url,obj){
	var baseUrl=url.split('?')[0];
	var queryObj=utv.getRequest('?',url);
	for(var k in obj){
		queryObj[k]=obj[k];
	}
	var queryStr=utv.obj2query(queryObj);
	return baseUrl+'?'+queryStr;
}

var authorizationReq=null;
function checkAuthorization(orderedFn,unorderFn,blackUserFn,errorFn,finalFn){
	if(!!authorizationReq){
		return 0;
	}

	orderedFn&&orderedFn({});
	return 0;

	var url=orderBasePath+'chongqing/cqUserController/authorization.utvgo?keyNo='+keyNo+'&cmboIds=';
	
	authorizationReq=ajax({
	    url: url,
	    type: "GET", //HTTP 请求类型,GET或POST
	    dataType: "html", //请求的文件类型html/xml
	    onSuccess: function(html){ //请求成功后执行[可选]
	    	authorizationReq=null;
	        try{
		        var json=eval('('+html+')');
		        //返回code：-2，服务异常， -1参数不合法（卡号为空异常或用户信息异常）,0 已订购，1没订购，2白名单，3黑名单  1、白名单用户可免费观看内容  2、黑名单用户限制订购，
		        if(parseInt(json.code,10)==0||parseInt(json.code,10)==2){ 
		        	orderedFn&&orderedFn(json);
		        }else if(parseInt(json.code,10)==1){
		        	unorderFn&&unorderFn(json);
		        }else if(parseInt(json.code,10)==3){
		        	blackUserFn&&blackUserFn(json);
		        }else{
		        	errorFn&&errorFn(json);
		        }
		    }catch(err){
		       
		    }
	    	!!finalFn&&finalFn();

	    },
	    onComplete:function(){
	       authorizationReq=null;
	    },
	    onError:function(){ //请求失败后执行[可选]
	    	authorizationReq=null;
	    	!!finalFn&&finalFn();
	    },
	    post:'',  
	    timeout:70000  
	});
}


function getCardInfo() {
	var cardInfo='';
	if (typeof(SysInfo) != 'undefined' && typeof(Middleware)!='undefined') {
		cardInfo += "品牌名称:" + (SysInfo.STBBrand || "notFound");
		cardInfo += "_型号:" + (SysInfo.STBModel || "notFound");
		cardInfo += "_硬件版本号:" + (SysInfo.hardwareVersion || "notFound");
		cardInfo += "_软件版本号:" + (SysInfo.softwareVersion || "notFound");
		cardInfo += "_中间件版本号:" + (Middleware.version || "notFound");
		cardInfo += "_中间件软件发布日期:" + (Middleware.releaseDate || "notFound");
	}else{
		cardInfo += "_SysInfo对象不存在,无法获取机顶盒信息！";
	}
	return cardInfo;
}


function getRtsp(assetID,success,failure,final){
	ajax({
        url: rtspApiBase+'/playurl/getOnDemandUrl.do?areaCode='+regionCodeInt+'&assetID='+assetID+'&providerID='+providerID+'&userCode='+uid+'&tryFlag='+tryFlag+'&goodsCode='+goodsCode,

        type: "GET", //HTTP 请求类型,GET或POST
        dataType: "html", //请求的文件类型html/xml
        onSuccess: function(html){ //请求成功后执行[可选]
            var json = eval("(" + html + ")");
            if(json.returnCode==0){
                !!success&&success(json.rtspUrl);
            }else{
                failure(json.errorMsg);
            }
            !!final&&final();
        },
        onComplete:function(){
            
        },
        onError:function(){ //请求失败后执行[可选]
            failure('数据有误!');
            !!final&&final();
        },
        post:"",  
        timeout:15000  
    }); 
}



/*
用户信息查询
 */

var userInfo={
	req : null
	,getUserInfo:function(successFn,failFn){//获得用户信息
		if(!!this.req) return false;
		var url=orderBasePath+"system/QueryUserInfoController/queryUserInfo.utvgo?keyNo="+keyNo+"&regionCode="+regionCodeInt;
		this.req=ajax({
		    url: url,
		    type: "GET", //HTTP 请求类型,GET或POST
		    dataType: "html", //请求的文件类型html/xml
		    onSuccess: function(html){ //请求成功后执行[可选]
		        userInfo.req=null;
		        var json=eval('('+html+')');
		        !!successFn&&successFn(json);
		    },
		    onComplete:function(){
		       
		    },
		    onError:function(){ //请求失败后执行[可选]
		    	userInfo.req=null;
		    	!!failFn&&failFn();
		    },
		    post:"",  
		    timeout:70000  
		});							
	}
}



//发统计相关定义和接口
var pageEnterTime=new Date().getTime();
var pageExitTime=new Date().getTime();
//Math.ceil((new Date().getTime() - pageEnterTime)/1000);//秒
var statisticsPageId='';
//use demo
// sendPageStatistic({
// 	vipCode:'',
// 	vipName:'',
//	orderStatus:-1, //0.订购 1.未订购 -1.未知
// 	channelId:'',
// 	channelName:'',
// 	labels:'',
// 	labelIds:'',
// 	pageName:'',
// 	pageTitle:''
// },function(){});

function sendPageStatistic(obj,fn){
	return 0;
	var url=apiStatisticsPath+'/visit/statistics.utvgo';
	var obj=obj||{};
	var vipCode=obj.vipCode||'vip_code_0';
	var vipName=obj.vipName||'';
	var orderStatus=typeof obj.orderStatus == 'undefined' ? -1:obj.orderStatus;//业务的订购状态 0.订购 1.未订购 -1.未知
	var channelId=obj.channelId||'';
	var channelName=obj.channelName||'';
	var labels=obj.labels||'';//'海外,青春'
	var labelIds=obj.labelIds||'';//'11,33'
	var pageName=obj.pageName||document.title;
	var pageTitle=obj.pageTitle||document.title;
	var pageExitTime=new Date().getTime();
	var visitTime=Math.ceil((pageExitTime - pageEnterTime)/1000);

	var postData='keyNo='+keyNo+'&branchNo='+regionCodeInt+'&vipCode='+vipCode+'&orderStatus='+orderStatus+'&vipName='+encodeURIComponent(vipName)+'&pageName='+encodeURIComponent(pageName)+'&visitTime='+visitTime+'&id='+statisticsPageId+'&boxInfo='+encodeURIComponent(getCardInfo())+'&channelId='+channelId+'&channelName='+encodeURIComponent(channelName)+'&pageUrl='+encodeURIComponent(location.href)+'&referrer='+encodeURIComponent(document.referrer)+'&labels='+labels+'&labelIds='+labelIds+'&pageTitle='+encodeURIComponent(pageTitle);

	ajax({
	    url: url,
	    type: "POST", //HTTP 请求类型,GET或POST
	    dataType: "html", //请求的文件类型html/xml
	    onSuccess: function(html){ //请求成功后执行[可选]
	    	try{
	    		var json=eval('('+html+')');
		        if(parseInt(json.code,10)==1){
		        	statisticsPageId=json.data.id||0;
		        }else{
		        }
	    	}catch(err){

	    	}
	        
	        !!fn&&fn();

	    },
	    onComplete:function(){
	       
	    },
	    onError:function(){ //请求失败后执行[可选]
	    	!!fn&&fn();
	    },
	    post:postData,  
	    timeout:70000  
	});
}

function reSendPageStatistic(obj,fn){
	statisticsPageId='';
	sendPageStatistic(obj,fn);
}

//use demo
//有值的表示必填项
/*
sendEventStatistic({
	vipCode:'',
	vipName:'',
	orderStatus:'-1',
	eventKey:'undefined',
	des:'undefined',
	extData:''
},function(){});

*/
function sendEventStatistic(obj,fn){
	return 0;

	var url=apiStatisticsPath+'/event/statistics.utvgo';
	var obj=obj||{};
	var vipCode=obj.vipCode||'vip_code_0';
	var vipName=obj.vipName||'';
	var orderStatus=typeof obj.orderStatus == 'undefined' ? -1:obj.orderStatus;//业务的订购状态 0.订购 1.未订购 -1.未知
	var eventKey=obj.eventKey||'undefined';//操作事件标识
	var des=obj.des||'';//事件描述
	var extData=obj.extData||'';//扩展数据

	var postData='keyNo='+keyNo+'&branchNo='+regionCodeInt+'&vipCode='+vipCode+'&orderStatus='+orderStatus+'&vipName='+encodeURIComponent(vipName)+'&eventKey='+eventKey+'&des='+encodeURIComponent(des)+'&extData='+encodeURIComponent(extData);

	ajax({
	    url: url,
	    type: "POST", //HTTP 请求类型,GET或POST
	    dataType: "html", //请求的文件类型html/xml
	    onSuccess: function(html){ //请求成功后执行[可选]
	        try{
		        var json=eval('('+html+')');
		        if(parseInt(json.code,10)==1){
		        	
		        }else{
		        }
		    }catch(err){
		       
		    }
	    	!!fn&&fn();

	    },
	    onComplete:function(){
	       
	    },
	    onError:function(){ //请求失败后执行[可选]
	    	!!fn&&fn();
	    },
	    post:postData,  
	    timeout:70000  
	});
}


//播放统计
var playTimeRecordId='';
var playTimeRecordIntervalTime=15;//秒，每次保存播放时间流水记录时的间隔时间
var playTimeRecordLastPlayPoint=0;//秒，上一次保存播放时间流水记录时的播放点
/*
参数:
optObj:{
    currTime:
    totalTime:
    videoId:
    videoName:
    spId:
    spName:
    
}

*/
function savePlayTimeRecord(optObj,fn){//保存播放时间流水记录
    //loadingObj.show();

    var url=apiStatisticsPath+'/video/statistics.utvgo';
    var playPoint=optObj.currTime||0;
    var totalTime=optObj.totalTime||0;
    var videoId=optObj.videoId||0;
    var videoName=optObj.videoName||'';
    var spId=optObj.spId||-2;
    var spName=optObj.spName||vipName;
    var isBase=0;//是否订购基础包 0-订购 1-未订购
    var vipcode=!!vipCode ? vipCode : 'vip_code_0';//订购的vipcode
    var playTime=playTimeRecordIntervalTime;//发送播放时间流水记录时的时间差，单位为秒
    if(playTime<=0||(playPoint-playTimeRecordLastPlayPoint)==0) playTime=0;
    playTimeRecordLastPlayPoint=playPoint;
    var boxInfo=getCardInfo();
    var multiSetType=0;
    var pkId=optObj.pkId||videoId;
    var channelId=-2;
    var channelName=vipName;
    var programName=optObj.programName||videoName;

    var postData='playPoint='+playPoint+'&videoId='+videoId+'&branchNo='+regionCodeInt+'&playTime='+playTime+'&spId='+spId+'&id='+playTimeRecordId+'&spName='+encodeURIComponent(spName)+'&keyNo='+keyNo+'&totalTime='+totalTime+'&videoName='+encodeURIComponent(videoName)+'&multiSetType='+multiSetType+'&programId='+pkId+'&channelId='+channelId+'&channelName='+encodeURIComponent(channelName)+'&boxInfo='+encodeURIComponent(boxInfo)+'&playUrl=&isBase='+isBase+'&vipcode='+vipcode+'&programName='+encodeURIComponent(programName);
    ajax({
        url: url,
        type: "POST", //HTTP 请求类型,GET或POST
        dataType: "html", //请求的文件类型html/xml
        onSuccess: function(html){ //请求成功后执行[可选]
            //loadingObj.hide();
            var json=eval('('+html+')');
            if(parseInt(json.code,10)==1){
                playTimeRecordId=json.data.id;
            }else{
                //alert(json.message);
            }
            !!fn&&fn(json);
        },
        onComplete:function(){
           
        },
        onError:function(){ //请求失败后执行[可选]
           
        },
        post:postData,  
        timeout:7000  
    });

    
    
}

var playTimeRecordTimer=null;//定时器
/*
参数
fn 函数要求返回如下格式：
{
    currTime:
    totalTime:
    videoId:
    videoName:
    spId:
    spName:
    
}
*/
function startPlayTimeRecord(fn){
	return 0;
	
    if(!!playTimeRecordTimer){
        clearInterval(playTimeRecordTimer);
        playTimeRecordTimer=null;
    }
    playTimeRecordId='';
    playTimeRecordLastPlayPoint=0;
    playTimeRecordTimer=setInterval(function(){

        savePlayTimeRecord(!!fn&&fn());
    },playTimeRecordIntervalTime*1000);//180000
    
}

