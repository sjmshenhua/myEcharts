
/** 配置echarts 放大系数 */
var scaleType = 1;

var divChart = null;
/**
 * 初始化完成之后就加载图表
 */
$(document).ready(function () {
	
   try {
     scaleType = document.getElementById("CCustItem").getDpiScale();
   } catch (e) {
     console.log(e);
  }
	reloadEcharts();
	try{
		documentReadFun();
	}catch(e){}
	try{
		document.getElementById("CCustItem").loadFinish();
	}catch(e){}
	// loadFinish()
	//setLineColor('#39AC6C','#CAE2D5');
	// 
	//setTitleColor('#666');
	//updateTitle('业绩走势','');
	//setXAxis(['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']);
	//setColors(['rgb(57, 172, 106)']);
	//setSeriesData([{data:[30, 182, 434, 791, 390, 30, 10], name:'邮件营销'}]);
});

/*
测试pie3时使用
interval = setInterval(aa, 100);
var index = 0;
var interval;
function aa(){
	setSeriesData(index++);
	if(index > 100){
		clearInterval(interval);
	}
}
*/

/**
 * 设置比例，例：setXScale([['1%', '2%', '3%', '4%', '5%', '6%', '7%', '8%', '9%', '10%'],['1%', '2%', '3%', '4%', '5%', '6%', '7%', '8%', '9%', '10%']]);
 */
function setXScale(data){
	try{
		for(var i=0; i < data.length; i++){
			option.series[i].scale = data[i];
		}
		divChart.setOption(option);
	} catch (e) {
		console.log(e);
	}
}

/**
 * 图表点击事件
 */
function chartClick(){
	divChart.on('click', function (params) {
		try{
			document.getElementById("CCustItem").chartOnClick(params.dataIndex, params.seriesIndex);
		} catch (e) {
			console.log(e);
		}
	});
}
/* 
* 设置legend点击事件 2019-04-05 用于bar2 柱状重新计算
*/ 
var legendArr = [];
function legendClick(){
	divChart.on('legendselectchanged', function (param) {
		for(var num = 0; num < option.series.length; num++){
			for(var conut = 0; conut < option.series[num].data.length; conut++){
				if(option.series[num].data[conut].itemStyle){
					option.series[num].data[conut].itemStyle = {};
				}
			}
		}
		if(param.selected[param.name] == false){
			option.legend.selected[param.name] = false;
			for(var i = 0; i < option.series.length;i++){
				if(option.series[i].name == param.name){
					legendArr[i] = option.series[i].data;
					option.series[i].data = [];
				}
			}
		}
		if(param.selected[param.name]){
			option.legend.selected[param.name] = true;
			for(var j = 0; j < option.series.length;j++){
				if(option.series[j].name == param.name){
				
					option.series[j].data = legendArr[j];
				}
			}
		}
		chamfer();
	});
}
/**
 * 设置图例信息，例：setLegend('left');
 */
function setLegend(x){
	if(x) {
		if(!option.legend){
			option.legend = {};
		}
		option.legend.x = x;
	}
}

/**
 * 设置提示显示格式，例：setTooltip('item', 1); axis或item
 * type：axis或item
 * formatterType：1=新增统计表使用的格式， 2=自定义，使用formatStr
 * unit：单位，默认：套
 */
function setTooltip(type, formatterType, formatStr, unit){
	if(type != 'axis' && type != 'item') {
		return;
	}
	if(unit == null || unit == undefined) {
		unit = "套";
	}
	option.tooltip.trigger = type;
	if(formatterType == 1) {
		option.tooltip.formatter = function (params, ticket, callback) {
			var result = "";
			if(params.length) {
				for (var i = 0; i < params.length; i++) {
					if(result != "") {
						result += "<br/>";
					}
					result += params[i].seriesName+"："
					+params[i].value+unit+" "
					+option.series[params[i].seriesIndex].scale[params[i].dataIndex];
				}
			} else {
				result = params.seriesName+"："
				+params.value+unit+" "
				+option.series[params.seriesIndex].scale[params.dataIndex];
			}
			return result;
		};
	} else if(formatterType == 2){
		option.tooltip.formatter = formatStr;
	} else {
		option.tooltip.formatter = null;
	}
	divChart.setOption(option);
}

/**
 * 检查对象是否为空
 */
function checkIsNull(value) {
	if (value == null || value == "" || value == undefined) {
		return true;
	}
	return false;
}
/**
 * 设置颜色序列，例：setColors(['rgb(94, 16, 16)', 'rgb(51, 28, 28)', 'rgb(0, 0, 255)']);
 */
function setColors(color){
	// alert(color)
	option.color = color;
	divChart.setOption(option);
}
/**
 * 设置背景色，例：setBgColor('rgb(255, 86, 86)');
 */
function setBgColor(rgb){
	option.backgroundColor = rgb;
	divChart.setOption(option);
}
/**
 * 没有数据提示，例：showEmptyToast('暂无数据');
 */
function showEmptyToast(text){
	$(body).prepend("<div class='emptyToast'>"+text+"</div>");
}
/**
 * 加载中选项
 */
var loadingOption = [{text:"加载数据中，请稍候...",effect:"spin"},
					{text:"加载数据中，请稍候...",effect:"bar"},
					{text:"加载数据中，请稍候...",effect:"ring"},
					{text:"加载数据中，请稍候...",effect:"whirling"},
					{text:"加载数据中，请稍候...",effect:"dynamicLine"},
					{text:"加载数据中，请稍候...",effect:"bubble"}];
/**
 * 显示加载中，参数0~5 showMask("加载中...", 0);
 */
