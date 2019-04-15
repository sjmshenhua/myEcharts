function documentReadFun(){
	setColors(['#259CF3','#FEB405','#F35E7A','#5AC102', '#E958F1', '#F17558']);
	setSeriesData([{value:335, name:'直接访问'},{value:310, name:'邮件营销'}]);
}
/**
 * 设置数据集，例：setSeriesData([{value:335, name:'直接访问'},{value:310, name:'邮件营销'}]);
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
	divChart.setOption(option);
}

var option = {
  title: {textStyle: {fontSize: 18}},
  legend: {textStyle: {fontSize: 12 }},
	tooltip : {
		trigger: 'item',
		formatter: "{a} <br/>{b} : {c} ({d}%)"
	},
	calculable : false,
	series : [{
			name:'',
			type:'pie',
      radius : '55%',
      itemStyle:{
        normal: {
          label: {
            textStyle: {
              fontSize: '12'
            }
          }
        }
      },
			hoverAnimation:false,
			center: ['50%', '50%'],
			data:[
				{value:1, name:''},
			]
		}
	]
};
