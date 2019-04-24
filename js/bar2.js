


function documentReadFun(){

	/*	 
	 *	设置颜色方法
	 *	setColors(["red","green","#000000","#8876f6","#fea13e"]);
	*/
	legendClick();	// 添加legend 点击事件
	hideMarkLine(); // 平均值显示、隐藏  默认隐藏
	//---以上是默认值---
	// setTooltip('axis', 2, function(a,b,c){var d="";if(a.length){for(var i=0;i<a.length;i++){if(d!=""){d+="<br/>"}d+=(a[i].value/100).toFixed(2)+"%"}}return d});
	// setY2Axis({ type: 'value', position: 'right', splitLine: {show: false}, axisTick: {show: false}, axisLine: {show: false}, } );

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
 * 设置x轴名字，例：setXAxis(['1月','2月','3月','4月','5月'],5);
 * hideSplitLine:是否显示横线
 * defaultSize:当返回数据个数大于多少时滚动
 * displayMode: true 横向显示 false 纵向显示
 * unit：设置y轴显示数据单位
 */
function setXAxis(data, hideSplitLine, defaultSize,displayMode,unit){
	option.xAxis[0].data = data;
	option.xAxis[0].axisLine.lineStyle.width = 0;
	option.yAxis[0].axisLine.lineStyle.width = 0;

	option.grid.top = '50' * (scaleType || 1);
	option.grid.right = '1' * (scaleType || 1);
	option.grid.left = '57'
	
	option.grid.bottom = ifErpBox()?'50':'60';

	if(option.title.text){
		option.grid.top = '60' * (scaleType || 1);
		option.grid.right = '10' * (scaleType || 1);
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
		option.grid.top = '40' * (scaleType || 1);
		option.grid.right = '35' * (scaleType || 1);
		option.grid.bottom = ifErpBox()?'35':'50';
		
		if(option.title.text){
			option.grid.top = '75' * (scaleType || 1);
			option.grid.right = '35' * (scaleType || 1);
		}
	}
	if(defaultSize > 0) {
		setDataRoomStart(data.length, defaultSize,displayMode);
	}
	option.grid.bottom = option.grid.bottom * (scaleType || 1);
	if(hideSplitLine == 1) {
		option.yAxis[0].splitLine = {};
		option.yAxis[0].splitLine.show = false;
		option.yAxis[1].splitLine = {};
		option.yAxis[1].splitLine.show = false;
	}
	addUnti(unit)
}

/**
 * 设置数据集，例：setSeriesData([
	 {data:[2.0, 4.9, 7.0, 23.2, 25.6], name:'蒸发量'},
	 {data:[2.6, 5.9, 9.0, 26.4, 28.7], name:'降水量'}]);
 * 
 */
var maxWidthSeries = -1;// 这个参数C++直接赋值 设置柱子宽度
function setSeriesData(data,showLegend){
	if(showLegend == undefined) {
		showLegend = false;
	}
	// 默认数据展示
	if(option.xAxis[0].data.length == 0 && option.xAxis[0].type == 'category'){
		option.yAxis[0].min = 0;
		option.yAxis[0].max = ifErpBox()?3:5;
		option.grid.top = '50' * (scaleType || 1);
		option.grid.bottom = "50";
		option.grid.right = '10' * (scaleType || 1);
		option.grid.left = '57';
	}
	
	if(option.xAxis[0].data.length == 0 && option.xAxis[0].type == 'value'){
		option.xAxis[0].min = 0;
		option.xAxis[0].max = ifErpBox()?6:7;
		option.grid.bottom = "50" * (scaleType || 1);
		option.grid.right = '10' * (scaleType || 1);
		option.grid.left = '57';
	}
	if(option.yAxis[1]){
		option.grid.right = '30' * (scaleType || 1);
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
            fontSize: 12 * (scaleType || 1),
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
		
			option.title.top = '10' * (scaleType || 1);
			option.title.left = '15';
			option.title.textStyle = {
				fontSize: 14 * (scaleType || 1),
				fontWeight: 'normal',
				color: '#4a627a'
			}
		}
	
		if(legends.length >=5){
			option.grid.bottom = document.body.clientWidth < (350 * (scaleType || 1))?'70':'65';
		}
		if(legends.length >= 8){
			option.grid.bottom = document.body.clientWidth < (350 * (scaleType || 1))?'80':'75';
		}
		if(legends.length >=10){
			option.grid.bottom = document.body.clientWidth < (350 * (scaleType || 1))?'100':'90';
		}
	} else {
		option.legend.data = null;
	}
	// 判断文本显示几行 start
	if(option.xAxis[0].data != undefined && option.xAxis[0].data.length > 0){
		var maxText = 0;
		for(var num = 0; num < option.xAxis[0].data.length; num++){
			if(maxText < option.xAxis[0].data[num].length){
				maxText = option.xAxis[0].data[num].length;
			}
		}
		if(maxText > 4){
			option.grid.bottom = Number(option.grid.bottom) + 15
		}
	}
	// 判断文本显示几行 end
	option.legend.selected = selectedObj;
	divChart.setOption(option, true); 
	chamfer()
}

