var projectBasePath='';

//产品主页
var homeUrl = "http://172.16.146.56";//测试
//homeUrl = "http://172.16.146.22";//线上
homeUrl="http://192.168.18.192";//


var serverPath = ''; //数据接口
serverPath = 'http://172.16.146.56:8081/cq-sports-client-web/';//南网公司内测试
serverPath = 'http://192.168.18.192/cq-sports-client-web/';//重庆测试

var userPath = ''; // 用户信息

var imgBasePath = "";  //图片路径


var orderBasePath  ="http://192.168.18.54/cq-order-web/"; //测试
orderBasePath = 'http://192.168.18.192/cq-order-web/'; //正式

var apiStatisticsPath = "http://172.16.146.32/utvgo-statistics/"//测试
apiStatisticsPath = "http://172.16.146.6/utvgo-statistics/"//正式

var req = null; // ajax requset对象 


var keyNo = !!window.android ? window.android.getKeyNo() : (typeof (CA) != 'undefined' && CA.icNo) || "8230003752183797";
//keyNo = "8230003752183797";  //测试


var regionCodeInt =  (typeof (CA) != 'undefined' && CA.regionCode) || 113;

var platform = Q.getInt('platform',0);//0linux 1安卓

var backUrl=Q.getDecoded('backUrl');//url解码后的返回地址
if(backUrl=='null'){
	backUrl='';
}

var keyNoFromHref=Q.get('keyNo');//浏览器地址栏模拟卡号
if(!!keyNoFromHref){
	keyNo=keyNoFromHref;
}

var portalUrl=(typeof (SysSetting) != 'undefined' && SysSetting.getEnv("PORTAL_ADDR")) || ''; //portal页地址
portalUrl='http://192.168.18.192';

function hrefAddSimulateKeyNo(url){//地址栏添加要模拟的卡号,所有页面跳转地址都要用这函数处理下
	if(!!!keyNoFromHref||url.indexOf('keyNo=')>-1) return url;//不需要模拟卡号,或者地址栏本来就有keyNo
	if(url.indexOf('?')>-1){
		url+='&keyNo='+keyNo;
	}else{
		url+='?keyNo='+keyNo;
	}
	return url;
}

