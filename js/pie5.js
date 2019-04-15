function documentReadFun(){
	setColors(['#259CF3','#FEB405','#F35E7A','#5AC102', '#E958F1', '#F17558']);
	// setCenterText("60套");
	// setSeriesData([{value:100, name:'70-90㎡'},{value:100, name:'90-100㎡'}]);
}
/**
 * 设置数据集，例：setSeriesData([{value:335, name:'70-90㎡'},{value:310, name:'90-100㎡'}]);
 */
function setSeriesData(data){
	for(var i=0;i<data.length;i++){
		for(var j=i;j<data.length;j++){
			if(data[i].value < data[j].value){
				var k = data[i];
				data[i] = data[j];
				data[j] = k;
			}
		}
	}
	option.series[0].data = data;
	if(option.legend != null){
		var legends = [];
		for(var i=0;i<data.length;i++){
			legends[i] = data[i].name;
		}
		option.legend.data = legends;
	}
	divChart.setOption(option);
}
function setCenterText(text){
	option.title.text = text;
	divChart.setOption(option);
}
var option = {
	title: {
		left: "center",
		top: "middle",
		text: "",
		textStyle: {
			color:'#666',
			fontSize:'25',
			fontWeight : '400'
		}
	},
	tooltip: {
		trigger: 'item',
		formatter: "{b}<br/>{d}%，{c}",
	},
	series: [
		{
			name:'',
			type:'pie',
			radius: ['80%', '98%'],
			hoverAnimation:false,
			label: {
				normal: {
					show: false
				},
				emphasis: {
					show: false
				}
			},
			startAngle: 90,
			data:[
				{value:0, name:''},
			]
		}
	]
};


