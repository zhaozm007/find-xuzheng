/*
 * @file overview: find xuzheng
 * @author ZhaoZiMing
 * @version v1
 * @build 2016.03
 */
(function($) {

	//所有图片预加载
	var imgdefereds = [];
	$('img').each(function() {
		var dfd = $.Deferred();
		$(this).bind('load', function() {
			dfd.resolve();
		}).bind('error', function() {
			//图片加载错误，加入错误处理 
			alert("图片加载错误");
		})
		if(this.complete) setTimeout(function() {
			dfd.resolve();
		}, 1000);
		imgdefereds.push(dfd);
	});
	$.when.apply(null, imgdefereds).done(function() {
		start();
	});
	
	var gaming = true;
	var lock = true;
	var num = 0;
	var num2 = 1;
	
	
	var start = function(){
		$(".box .bj1").hide();
		$(".bj2").show();
		//音乐
		$("#bj_m")[0].play();
		$("#bj_md")[0].play();
		//调用倒计时
		cutDownTimeFun();
		createImg();
		dingshi();
	}
	
	
	//切换音乐图片
	$(".music").on("click", function() {
		$(this).addClass("offmusic").siblings().removeClass("offmusic");
		$("#bj_m")[0].pause();
		clearInterval(timer);
	});
	$(".offmusic").on("click", function() {
		$("#bj_m")[0].play();
		dingshi();
	});
	//音乐图片动画
	var dingshi = function() {
		var num_deg = 0;
		timer = setInterval(function() {
			$(".music").css("-webkit-transform", "rotateZ(" + num_deg + "deg)");
			num_deg++;
		}, 10);
	}
	
	
	//倒计时函数
	var sumTime = 30.00; //30指的是30秒
	var cutDownTimeFun = function() {
		
		//实现倒计时
		timer2 = setInterval(function() {
			sumTime -= 0.01;
			sumTime = sumTime.toFixed(2); // 取两位小数
			if(sumTime == 0.00) {
				clearInterval(timer2);
				//游戏结束
				$("#bj_md")[0].pause();
				
				error_xz();
//				alert("游戏结束");
				//图片不可以在点击(分数不能再涨)
				gaming = false;
			}
			var newSumtime = sumTime;
			var newTime = newSumtime.replace("."," : ");
			$("#time").text(newTime);
		}, 10);
	}	
	
	//清除 wrap 里的图片
	function removeImgFun(){
		$("#warp").html("");
	}
	
	//创建图片
	var numImg = 2;//需要的图片基数
	var createImg = function(){
		
		if(numImg == 7 & lock){
			numImg = 6;
			if (num == 7) {
				lock = false;
			}
		}else if (numImg > 7) {
			numImg = 7;
		}
		
		if (numImg == 7 & lock == false) {
			successFn();
		}
		
		var needImg = numImg * numImg;//初始页面图片数量
		console.log($("#warp").outerWidth());
		var img_W = ($("#warp").outerWidth()-1) / numImg;//初始页面图片宽
//		console.log($("#warp").outerWidth());
		//创建图片
		for (var i = 0;i < needImg;i++) {
			var allImg = $("<img>").attr("src","img2/baobei.png");
			allImg.width(img_W);
			$("#warp").append(allImg);
		}
		//随机创建一个徐峥
		var allchild = $("#warp").children();
		var randomNum = parseInt(Math.random()*allchild.length);
		allchild[randomNum].src = "img2/xuzheng.png";
		
		//添加点击事件
		allchild.eq(randomNum).on("click",function(){
			if (gaming) {			
				dui_xz();
			}
			
		});
		
		
		var dui_xz = function(){
			num++;
			num2++;
			if (num >=8 && num2 >=8) {
				num = 8;
				num2 = 8;
			}

			clearInterval(timer2);
			$("#bj_md")[0].pause();
			
			dui = $("<img>").attr("src","img2/dui"+num+".png").addClass("dui").addClass("dui2");
			$(".bj2").append(dui);
				
			$(".guan").attr("src","img2/guan"+num2+".png");			
			
			var t = 2000;
			var xiaoshi = function(){
				timer3 = setTimeout(function(){
				cutDownTimeFun();
				$("#bj_md")[0].play();
				
				$(".bj2").children(".dui").remove();
				removeImgFun();
				numImg++;
				createImg();
			},t);
			}
			xiaoshi();
		
			$(".dui").on("click",function(){								
				$(".bj2").children(".dui2").hide(0);
				clearTimeout(timer3);
				cutDownTimeFun();
				$("#bj_md")[0].play();
				removeImgFun();
				numImg++;
				createImg();
			});						
			
		}			
		
	}
	
	
	//游戏结束时
	var error_xz = function(){
		error = $("<img>").attr("src","img2/error.png").addClass("error");
		$(".bj2").append(error);
		
		$(".ov_zi").show(0);
		$("#restar").show(0);
		$("#explain").show(0);
		
		//重新开始
		$("#restar").on("click",function(){
			$(".ov_zi").hide(0);
			$(".error").hide(0);
//			location.replace("http://127.0.0.1:8020/BJH160303/%E4%BD%9C%E4%B8%9A/%E5%BE%AE%E4%BF%A1%E6%89%BE%E5%BE%90%E5%B3%A5/%E6%B8%B8%E6%88%8F%E5%87%86%E5%A4%87%E5%BC%80%E5%A7%8B.html")
			$(".guan").attr("src","img2/guan1.png");
			num = 0;
			num2 = 1;
			gaming = true;
			lock = true;
			sumTime = 30.00;
			numImg = 2;
			removeImgFun();
			clearInterval(timer);
			clearInterval(timer2);
			clearInterval(timer3);
			start();			
		});
		
		//游戏说明
		$("#explain").on("click",function(){
			$(".ov_zi").hide(0);
			$(".error").hide(0);
			$(".box .bj2 .vivo").hide(0);
			$(".explain_box").show(0);
			$("#close").on("click",function(){
				$(".ov_zi").show(0);
				$(".error").show(0);
				$(".explain_box").hide(0);
			});
			slideFn();
		});
			
	}
	
	//自定义滚动
	var slideFn = function(){
		$(window).on('mousewheel', function(ev) {
   		var scrolls =ev.originalEvent.wheelDelta;
   		
   		var top_slide = $("#slide").position().top;
   		var index = 5;
   		var slideMax = $(".slide_box").height()-$("#slide").height();
// 		console.log(slideMax);
   		var neirongMax = $("#neirong").height()-$(".neirong_box").height();
// 		console.log(neirongMax);
   		var scale = index / slideMax;
   		var index_n = scale * neirongMax;
// 		console.log(index_n);
   		if (scrolls > 0) {
//    		console.log("向上");
			if (top_slide <=0) {
//				$("#slide").css("top","0px");
				$("#slide").stop().animate({
      				top: "0px"
      			},0);
			}
      		$("#slide").animate({
      			top: "-="+index+"px"
      		},50);
      		$(".neirong_box").animate({
     	 		scrollTop: "-="+2
     	 	},10);
     	 	
     	 	touch.on(window, 'swipeup', function() {
				$(".neirong_box").animate({
     	 			scrollTop: "-="+2
     	 		},10);
			});
     	 	
   		 }else{
//   	 	console.log("向下");
			if (top_slide >=slideMax) {
//				$("#slide").css("top",slideMax+"px");
				$("#slide").stop().animate({
      				top: slideMax+"px"
      			},0);
			}
     	 	$("#slide").animate({
      			top: "+="+index+"px"
      		},50);    	 
     	 	$(".neirong_box").animate({
     	 		scrollTop: "+="+2
     	 	},10);
     	 	
     	 	touch.on(window, 'swipedown', function() {
				$(".neirong_box").animate({
     	 			scrollTop: "+="+2
     	 		},10);
			});
		
   	 	}
		});
	}
	
	var successFn = function(){
		//当前页面该消失的消失
		$(".gd_box").hide(0);
		$("#warp").hide(0);
		$("#bj_md")[0].pause();
		clearInterval(timer2);
		
		//p标签出现
		var t = function(){
			var i = 0;
			tm = setInterval(function(){
				i++;
				$(".box .bj2 .success p").eq(i).fadeToggle(0);
				$("#bj_mp")[0].play();
				if (i >= 4) {
					clearInterval(tm);
					$("#bj_mp")[0].pause();
				}
			},500);
		}
		t();
		
		$(".box .bj2 .success").delay(2200).hide(0);
		$(".box .bj2 .pinhe").delay(2300).fadeToggle(0);
		$(".box .bj2 .pinhe").delay(2300).hide(500);
		$(".box .bj2 .vivo").delay(5000).fadeToggle(500);
		
		$(".box .bj2 .vivo .chou").on("click",function(){
			$(".box .bj2 .vivo").hide(0);
			if(huo == 1){
				$(".box .bj2 .huode").show(0);//zhongzhongzhong
			}else{
				$(".box .bj2 .yihan").show(0);				
			}
			
		});
		
		$(".box .bj2 .vivo .shuoming").on("click",function(){
			$(".box .bj2 .vivo").hide(0);
			$(".explain_box").show(0);
			
			$("#close").on("click",function(){
				$(".box .bj2 .vivo").show(0);
				$(".explain_box").hide(0);
			});
			slideFn();
		});
		
		//返回重新开始
		$(".box .bj2 .yihan .fanhui").on("click",function(){
			$(".box .bj2 .yihan").hide(0);
			$(".guan").attr("src","img2/guan1.png");
			num = 0;
			num2 = 1;
			gaming = true;
			lock = true;
			sumTime = 30.00;
			numImg = 2;
			$("#warp").show(0);
			$(".gd_box").show(0);
			removeImgFun();			
			clearInterval(timer);
			clearInterval(timer2);
			clearInterval(timer3);
			start();
		});	
	}
	
	//表单验证
		var inputOFn =function(){
			$("#name").blur(function(){
				var username = $(this).val();

  				if(!/[\u4e00-\u9fa5]{2,4}/.test(username)) {   //如果没有匹配到，那么就错误
     				$("#name").val("用户名格式错误!").css("color","#fa9797");
    				 	return false;
				}else if(username ==　""){
					$("#name").val("用户名不能为空").css("color","#fa9797");
					return false;
				}else{
					return true;
				}
  						
			});
		}
		inputOFn();
		
		var inputTFn =function(){
			$("#phone").blur(function(){
				var userphone = $(this).val();
				
  				if(!/^1[3|4|5|8][0-9]\d{4,8}$/.test(userphone)) {   //如果没有匹配到，那么就错误
     				$("#phone").val("手机格式错误!").css("color","#fa9797");
    				 	return false;
				}else if(userphone ==　""){
					$("#phone").val("手机不能为空").css("color","#fa9797");
					return false;
				}else{
					return true;
				}			
			});
		}
		inputTFn();
		var subFn = function(){
			if (inputOFn() == true && inputTFn() == true) {
				return true;
			}else{
				alert("亲 填写有错误哦 不能提交");
				return false;
			}
		}
	
	
	
	

})(jQuery);