import { defineStore } from "pinia";
import { ref } from 'vue'
import { birdData, A_stationData, airQualityData } from '@/api/data.js'
import { time } from "echarts";
export const useMapViewDataStore = defineStore('mapviewdata', () => {
  let timearry = ref([])
  let Pointdata = ref([])
  let stations = ref(7)
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
  let station_name = ref('海淀万柳')
  const stationAllName = ref([])
  let stationAllAqi = ref([])
  const bird = async()=>{
    const res=await birdData()
    console.log(res.data)
}//请求北京市各个区的鸟类数据
const A_station = async(stations)=>{
    const res=await A_stationData(stations)
  console.log(res.data.data)
  stationsdata.value = res.data.data

}//请求北京市各个区的各个站点的空气质量数据
const airQuality = async()=>{
    const res=await airQualityData()
  console.log(res.data.data)//将数据从字符串切割为数组再取数组第一个数据再转为字符串
  Pointdata.value = res.data.data
  let namedata = []
  namedata = Pointdata.value.sort((a, b) => { return a.aqi_data.aqi > b.aqi_data.aqi ? -1 : 1 }).map((item) => { return item.station_name })//从高到低排序返回一个数组 })
  let namedata6 = namedata.slice(0, 6).reverse()//将数组倒序排列
  let namedata12 = namedata.slice(6, 12).reverse()
  let namedata18 = namedata.slice(12, 18).reverse()
  let namedata24 = namedata.slice(18, 24).reverse()
  stationAllName.value = namedata6.concat(namedata12, namedata18, namedata24)//将数据分为6个一组进行处理
  let aqidata = []
  aqidata = Pointdata.value.map((item) => { return (item.aqi_data.aqi) }).sort((a, b) => { return a > b ? -1 : 1 })//从高到低排序返回一个数组
  let aqidata6 = aqidata.slice(0, 6).reverse()//将数组倒序排列
  let aqidata12 = aqidata.slice(6, 12).reverse()
  let aqidata18 = aqidata.slice(12, 18).reverse()
  let aqidata24 = aqidata.slice(18, 24).reverse()
  stationAllAqi.value = aqidata6.concat(aqidata12, aqidata18, aqidata24)//将数据分为6个一组进行处理


  console.log(stationAllAqi.value)
  console.log(stationAllName.value)

  }//请求空气质量数据并处理数据 将所有站点的名字数据和最新aqi数据进行处理用于显示排行榜
  const datachuli = () => {
    //获取时间数据
    timestrdata.value = stationsdata.value.sort((a, b) => { return a.timestr < b.timestr ? -1 : 1 }).map((item) => { return item.timestr }).map((item) => { return item.slice(3, 6) })
    //获取aqi数据 以下同aqi数据
  aqidata.value = stationsdata.value.sort((a, b) => { return a.timestr < b.timestr? -1 : 1  }).map((item) => { return item.aqi })
  o3data.value = stationsdata.value.sort((a, b) => { return a.timestr < b.timestr? -1 : 1  }).map((item) => { return item.o3.split(',')[2].toString() })
  codata.value = stationsdata.value.sort((a, b) => { return a.timestr < b.timestr? -1 : 1  }).map((item) => { return item.co.split(',')[1].toString() })
  pm25data.value = stationsdata.value.sort((a, b) => { return a.timestr < b.timestr? -1 : 1  }).map((item) => { return item.pm25.split(',')[1].toString() })
  so2data.value = stationsdata.value.sort((a, b) => { return a.timestr < b.timestr? -1 : 1  }).map((item) => { return item.so2.split(',')[1].toString() })
  pm10data.value = stationsdata.value.sort((a, b) => { return a.timestr < b.timestr? -1 : 1  }).map((item) => { return item.pm10.split(',')[1].toString() })
    no2data.value = stationsdata.value.sort((a, b) => { return a.timestr < b.timestr ? -1 : 1 }).map((item) => { return item.no2.split(',')[1].toString() })
    console.log(timestrdata.value)
    console.log(typeof(stationsdata.value.sort((a, b) => { return a.timestr < b.timestr? -1 : 1  })[0]) )


  }
  // const datachuli2 = () => {
  //   time1arry.value=stationsdata.value.sort((a,b) => { return a.timestr < b.timestr ? -1 : 1 })[0].map((item) => { return item.timestr }).map((item) => { return [item.aqi,item.pm25.split(',')[1].toString(),item.pm10.split(',')[1].toString(),item.so2.split(',')[1].toString(),item.no2.split(',')[1].toString(),item.co.split(',')[2].toString()] })
  //   time2arry.value = stationsdata.value.sort((a, b) => { return a.timestr < b.timestr ? -1 : 1 })[1].map((item) => { return item.timestr }).map((item) => { return item.o3.split(',')[2].toString() })
  // }
  const stationsnamelist = (name) => {
    station_name.value = name


  }//当前点击站点的stations_name
  const timeArryData = () => {
    if (timearry.value.length > 0) {
      timearry.value = []
      if (timestrdata.value.length) {
      for (let key of Object.values(timestrdata.value)) {
        timearry.value.push(key)
      }
      console.log(timearry.value)
    }


    } else {
      if (timestrdata.value.length) {
      for (let key of Object.values(timestrdata.value)) {
        timearry.value.push(key)
      }
      console.log(timearry.value)
    }

    }



  }
  const ceshi = () => {
    console.log('useStore函数使用')
  }
  return {
    timearry,
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
    station_name,
    stationAllName,
    stationAllAqi,
    bird,
    A_station,
    airQuality,
    datachuli,
    ceshi,
    timeArryData,
    stationsnamelist

  }

},{
    persist: true
})
