var lineColor = ['#259CF3','#FEB405','#F35E7A','#5AC102', '#E958F1', '#F17558'];
var areaColor = ['rgba(37,156,243,0.4)','rgba(254,180,5,0.4)','rgba(243,94,122,0.4)','rgba(90,193,2,0.4)','rgba(233,88,241,0.4)','rgba(241,117,88,0.4)'];
function documentReadFun(){
	// setSeriesData([{data:[10, 12, 21, 54, 260000, 830, 10], name:'直接访问'},{data:[11, 11, 21, 54, 120, 10, 117], name:'直接访问4'},{data:[101, 121, 211, 544, 20, 180, 17], name:'直接访问1'},{data:[110, 112, 211, 54, 260, 830, 710], name:'直接访问2'},{data:[30, 182, 434, 791, 390, 30, 10], name:'邮件营销'}]);
	// setXAxis(['1月','2月','3月','4月','5月']);
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
 */
function setSeriesData(data){
	var legends = [];
	var maxData = 0;
	option.series = [];
	for(var i=0;i<data.length;i++){
		option.series[i] = {};
		option.series[i].name = data[i].name;
		option.series[i].data = data[i].data;
		option.series[i].type = 'line';
		option.series[i].smooth = true;
		for(var j=0;j<data[i].data.length;j++) {
			if(maxData < data[i].data[j]) {
				maxData = data[i].data[j];
			}
		}
		if(i < lineColor.length){
			option.series[i].itemStyle = {normal: {
				areaStyle: {type: 'default',color:areaColor[i]},
				lineStyle: {type: 'default',color:lineColor[i],type: "solid"},
				color: lineColor[i]
			}};
		} else {
			option.series[i].itemStyle = {normal: {
				areaStyle: {type: 'default'},
				lineStyle: {type: 'default',type: "solid"},
			}};
		}
		legends[i] = data[i].name;
	}
	if(option.legend != null){
		option.legend.data = legends;
	} else {
		option.grid.y2 = 10;
	}
	divChart.setOption(option, true);
}

var option = {
  title: {
    text: '',
    textStyle: {
      fontSize: 18
    }
  },
	tooltip : {
		trigger: 'axis',
		axisPointer: {
			lineStyle: {
				color: "#35A3F4"
			}
		}
	},
	legend: {
		data:[],
    left : 'center',// 中间
    textStyle: {
      fontSize: 12,
     },//字号
		bottom : 8,// 图列默认底部
	},
	calculable : false,
	xAxis : [
		{
			type : 'category',
			boundaryGap : false,
			data : [],
			axisLine: {
				lineStyle: {
					color: "#999"
				}
      },
      axisLabel: {
        textStyle: {
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
    axisLabel: {
      textStyle: {
        fontSize: 12
      }
    },
		axisTick: {
			show: false
		},
		splitLine: {
			show: true,
			lineStyle: {
				color: "#eee"
			}
		}
	}],
	series : [],
	grid: {
		x: 10,	// 左
		y: 20,	// 上
		y2: 30,	// 下
		x2: 50,	// 右
		containLabel:true
	}
};
