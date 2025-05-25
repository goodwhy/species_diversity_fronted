import { defineStore } from "pinia";
import { ref } from 'vue'
import { birdData, A_stationData, airQualityData } from '@/api/data.js'
export const useMapViewDataStore = defineStore('mapviewdata', () => {
  let Pointdata = ref([])
  let stations = ref(2)
  let stationsdata = ref([])
// let chartData = ref([])
  let aqidata = ref([])
  let codata = ref([])
  let o3data = ref([])//第三个
  let pm25data = ref([])
  let so2data = ref([])
  let pm10data = ref([])
  let no2data = ref([])
  let timestrdata = ref([])
  const bird = async()=>{
    const res=await birdData()
    console.log(res.data)
}//请求北京市各个区的鸟类数据
const A_station = async(stations)=>{
    const res=await A_stationData(stations.toString())
  console.log(res.data.data)
  stationsdata.value = res.data.data

}//请求北京市各个区的各个站点的空气质量数据
const airQuality = async()=>{
    const res=await airQualityData()
  console.log(res.data.data)//将数据从字符串切割为数组再取数组第一个数据再转为字符串
  Pointdata.value = res.data.data

  }//请求空气质量数据
  const datachuli = () => {
    //获取时间数据
    timestrdata.value = stationsdata.value.sort((a, b) => { return a.timestr < b.timestr ? -1 : 1 }).map((item) => { return item.timestr }).map((item) => { return item.slice(3, 6) })
    //获取aqi数据 以下同aqi数据
  aqidata.value = stationsdata.value.sort((a, b) => { return a.timestr < b.timestr? -1 : 1  }).map((item) => { return item.aqi })
  o3data.value = stationsdata.value.sort((a, b) => { return a.timestr < b.timestr? -1 : 1  }).map((item) => { return item.o3.split(',')[2].toString() })
  codata.value = stationsdata.value.sort((a, b) => { return a.timestr < b.timestr? -1 : 1  }).map((item) => { return item.o3.split(',')[1].toString() })
  pm25data.value = stationsdata.value.sort((a, b) => { return a.timestr < b.timestr? -1 : 1  }).map((item) => { return item.o3.split(',')[1].toString() })
  so2data.value = stationsdata.value.sort((a, b) => { return a.timestr < b.timestr? -1 : 1  }).map((item) => { return item.o3.split(',')[1].toString() })
  pm10data.value = stationsdata.value.sort((a, b) => { return a.timestr < b.timestr? -1 : 1  }).map((item) => { return item.o3.split(',')[1].toString() })
    no2data.value = stationsdata.value.sort((a, b) => { return a.timestr < b.timestr ? -1 : 1 }).map((item) => { return item.o3.split(',')[1].toString() })
    console.log(timestrdata.value)

  }
  const ceshi = () => {
    console.log('useStore函数使用')
  }
  return {
    Pointdata,
    timestrdata,
    stations,
    stationsdata,
    aqidata,
    codata,
    o3data,
    pm25data,
    so2data,
    pm10data,
    no2data,
    bird,
    A_station,
    airQuality,
    datachuli,
    ceshi

  }

},{
    persist: true
})
