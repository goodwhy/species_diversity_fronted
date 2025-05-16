<template>

    <div id="chart"></div>


</template>
<script setup>

import * as echarts from 'echarts'
import { onMounted } from 'vue'
onMounted(() => {
  const chartinit = echarts.init(document.getElementById('chart'))
const option = {
  title: {
    text: '空气质量检测图',
    left:90
  },
  tooltip: {
    show: true,
    trigger: 'axis',//触发类型
  },
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    boundaryGap: false,//紧挨边缘

  },
  yAxis: {
    type: 'value',
    show: false,
    scale: true,//设置y轴的刻度脱离0值比例
  },
  series: [
    {
      name: '空气质量',
      type: 'line',
      data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90],
      markPoint: {
        data: [
          { type: 'max', name: '最大值' },
          { type: 'min', name: '最小值' }
        ]
      },
      markLine: {
        data: [
          { type: 'average', name: '平均值' }
        ]
      },
      markArea: {
        data: [
          [
            {xAxis:'1月'},
            {xAxis:'3月'}
          ],
        ]
      },
      smooth: true,//设置折线图平滑
      lineStyle: {
        color: 'green',//设置折线的颜色
        type: 'solid',//设置折线的类型 dashed(虚线), dotted(点线), solid
      },//设置折线的样式
      areaStyle: {
        color: 'rgba(255, 0, 0, 0.5)'//设置折线下面的颜色
      },
      stack:'alll'


    },
    {
      name: 'PM2.5',
      type: 'line',

      data: [220, 182, 191, 234, 290, 330, 310, 120, 132, 101, 134, 90],
      stack: 'alll',
      areaStyle: {
        color: 'rgba(0, 0, 255, 0.5)'//设置折线下面的颜色
      },
    }//堆叠图，在第一个折线图的基础上加一个折线图
  ]


}
chartinit.setOption(option)

})

</script>
<style scoped>
#chart {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}
</style>
