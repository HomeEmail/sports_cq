var projectBasePath='';

//产品主页
var homeUrl = "http://172.16.146.56";//测试
//homeUrl = "http://172.16.146.22";//线上
homeUrl="http://10.105.248.139";//天津广电 测试

var hostUrl='http://10.105.248.139';
hostUrl='http://10.105.248.139';//test

var serverPath = ''; //数据接口
serverPath = hostUrl+'/cqedu-client-web';
// apiBasePath='http://172.16.146.41/utvgo-tv-mvc';//统一正式对外api

var userPath = ''; // 用户信息
userPath = hostUrl+':8081/cq-order-web';

var imgBasePath = "";  //图片路径
var imgBasePath = hostUrl+":81/panda/uploadFile/image/";


var orderBasePath  ="http://172.16.146.32/utvgo-order-web/"; //测试
orderBasePath  = hostUrl+"/cq-order-web/"; //正式

var apiStatisticsPath = "http://172.16.146.32/utvgo-statistics"//测试
apiStatisticsPath = "http://172.16.146.6/utvgo-statistics"//正式

var req = null; // ajax requset对象 

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

