/*
 * @file overview: find xuzheng
 * @author ZhaoZiMing
 * @version v1
 * @build 2016.03
 */

function IsPC() {
   var userAgentInfo = navigator.userAgent; //判断浏览器信息
   var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
   var flag = true;
   for (var v = 0; v < Agents.length; v++) {
       if (userAgentInfo.indexOf(Agents[v]) > 0) {
       flag = false;
       break;
       }
   }
   return flag;
}
IsPC();
if (IsPC()) {
$(".box").width(320);
$(".box").height(568);
}else{
$(".box").width(document.documentElement.clientWidth);
$(".box").height(document.documentElement.clientHeight);
}