<template>
  <div class="advanced1">
    <div id="chart"></div>

  </div>
</template>
<script setup>
import * as echarts from 'echarts'
import { onMounted } from 'vue'
import bjs from '@/assets/json/北京.json'


onMounted(() => {


  const chart = echarts.init(document.getElementById('chart'))
  echarts.registerMap('beijing', bjs)
  const option = {
    geo: {
      map: 'beijing',
      roam: true,
      zoom: 1.2,
      label: {
        show: true,
        fontSize: 10
      },
      itemStyle: {
        areaColor: '#f0f0f0',
        borderColor: '#000',
        borderWidth: 1
      }
    }
  }
  chart.setOption(option)
})

</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.advanced1 {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#chart {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
</style>



