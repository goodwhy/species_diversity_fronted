<template>
  <div id="viewDiv">

    <el-tooltip content="3D" placement="bottom" effect="dark">
    <el-icon class="map-Scenceicon" @click="changeScence"><PictureRounded /></el-icon>
    </el-tooltip>
  </div>
</template>
<script setup>
import { PictureRounded } from '@element-plus/icons-vue'
import { onMounted } from 'vue'
import Map from '@arcgis/core/Map'
import ScenceView from '@arcgis/core/views/SceneView'
import esriConfig from "@arcgis/core/config.js"

esriConfig.apiKey = 'AAPTxy8BH1VEsoebNVZXo8HurMvK7DSS7UETawwAOvI84A1Y1ebCR6Fv-VcdRKlkvBsFPBowsyF6u_VoN3SHsMRRt7B2zSzQQKYNTyo6aWm38gyU5AqWJ1MTnbhnQ-TUh3BzbrbVozQVvc2iurjDVaJymeYQH0nf0qOa0mAk2SLS-0xVVqq3RJU8JZEHNRBgP5TmUB9CyZEZ98PYON3zI-YfpHZcze7qloTWD0ePmQVFl5o.AT1_Oo8znb3N'


onMounted(() => {
  const map =new Map({
    basemap: 'topo-vector',
    ground: 'world-elevation'

  })
  const view= new ScenceView({
    container: 'viewDiv',
    map: map,
    center: [104.0668, 30.6594],
    zoom: 10,
    // ui: {
    //   components: ['attribution']
    // }
  })
  view.ui.remove(["attribution","zoom"])
  view.when(() => {
    console.log('地图加载完成')
  }, (error) => {
    console.error('地图加载失败', error)
  })
})


</script>
<style scoped>
#viewDiv {
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;

}
</style>
