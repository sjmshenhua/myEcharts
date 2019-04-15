

function documentReadFun(){
	setColors(['#259CF3','#FEB405','#F35E7A','#5AC102', '#E958F1', '#F17558']);
	hideMarkLine();// 默认隐藏
	//---以上是默认值---
	setTooltip('axis', 2, function(a,b,c){var d="";if(a.length){for(var i=0;i<a.length;i++){if(d!=""){d+="<br/>"}d+=(a[i].value/100).toFixed(2)+"%"}}return d});
	setY2Axis(
		{
			type: 'value',
			position: 'right',
			splitLine: {show: false},
			axisTick: {show: false},
			axisLine: {lineStyle: {color: "#ccc",width: '1'}},
		}
	);
	// setSeriesData([
	// 		{data:[2.0, 4.9, 7.0, 23.2, 25.6,2.0, 4.9, 7.0, 23.2, 25.6], name:'成交套数1', maxWidth:10, type:"bar"},
	// 		{data:[2.0, 4.9, 7.0, 23.2, 25.6,2.0, 99999, 7.0, 23.2, 25.6], name:'成交套数2', maxWidth:10, type:"bar"},
	// 		{data:[2.0, 4.9, 7.0, 23.2, 25.6,2.0, 99999, 7.0, 23.2, 25.6], name:'成交套数3', maxWidth:10, type:"bar"},
	// 		{data:[2.0, 4.9, 7.0, 23.2, 25.6,2.0, 99999, 7.0, 23.2, 25.6], name:'成交套数4', maxWidth:10, type:"bar"},
	// 		{data:[2.0, 4.9, 7.0, 23.2, 25.6,2.0, 99999, 7.0, 23.2, 25.6], name:'成交套数5', maxWidth:10, type:"bar"},
	// 		{data:[2.0, 4.9, 7.0, 23.2, 25.6,2.0, 99999, 7.0, 23.2, 25.6], name:'成交套数6', maxWidth:10, type:"bar"},
	// 		{data:[2.0, 4.9, 7.0, 23.2, 25.6,2.0, 99999, 7.0, 23.2, 25.6], name:'成交套数7', maxWidth:10, type:"bar"},
	// 		{data:[2.0, 4.9, 7.0, 23.2, 25.6,2.0, 99999, 7.0, 23.2, 25.6], name:'成交套数8', maxWidth:10, type:"bar"},
	// 		{data:[2.0, 4.9, 7.0, 23.2, 25.6,2.0, 99999, 7.0, 23.2, 25.6], name:'成交套数9', maxWidth:10, type:"bar"},
	// 		{data:[45, 76, 20, 23.2, 222,2.0, 4.9, 7.0, 23.2, 25.6], name:'成交套数3', maxWidth:10, type:"line",yAxisIndex: 1},
	// ],1);
	//	stack=分组，两个相同就堆到一根柱上面
	//	label=数值是否显示，不传：不显示，top：顶部显示，
	// setSeriesData([
	// 	{data:[2.0, 4.9, 7.0, 23.2, 25.6,2.0, 4.9, 7.0, 23.2, 25.6], name:'成交套数1', maxWidth:10, type:"bar",stack: '广告', label:'top'},
	// 	{data:[2.0, 4.9, 7.0, 23.2, 25.6,2.0, 56, 7.0, 23.2, 25.6], name:'成交套数2', maxWidth:10, type:"bar",stack: '广告', label:'top'},
  //   ]);

  //   setSeriesData([{
  //     data: [1185569.38, 916768.76, 305665, 77405.71, 3364770.11, 161821],
  //     name: '应收业绩',
  //     label: 'top'
  //   }, {
  //     data: [996372.75, 595249.15, 279089, 15363.27, 8671930.05, 75155],
  //     name: '实收业绩',
  //     label: 'top'
  //   }], 1)
	// setXScale([['1%', '2%', '3%', '4%', '5%', '6%', '7%', '8%', '9%', '10%'],['1%', '2%', '3%', '4%', '5%', '6%', '7%', '8%', '9%', '10%']]);
	// setXAxis(['高新区','成华区','锦江区','华阳','郫县','高新区1','成华区1','锦江区1','华阳1','郫县1'], 0, 5);
	// updateTitle("这是新标题", "");

	// 设置主标题和副标题 字体和颜色
	// var titleStyle = {
	// 	text: {fontSize:'13',color:'red'},
	// 	subtext: {fontSize:'12',color:'green'}
	// }
	// setTitleFont(titleStyle)
}

/**
 * 设置窗口%多少开始可以拖动
 * param:size (返回数据数组的size)
 * param:defaultSize 
 */
function setDataRoomStart(size, defaultSize){
	var end = 0;
	// 如果当前返回Data的size小于等于开始滚动的size那么就开始
	if (size <= defaultSize || 0 == defaultSize) {
		end = 100;
	} else {
		end = (defaultSize / size) * 100;
	}
	option.dataZoom = [ {
		type : 'inside',
		start : 0,
		end : end
	} ];
}

/**
 * 设置x轴名字，例：setXAxis(['1月','2月','3月','4月','5月'],5);
 * hideSplitLine:是否显示横线
 * defaultSize:当返回数据个数大于多少时滚动
 */
