<template>
  <div id="viewDiv">

    <el-tooltip content="3D" placement="bottom" effect="dark">
    <el-icon class="map-Scenceicon" @click="changeScence"><PictureRounded /></el-icon>
    </el-tooltip>
  </div>
  <div id="echarts1" class="echarts-overlay"></div>
</template>
<script setup>
import { PictureRounded } from '@element-plus/icons-vue'
import { onMounted ,onUnmounted,ref,shallowRef} from 'vue'
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import esriConfig from "@arcgis/core/config.js"
import Layer from '@arcgis/core/layers/Layer'
import Point from '@arcgis/core/geometry/Point'
import Accessor from '@arcgis/core/core/Accessor'
import Handles from '@arcgis/core/core/Handles'
import * as echarts from 'echarts'
import bjs from '@/assets/json/北京.json'
import BaseLayerViewGL2d from '@arcgis/core/views/2d/layers/BaseLayerViewGL2D'
import * as reactiveUtils from '@arcgis/core/core/reactiveUtils'
// import ExternalRenderer from '@arcgis/core/views/3d/externalRenderer'
import { useRouter } from 'vue-router'
esriConfig.apiKey = 'AAPTxy8BH1VEsoebNVZXo8HurMvK7DSS7UETawwAOvI84A1Y1ebCR6Fv-VcdRKlkvBsFPBowsyF6u_VoN3SHsMRRt7B2zSzQQKYNTyo6aWm38gyU5AqWJ1MTnbhnQ-TUh3BzbrbVozQVvc2iurjDVaJymeYQH0nf0qOa0mAk2SLS-0xVVqq3RJU8JZEHNRBgP5TmUB9CyZEZ98PYON3zI-YfpHZcze7qloTWD0ePmQVFl5o.AT1_Oo8znb3N'
const router = useRouter()
const changeScence = () => {
  router.push('/layout/scence')
}

const mapContainerRef = ref(null)
const mapInstance = shallowRef(null)
const mapViewIstance = shallowRef(null)


// //定义自定义图层图表类 来自于baselayerviewgl2d
// const EchartsLayerView2D = BaseLayerViewGL2d.createSubclass({
//   declaredClass: 'EchartsLayerView2D',
//   _echartsInstances: null,
//   _echartsContainer: null,
//   _handels: null,//用于管理非reactiveUtils.watch监听器（window resize）
//   _abortController: null,//用于取消reactiveUtils.watch监听
//   constructor() {
//     this._echartsInstances = {}
//     // this._echartsContainer = null
//     this._handels = new Handles()
//     this._abortController = new AbortController()
//     this._resizeEcharts = this._resizeEcharts.bind(this)
//     this._updateEcharts = this._updateEcharts.bind(this)
//   },
// });

const initializeMap = () => {
  const map =new Map({
    basemap: 'streets-navigation-vector',
    spatialReference: {
      wkid: 4326
    }

  })
  const view= new MapView({
    container: 'viewDiv',
    map: map,
    center: [116.391275,39.906217],
    zoom: 10,
    // ui: {
    //   components: ['attribution']
    // }
  })

  view.when(() => {
    console.log('地图加载完成')
  }, (error) => {
    console.error('地图加载失败', error)
  })
  view.on("click", (event) => {
    console.log(event.x, event.y)//打印出屏幕坐标
    let screenPoint = {
      x: event.x,
      y: event.y
    }
    let point = view.toMap(screenPoint)
    console.log(point.longitude, point.latitude)//打印出经纬度

  })
  // initializeEcharts()
  view.ui.remove(["attribution", "zoom"])
  // view.ui.add('echarts-container', 'top-left')


}

// const initializeEcharts = () => {
//   const chart = echarts.init(document.getElementById('echarts-container'))
//   echarts.registerMap('beijing', bjs)
//   const option = {
//     geo: {
//       map: 'beijing',
//       roam: false,
//       zoom: 1.2,
//       silent: true,// 禁用事件处理
//       label: {
//         show: true,
//         fontSize: 10
//       },
//       itemStyle: {
//         areaColor: '#f0f0f0',
//         borderColor: '#000',
//         borderWidth: 1
//       }
//     }
//   }
//   chart.setOption(option)
// }




onMounted(() => {
  initializeMap()
  // console.log(Point)
  const chartsData = ref([
  { id: 'echarts1',
    location: new Point({ longitude: 116.4074, latitude: 39.9042 }),
    option: { /* ... ECharts option ... */
        title: { text: '北京数据', left: 'center', textStyle: { fontSize: 14 } },
        tooltip: {}, xAxis: { type: 'category', data: ['Q1', 'Q2', 'Q3', 'Q4'] }, yAxis: { type: 'value' },
        series: [{ data: [120, 200, 150, 80], type: 'bar' }],
        grid: { left: '15%', right: '10%', top: '25%', bottom: '15%' }
    }
  // }, {
  //   id: 'beijing-chart2',
  //   location: new Point({ longitude: 116.4074, latitude: 39.9042 }),
  //   option: {
  //     geo: {
  //     map: 'beijing',
  //     roam: true,
  //     zoom: 1.2,
  //     label: {
  //       show: true,
  //       fontSize: 10
  //     },
  //     itemStyle: {
  //       areaColor: '#f0f0f0',
  //       borderColor: '#000',
  //       borderWidth: 1
  //     }
  //   }
  //   }
  }
])//设置图表的数据 属性有id location option
const chartInstances = ref({})//存储图表实例
chartsData.value.forEach((data,index) => {
  const chart = document.getElementById(data.id)
  // console.log(chart)
  // console.log(data.value)
  if (chart) {
    const mychart = echarts.init(chart)
    mychart.setOption(data.option)
    chartInstances.value[index] = {
      instance: mychart,
      dom: chart,
      location: data.location
    }
  }
})
updateEcharts()

  const updateEcharts = function () {
    chartInstances.value.forEach((item, index) => {
      const chart = item.instance

      console.log(id)

    })
  }
})

onUnmounted(() => {

})


</script>
<style scoped>
html, body, #viewDiv {
      padding: 0;
      margin: 0;
      height: 100%;
      width: 100%;
      overflow: hidden; /* 防止地图外的滚动条 */
    }
#viewDiv {
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;

}
.map-Scenceicon {
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  /* 初始状态样式 */
  color: #0c0b0b; /* 图标颜色 */
  transform: translateY(0);
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 99;

}

.map-Scenceicon:hover {
  transform: translateY(-3px); /* 向上位移 3px */
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15)); /* 添加投影 */
  color: #409eff; /* 悬停时改变颜色 */

  /* 如果需要放大效果可以添加 */
  /* transform: translateY(-3px) scale(1.05); */
}

/* 如果需要更明显的立体效果 */
.map-Scenceicon:hover::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transition: opacity 0.3s;
}

.map-Scenceicon:hover::after {
  opacity: 1;
}

.echarts-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 150px;
  pointer-events: none; /* 禁用鼠标事件 */
  z-index: 10;
  border:1px solid #ccc;
}

</style>
