
window.onresize = function(){
	resize();
}

function documentReadFun(){
	// var colorData = ["#0a8cff","#fabe7c","#31c085"];
	// setColors(colorData);
	// setColors(['#259CF3','#FEB405','#F35E7A','#5AC102', '#E958F1', '#F17558']);
	hideMarkLine();
	// 设置左侧主标题和子标题
	// updateTitle("工作量排行", "");
	//---以上是默认值---
	// setTooltip('item', 1);
	// setLegend('right');
	// setXAxis(['1月','2月','3月','4月','5月','6月','2017-02','assad']);
	// setSeriesData([
	// 	{data:[0, 0, 5, 0, 0, 0, 0], name:'直接访问', scale:['1%', '2%', '3%', '4%', '5%', '6%', '7%'], type: 'solid'},
	// 	{data:[0, 0, 6, 0, 0, 0, 0], name:'邮件营销', scale:['11%', '22%', '33%', '44%', '55%', '66%', '77%'], type: 'solid'},
	// 	{data:[0, 0, , 0, 0, 0, 0], name:'微信推广', scale:['111%', '222%', '333%', '444%', '555%', '666%', '777%'],type: 'dashed'},
	// 	], true,'%');
}
/**
 * 设置x轴名字，例：setXAxis(['1月','2月','3月','4月','5月']);
 */
function setXAxis(data){
	option.xAxis[0].data = data;
	option.xAxis[0].type = 'category';
	divChart.setOption(option, true);
}
/**
 * 设置数据集，例：setSeriesData([{data:[10, 12, 21, 54, 260, 830, 710], name:'直接访问'},{data:[30, 182, 434, 791, 390, 30, 10], name:'邮件营销'}]);
 * showLegend：是否显示图例，默认显示
 * unit y轴显示单位
 */
function setSeriesData(data, showLegend,unit){
	// alert(JSON.stringify(data))
	if(showLegend == undefined) {
		showLegend = true;
	}
	var max = 0;
	var val = 0;
	var yAxisIndex = 0, legendText = 0;
	var legends = [];
	var maxData = 0;
	option.series = [];
	var cancelLine = [];
	for(var i=0;i<data.length;i++){
		option.series[i] = {};
		option.series[i].name = data[i].name;
		option.series[i].scale = data[i].scale;
		option.series[i].symbol = 'none';
		option.series[i].type = 'line';
		val = Math.max.apply(null, data[i].data);
		if(max < val){
			max = val;
		}
		for(var j=0;j<data[i].data.length;j++) {
			if(maxData < data[i].data[j]) {
				maxData = data[i].data[j];
			}
			
		}
		cancelLine.push(maxData)

		option.series[i].data = data[i].data;
    option.series[i].markLine = markLineNormol;
    option.series[i].smooth = true;
		option.series[i].symbolSize = 0;
		option.series[i].lineStyle = {
			normal: {
				type: data[i].type
			}
		},
		legendText += data[i].name.length;
		legends[i] = data[i].name;
	}
	if(Math.max.apply(null, cancelLine) <= 0){
		for(var e=0; e < option.series.length; e++){
			for(var h=0; h<option.series[e].data.length;h++){
				if(option.series[e].data[h] == 0){
					option.series[e].data[h] = '';
				}
			}
		}
	}
		
	// 有主标题 2019-03-13
	var hightCount = (legendText * 14) / $(window).width();
	if (hightCount < 1) {
		hightCount = 1;
	}
	option.grid.top = 50 * hightCount * (scaleType||1) ;
	if(option.title.text){
		option.grid.top = 60 * hightCount * (scaleType||1) ;
		option.title.top = '10';
		option.title.left = '15';
		option.title.textStyle = {
			fontSize: 14 * (scaleType || 1),
			fontWeight: 'normal',
			color: '#4a627a'
		}
	}
	option.grid.bottom =  ifErpBox()?'50':'55';
	option.grid.y2 = 50 * hightCount * (scaleType||1) ;
	if(legends.length > 4){
		option.grid.bottom = '70';
		option.grid.y2 = 65 * hightCount * (scaleType||1) ;
	}
	if(option.legend != null && showLegend){
		option.legend.data = legends;
		option.legend.textStyle = {
			fontSize: 12,
			color: '#839fab'
		};
	
	} else {
		option.legend.data = null;
	}
	if(unit){
		option.yAxis[0].axisLabel = {
			formatter: '{value}'+unit
		}
	}
	if(unit == "%"){
	}
	max = max * 1.1;
	interval(max);
	divChart.setOption(option, true);
}