function setXAxis(data, hideSplitLine, defaultSize){
	option.xAxis[0].data = data;
	if(defaultSize > 0) {
		setDataRoomStart(data.length, defaultSize);
	}
	if(hideSplitLine == 1) {
		option.yAxis[0].splitLine = {};
		option.yAxis[0].splitLine.show = false;
	}
	divChart.setOption(option, true);
}

/**
 * 设置右边轴的显示
 */
function setY2Axis(data){
	option.yAxis[1] = data;
}

/**
 * 隐藏平均值横线，例：hideMarkLine();
 */
function hideMarkLine(){
	for(var i=0;i<option.series.length;i++){
		option.series[i].markLine = undefined;
	}
	markLineNormol = undefined;
	divChart.setOption(option, true);
}
/**
 * 显示平均值横线，例：showMarkLine();
 */
function showMarkLine(){
	markLineNormol = {
		data : [{type : 'average', name: '平均值'}]
	};
	for(var i=0;i<option.series.length;i++){
		option.series[i].markLine = markLineNormol;
	}
	divChart.setOption(option, true);
}
/**
 * 设置数据集，例：setSeriesData([{data:[2.0, 4.9, 7.0, 23.2, 25.6], name:'蒸发量'},{data:[2.6, 5.9, 9.0, 26.4, 28.7], name:'降水量'}]);
 */
var maxWidthSeries = -1;// 这个参数C++直接赋值
function setSeriesData(data, showLegend){
	if(showLegend == undefined) {
		showLegend = false;
	}
	var legends = [];
	var maxData = 0, yAxisIndex = 0, legendText = 0;
	option.series = [];
	for(var i=0;i<data.length;i++){
		yAxisIndex = (data[i].yAxisIndex==undefined)?0:data[i].yAxisIndex;
		option.series[i] = {};
		option.series[i].stack = data[i].stack;
		option.series[i].name = data[i].name;
		option.series[i].data = data[i].data;
		option.series[i].barMaxWidth = (maxWidthSeries>0)?maxWidthSeries:'25';
		option.series[i].type = (data[i].type==undefined)?'bar':data[i].type;
		option.series[i].yAxisIndex = yAxisIndex;
		option.series[i].barGap = "30%";
		option.series[i].barCategoryGap = "50%";
		option.series[i].markLine = markLineNormol;
		if(data[i].label != undefined && data[i].label != '') {
			option.series[i].label = {normal: {
        show: true, 
        position: data[i].label,
        textStyle: {
          fontSize: 12 * (scaleType || 1)
        }
      }};
		}
		legendText += data[i].name.length;
		legends[i] = data[i].name;
		for(var j=0;j<data[i].data.length;j++) {
			if(maxData < data[i].data[j]) {
				maxData = data[i].data[j];
			}
    }
    
	}
	if(showLegend) {
		if(!option.legend){
			option.legend = {};
		}
		option.legend.data = legends;
		var hightCount = (legendText * 18) / $(window).width();
		if (hightCount < 1) {
			hightCount = 1;
		}
	
		// 有主标题 2019-03-13
		option.grid.y = 40 * hightCount * (scaleType||1) ;
		if(option.title.text){
			option.grid.y = 75 * hightCount * (scaleType||1) ;
			option.title.top = '20';
			option.title.left = '5';
			option.title.textStyle = {
				fontSize: 14,
				fontWeight: 'normal',
				color: '#4a627a'
			}
		}
		if(legends.length > 4){
			option.grid.bottom = 60 * hightCount * (scaleType||1) ;
		}
	} else {
		option.grid.y2 = 10;
		option.legend.data = null;
	}
	divChart.setOption(option, true);
}
var markLineNormol = {
	data : [{type : 'average', name: '平均值'}]
};
var option = {
	title : {
		text: '',
    subtext: '',
    textStyle: {
      fontSize: 18
    },
		left:'10%'
	},
	legend:{
		left : 'center',// 中间
		bottom : 8,// 图列默认底部
    itemWidth : 12,// 图例宽度
    textStyle: {
      fontSize: 12,
    }, //字号
		itemHeight : 12,
	},
	tooltip : {
		trigger: 'item'
	},
	calculable : false,
	xAxis : [
		{
			type : 'category',
			boundaryGap : true,
			axisLine: {onZero: false},
			splitLine: {show: false},
      axisTick: {show: false},
      axisLabel: {
        textStyle: {
          fontSize: 12
        }
      },
			axisLine: {
				lineStyle: {
					color: "#999",
					width: '1'
				}
			},
			data: []
		}
	],
	yAxis : [
		{
			type : 'value',
			axisLine: {
				lineStyle: {
					color: "#999",
					width: '1'
				}
      },
      axisLabel: {
        textStyle: {
          fontSize: 12
        }
      },
			axisTick: {show: false},
			splitLine: {
				show: true,
				lineStyle: {
					color: "#eee"
				}
			}
		}
	],
	series : [],
	grid: {
		x: 10,	// 左
		y: 20,	// 上
		// y2: 30,	// 下
		x2: 20,	// 右
		containLabel:true
	}
};
