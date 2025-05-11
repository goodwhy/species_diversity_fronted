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
import { onMounted ,onUnmounted,ref,shallowRef,markRaw,watch} from 'vue'
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import esriConfig from "@arcgis/core/config.js"
import Layer from '@arcgis/core/layers/Layer'
import Point from '@arcgis/core/geometry/Point'
import Graphic from '@arcgis/core/Graphic'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol'
import TextSymbol from '@arcgis/core/symbols/TextSymbol'
// import Geometry from '@arcgis/core/geometry/Geometry'
import Accessor from '@arcgis/core/core/Accessor'
import Handles from '@arcgis/core/core/Handles'
import * as echarts from 'echarts'
import bjs from '@/assets/json/北京.json'
import BaseLayerViewGL2d from '@arcgis/core/views/2d/layers/BaseLayerViewGL2D'
import * as reactiveUtils from '@arcgis/core/core/reactiveUtils'
// import ExternalRenderer from '@arcgis/core/views/3d/externalRenderer'
import { useRouter } from 'vue-router'
// import { id } from 'element-plus/es/locale'
// import { de } from 'element-plus/es/locale'
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

let rippleEffectElements = []; // 存储当前活动的波纹 DOM 元素
let activeRippleGraphic = null; // 存储当前哪个 Graphic 正在显示波纹
let stationaryHandle = null

  const chartsData = ref([
  { id: 'echarts1',
    location: markRaw(new Point({longitude: 116.4074, latitude: 39.9042 })),
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
const chartInstances = []//存储图表实例

onMounted(() => {
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
    background: {
      type: 'color',
      color: [10,10,10]
    },
    constraints: {
      snapToZoom:false,
    }
    // ui: {
    //   components: ['attribution']
    // }
  })

  let graphicslayer = markRaw(new GraphicsLayer({
    listMode: 'hide',//设置图层列表模式为隐藏
  }))
map.add(graphicslayer)
  view.when(() => {
    console.log('地图加载完成')
    // let point1 = new Point({
    //   type: 'point',
    //   longitude: 116.4074,
    //   latitude: 39.9042,
    //   spatialReference: {
    //     wkid: 4326
    //   }
    // })
    // let point1symbol = new SimpleMarkerSymbol({
    //   style: 'circle',
    //   color: [255, 0, 0],
    //   size: '10px',
    //   outline: {
    //     color: [255, 255, 255],
    //     width: 1
    //   }

    // })
    // let point1graphic = new Graphic({
    //   geometry: point1,
    //   symbol: point1symbol,
    //   attributes: {
    //     name: '北京'
    //   }
    // })

    const svgPath = "M16,3.5c-4.142,0-7.5,3.358-7.5,7.5c0,4.143,7.5,14.5,7.5,14.5s7.5-10.357,7.5-14.5C23.5,6.858,20.142,3.5,16,3.5z M16,14.583c-2.258,0-4.083-1.825-4.083-4.083S13.742,6.417,16,6.417S20.083,8.242,20.083,10.5S18.258,14.583,16,14.583z";
    let text = ref('54')
    setInterval(() => {
     console.log(text.value = Math.floor(Math.random() * 100))
    }, 2000)
    console.log(text.value)
    let point2 = markRaw(new Point({
      longitude: 116.3270,
      latitude: 39.9990,
      spatialReference: {
        wkid: 4326
      }
    }))
    let point2symbol = markRaw(new SimpleMarkerSymbol({
      style: 'path',
      path: svgPath,
      color: 'green',
      size: '30px',
      outline: {
        color: [50, 50, 50],
        width: 1
      },
      xoffset: 0,
      yoffset: 0
    }))
    let point2graphic = markRaw(new Graphic({
      geometry: point2,
      symbol: point2symbol,
      attributes: {
        id: 'point2',
        name: '北京颐和园',
        description: '颐和园是中国清代皇家园林，位于北京市海淀区，是世界文化遗产。'
      }
    }))
    const textSymbolConfig = {
      color: 'yellow',
      font: {
        size: 7,
        family: 'Arial Unicode MS',
        weight: 'bold'
      },
      haloColor: 'black',
      haloSize: '1px',
      xoffset: 0,
      yoffset: 2

    }
    const textSymbol = markRaw(new TextSymbol({
      text: text.value.toString(),
      ...textSymbolConfig

    }))
    const textgraphicupdate = markRaw(new Graphic({
      geometry: point2,
      symbol: textSymbol,
      attributes: {
        id:'text1'
      }

    }))//new一个文本图表 以point2为背景形状 文本样式为textSymbol
    graphicslayer.addMany([point2graphic, textgraphicupdate])//向图表图层中添加图表
    console.log("1234")
    console.log("987" + graphicslayer.graphics)//打印图表图层中的所有创建出来的图表
    view.on('pointer-move', handlePointMove)
    view.on("pointer-move",clearRippleEffect)
    //监听文本值的变化，如果文本值(text.value)变化找到变化的点重新创建一个文本文本值为新值
    watch(text, (newvalue) => {
      console.log(newvalue)
      if (textgraphicupdate && graphicslayer.graphics.includes(textgraphicupdate)) {
        console.log(textgraphicupdate.symbol)
        textgraphicupdate.symbol = new TextSymbol({
          ...textSymbolConfig,
          text: newvalue.toString()
        })
      }
    })


    updateEcharts()


    stationaryHandle = view.watch('stationary', (isstationary) => {
      if (isstationary) {
        updateEcharts();
      }


    })

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

  // initializeMap()
  // console.log(Point)
//将图表注册出来并显示到底图上
chartsData.value.forEach((data,index) => {
  const chart = document.getElementById(data.id)
  // console.log(chart)
  // console.log(data.value)
  if (chart) {
    const mychart = echarts.init(chart)
    mychart.setOption(data.option)
    chartInstances[index] = {
      instance: mychart,
      dom: chart,
      location: data.location
    }
    // console.log(chartInstances[index])
    // console.log(chartInstances[index].location.longitude)

  }
})
//更新图标的显示位置
const updateEcharts = function () {
    chartInstances.forEach((item, index) => {
      const screen = view.toScreen(item.location)
      console.log(item.location)

      console.log(screen)
      if (screen) {
        const offsetX = item.dom.offsetWidth / 2
        const offsetY = item.dom.offsetHeight / 2
        item.dom.style.left = `${screen.x}px`
        item.dom.style.top = `${screen.y}px`
        item.dom.style.display = 'block'
      }
      else {
        item.dom.style.display = 'none'
      }

    })
}
  //波纹效果相关函数
  function handlePointMove(event) {
    console.log(event)

  }
  function createRippleEffect(graphic) {
    //
  }
  //清除波纹效果
  function clearRippleEffect() {

  }





})

// const initializeMap = () => {



// }


onUnmounted(() => {
  if (stationaryHandle) {
    stationaryHandle.remove()
    stationaryHandle=null
  }
  //图表的销毁
  chartInstances.forEach((item) => {
    if (item && item.instance) {
      item.instance.dispose()
     }
   })

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
  pointer-events: auto; /* 禁用鼠标事件 */
  z-index: 10;
  border:1px solid #ccc;
}
/* 消除地图点击时显示蓝色边框 */
.esri-view{
    /* --esri-view-outline-color: var(--calcite-color-brand); */
    --esri-view-outline: 0px solid var(--esri-view-outline-color);

}
</style>
