/*
需找focus哪个数据;
参数data类似如下：
[
    {"icon":"images/index/index_1.png","link":'#','top':180,'left':50,'width':454, 'height':294},
    {"icon":"images/index/index_2.jpg","link":'#','top':180,'left':520,'width':220, 'height':140},
    {"icon":"images/index/index_2.jpg","link":'#','top':340,'left':520,'width':220, 'height':140}
]

*/
function SuperMouse(data){//ata：光标数据列表
	this.listData = data||[],
	this.setData = function(data){//data：光标数据列表
       this.listData=data||[];
	},
	this.getSubPosX = function(_num,subPos){ //_num:-1 左 ；1 右;subPos:光标当前所在的数据索引
		  var thisWidth = this.listData[subPos].width;
		  var thisLeft =this.listData[subPos].left;
		  var thisTop = this.listData[subPos].top;
		  var thisHeight = this.listData[subPos].height;
		  var intersectionItem =[]; //和当前元素有交集元素的数组
		  var outsectionItem=[];  //和当前元素外集元素的数组
		  var intersectionItemLeft = [];  //和当前元素有交集元素的左边数组
		  var intersectionItemTop = [];  //和当前元素有交集元素的头部的数组
		  var outsectionItemDif=[]; //当前元素和目标元素的top的差值
		  var item = null;
		   //外集等于和当前元素没有交集的元素
		   //1 向右
		   if(_num>0){
		   		for(var i = 0 ; i < this.listData.length; i++){
			  		item = this.listData[i];
			  		if( item.left > (thisLeft+thisWidth) ){
			  			//目标元素的left大于本身元素left+宽度。
				  		item.index=i;
				  		if(item.top+item.height >= thisTop&&item.top<=thisTop+thisHeight){
				  			//交集元素
				  			intersectionItem.push(item);
					  		intersectionItemLeft.push(item.left);
				  		}else{
				  			//外集
				  			outsectionItem.push(item);
				  		}
			     	}
			   }
			  	var leftItem=[];

			  	if(intersectionItem.length<=0){
			  		//走外集
			  		var maxTop=100000;
				  	var minDif = 100000,minDif2=100000,difTemp=-1;
				  	var difLeft=0,difTop=0,sqrtValue=0,lastSubPos=0;
			  		for(var k = 0; k < outsectionItem.length; k++){
			  			if(outsectionItem[k].top>thisTop+thisHeight){
		  					//自身元素下面和它没有交集的元素
		  					difTop=outsectionItem[k].top-(thisTop+thisHeight);
		  					//top的差值 
		  					difLeft=outsectionItem[k].left-(thisLeft+thisWidth);
		  					//left的差值
		  					sqrtValue=Math.sqrt(difLeft*difLeft+difTop*difTop);
		  					if(sqrtValue<minDif){
		  						minDif=sqrtValue; //找到距离最短的元素
		  						difTop=outsectionItem[k].top+outsectionItem[k].height-thisTop;
		  						difLeft=outsectionItem[k].left-(thisLeft+thisWidth);	
		  						sqrtValue=Math.sqrt(difLeft*difLeft+difTop*difTop);
		  						//目标元素的对角点和自身元素的左上角的点进行判断距离	  						
		  					}
		  					if(sqrtValue<=minDif2){
		  						minDif2=sqrtValue;
		  						subPos=outsectionItem[k].index;
		  						//找到离自身元素最近的目标元素
		  						if(difTemp==minDif2){
		  						//如果目标元素有两个或者以上进行对比
				  						if(outsectionItem[k].top<=maxTop){
				  							//对比他们的top值
				  							maxTop=outsectionItem[k].top;
				  							lastSubPos=outsectionItem[k].index;
				  						}else{
				  							subPos=lastSubPos;
				  						}		  							
				  				}else{
		  								difTemp=minDif2;				  						
				  				}
		  					}
			  			}else{
		  					//自身元素上面和它没有交集的元素
		  					difTop=outsectionItem[k].top + outsectionItem[k].height - thisTop;
		  					//top的差值 
		  					difLeft=outsectionItem[k].left - (thisLeft+thisWidth);
		  					//left的差值 
		  					sqrtValue=Math.sqrt(difLeft*difLeft+difTop*difTop);
		  					if(sqrtValue<minDif){
		  						minDif=sqrtValue; //找到距离最近的目标元素
		  						difTop=outsectionItem[k].top - thisTop;
		  						difLeft=outsectionItem[k].left + outsectionItem[k].height - thisLeft;
		  						sqrtValue=Math.sqrt(difLeft*difLeft+difTop*difTop);	
		  						//目标元素的对角点和自身元素的左上角的点进行判断距离
		  						if(sqrtValue<=minDif2){
		  							minDif2=sqrtValue;
		  							subPos=outsectionItem[k].index;
		  							//找到离自身元素最近的目标元素	
		  							if(difTemp==minDif2){
		  								//如果目标元素有两个或者以上进行对比
				  						if(outsectionItem[k].top<=maxTop){
				  							maxTop=outsectionItem[k].top;
				  							//对比他们的top值
				  							lastSubPos=outsectionItem[k].index;
				  						}else{
				  							subPos=lastSubPos; 
				  							//如果有相同最大的top值为优先
				  						}		  							
				  					}else{
		  								difTemp=minDif2;				  						
				  					}		  							  						
		  						}			  						 		  						
		  					}			  								  			
			  			}
			  		}
			  	}else{
			  		//走交集
				  	var minLeft = Math.min.apply(Math,intersectionItemLeft);
                    //判断离自身元素最少左值得目标元素
			  		intersectionItemTop=[];
				    for(var k = 0; k < intersectionItem.length; k++){
			  			if(minLeft==intersectionItem[k].left){
			  				leftItem.push(intersectionItem[k]);
			  				intersectionItemTop.push(intersectionItem[k].top);
			  				//如果左值有相等，判断它们的高
			  			}
			  		}

				  	var minTop = Math.min.apply(Math,intersectionItemTop);
			  		for(var j=0;j<leftItem.length;j++){
			  			if(minTop==leftItem[j].top){
			  				subPos=leftItem[j].index;
			  				break;
			  				//左值相等，最少的top为优先
			  			}
			  		}
			  	}
		   }
		   //-1向左
            if(_num<0){
		   		for(var i = 0 ; i < this.listData.length; i++){
			  		item = this.listData[i];
			  		if( (item.left+item.width) < thisLeft+thisWidth){
                      //目标元素的left+宽度值小于当前元素的left+宽度值
				  		item.index=i;
				  		if(item.top+item.height >= thisTop&&item.top<=thisTop+thisHeight){
				  			//交集
				  			intersectionItem.push(item);
					  		intersectionItemLeft.push(item.left+item.width);
				  		}else{
				  			//外集
				  			outsectionItem.push(item);
				  		}
			     	}
			   }
			   	var leftItem=[];
			  	if(intersectionItem.length<=0){
			  		//走外集
			  		var maxTop=100000;
				  	var minDif = 100000,minDif2=100000,difTemp=-1;
				  	var difLeft=0,difTop=0,sqrtValue=0,lastSubPos=0;
			  		for(var k = 0; k < outsectionItem.length; k++){
		  				if(outsectionItem[k].top>thisTop+thisHeight){
		  					//目标元素下面没有交集的外集
		  					difTop=outsectionItem[k].top-(thisTop+thisHeight);
		  					//top的差值
		  					difLeft=(outsectionItem[k].left+outsectionItem[k].width)-thisLeft;
		  					//left的差值
		  					sqrtValue=Math.sqrt(difLeft*difLeft+difTop*difTop);
		  					//计算两个元素之间距离
		  					if(sqrtValue<minDif){
		  						minDif=sqrtValue; //找到距离最短的元素
		  						difTop=outsectionItem[k].top+outsectionItem[k].height-thisTop;
		  						difLeft=outsectionItem[k].left-outsectionItem[k].width-thisLeft;
		  						sqrtValue=Math.sqrt(difLeft*difLeft+difTop*difTop);
		  						//目标元素的对角点和自身元素的左上角的点进行判断距离
		  						if(sqrtValue<=minDif2){  
		  							minDif2=sqrtValue;
		  							//如果目标元素有两个或者以上进行对比
		  							subPos=outsectionItem[k].index;
		  							if(difTemp==minDif2){  
				  						if(outsectionItem[k].top<=maxTop){
				  							maxTop=outsectionItem[k].top;
				  							//对比他们的top值
				  							lastSubPos=outsectionItem[k].index;
				  						}else{
				  							subPos=lastSubPos;  
				  						}
		  							}else{
		  								difTemp=minDif2;
		  							}
			  					}
		  					}
		  				}else{
		  					//目标元素上面没有交集的外集
		  					difTop=outsectionItem[k].top+outsectionItem[k].height - thisTop;
		  					//top的差值
		  					difLeft=outsectionItem[k].left+outsectionItem[k].width - thisLeft;
		  					//left的差值
		  					sqrtValue=Math.sqrt(difLeft*difLeft+difTop*difTop);
		  					//计算两个元素之间距离
		  					if(sqrtValue<minDif){
		  						minDif=sqrtValue; //找到距离最短的元素
		  						difTop=outsectionItem[k].top-thisTop;
		  						difLeft=outsectionItem[k].left-thisLeft;
		  						sqrtValue=Math.sqrt(difLeft*difLeft+difTop*difTop);
		  						//目标元素的对角点和自身元素的左上角的点进行判断距离
		  						if(sqrtValue<=minDif2){
		  							minDif2=sqrtValue;
		  							subPos=outsectionItem[k].index;
		  							//找到离自身元素最近的目标元素
		  							if(difTemp==minDif2){
                                        //如果目标元素有两个或者以上进行对比
				  						if(outsectionItem[k].top<=maxTop){
				  							maxTop=outsectionItem[k].top;
				  							lastSubPos=outsectionItem[k].index;
				  							//对比他们的top值
				  						}else{
				  							subPos=lastSubPos;
				  							//如果有相同最大的top值为优先
				  						}
		  							}else{
		  								difTemp=minDif2;
		  							}
		  						}
		  					}
		  				}	  			
			  		}
			  	}else{
			  		//走交集
				  	var maxLeft = Math.max.apply(Math,intersectionItemLeft);
				  	 //判断离自身元素最大左值得目标元素
			  		intersectionItemTop=[];
				    for(var k = 0; k < intersectionItem.length; k++){
			  			if(maxLeft==intersectionItem[k].left+intersectionItem[k].width){
			  				leftItem.push(intersectionItem[k]);
			  				intersectionItemTop.push(intersectionItem[k].top);
			  				//如果左值有相等，判断它们的高
			  			}
			  		}

				  	var minTop = Math.min.apply(Math,intersectionItemTop);
			  		for(var j=0;j<leftItem.length;j++){
			  			if(minTop==leftItem[j].top){
			  				subPos=leftItem[j].index;
			  				break;
			  				//左值相等，最少的top为优先
			  			}
			  		}
			  	}
		   }
			return subPos;
	},
	this.getSubPosY = function(_num,subPos){
		  var thisWidth = this.listData[subPos].width;
		  var thisLeft = this.listData[subPos].left;
		  var thisTop = this.listData[subPos].top;
		  var thisHeight = this.listData[subPos].height;
		  var intersectionItem =[]; //和当前元素有交集元素的数组
		  var outsectionItem=[];  //和当前元素没交集元素的数组
		  var intersectionItemLeft = [];  //和当前元素有交集元素的左边数组
		  var intersectionItemTop = [];  //和当前元素有交集元素的头部的数组

		  var outsectionItemDif=[]; //当前元素和目标元素的top的差值

		  var intersectionItemTop=[];  //交集元素内所有的top值


		  var item = null;

		  //1 下
		    if(_num>0){
		   		for(var i = 0 ; i < this.listData.length; i++){
			  		item = this.listData[i];
			  		if( item.top > (thisTop+thisHeight) ){
			  		//目标元素的top小于当前元素的top+高度值
				  		item.index=i;

				  		if(item.left+item.width >= thisLeft&&item.left<=thisLeft+thisWidth){
				  			//交集
				  			intersectionItem.push(item);
					  		intersectionItemTop.push(item.top);
				  		}else{
				  			outsectionItem.push(item);
				  			//外集
				  		}
			     	}
			   }
			   	var leftItem=[];
			  	if(intersectionItem.length<=0){
			  		//走外集
			  		var maxLeft=100000;
				  	var minDif = 100000,minDif2=100000,difTemp=-1;
				  	var difLeft=0,difTop=0,sqrtValue=0,lastSubPos=0;
			  		for(var k = 0; k < outsectionItem.length; k++){
		  				if(outsectionItem[k].top>thisTop+thisHeight){
		  					//下 目标元素左边的没交集元素
		  					difTop=outsectionItem[k].top-(thisTop+thisHeight);
		  					//top的差值
		  					difLeft=(outsectionItem[k].left+outsectionItem[k].width)-thisLeft;
		  					//left的差值
		  					sqrtValue=Math.sqrt(difLeft*difLeft+difTop*difTop);
		  					//目标元素点和自身元素的点进行判断距离
		  					if(sqrtValue<minDif){
		  						minDif=sqrtValue; 
		  						difTop=outsectionItem[k].top+outsectionItem[k].height-thisTop;
		  						difLeft=outsectionItem[k].left-(thisLeft+thisWidth);
		  						sqrtValue=Math.sqrt(difLeft*difLeft+difTop*difTop);
		  						//目标对角点的元素和当前元素的距离
		  						if(sqrtValue<=minDif2){  
		  							minDif2=sqrtValue; //如果目标元素有两个或者以上进行对比
		  							subPos=outsectionItem[k].index;
		  							//找到离自身元素最近的目标元素
		  							if(difTemp==minDif2){  
				  						if(outsectionItem[k].left<=maxLeft){
				  							maxLeft=outsectionItem[k].left;
				  							lastSubPos=outsectionItem[k].index;
				  						}else{
				  							subPos=lastSubPos;  
				  							//如果两个相同就寻找最大的left
				  						}
		  							}else{
		  								difTemp=minDif2;
		  							}
			  					}
		  					}
		  				}else{
		  					//下 目标元素右边的没交集元素
		  					difTop=outsectionItem[k].top-(thisTop+thisHeight);
		  					//top的差值
		  					difLeft=outsectionItem[k].left - thisLeft+thisWidth;
		  					//left的差值
		  					sqrtValue=Math.sqrt(difLeft*difLeft+difTop*difTop);
		  					//目标元素点和自身元素的点进行判断距离
		  					if(sqrtValue<minDif){
		  						minDif=sqrtValue;
		  						difTop=outsectionItem[k].top+outsectionItem[k].height-thisTop;
		  						difLeft=outsectionItem[k].left+outsectionItem[k].width-thisLeft;
		  						sqrtValue=Math.sqrt(difLeft*difLeft+difTop*difTop);
		  					//目标元素的对角点和自身元素的左上角的点进行判断距离
		  						if(sqrtValue<=minDif2){
		  							minDif2=sqrtValue;
		  							subPos=outsectionItem[k].index;
		  							//找到离自身元素最近的目标元素
		  							if(difTemp==minDif2){
				  						if(outsectionItem[k].left<=maxLeft){
				  							maxLeft=outsectionItem[k].left;
				  							lastSubPos=outsectionItem[k].index;
				  						}else{
				  							subPos=lastSubPos;
				  							//如果两个相同就寻找最大的left
				  						}
		  							}else{
		  								difTemp=minDif2;
		  							}
		  						}
		  					}
		  				}	  			
			  		}
			  	}else{
			  		//走交集
				  	var minTop = Math.min.apply(Math,intersectionItemTop);
				  	 //判断离自身元素最小值高度得目标元素
			  		intersectionItemLeft=[];
				    for(var k = 0; k < intersectionItem.length; k++){
			  			if(minTop==intersectionItem[k].top){
			  				leftItem.push(intersectionItem[k]);
			  				intersectionItemLeft.push(intersectionItem[k].left);
			  				//如果高相等，判断它们的left
			  			}
			  		}


				  	var minLeft = Math.min.apply(Math,intersectionItemLeft);
				  	//如果高相等，判断它们的left
			  		for(var j=0;j<leftItem.length;j++){
			  			if(minLeft==leftItem[j].left){
			  				subPos=leftItem[j].index;
			  				break;
			  				//高相等，最少的left为优先
			  			}
			  		}
			  	}
		    }

            //-1 上
		    if(_num<0){
		   		for(var i = 0 ; i < this.listData.length; i++){
			  		item = this.listData[i];
			  		if( item.top + item.height < thisTop ){
			  		//目标元素的top+高小于当前元素的top
				  		item.index=i;
				  		if(item.left+item.width >= thisLeft&&item.left<=thisLeft+thisWidth){
				  			//交集
				  			intersectionItem.push(item);
					  		intersectionItemTop.push(item.top+item.height);
				
				  		}else{
				  			outsectionItem.push(item);
				  			//外集
				  		}
			     	}
			   }
			   	var leftItem=[];
			  	if(intersectionItem.length<=0){
			  		//走外集
			  		var maxLef=100000;
				  	var minDif = 100000,minDif2=100000,difTemp=-1;
				  	var difLeft=0,difTop=0,sqrtValue=0,lastSubPos=0;
			  		for(var k = 0; k < outsectionItem.length; k++){
		  				if(outsectionItem[k].top>thisTop+thisHeight){
		  					//-1上 目标元素左边的没交集元素
		  					difTop=(outsectionItem[k].top+outsectionItem[k].height)-thisTop;
		  					//top的差值
		  					difLeft=(outsectionItem[k].left+outsectionItem[k].width)-thisLeft;
		  					//left的差值
		  					sqrtValue=Math.sqrt(difLeft*difLeft+difTop*difTop);
		  					//目标元素点和自身元素的点进行判断距离
		  					if(sqrtValue<minDif){
		  						minDif=sqrtValue; //找到距离最短的元素
		  						difTop=outsectionItem[k].top-thisTop;
		  						difLeft=outsectionItem[k].left-thisLeft;
		  						sqrtValue=Math.sqrt(difLeft*difLeft+difTop*difTop);
		  						//目标元素的对角点和自身元素的左上角的点进行判断距离
		  						if(sqrtValue<=minDif2){  
		  							minDif2=sqrtValue;
		  							subPos=outsectionItem[k].index;
		  							//找到离自身元素最近的目标元素
		  							if(difTemp==minDif2){  
				  						if(outsectionItem[k].left<=maxLeft){
				  							maxLeft=outsectionItem[k].left;
				  							lastSubPos=outsectionItem[k].index;
				  							//如果距离相等，判断它们的left
				  						}else{
				  							subPos=lastSubPos;  
				  							//高相等，最大的left为优先
				  						}
		  							}else{
		  								difTemp=minDif2;
		  							}
			  					}
		  					}
		  				}else{
		  					//-1 目标元素右边的没交集元素
		  					difTop=outsectionItem[k].top+outsectionItem[k].height-thisTop;
		  					//top的差值
		  					difLeft=outsectionItem[k].left-(thisLeft+thisWidth);
		  					//left的差值
		  					sqrtValue=Math.sqrt(difLeft*difLeft+difTop*difTop);
		  					//目标元素点和自身元素的点进行判断距离
		  					if(sqrtValue<minDif){
		  						minDif=sqrtValue; //找到距离最短的元素
		  						difTop=outsectionItem[k].top-thisTop;
		  						difLeft=(outsectionItem[k].left+outsectionItem[k].width)-thisLeft;
		  						sqrtValue=Math.sqrt(difLeft*difLeft+difTop*difTop);
		  						//目标元素的对角点和自身元素的左上角的点进行判断距离
		  						if(sqrtValue<=minDif2){
		  							minDif2=sqrtValue;
		  							subPos=outsectionItem[k].index;
		  							//找到离自身元素最近的目标元素
		  							if(difTemp==minDif2){
				  						if(outsectionItem[k].left<=maxLeft){
				  							maxLeft=outsectionItem[k].left;
				  							lastSubPos=outsectionItem[k].index;
				  							//如果距离相等，判断它们的left
				  						}else{
				  							subPos=lastSubPos;
				  							//高相等，最大的left为优先
				  						}
		  							}else{
		  								difTemp=minDif2;
		  							}
		  						}
		  					}
		  				}	  			
			  		}
			  	}else{
			  		//走交集
				  	var maxTop = Math.max.apply(Math,intersectionItemTop);
				  	//判断离自身元素最大值高度得目标元素


			  		intersectionItemLeft=[];
				    for(var k = 0; k < intersectionItem.length; k++){
			  			if(maxTop==intersectionItem[k].top + intersectionItem[k].height){
			  				leftItem.push(intersectionItem[k]);
			  				intersectionItemLeft.push(intersectionItem[k].left);
			  				//如果高相等，判断它们的left
			  			}
			  		}


				  	var minLeft = Math.min.apply(Math,intersectionItemLeft);
				  	//向上行寻找集合里面最少的top
			  		for(var j=0;j<leftItem.length;j++){
			  			if(minLeft==leftItem[j].left){
			  				subPos=leftItem[j].index;
			  				break;
			  				//高相等，最少的left为优先
			  			}			  		
			  		}
			  	}
		    }
		    return subPos;
	}
}