function showMask(text, index){
	var op = {};
	if(checkIsNull(index)){
		index = 0;
	}
	if(checkIsNull(text)){
		op.text = loadingOption[index].text;
	} else {
		op.text = text;
	}
	op.effect = loadingOption[index].effect;
	divChart.showLoading(op);
}
/**
 * 关闭加载中
 */
function hideMask(){
	divChart.hideLoading();
}
/**
 * 重置图表，数据修改后调用
 */
function reloadEcharts(){
  divChart = echarts.init(document.getElementById('divChart'));

  //根据全局的配置项设置 图表的缩放比例
  resetEcharts(scaleType)

	divChart.setOption(option);
}
/**
 * 重置图表，窗口大小改变后调用
 */
function resize(){
	divChart.resize();
}
/**
 * 设置图表高宽，例：setImageSize("500px","500px");
 */
function setImageSize(width,height){
	if(!checkIsNull(width)){
		$("#divChart").css("width",width);
	}
	if(!checkIsNull(height)){
		$("#divChart").css("height",height);
	}
	resize();
}
/**
 * 修改图表标题，例：updateTitle("这是新标题", "这是新的副标题");
 */
function updateTitle(text, subtext){
	option.title.text = text;
	option.title.subtext = subtext;
	divChart.setOption(option);

}

function setTitleFont(obj){
	option.title.textStyle = {
		fontSize: obj.text.fontSize?obj.text.fontSize:'',
		color: obj.text.color?obj.text.color:'',
	}
	option.title.subtextStyle = {
		fontSize: obj.subtext.fontSize?obj.subtext.fontSize:'',
		color: obj.subtext.color?obj.subtext.color:'',
	}
	divChart.setOption(option);
}
/**
 * 刷新图表，图例选择、数据区域缩放，拖拽状态均保持
 */
function refresh(){
	divChart.refresh();
}
/**
 * 还原图表，各种状态均被清除，还原为最初展现时的状态
 */
function restore(){
	divChart.restore();
}
/**
 * 清空绘画内容，清空后实例可用
 */
function clear(){
	divChart.clear();
}
/**
 * 释放图表实例，释放后实例不再可用 
 */
function dispose(){
	divChart.dispose();
}


/**
 *  跟进 echarts 图表现有属性重置  
 * @param \{{{str}}\} {{resetSize}} {{放大系数}}{{}}
 * 
 * pie4.js 需要单独配置,因为不是用的 echart
 */
function resetEcharts(scaleType) {
  if (!scaleType) scaleType = 1;
  // let width = divChart.getWidth();
  // let height = divChart.getHeight();
  // divChart.resize({
  //   width: divChart.getWidth() * scaleType,
  //   height: divChart.getHeight() * scaleType
  // })
  //设置标题 和 图例 字体大小
  if (!!option.title && !!option.title.textStyle) {
    var baseTitleFont = 18
    if (option.title.sublink == 'pie3'){baseTitleFont =14}
    if (option.title.sublink == 'line4'){baseTitleFont = 14}
    if (option.title.sublink == 'pie7'){baseTitleFont = 14}
    if (option.title.sublink == 'bar2'){baseTitleFont = 14}
		option.title.textStyle.fontSize = baseTitleFont * scaleType; //标题
	}
  if (!!option.legend && option.legend.textStyle) {
    option.legend.textStyle.fontSize = 12 * scaleType; // 图例字体大小调整
  }

  //折线图的处理
  if (!!option.xAxis && option.title.sublink != 'line4'){
    option.xAxis[0].axisLabel.textStyle.fontSize = 12 * scaleType;  //X轴字体大小调整
    option.yAxis[0].axisLabel.textStyle.fontSize = 12 * scaleType; //X轴字体大小调整
    
  }

  //有图例的情况下要重新设置底部间距
  if (!!option.grid && !!option.grid.y2 && !!option.legend  && !!option.legend.data) {
    // option.grid.y2 = 20+  12 * (scaleType || 1)

    var legendText = 0;
    for (var i = 0; i < option.legend.data.length; i++) {
      legendText += option.legend.data[i].length;
    }
    var hightCount = (scaleType * 12 * legendText) / $(window).width();
	
    if (hightCount < 1) {
      hightCount = 1;
    } else {
      hightCount = Math.ceil(hightCount)
    }
    option.grid.y2 = 18 + 18 * hightCount * (scaleType||1);
    
  }
	
	if (option.title.sublink == 'bar2'){
		if(hightCount == undefined){
			hightCount= 1
		}
		// option.grid.y2 = 100 + 18 * hightCount * (scaleType||1)+'';
		option.grid.x2 = '300';
	}

  //折线图修改一下距离右边的距离 (仅line1需要调整)
  if (!!option.grid && !!option.grid.x2 && !!option.title && option.title.sublink =='line1') {
    option.grid.x2 = 50 * (scaleType || 1);
  }
  //饼图的处理
  if (!!option.series[0]  && option.series[0]['type'] == 'pie') {
    //pie1,pie2,
    if (!!option.series[0].itemStyle) {
      option.series[0].itemStyle.normal.label.textStyle.fontSize = 12 * scaleType
    };
    //pie3
    if (!!option.series[0].data[0].itemStyle && !!option.series[0].data[0].itemStyle.normal.label.textStyle) {
       var oldPie3Fz = option.series[0].data[0].itemStyle.normal.label.textStyle.fontSize
       option.series[0].data[0].itemStyle.normal.label.textStyle.fontSize = oldPie3Fz * scaleType
    }
  }

  //雷达图的处理
  if (!!option.radar){
    option.radar.name.textStyle.fontSize = 12 * scaleType; // 雷达图 name字体大小调
  }
  
}
