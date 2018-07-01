var projectBasePath='';


var hostUrl = "http://172.16.146.56";//测试
//hostUrl = "http://172.16.146.22";//线上
hostUrl="http://10.105.248.139";//天津广电 测试

var homeUrl = hostUrl;//产品主页

var serverPath = ''; //数据接口
serverPath = hostUrl+'/cqedu-client-web';
// apiBasePath='http://172.16.146.41/utvgo-tv-mvc';//统一正式对外api

var userPath = ''; // 用户信息
userPath = hostUrl+':8081/cq-order-web';

var imgBasePath = "";  //图片路径
var imgBasePath = hostUrl+":81/panda/uploadFile/image/";


var getUserInfo = "http://172.16.146.32/utvgo-user"; //测试
getUserInfo = hostUrl+"/utvgo-user"; //正式

var orderBasePath  ="http://172.16.146.32/utvgo-order-web/"; //测试
orderBasePath  = hostUrl+"/cq-order-web/"; //正式

var apiStatisticsPath = "http://172.16.146.32/utvgo-statistics"//测试
apiStatisticsPath = "http://172.16.146.6/utvgo-statistics"//正式

var req = null; // ajax requset对象
var orderStrtus = false;  //false表示未订购
var albumFree = false;  //false表示专辑不免费
var cmboId = 1428;  //计费id
var cmboIds = '1428,1532';  //多个计费id

var vipCode = 'vip_code_28';
var vipName = '熊猫乐园';

var providerID='QQYY';//cp编号
var goodsCode='ABCD1';//商品编码
var tryFlag='1';//1试看  0订购使用
var rtspApiBase='http://43.224.208.201:8080';//正式环境
rtspApiBase='http://43.247.148.246:8080';//测试环境
//rtspApiBase='http://10.80.0.124:8080';//测试的接口内网地址

var keyNo = !!window.android ? window.android.getKeyNo() : (typeof (CA) != 'undefined' && CA.icNo) || "8002003646694252";
//keyNo = "8002003646694252";  //测试
if(typeof (Utility) != 'undefined' && Utility.getSystemInfo){
	keyNo=Utility.getSystemInfo('SID');//天津广电卡号
	if(!!!keyNo||keyNo==''||keyNo=='null'||keyNo==undefined||keyNo==null){
		//读取卡号失败，请插卡重试！
		if(location.href.indexOf('noCardTips.html')<=-1){
			location.href='./noCardTips.html?backUrl='+Q.encode(location.href);
		}
		
	}
}else{
	keyNo='8120010225603429';//无卡时的默认卡
	//keyNo='8120010261580499';
}

var regionCodeInt =  (typeof (CA) != 'undefined' && CA.regionCode) || 113;
if(typeof (Utility) != 'undefined' && Utility.getSystemInfo){
	regionCodeInt=Utility.getSystemInfo('ARC')||113;//天津广电区域码
}

var auc='';//天津广电认证码
var uid='';//天津广电用户ID
if(typeof (Utility) != 'undefined' && Utility.getSystemInfo){
	auc=Utility.getSystemInfo('AUC');
	uid=Utility.getSystemInfo('UID');
}else{
	uid='6752013';//
}

function showLoadingDiv(){
	if(!$('loadingDiv')) return 0;
	$('loadingDiv').style.visibility = "visible";
}
function hideLoadingDiv(){
	if(!$('loadingDiv')) return 0;
	$('loadingDiv').style.visibility = "hidden";
}

var backUrl=Q.getDecoded('backUrl');//url解码后的返回地址
if(backUrl=='null'){
	backUrl='';
}

var portalUrl=(typeof (SysSetting) != 'undefined' && SysSetting.getEnv("PORTAL_ADDR")) || ''; //portal页地址
//portalUrl='http://172.16.146.6';
portalUrl='http://10.105.248.37/test.html';
//portalUrl = Utility.getEnv('PORTAL_ADDR'); //天津广电 获取portal页面地址

// function hrefAddSimulateKeyNo(url){//地址栏添加要模拟的卡号,所有页面跳转地址都要用这函数处理下
// 	if(!!!keyNoFromHref||url.indexOf('keyNo=')>-1) return url;//不需要模拟卡号,或者地址栏本来就有keyNo
// 	if(url.indexOf('?')>-1){
// 		url+='&keyNo='+keyNo;
// 	}else{
// 		url+='?keyNo='+keyNo;
// 	}
// 	return url;
// }

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