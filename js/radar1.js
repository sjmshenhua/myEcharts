
/**
 * 设置数据集，例：setSeriesData([{value:[4300, 10000, 28000, 35000, 50000, 19000], name:'预算分配'},{value:[5000, 14000, 28000, 31000, 42000, 21000], name:'实际开销'}]);
 */
function setSeriesData(data){
	option.series[0].data = data;
	if(option.legend != null){
		var legends = [];
		for(var i=0;i<data.length;i++){
			legends[i] = data[i].name;
		}
		option.legend.data = legends;
	}
}
/**
 * 设置雷达图的指示器，例：setRadarIndicator([{name:'销售'},{name:'管理'},{name:'信息技术'},{name:'客服'},{name:'研发'},{name:'市场'}]);
 */
function setRadarIndicator(data){
	option.radar.indicator = data;
}

var option = {
	title: {
    text: '基础雷达图',
    textStyle:{
      fontSize:18
    }
	},
	tooltip: {},
	legend: {
    right:'5%',
    textStyle:{
      fontSize :12 // [ default: 12 ]
    },
		data: ['预算分配', '实际开销']
	},
	radar: {
    name:{
      textStyle:{
        fontSize: 12,
      }
    },
		indicator: [
      { name: '销售', max: 6500,},
			{ name: '管理', max: 16000},
			{ name: '信息技术', max: 30000},
			{ name: '客服', max: 38000},
			{ name: '研发', max: 52000},
			{ name: '市场', max: 25000}
		]
	},
	series: [{
    type: 'radar',
		data : [
			{
				value : [4300, 10000, 28000, 35000, 50000, 19000],
				name : '预算分配'
			},
			{
				value : [5000, 14000, 28000, 31000, 42000, 21000],
				name : '实际开销'
			}
		]
	}]
};

