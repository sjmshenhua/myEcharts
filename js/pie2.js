function documentReadFun(){
	setColors(['#259CF3','#FEB405','#F35E7A','#5AC102', '#E958F1', '#F17558']);
	// setSeriesData([{value:100, name:'70-90㎡'},{value:100, name:'90-100㎡'}]);
}
/**
 * 设置数据集，例：setSeriesData([{value:335, name:'70-90㎡'},{value:310, name:'90-100㎡'}]);
 */
function setSeriesData(data){
	for(var i=0;i<data.length;i++){
		data[i].itemStyle = itemStyleNormol;
	}
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
var itemStyleNormolLable = {
	label: {
		formatter: "{b}\n{d}%，{c}",
		distance: 0.5,
		show: true
	}
};
var itemStyleNormol = {
	normal: itemStyleNormolLable,
	emphasis:itemStyleNormolLable
};
var option = {
	title: {
		left: "center",
		top: "middle",
		text: "",
		textStyle: {
			color:'#666',
			fontSize:'13',
			fontWeight : '400'
		}
	},
	series: [
		{
			name: "",
			type: "pie",
			radius: ['55%', '64%'],
			hoverAnimation:false,
			itemStyle: {
				normal: {
					labelLine: {
						show: false
					},
					label: {
            distance: 0,
            textStyle: {
              fontSize: '12'
            }
					}
				}
			},
			startAngle: 90,
			data: [
				{
					value: 1,
					itemStyle: itemStyleNormol,
					name: ""
				}
			]
		}
	]
};


