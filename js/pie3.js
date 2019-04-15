function documentReadFun(){
	//setSeriesData(10);
}
/**
 * 设置数据集，例：setSeriesData(10); 参数范围：0-100
 */
function setSeriesData(data){
	if(data > 100){data = 100;}
	itemStyleCenterTextLable.label.formatter = data+'%';
	option.series[0].data[1].value = data;
	option.series[0].data[2].value = 100 - data;
	divChart.setOption(option, true);
}
/**
 * 设置线条颜色，setLineColor('#58BDE4','#C9EAF6');
 */
function setLineColor(color,colorShallow){
	option.title.textStyle.color = color;
	t_color.color = color;
	t_color_shallow.color = colorShallow;
	divChart.setOption(option, true);
}

/**
 * 设置底部标题，例：setTitleColor('#666');
 */
function setTitleColor(color){
	option.title.textStyle.color = color;
	divChart.setOption(option, true);
}
var t_color = {color:'#259cf3',fontSize:'25',baseline : 'middle',labelLine : {show : false}};
var t_color_shallow = {color:'#bee1fb',labelLine : {show : false}};

var itemStyleCenterTextLable={
	label : {
		show : true,
		position : 'center',
		formatter : '0%',
		textStyle: t_color
	},
	labelLine : {show : false}
};

var option = {
	title:{
		bottom:'5%',
		left:'center',
		show:true,
    text:'',
    subtext: '',
    sublink: 'pie3',
		textStyle:{fontSize:'12',color:t_color.color,fontWeight : '300'}
	},
	series: [
		{
			name: "",
			type: "pie",
			radius: ['70%', '75%'],
      hoverAnimation:false,
      itemStyle: {
        normal: {
          label: {
            textStyle: {
              fontSize: '12'
            }
          }
        }
      },
			data: [{
					value: 0,
					itemStyle : {
						normal : itemStyleCenterTextLable,
						emphasis:itemStyleCenterTextLable
					}
				},
				{
					value: 0,
					itemStyle:{
						normal:t_color,
						emphasis:t_color
					}
				},
				{
					value: 100,
					itemStyle:{
						normal:t_color_shallow,
						emphasis:t_color_shallow,
					}
				}
			]
		}
	]
};

