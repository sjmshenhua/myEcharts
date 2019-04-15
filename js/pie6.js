
// window.onresize = function(){
// 	resize();
// }
function documentReadFun(){

	// 设置title 1主标题 2副标题
	// setCenterText("874","房源总量");


	// 设置圆弧颜色
  // var colorData = ['#008aff','#31c085','#fea13a','#8876f6', '#E958F1', '#F17558']; //渐变颜色
	// setColors(colorData);
	// 设置显示数据
  // var data = [
  //   {name: "李四", value: 30,total: 30},
  //   {name: "王五", value: 30,total: 30},
  //   {name: "赵六", value: 5,total: 30},
  //   {name: "陈七", value: 30,total: 30},
  //   {name: "朱八", value: 30,total: 30},
  // ]
	// setSeriesData(data);
}

/**
 * 设置数据集，例：setSeriesData([{value:335, name:'70-90㎡'},{value:310, name:'90-100㎡'}]);
 */
function setSeriesData(data){
	data.unshift({name: "", value: 0,total: 0},{name: "", value: 0,total: 0},{name: "", value: 0,total: 0})

	// 设置显示数据series
	option.series[0] = {};
	option.series[0].type = 'bar';
	option.series[0].coordinateSystem = 'polar';
	option.series[0].data = data;
	option.series[0].barBorderRadius = [20,20,20,20];
	option.series[0].barWidth =	6;
	option.series[0].radius =	['20','90%'];
	option.series[0].roseType =	'area';
	option.series[0].itemStyle = {
		normal: {
			color: function(params) { 
				return option.color.length>0?option.color[params.dataIndex]: []
			},
			barBorderRadius: 10
		},
	};

	option.polar = {
		show:true,
		radius:'90%', 
	},
	// 设置angleAxis：
	option.angleAxis = {
		show: false,
		interval: 20,
		polarIndex: [0],
		min: function(value) {
			return value.min >= 1 ? value.min - value.max / 3 : 0;
		},
		max: function(value) {
			var max = 0;
			for( var i=0; i<data.length; i++ ) {  
				(function(){  
					max = Number(data[i].total)
				})(i);//调用时参数  
			} 
			// return max * 4 / 3;
			return value.max * 4 / 3;
		},
		axisLine:{
			symbolSize: [12,20]
		},
	}
	
	
	option.radiusAxis = {
		type: 'category',
		maxInterval: 20,
		nameLocation: 'end',
		z: 2,
		interval:20,
		axisLabel: {
			interval: 0,
			color: "#839fab",
			fontSize: 12,
			fontFamily: 'Microsoft YaHei',
		},
		axisLine: {
			show: false
		},
		axisTick: {
			show: false,
			alignWithLabel: true
		},

		// 中线
		splitLine: {
			show: true,
			lineStyle: {
				color: ['#ffffff','#ffffff','#ffffff','#f3f5f6','#f3f5f6','#f3f5f6','#f3f5f6','#f3f5f6','#f3f5f6','#f3f5f6','#f3f5f6','#f3f5f6'],
				width: '1'
			}
		},
		data: data.map(function(item){
			var itemVal = '';
			var val = Math.round(item.value / item.total * 10000) / 100.00
			if(isNaN(val)){
				val = 0
			}
			if(item.name){
				itemVal = item.name+'  '+val+"%"
			}
			return itemVal;
		}),
	},

	divChart.setOption(option);
}

// 设置主标题和副标及样式
function setCenterText(text,subtext){
	// 主标题
	option.title.text = text;
	option.title.top = "35%";
	option.title.itemGap = 5;
	option.title.textStyle = {
		color: '#285aaf',
		fontWeight: 'bold',
		fontSize: 18,
		lineHeight: 32,
		fontFamily: 'Microsoft YaHei',
	};
	// 副标题
	option.title.subtext = subtext;
	option.title.subtextStyle = {
		color: '#506070',
		fontWeight: 'normal',
		fontSize: 14,
		lineHeight: 14,
		fontFamily: 'Microsoft YaHei',
	};
	divChart.setOption(option);
}

var option = {
	color: ['#008aff','#31c085','#fea13a','#8876f6', '#E958F1', '#F17558'],
	title: {
		left: "center",
		top: "middle",
		text: "",
	},
	legendHoverLink: false,
	hoverAnimation: false,
	itemStyle: {
	},
	series: [],
	grid: {
		left: 10,
		right: 10,
		top: 10,
		bottom: 10,
		containLabel:true
	}
};

