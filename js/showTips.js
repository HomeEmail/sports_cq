// JavaScript Document
var timerTip = null;
function showTips(strs,times,fontSize){
	clearTimeout(timerTip);
	$('tips').innerHTML='<span style="position:absolute;left:25px;top:20px;width:378px;height:132px;color:#eeeeee;font-size:'+(fontSize||30)+'px;line-height:132px;text-align:center;">'+strs+'</span>';
	$('tips').style.display='block';
	if(times==0){

	}else{
		timerTip = setTimeout(function(){
			$('tips').style.display='none';
		},times);
	}
}