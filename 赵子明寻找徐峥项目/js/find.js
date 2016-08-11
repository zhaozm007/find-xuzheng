/*
 * @file overview: find xuzheng
 * @author ZhaoZiMing
 * @version v1
 * @build 2016.03
 */

  (function($){
  	
  	//所有图片预加载
  	var imgdefereds=[];  
	$('img').each(function(){  
   		 var dfd=$.Deferred();  
    		$(this).bind('load',function(){  
        		dfd.resolve();  
    		}).bind('error',function(){  
    		//图片加载错误，加入错误处理  
    			alert("图片加载错误");
    		})  
   		 if(this.complete) setTimeout(function(){  
        		dfd.resolve();  
    		},1000);  
     	imgdefereds.push(dfd);  
	});  
	$.when.apply(null,imgdefereds).done(function(){ 
		var timer = function(){
			setTimeout(function(){
				$("#bj_mp")[0].pause();
			},5500);
		}
		timer();
    		$(".bj1").hide();
    		//音乐
		$("#bj_m")[0].play();
		t();
	});
  	
  	
	//音乐
//	$("#bj_m")[0].play();
//	var timer = function(){
//		timer3 = setInterval(function(){
//			$("#bj_mp")[0].play();
//		},100);
//	}
//	var timer2 = function(){
//		setTimeout(function(){
//			t();
//			timer();
//		},1500);
//	}
//	timer2();
	
	
	$(".music").on("click",function(){
		$(this).addClass("offmusic").siblings().removeClass("offmusic");
		$("#bj_m")[0].pause();
		$("#bj_mp")[0].pause();
	});
	$(".offmusic").on("click",function(){
		$("#bj_m")[0].play();
	});
	
	//p标签出现
	var t = function(){
		$("#bj_mp")[0].play();
		var i = 0;
		tm = setInterval(function(){
			i++;
			$("#bj2_box p").eq(i).fadeToggle(0);
		},500);
	}
	
//	$(".bj1").delay(1400).hide(0);
	$(".box .bj2 .bj2_c").delay(1000).fadeToggle(0);
	$("#bj2_box").delay(7500).hide(10);
	
	
	//xzimg换图
	var xzimg = function(){
		var index = 0;
		appearTimer = setInterval(function() {
			$("#xz").attr("src","img/xz" + index + ".png");
				index++;
				if (index > 2) {
				index = 0
			}					
		}, 200);
	}
	xzimg();
	
	//各种小图消失
	$(".box .bj2 .bj2_a").delay(10000).hide(1000);
	$(".box .bj2 .bj2_b").delay(10000).hide(1000);
	$(".box .bj2 .bj2_c").delay(9000).hide(1000);
	$(".box .bj2 .qiu3").delay(10000).hide(1000);
	
	$(".box .bj2 .vivo").delay(11000).fadeToggle(0);
	$(".box .bj2 .vivo").delay(4000).hide(0);
	
	$(".box .bj2 .suipian").delay(14300).fadeToggle(100);
	$(".box .bj2 .suipian").delay(2000).hide(0);
	
	$(".box .bj2 .spx").delay(16300).fadeToggle(0);
	$(".box .bj2 .spx .xzs").delay(20000).hide(0);
	
	$(".box .bj2 .xing").delay(16500).fadeToggle(0);
	$(".box .bj2 .sanjiao").delay(17000).fadeToggle(0);
	
	$(".box .bj2 .sanjiao").on("click",function(){
		location.assign("http://127.0.0.1:8020/BJH160303/作业/微信找徐峥/游戏准备开始.html")
	});
	
	
	
	
	
  })(jQuery);

