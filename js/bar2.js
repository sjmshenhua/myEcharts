


// window.onresize = function(){

// }
function documentReadFun(){
  // var colorData = ["red","green","#000000","#8876f6","#fea13e"];
  // var colorData = ["#70BAFF","#8876f6","#ff8a34","#ffa128","#ffc703","#0084ff","#70baff" ]; //渐变颜色
	// setColors(colorData);
	legendClick();	// 添加legend 点击事件
	hideMarkLine(); // 平均值显示、隐藏  默认隐藏
	//---以上是默认值---
	// setTooltip('axis', 2, function(a,b,c){var d="";if(a.length){for(var i=0;i<a.length;i++){if(d!=""){d+="<br/>"}d+=(a[i].value/100).toFixed(2)+"%"}}return d});
	// setY2Axis(
	// 	{
	// 		type: 'value',
	// 		position: 'right',
	// 		splitLine: {show: false},
	// 		axisTick: {show: false},
	// 		axisLine: {show: false},
	// 	}
	// );

  // 动态修改数据 data 是对象 data柱状显示数据 label=数值是否显示，不传：不显示，top：顶部显示，

	// 横向柱状图 stack=分组，两个相同就堆到一根柱上面
	// var data = [
	// 	{data:[3, 0,0,5], name:'其他', maxWidth:10, type:"bar",stack: '其他',color:'#fe8606'},
	// 	{data:[50, 7,5,7], name:'三大', maxWidth:10, type:"bar",stack: '其他', color:'#fe8606'},
	// 	{data:[3.0, 3,6,10], name:'三大的', maxWidth:10, type:"bar",stack: '广告',color:'#fe8606'},
	// 	{data:[4.0, 9,0,56], name:'是大法', maxWidth:10, type:"bar",stack: '广告',olor:'#fe8606'},
	// 	{data:[4.0, 1,0,56], name:'是法', maxWidth:10, type:"bar",stack: '广告',olor:'#fe8606'},
	// 	{data:[4.0, 9,0,56], name:'是官的', maxWidth:10, type:"bar",stack: '广告',olor:'#fe8606'},
	// ]

	//  setSeriesData([{data:[0,0,0,0],name:'房增'},{data:[0,0,0,0],name:'客增'},{data:[4,0,0,0],name:'房勘'},{data:[26,0,0,0],name:'带看'}],1)
	// 横向文字展示
	// var data = [
	// 	{data:[{name:'房',value:00},{name:'客',value:50,}], name:'成交套数1：', maxWidth:10, type:"bar", stack: '广告',label:'top'},
	// 	{data:[{name:'房',value:30},{name:'客',value:40}], name:'成交套数2：', maxWidth:10, type:"bar",stack: '广告',label:'top'},
	// 	{data:[{name:'房',value:40},{name:'客',value:30}], name:'成交套数3：', maxWidth:10, type:"bar",stack: '广告',label:'top'},
	// 	{data:[{name:'房',value:50},{name:'客',value:0}], name:'成交套数4：', maxWidth:10, type:"bar",stack: '广告',label:'top'},
	// 	// {data:[{name:'房',value:100},{name:'客',value:20}], name:'业绩', maxWidth:10, type:"line",stack: '业绩',label:'top',yAxisIndex: 1,unit:'%'},
	// ]

	// 纵向柱状图 
	// var data = [
	// 	{ data: [1, 20, 20, 1,], name: '应收业绩sad', color:'#fe8606',}, 
	// 	{ data: [1, 2, 20, 1,], name: '实收业绩', color:'#fe8606',},
	// 	{ data: [1, 2, 5, 20,], name: '实', color:'#fe8606',}, 
	// 	{ data: [1, 2, 8, 20,], name: '德撒价', color:'#fe8606',},
	// 	{ data: [1, 2, 4, 20,], name: '实多所的', color:'#fe8606',},
	// ]

	// 设置左侧主标题和子标题
	// updateTitle("工作量排行", "");

	// 设置比例
	// setXScale([['1%', '2%', '3%', '4%', '5%', '6%', '7%', '8%', '9%', '10%'],['1%', '2%', '3%', '4%', '5%', '6%', '7%', '8%', '9%', '[10%']]);
	// 设置柱状图显示数据
	// setSeriesData(data,1);
	// 设置X轴显示数据
	// setXAxis(['应收业绩','实收业绩','实收'], 3, 5,true,'%');
	

}

