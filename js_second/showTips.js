// JavaScript Document
//showTips('网络异常',6000,24,{zIndex:10,left:'',top:'',width:'',height:'',background:'',backgroundColor:'#222222'});
var timerTip = null;
function showTips(strs,times,fontSize,obj){//times<=0 毫秒 提示将不会自动消失
	var el=$('tips_id');
	var zIndex=!!obj?(obj.zIndex||10):10;
	var left=!!obj?(obj.left||'426px'):'426px';
	var top=!!obj?(obj.top||'274px'):'274px';
	var width=!!obj?(obj.width||'428px'):'428px';
	var height=!!obj?(obj.height||'172px'):'172px';
	var background='';
	var backgroundColor='';
	if(!!obj&&!!obj.background){
		background=obj.background;
	}
	if(!!obj&&!!obj.backgroundColor){
		backgroundColor=obj.backgroundColor;
	}
	if(!!!el){

		el=document.createElement('div');
		el.id='tips_id';
		el.style.position='absolute';
		el.style.zIndex=zIndex;
		el.style.left=left;
		el.style.top=top;
		el.style.width=width;
		el.style.height=height;
		if(backgroundColor) el.style.backgroundColor=backgroundColor;
		if(background) el.style.background=background;
		el.style.borderRadius='8px';
		el.style.display='none';
		$append(el);
	};

	clearTimeout(timerTip);
	$('tips_id').innerHTML='<div style="padding:20px 25px;width:378px;height:132px;color:#eeeeee;font-size:'+(fontSize||30)+'px;line-height:132px;text-align:center;">'+strs+'</div>';
	$('tips_id').style.display='block';
	if(times<=0){

	}else{
		timerTip = setTimeout(function(){
			$('tips_id').style.display='none';
		},times);
	}
}
