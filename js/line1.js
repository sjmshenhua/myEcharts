function documentReadFun(){
	setColors(['#259CF3','#FEB405','#F35E7A','#5AC102', '#E958F1', '#F17558']);
	hideMarkLine();
	//---以上是默认值---
	// setTooltip('item', 1);
	// setLegend('right');
	// setXAxis(['1月','2月','3月','4月','5月','6月','2017-02']);
	// setSeriesData([
	// 	{data:[10, 12, 21, 54, 260, 1000, 710], name:'直接访问', scale:['1%', '2%', '3%', '4%', '5%', '6%', '7%']},
	// 	{data:[30, 182, 434, 791, 390, 30, 10], name:'邮件营销', scale:['11%', '22%', '33%', '44%', '55%', '66%', '77%']},
	// 	{data:[10, 112, 134, 711, 310, 10, 110], name:'微信推广', scale:['111%', '222%', '333%', '444%', '555%', '666%', '777%']},
	// 	], true);
	// showMarkLine();
}
/**
 * 设置x轴名字，例：setXAxis(['1月','2月','3月','4月','5月']);
 */
function setXAxis(data){
	option.xAxis[0].data = data;
	divChart.setOption(option, true);
}
/**
 * 设置数据集，例：setSeriesData([{data:[10, 12, 21, 54, 260, 830, 710], name:'直接访问'},{data:[30, 182, 434, 791, 390, 30, 10], name:'邮件营销'}]);
 * showLegend：是否显示图例，默认显示
 */
function setSeriesData(data, showLegend){
	if(showLegend == undefined) {
		showLegend = true;
	}
	var legends = [];
	var maxData = 0;
	option.series = [];
	for(var i=0;i<data.length;i++){
		option.series[i] = {};
		option.series[i].name = data[i].name;
		option.series[i].scale = data[i].scale;
		option.series[i].type = 'line';
		option.series[i].data = data[i].data;
    option.series[i].markLine = markLineNormol;
    
		legends[i] = data[i].name;
		for(var j=0;j<data[i].data.length;j++) {
			if(maxData < data[i].data[j]) {
				maxData = data[i].data[j];
			}
		}
	}
	if(option.legend != null && showLegend){
		option.legend.data = legends;
	} else {
		option.grid.y2 = 10;
		option.legend.data = null;
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
              fontSize: 12 * (scaleType || 1)
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
var markLineNormol = {
		data : [{type : 'average', name: '平均值'}]
  };
  

var option = {
	title: {
    text: '',
    subtext:'',
    sublink: 'line1',
    textStyle: {fontSize: 18}
	},
	tooltip : {
		trigger: 'axis',
		textStyle:{fontSize: 12}
	},
	legend: {
		data:[],
    left : 'center',// 中间
    textStyle: {fontSize: 12 },
		bottom : 8,// 图列默认底部
  },
  label:{
    
  },
	grid: {
		left: '3%',
		right: '4%',
		bottom: '3%',
		containLabel: true
	},
	xAxis : [{
				type : 'category',
				boundaryGap : false,
        data : [],
				axisLine: {
					lineStyle: {
						color: "#999"
					}
        },
        axisLabel:{
          textStyle:{
            fontSize: 12
          }
        },
				splitLine: {
					show: false
				},
				axisTick: {
					show: false
				}
			}
		],
	yAxis : [{type : 'value',
		axisLine: {
			lineStyle: {
				color: "#999"
			}
		},
		axisTick: {
			show: false
    },
    axisLabel: {
      textStyle: {
        fontSize: 12
      }
    },
		splitLine: {
			show: true,
			lineStyle: {
				color: "#eee"
			}
		}
	}],
	series: [],
	grid: {
		x: 10,	// 左
		y: 35,	// 上
		y2: 18,	// 下
		x2: 50,	// 右
		containLabel:true
	}
};

