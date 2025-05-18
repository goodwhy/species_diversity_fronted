<template>

    <div id="chart"></div>


</template>
<script setup>

import * as echarts from 'echarts'
import { onMounted, watch,ref} from 'vue'
import { useMapViewDataStore } from '@/stores/mapviewdata'
const mapviewdataStore = useMapViewDataStore()

// import { birdData, A_stationData, airQualityData } from '@/api/data.js'
// let stations = ref(2)
// let stationsdata = ref([])
// // let chartData = ref([])
// let aqidata = ref([])
// let codata = ref([])
// let o3data = ref([])//第三个
// let pm25data = ref([])
// let so2data = ref([])
// let pm10data = ref([])
// let no2data = ref([])
// const bird = async()=>{
//     const res=await birdData()
//     console.log(res.data)
// }//请求北京市各个区的鸟类数据
// const A_station = async(stations)=>{
//     const res=await A_stationData(stations.toString())
//   console.log(res.data.data)
//   stationsdata.value = res.data.data

// }//请求北京市各个区的各个站点的空气质量数据
// const airQuality = async()=>{
//     const res=await airQualityData()
//   console.log(res.data.data)//将数据从字符串切割为数组再取数组第一个数据再转为字符串

// }//请求空气质量数据
// const datachuli = () => {
//   aqidata.value = stationsdata.value.sort((a, b) => { return a.timestr - b.timestr }).map((item) => { return item.aqi })
//   o3data.value = stationsdata.value.sort((a, b) => { return a.timestr - b.timestr }).map((item) => { return item.o3.split(',')[2].toString() })
//   codata.value = stationsdata.value.sort((a, b) => { return a.timestr - b.timestr }).map((item) => { return item.o3.split(',')[1].toString() })
//   pm25data.value = stationsdata.value.sort((a, b) => { return a.timestr - b.timestr }).map((item) => { return item.o3.split(',')[1].toString() })
//   so2data.value = stationsdata.value.sort((a, b) => { return a.timestr - b.timestr }).map((item) => { return item.o3.split(',')[1].toString() })
//   pm10data.value = stationsdata.value.sort((a, b) => { return a.timestr - b.timestr }).map((item) => { return item.o3.split(',')[1].toString() })
//   no2data.value = stationsdata.value.sort((a, b) => { return a.timestr - b.timestr }).map((item) => { return item.o3.split(',')[1].toString() })
//   // console.log(o3data.value)
// }
const initcharts = () => {
  const chartinit = echarts.init(document.getElementById('chart'))
  const option = {
    title: {
      text: '空气质量检测图',
      left:90
    },
    legend: {
      data: ['aqi', 'PM2.5','PM10','NO2','CO','O3','SO2'],
      left: 'center',
      top: '0',
      textStyle: {
        color: 'black',//设置图例文字颜色
      }
    },
    tooltip: {
      show: true,
      trigger: 'axis',//触发类型
    },
    xAxis: {
      type: 'category',
      data: mapviewdataStore.timestrdata,
      boundaryGap: false,//紧挨边缘

    },
    yAxis: {
      type: 'value',
      show: true,
      scale: true,//设置y轴的刻度脱离0值比例
    },
    series: [
      {
        name: 'aqi',
        type: 'line',
        data: mapviewdataStore.aqidata,
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
        // areaStyle: {
        //   color: 'rgba(255, 0, 0, 0.5)'//设置折线下面的颜色
        // },
        // stack:'alll'


      },
      {
        name: 'PM2.5',
        type: 'line',

        data: mapviewdataStore.pm25data,
        // stack: 'alll',
        // areaStyle: {
        //   color: 'rgba(0, 0, 255, 0.5)'//设置折线下面的颜色
        // },
      },//堆叠图，在第一个折线图的基础上加一个折线图
      {
        name: 'PM10',
        type: 'line',

        data: mapviewdataStore.pm10data,
        // stack: 'alll',
        // areaStyle: {
        //   color: 'rgba(0, 0, 255, 0.5)'//设置折线下面的颜色
        // },
      },
      {
        name: 'NO2',
        type: 'line',

        data: mapviewdataStore.no2data,
        // stack: 'alll',
        // areaStyle: {
        //   color: 'rgba(0, 0, 255, 0.5)'//设置折线下面的颜色
        // },
      },
      {
        name: 'CO',
        type: 'line',

        data: mapviewdataStore.codata,
        // stack: 'alll',
        areaStyle: {
          color: 'rgba(0, 0, 255, 0.5)'//设置折线下面的颜色
        },
      },
      {
        name: 'O3',
        type: 'line',

        data: mapviewdataStore.o3data,
        // stack: 'alll',
        // areaStyle: {
        //   color: 'rgba(0, 0, 255, 0.5)'//设置折线下面的颜色
        // },
      },
      {
        name: 'SO2',
        type: 'line',

        data: mapviewdataStore.so2data,
        // stack: 'alll',
        // areaStyle: {
        //   color: 'rgba(0, 0, 255, 0.5)'//设置折线下面的颜色
        // },
      }
    ]


  }
  chartinit.setOption(option)

}
onMounted(async() => {
  mapviewdataStore.ceshi()
  console.log(mapviewdataStore.stationsdata)
  await mapviewdataStore.bird()//鸟类数据
  await mapviewdataStore.airQuality()//空气质量数据
  // console.log(stationsdata.value[0])s
  await mapviewdataStore.A_station(mapviewdataStore.stations)//一个站点的空气质量数据
  mapviewdataStore.datachuli()
  console.log(mapviewdataStore.timestrdata)
  initcharts()
  watch(mapviewdataStore.timestrdata, (newData, oldData) => {
    console.log('图表时间更新，数据更新')
    initcharts()
  }, {
    deep:true
   })



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