// 设置线性图区间值
function interval(val){
	val  = parseInt(val);
	if(val == 0){
		val = 1;
	}
	var sharing = ifErpBox()?3:5; 
	var maxSharing = 0;
	var valLeng = 5;


	maxSharing = Math.ceil((val/sharing)/valLeng)*valLeng;
	if(isNaN(maxSharing)){
		maxSharing = 10;
	}
	if(val < 10){
		maxSharing = Math.ceil(val/sharing);
	}
	option.yAxis[0].max = maxSharing*sharing;
	option.yAxis[0].interval = maxSharing;
	option.title.textStyle = {
		fontSize: 14 * (scaleType || 1),
		fontWeight: 'normal',
		color: '#4a627a'
	}
	divChart.setOption(option, true); 
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
		data : [{
      type : 'average', 
      name: '平均值',
      itemStyle: {
        normal: {
          label: {
            textStyle: {
              fontSize: 12
            }
          }
        }
      }
    }]
	};
	for(var i=0;i<option.series.length;i++){
		option.series[i].markLine = markLineNormol;
	}
	divChart.setOption(option, true);
}
function ifErpBox(){
	var erpMinbox = 300;	// erp切换小窗口模式
	if(document.body.clientWidth < erpMinbox){
		return true;
	}
	return false;
}


var markLineNormol = {
		data : [{type : 'average', name: '平均值'}]
  };
  

var option = {
	title: {
    text: '',
    subtext:'',
    sublink: 'line4',
    textStyle: {
			fontSize: 14,
			fontFamily: 'Microsoft YaHei',
		}
	},
	tooltip : {
		trigger: 'axis',
	},
	legend: {
		data:[],
		width: '90%',
		left : 'center',// 中间
		right: 0,
		bottom : 10,// 图列默认底部
		itemWidth : 12,// 图例宽度
		itemHeight : 10,
    textStyle: {
			fontSize: 12,
			color: '#839fab',
			fontFamily: 'Microsoft YaHei',
		},
  },
	grid: {
		top: '10',
		right: '10',
		bottom: '40',
		left: 50,
		containLabel:false
	},
	xAxis : [{
		type : 'category',
		data : [],
		axisLine: {
			show: false,
			lineStyle: {
				color: "#839fab",
				fontFamily: 'Microsoft YaHei',
			}
		},
		
		axisLabel:{
			interval:'auto',
			textStyle:{
				fontSize: 12,
				color: "#839fab",
				fontFamily: 'Microsoft YaHei',
			}
		},
		splitArea: { show:false },
		axisPointer: { show:true },
		splitLine: {
			show: false,
			lineStyle: {
				color: "#eee",
				fontFamily: 'Microsoft YaHei',
			}
		},
		axisTick: {
			show: false ,
		}
	}],
	yAxis : [{
		type : 'value',
		axisLine: {
			show: false,
			lineStyle: {
				color: "#839fab",
				fontFamily: 'Microsoft YaHei',
			}
		},
		min: 0,
		max: 5,
		axisTick: {show: false},
		axisPointer: { show:false },
    axisLabel: {
      textStyle: {
        fontSize: 12,
				fontFamily: 'Microsoft YaHei',
      }
    },
		splitLine: {
			show: true,
			lineStyle: {
				color: "#eee",
				fontFamily: 'Microsoft YaHei',
			}
		}
	}],
	series: [],
};

