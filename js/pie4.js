var numAdd = 0;
var scoreNum = 0;
var rotate = 0;
var timet;
var times;



$(document).ready(function () {
	renderingCanvas();
	showScore(0);
	try{documentReadFun();}catch(e){}
	try{
		document.getElementById("CCustItem").loadFinish();
	}catch(e){}
});
function renderingCanvas(){
	var c = document.getElementById("canvasBG");
	var cxt = c.getContext("2d");
	var grd = cxt.createLinearGradient(0, 0, 0, 170);
	grd.addColorStop(0, "#F76D6E");grd.addColorStop(1, "#EF47AD");
	cxt.fillStyle = grd;
	cxt.fillRect(0, 0, 170, 170);
}
function numShow(){
	numAdd+=9;
	$(".divRating>.divTitle").html(numAdd+"<span>分<span>");
	if(scoreNum <= parseInt(numAdd)){
		$(".divRating>.divTitle").html(scoreNum+"<span>分<span>");
		clearInterval(timet);
    clearInterval(times);
    
    //基数是 60px , 字体大小 12px
    // $('.divTitle').css('font-size', (60 * scaleType) + 'px')
    // $('.divTitle span').css('font-size', (12 * scaleType) + 'px')
	}
}
function show(){
	rotate++;
	$(".divBG").css("webkitTransform","rotateZ("+rotate+"deg)");
}
function showScore(score){
	scoreNum = score;
	numAdd = 0;
	rotate = 0;
	clearInterval(timet);
	clearInterval(times);
	timet = setInterval(numShow,1);
	times = setInterval(show,1);
}


/** 配置图表的 放大系数 */
// var scaleType = 4;

function set(size) {
  document.body.style.zoom = size;
  document.body.style.cssText += '; -moz-transform: scale(' + size + ');-moz-transform-origin: 0 0; '; //
}

if (typeof scaleType != "undefined") set(scaleType || 1)
