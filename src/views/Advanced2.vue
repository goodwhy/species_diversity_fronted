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
    text:'空气质量检测图'
  },
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '空气质量',
      type: 'line',
      data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90]
    }
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