/**
 * 设置窗口%多少开始可以拖动
 * param:size (返回数据数组的size)
 * param:defaultSize 
 */
function setDataRoomStart(size, defaultSize,displayMode){
	var end = 0;
	// 如果当前返回Data的size小于等于开始滚动的size那么就开始
	if (size <= defaultSize || 0 == defaultSize) {
		end = 100;
	} else {
		end = (defaultSize / size) * 100;
	}
	option.dataZoom = [{
		type : 'inside',
		start: 0,
		end : end
	},]
	if(displayMode == true){
		option.dataZoom = [ {
			type : 'inside',
			show: false,
			start: 0,
			end: 100,
			yAxisIndex: 0,
			filterMode: 'empty',
			// startValue: (size > 100 ?  parseInt((40/44)*size) : parseInt((40/117)*size)),
		}]; 
	}
}

/**
 * 设置x轴名字，例：setXAxis(['1月','2月','3月','4月','5月'],5);
 * hideSplitLine:是否显示横线
 * defaultSize:当返回数据个数大于多少时滚动
 * displayMode: true 横向显示 false 纵向显示
 * unit：设置y轴显示数据单位
 */
function setXAxis(data, hideSplitLine, defaultSize,displayMode,unit){
	// 默认数据展示
	if(data.length == 0){	
		option.yAxis[0].splitNumber = 5;
		option.yAxis[0].minInterval = 20;
		option.yAxis[0].min = 0;
		option.yAxis[0].interval = 1;
		option.yAxis[0].max = ifErpBox()?3:5;
	}
	// 文本超出4个字 省略2019-04-08
	// for(var i = 0; i < data.length; i++){
	// 	data[i] = data[i].length>4?data[i].trim().substr(0,4):data[i];
	// }
	option.xAxis[0].data = data;
	option.xAxis[0].axisLine.lineStyle.width = 0;
	option.yAxis[0].axisLine.lineStyle.width = 0;

	option.grid.top = '50';
	option.grid.right = '10';
	option.grid.left = 50
	// if(option.title.text == '工作量排行'){
	// 	option.grid.left = option.title.text.indexOf('工作量')>=0?20:10
	// }
	
	option.grid.bottom = ifErpBox()?'50':'55';
	if(option.title.text){
		option.grid.top = '60';
		option.grid.right = '10';
	}
	// 2019-03-08 添加是否横向显示图表
	if(displayMode != undefined && displayMode){
		option.xAxis[0].data = [];
		option.yAxis[0].data = data;
		option.xAxis[0].type = "value";
		option.xAxis[0].position = "top";
		
		option.yAxis[0].type = "category";
		option.yAxis[0].inverse = true;
		option.xAxis[0].splitLine.show = true;
		option.yAxis[0].splitLine.show = false;
		option.grid.top = '40';
		option.grid.right = '25';
		// option.yAxis[0].axisLabel = {
		// 	formatter: function(value,index){
		// 		return '{value|' + value + '}';
		// 	},
		// 	width: 50,
		// 	backgroundColor: 'red',
		// 	rich: {
		// 		value: {
		// 			lineHeight: 30,
		// 			align: 'right',
		// 		},
		// 	}
		// }
		// option.grid.left = '20'
		// option.grid.left = document.body.clientWidth>500?'-30':'-15';
		
		// if(option.title.text == '业绩来源分布'){
		// 	option.grid.left = option.title.text.indexOf('业绩来源')>=0?'-30':'-15'
		// }
		// if(option.title.text == '成交边数分析'){
		// 	option.grid.left = option.title.text.indexOf('成交边数')>=0?'-30':'-15'
		// }
		
		// 没有标题
		// if(data.length < 1){
		// 	option.grid.left = '20';
		// }
		option.grid.bottom = ifErpBox()?'35':'50';
		if(option.title.text){
			option.grid.top = '75';
			option.grid.right = '25';
		}
	}
	if(defaultSize > 0) {
		setDataRoomStart(data.length, defaultSize,displayMode);
	}

	if(hideSplitLine == 1) {
		option.yAxis[0].splitLine = {};
		option.yAxis[0].splitLine.show = false;
		option.yAxis[1].splitLine = {};
		option.yAxis[1].splitLine.show = false;
	}
	addUnti(unit)
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
 * 
 */
var maxWidthSeries = -1;// 这个参数C++直接赋值 设置柱子宽度
function setSeriesData(data,showLegend){

	if(showLegend == undefined) {
		showLegend = false;
	}
 
	var legends = [];
	var selectedObj = {}
	var maxData = 0, yAxisIndex = 0, legendText = 0;
	option.series = [];
	for(var i=0;i<data.length;i++){
		yAxisIndex = (data[i].yAxisIndex==undefined)?0:data[i].yAxisIndex;
		option.series[i] = {};
		option.series[i].legendHoverLink  = false;
		option.series[i].stack = data[i].stack?data[i].stack:'';
		option.series[i].name = data[i].name;
		option.series[i].data = data[i].data;
		option.series[i].barMaxWidth = (maxWidthSeries>0)?maxWidthSeries:'25';
		option.series[i].type = (data[i].type==undefined)?'bar':data[i].type;
		option.series[i].yAxisIndex = yAxisIndex;
		option.series[i].markLine = markLineNormol;
		if(data[i].label != undefined && data[i].label != '') {
			option.series[i].label = {
        normal: {
          show: true, 
          position: data[i].label,
					formatter: function(params){ 
						var str = '';
						if(params.data.value > 0){
							str =  (params.data.name?params.data.name+':':'')+(params.data.value?params.data.value:'')
						}
						return str
					},
          textStyle: {
            fontSize: 12,
						color: data[i].color?data[i].color:'#6a7c8f',
						
          }
        },
      };
		}
		
		selectedObj[data[i].name] = true;
		legendText += data[i].name.length;
		var iconType = "rect";
		var yUnit = data[i].unit?data[i].unit:'';
		// 柱状图上面的折线
		if(data[i].type == 'line'){
			iconType = ''
			option.yAxis[1].axisLabel = {
				formatter: '{value}'+ yUnit
			};
		}
		legends[i] = {
			name: data[i].name,
			icon: iconType
		} 
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
		var hightCount = (legendText * 14) / $(window).width();
		if (hightCount < 1) {
			hightCount = 1;
		}
	
		// 有主标题 2019-03-13
		if(option.title.text){
		
			option.title.top = '10';
			option.title.left = '15';
			option.title.textStyle = {
				fontSize: 14 * (scaleType || 1),
				fontWeight: 'normal',
				color: '#4a627a'
			}
		}
		if(legends.length >=5){
			option.grid.bottom = document.body.clientWidth < 350?'70':'60';
		}
		if(legends.length >=11){
			option.grid.bottom = document.body.clientWidth < 350?'85':'60';
		}

	
	} else {
		option.legend.data = null;
	}
	option.legend.selected = selectedObj;
	divChart.setOption(option, true); 
	chamfer()
}
// x或者y轴设置单位
function addUnti(unit){
	option.title.unit = unit?unit:'';
	unit = unit ? unit : ''
	// 纵向显示
	if(option.xAxis[0].data != undefined && option.xAxis[0].data.length > 0){
			option.yAxis[0].axisLabel = {
				formatter: function(value,index){
					return value+ unit
				},
			}

			option.xAxis[0].axisLabel = {
				formatter: function(value,index){
					return '{c|' + value.replace(/[\r\n]/g,"").trim().substr(0,4) + '}'
				},
				rich: {
					c: {
						align: 'right',
					},
				}
			}
		
	}
	// 横向显示
	if(option.yAxis[0].data != undefined && option.yAxis[0].data.length > 0){
		option.xAxis[0].axisLabel = {
			formatter: function(value,index){
				return value+ unit
			},
		}
		option.yAxis[0].axisLabel = {
			formatter: function(value,index){
				return '{c|' + value.replace(/[\r\n]/g,"").trim().substr(0,4) + '}';
			},
			width: 60,
			rich: {
				c: {
					lineHeight: 30,
					align: 'right',
				},
			}
		}
	}
}
// 倒角
function chamfer(){
	var chamfers = [0,30,30,0];
	var data = option.series;
	// 计算单个柱子中总和最大值
	var max = 0;
	var val = 0;
	if(option.xAxis[0].data != undefined && option.xAxis[0].data.length > 0){
		chamfers = [30,30,0,0]
	}
	
	var newMap = {};
	var titles = [];
	// 将series数据分类
	for(var index = 0; index < data.length; index++){
		if(!!newMap[data[index].stack]){
			newMap[data[index].stack].push(data[index])
			continue;
		}
		newMap[data[index].stack] = [data[index]]
	}
	
	// 获取显示数组柱子多少
	if(option.xAxis[0].data != undefined && option.xAxis[0].data.length>0){
		titles = option.xAxis[0].data
	}
	if(option.yAxis[0].data != undefined && option.yAxis[0].data.length>0){
		titles = option.yAxis[0].data
	}
	// 判断是否是堆积柱状图
	
	if(data[0].stack){
		
		for(var key in newMap){
			if(newMap[key] == undefined) continue;
			for(var i = 0; i < titles.length; i++){
				var isAddFillet = true
				for(var j = newMap[key].length-1; j >= 0; j--){
					if(newMap[key][j].data[i] !== undefined && newMap[key][j].data[i].value == undefined){
						var barVal = newMap[key][j].data[i]==null?0:newMap[key][j].data[i];
						newMap[key][j].data[i] = {value: barVal}
					}	
					if(newMap[key][j].data[i] !== undefined){
						val += (newMap[key][j].data[i].value || 0)
					}
					if(newMap[key][j].data[i] != undefined && newMap[key][j].data[i].value > 0 && isAddFillet){
						newMap[key][j].data[i].itemStyle = {
							normal: {
								barBorderRadius: chamfers
							}
						}
						isAddFillet = false
					}
				}
				if(max<val){
					max = val
				}
				val = 0;
				
			}
		}
		max = max*1.1
		interval(max)
		return;
	}	
	
	for(var key in newMap){
		for(var e = 0; e < newMap[key].length; e++){
			for(var f = 0; f < newMap[key][e].data.length; f++){
				val = newMap[key][e].data[f] == undefined?0:newMap[key][e].data[f] ;
				if(max < val){
					max = val
				}
			}
		}
	}
	singleColumn();
	max = max*1.1
	interval(max);
}
// 设置均等值
function interval(val){
	val  = parseInt(val);
	if(val == 0){
		val = 5;
	}
	var maxSharing = 0;		// 平均值
	var valLeng = 5;
	// sharing 等份显示 纵向5等份 横向8等份
	var sharing = ifErpBox()?3:5; 
	if(option.yAxis[0].data != undefined && option.yAxis[0].data.length > 0){
		sharing = ifErpBox()?6:7;
	}
	if(option.title.unit == '%' && Math.ceil(val/1.1) <= 100){

		if(val > 100){
			val = 100;
		}
		if(val < 10){
			val = 10;
		}
		sharing = 5
		val = Math.ceil(val/10)*10
	}
	maxSharing = Math.ceil(val/sharing);
	if(val > 10){
		maxSharing = Math.ceil((val/sharing)/valLeng)*valLeng;
	}
	// 是否NaN
	if(isNaN(maxSharing)){
		maxSharing = 10;
	}

	// 纵向显示
	if(option.xAxis[0].data != undefined && option.xAxis[0].data.length > 0){
		option.yAxis[0].max = maxSharing*sharing;
		option.yAxis[0].interval = maxSharing;
	}

	// 横向显示
	if(option.yAxis[0].data != undefined && option.yAxis[0].data.length > 0){
		option.xAxis[0].max = maxSharing*sharing;
		option.xAxis[0].interval = maxSharing;
	}

	option.title.textStyle = {
		fontSize: 14 * (scaleType || 1),
		fontWeight: 'normal',
		color: '#4a627a'
	}
	// var legendFontSize = ifErpBox()?10: 12;
	var legendFontSize = 12;
	option.legend.textStyle = {
		fontSize: legendFontSize,
		color: '#839fab',
		fontFamily: 'Microsoft YaHei',
	}
	
	divChart.setOption(option, true); 
}
// 单柱体倒角
function singleColumn(max){
	// 单个柱状
	for(var i = 0; i < option.series.length; i++){
		for(var j = 0; j < option.series[i].data.length; j++){
			if(option.series[i].data[j] == null || option.series[i].data[j] == undefined){
				option.series[i].data[j] = 0
			}
		}
		// 单柱
		if(option.xAxis[0].type=='value'){
			option.series[i].itemStyle = {
				normal:{
					barBorderRadius: [0,30,30,0],
				}
	
			};
		}else{
			option.series[i].itemStyle = {
				normal:{
					barBorderRadius: [30,30,0,0],
				}
			};
		}
	}
}
// 判断是否最小窗口
function ifErpBox(){
	var erpMinbox = 340;	// erp切换小窗口模式
	if(document.body.clientWidth < erpMinbox){
		return true;
	}
	return false;
}
var markLineNormol = {
	data : [{type : 'average', name: '平均值'}]
};

var option = {
	title : {
		text: '',
		sublink: 'bar2',
		textStyle:{
			fontFamily: 'Microsoft YaHei',
		},
    subtext: '',
	},
	legend:{
		// type: 'scroll',
		// orient: 'horizontal',
		pagemode: true,
		width: '95%',
		left : 'center',// 中间
		right: 0,
		bottom : 10,// 图列默认底部
    itemWidth : 7,// 图例宽度
		itemHeight : 7,
		selectedMode:true,
    textStyle: {
      fontSize: 12,
			color: '#839fab',
			fontFamily: 'Microsoft YaHei',
    }, //字号
	},
	grid: {
		top: '10',
		right: '10',
		bottom: '10',
		containLabel:false
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
			splitLine: {
				show: false,
				lineStyle: {
					color: "#eee"
				}
			},
      axisTick: {show: false},
      axisLabel: {
        textStyle: {
          fontSize: 12,
					color: '#839fab',
					fontFamily: 'Microsoft YaHei',
        }
      },
	
			axisLine: {
				lineStyle: {
					color: "#839fab",
					width: '1',
					fontFamily: 'Microsoft YaHei',
				}
			},
			axisPointer: {
				show:false
			},
			data: []
		}
	],
	yAxis : [
		{
			type : 'value',
			axisLine: {
				lineStyle: {
					color: "#839fab",
					width: '1',
					fontFamily: 'Microsoft YaHei',
				}
      },
      axisLabel: {
        textStyle: {
          fontSize: 12,
					color: '#839fab',
					fontFamily: 'Microsoft YaHei',
        }
      },
			axisTick: {show: false},
			axisPointer: { show:false },
			splitLine: {
				show: true,
				lineStyle: {
					color: "#eee",
					fontFamily: 'Microsoft YaHei',
				}
			}
		}
	],
	series : [],
};