/*  设置窗口拖动 %多少开始可以拖动 
 *	param:size (返回数据数组的size)
 *	param:defaultSize 
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
		end : end,
	},]
	if(displayMode == true){
		option.dataZoom = [ {
			type : 'inside',
			show: false,
			start: 0,
			end: end,
			yAxisIndex: 0,
			filterMode: 'empty',
		}]; 
	}
}

// 设置y轴 右边数据
function setY2Axis(data){
	option.yAxis[1] = data;
}

// 显示平均值横线，例：showMarkLine();
var markLineNormol = { data : [{type : 'average', name: '平均值'}] };
function showMarkLine(){
	markLineNormol = {
		data : [{type : 'average', name: '平均值'}]
	};
	for(var i=0;i<option.series.length;i++){
		option.series[i].markLine = markLineNormol;
	}
	divChart.setOption(option, true);
}

// 隐藏平均值横线，例：hideMarkLine();
function hideMarkLine(){
	for(var i=0;i<option.series.length;i++){
		option.series[i].markLine = undefined;
	}
	markLineNormol = undefined;
	divChart.setOption(option, true);
}

// x轴、y轴 显示文字换行
function textLineFeed(value){
	var letterCount = 8;	// 总共显示多少字
	var ret = "";//拼接加\n返回的类目项
	var maxLength = 4;//每项显示文字个数
	var regNumber = /\d+/;
	if(value.indexOf('-')>=0 && regNumber.test(value)){
		return value
	}
	if(value.indexOf('.')>=0 && regNumber.test(value)){
		return value
	}
	value = value.replace(/[\r\n]/g,"").trim().substr(0,letterCount)
	var valLength = value.length;//X轴类目项的文字个数
	var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
	if (rowN > 1) { //如果类目项的文字大于3,
		for (var i = 0; i < rowN; i++) {
			var temp = "";//每次截取的字符串
			var start = i * maxLength;//开始截取的位置
			var end = start + maxLength;//结束截取的位置
			//这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
			temp = value.substring(start, end) + "\n";
			ret += temp; //凭借最终的字符串
		}
		return ret;
	}else {
		return value;
	}
}

// x轴、y轴 数据单位设置
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
					return textLineFeed(value,index)
				},
				width: 50,
				lineHeight: 16,
			}
		
	}
	// 横向显示
	if(option.yAxis[0].data != undefined && option.yAxis[0].data.length > 0){
		option.xAxis[0].axisLabel = {
			formatter: function(value,index){
				return value + unit
			},
		}
		
		option.yAxis[0].axisLabel = {
			formatter: function(value,index){
				return textLineFeed(value,index)
			},
			width: 50,
			lineHeight: 16,
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

// 设置均等值
function interval(val){
	val  = parseInt(val);
	
	if(val == 0){
		val = 0;
	}

	var maxSharing = 0;		// 平均值
	var valLeng = 5;
	// sharing 等份显示 纵向5等份 横向8等份
	var sharing = ifErpBox()?3:5;  //横向
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
		sharing = ifErpBox()?3:5
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
	if(maxSharing == 0){
		maxSharing = 1;
	}
	// 纵向显示
	if(option.xAxis[0].data != undefined && option.xAxis[0].data.length > 0){
		option.yAxis[0].max = maxSharing*sharing;
		option.yAxis[0].interval = maxSharing;

		if(option.yAxis[0].max == 0){
			option.yAxis[0].min = 0;
			option.yAxis[0].max = 1*sharing;
		}
	}

	// 横向显示
	if(option.yAxis[0].data != undefined && option.yAxis[0].data.length > 0){
		option.xAxis[0].max = maxSharing*sharing;
		option.xAxis[0].interval = maxSharing;
		if(val > 5000){
			option.xAxis[0].axisLabel.interval = 1
		}
		if(option.xAxis[0].max == 0){
			option.xAxis[0].min = 0;
			option.xAxis[0].max = 1*sharing;
		}
	}

	option.title.textStyle = {
		fontSize: 14 * (scaleType || 1),
		fontWeight: 'normal',
		color: '#4a627a'
	}

	option.legend.textStyle = {
		fontSize: 12 * (scaleType || 1),
		color: '#839fab',
		fontFamily: 'Microsoft YaHei',
	}

	divChart.setOption(option, true); 
}

// 判断是否最小窗口
function ifErpBox(){
	var erpMinbox = 340;	// erp切换小窗口模式
	if(document.body.clientWidth < erpMinbox){
		return true;
	}
	return false;
}



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
		containLabel: false
	},
	tooltip : {
		trigger: 'item'
	},
	calculable : false,
	xAxis : [
		{
			type : 'category',
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
