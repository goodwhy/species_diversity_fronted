<template>
  <div class="advanced1">
    我是高级功能1

  </div>
</template>
<script setup>

import { onMounted,ref } from 'vue'

import { kelijin, finallyWorkStatus,paramWorkStatus ,intervalWork} from '@/api/aqidata.js'
import { useMapViewDataStore } from '@/stores/mapviewdata.js'
const mapviewdataStore = useMapViewDataStore()


onMounted(async() => {
  const params= new URLSearchParams()// 创建一个 URLSearchParams 实例
  params.append('age','90')
  params.append('name','张三')
  console.log(params.toString())



  const res=await kelijin('2025-05-04 10:00:00')
  console.log(res.data)
  const intervalWorkData = await intervalWork(res.data.jobId)
  console.log(intervalWorkData)

  const finallydata = await finallyWorkStatus(intervalWorkData.jobId)
  // console.log(finallydata)
  // console.log(finallydata.data.value.mapImage.href)//获得web图层图片链接
  mapviewdataStore.webmap= finallydata.data.value.mapImage.href
  // console.log(mapviewdataStore.webmap)
  mapviewdataStore.webmapextent = finallydata.data.value.mapImage.extent
  // console.log(mapviewdataStore.webmapextent)








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

</style>



