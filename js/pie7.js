




function documentReadFun(){
	// 设置模块颜色 start
	// var pieColor = ['#0086ff','#ff9f1b','#31c187','#fe6d6b', '#E958F1', '#F17558'];
	// setColors(pieColor);
	// 设置模块颜色 end

	// 设置模块显示数据 start
	// var pieData = [
	// 	{value:65, name:'直接访问'},
	// 	{value:1868, name:'邮件营销'},
	// 	{value:340, name:'联盟广告'},
	// 	{value:5377, name:'视频广告'},
	// 	{value:348, name:'抖音广告'},
	// ]
	// setSeriesData(pieData);
	// 设置模块显示数据 end
	// updateTitle("这是新标题", "");
}
/**
 * 设置数据集，例：setSeriesData([{value:335, name:'直接访问'},{value:310, name:'邮件营销'}]);
 */
function setSeriesData(data){
	// alert(JSON.stringify(data))
	option.series[0].data = data;
	option.series[0].clickable = false;
	option.series[0].label = {
		normal: {
			formatter: '{b} \n {d}% {c}',
		}
	};
	// 有主标题 2019-04-10
	if(option.title.text){
		option.title.textStyle = {
			fontSize: 14 * (scaleType || 1),
			fontWeight: 'normal',
			color: '#4a627a'
		}
	}
	option.title.top = '10';
	option.title.left = '15';

	// legend
	if(option.legend != null){
		var legends = [];
		for(var i=0;i<data.length;i++){
			legends[i] = {
				name: data[i].name,
				icon: 'rect'
			}
		}
		option.legend.data = legends;
		option.legend.x = 'center';
		option.legend.bottom  = '5';
	}
	divChart.setOption(option);
}

var option = {
	
  title: {
		sublink: 'pie7',
		left: '15',
		textStyle: {
			fontSize: 14,
			fontWeight: 'normal',
			color: '#4a627a'
		}
	},
	selectedOffset: 1,
  legend: {
		show: false,
		itemWidth : 7,// 图例宽度
		itemHeight : 7,
		textStyle: {
			fontSize: 12,
			color: '#a7bac2',
			fontFamily: 'Microsoft YaHei',
		}
	},
	tooltip : {
		trigger: 'item',
		formatter: "{a} <br/>{b} : {c} ({d}%)",
		position: ['10%', '5%']
	},
	calculable : false,
	series : [{
			name:'',
			type:'pie',
      radius : '55%',
			// roseType : 'radius',
      itemStyle:{
        normal: {
					borderWidth: '6',
					borderColor: '#ffffff',
          label: {
            textStyle: {
              fontSize: '12',
							fontFamily: 'Microsoft YaHei',
            }
          }
        }
      },
			labelLine:{
				normal:{
					show: true,
					smooth: false,
					length: 5,
					length2: 10
				}
			},
			hoverAnimation:false,
			center: ['50%', '50%'],
			data:[
				{value:1, name:''},
			]
		}
	],
	grid: {
		x: 10,	// 左
		y: 20,	// 上
		// y2: 30,	// 下
		x2: 20,	// 右
		containLabel:true
	}
};
