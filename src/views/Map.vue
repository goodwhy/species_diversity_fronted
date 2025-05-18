<template>

  <div id="viewDiv" ref="mapViewNode">


    <el-tooltip content="3D" placement="bottom" effect="dark">
    <el-icon class="map-Scenceicon" @click="changeScence"><PictureRounded /></el-icon>
    </el-tooltip>
  </div>
  <div id="echarts1" class="echarts-overlay"></div>
  <div class="layer-list">
    <div class="layer-list-icon" @click="handleLayerListPanelVisible">
      <img :src="LayerListIcon"/>
    </div>
    <div class="layer-list-view" v-show="layerListPanelVisible">
      <div class="layer-list-herder">
        <span>图层列表</span>
      </div>
      <div class="layer-list-content">
        <div class="layer-list-item" v-for="(item,index) in layerList" :key="index">
          <span>{{item.name}}</span>
          <!--
           -->
          <el-icon class="layer-toggle-icon" @click="handleLayerItemClick(item)">
              <View v-if="alreadyAddLayerIds.includes(item.id)" />
              <Hide v-else />
          </el-icon>
        </div>

      </div>
    </div>
  </div>



</template>
<script setup>
import { PictureRounded,View,Hide} from '@element-plus/icons-vue'
import { onMounted, onUnmounted, ref, shallowRef, markRaw, watch ,computed} from 'vue'
import EchartsOverlay from './echarts/EchartsOverlay.vue'
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import esriConfig from "@arcgis/core/config.js"
import Layer from '@arcgis/core/layers/Layer'
import Point from '@arcgis/core/geometry/Point'
import Graphic from '@arcgis/core/Graphic'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import MapImageLayer from '@arcgis/core/layers/MapImageLayer'
import ImageryLayer from '@arcgis/core/layers/ImageryLayer'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
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
import { useMapViewDataStore } from '@/stores/mapviewdata'
import LayerListIcon from '@/assets/layer.jpg'

esriConfig.apiKey = 'AAPTxy8BH1VEsoebNVZXo8HurMvK7DSS7UETawwAOvI84A1Y1ebCR6Fv-VcdRKlkvBsFPBowsyF6u_VoN3SHsMRRt7B2zSzQQKYNTyo6aWm38gyU5AqWJ1MTnbhnQ-TUh3BzbrbVozQVvc2iurjDVaJymeYQH0nf0qOa0mAk2SLS-0xVVqq3RJU8JZEHNRBgP5TmUB9CyZEZ98PYON3zI-YfpHZcze7qloTWD0ePmQVFl5o.AT1_Oo8znb3N'
const router = useRouter()
const mapviewDataStore = useMapViewDataStore()
const changeScence = () => {
  router.push('/layout/scence')
}
const mapViewNode=ref(null)

const mapContainerRef = ref(null)
const mapInstance = shallowRef(null)
const mapViewIstance = shallowRef(null)
// const showAirQualityChartOverlay = ref(true)//控制图表的可见性
// const airQualityChartOverlayStyle = ref({
//   position: 'absolute',
//   bottom: '20px',
//   left: '0px',
//   width: '100%',
//   height: '400px',
//   backgroundColor: 'rgb(255,255,255,0.9)',
//   border: '1px solid #ccc',
//   boxShadow: '0 2px 10px rgb(0,0,0,0.1)',
//   zIndex:30,


// })//设置样式 图表的样式
// const airQualityChartOption = computed(() => {
//   if (mapviewDataStore.timestrdata) {
//     return {
//       title: {
//       text: '空气质量检测图',
//       left:90
//     },
//     legend: {
//       data: ['aqi', 'PM2.5','PM10','NO2','CO','O3','SO2'],
//       left: 'center',
//       top: '0',
//       textStyle: {
//         color: 'black',//设置图例文字颜色
//       }
//     },
//     tooltip: {
//       show: true,
//       trigger: 'axis',//触发类型
//     },
//     xAxis: {
//       type: 'category',
//       data: mapviewDataStore.timestrdata,
//       boundaryGap: false,//紧挨边缘

//     },
//     yAxis: {
//       type: 'value',
//       show: true,
//       scale: true,//设置y轴的刻度脱离0值比例
//     },
//     series: [
//       {
//         name: 'aqi',
//         type: 'line',
//         data: mapviewDataStore.aqidata,
//         markPoint: {
//           data: [
//             { type: 'max', name: '最大值' },
//             { type: 'min', name: '最小值' }
//           ]
//         },
//         markLine: {
//           data: [
//             { type: 'average', name: '平均值' }
//           ]
//         },
//         markArea: {
//           data: [
//             [
//               {xAxis:'1月'},
//               {xAxis:'3月'}
//             ],
//           ]
//         },
//         smooth: true,//设置折线图平滑
//         lineStyle: {
//           color: 'green',//设置折线的颜色
//           type: 'solid',//设置折线的类型 dashed(虚线), dotted(点线), solid
//         },//设置折线的样式
//         // areaStyle: {
//         //   color: 'rgba(255, 0, 0, 0.5)'//设置折线下面的颜色
//         // },
//         // stack:'alll'


//       },
//       {
//         name: 'PM2.5',
//         type: 'line',

//         data: mapviewDataStore.pm25data,
//         // stack: 'alll',
//         // areaStyle: {
//         //   color: 'rgba(0, 0, 255, 0.5)'//设置折线下面的颜色
//         // },
//       },//堆叠图，在第一个折线图的基础上加一个折线图
//       {
//         name: 'PM10',
//         type: 'line',

//         data: mapviewDataStore.pm10data,
//         // stack: 'alll',
//         // areaStyle: {
//         //   color: 'rgba(0, 0, 255, 0.5)'//设置折线下面的颜色
//         // },
//       },
//       {
//         name: 'NO2',
//         type: 'line',

//         data: mapviewDataStore.no2data,
//         // stack: 'alll',
//         // areaStyle: {
//         //   color: 'rgba(0, 0, 255, 0.5)'//设置折线下面的颜色
//         // },
//       },
//       {
//         name: 'CO',
//         type: 'line',

//         data: mapviewDataStore.codata,
//         // stack: 'alll',
//         areaStyle: {
//           color: 'rgba(0, 0, 255, 0.5)'//设置折线下面的颜色
//         },
//       },
//       {
//         name: 'O3',
//         type: 'line',

//         data: mapviewDataStore.o3data,
//         // stack: 'alll',
//         // areaStyle: {
//         //   color: 'rgba(0, 0, 255, 0.5)'//设置折线下面的颜色
//         // },
//       },
//       {
//         name: 'SO2',
//         type: 'line',

//         data: mapviewDataStore.so2data,
//         // stack: 'alll',
//         // areaStyle: {
//         //   color: 'rgba(0, 0, 255, 0.5)'//设置折线下面的颜色
//         // },
//       }
//     ]

//     }
//   }
// })//设置option  折线图的option

//图层管理列表使用的变量
const handleLayerListPanelVisible = () => {
  layerListPanelVisible.value = !layerListPanelVisible.value
}
const layerListPanelVisible = ref(false)
const layerList = [{
  id: 'layer-1',
  name: '图层一',
  url:'https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA_Topo_Map/MapServer',
  type:'mapImageLayer',
}, {
  id: 'layer-2',
  name: '图层二',
  url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0',
  type:'featureLayer'
  }, {
  id: 'layer-3',
  name: '图层三',
  url: 'https://landsat2.arcgis.com/arcgis/rest/services/Landsat8_Views/ImageryServer',
  type:'ImageryLayer'
  }]
let alreadyAddLayerIds = ref([])
const handleLayerItemClick = (item) => {
  if(!mapViewIstance.value){
    return
  }
  const view = mapViewIstance.value
  let ArcGISLayer = null
  switch (item.type) {
    case 'mapImageLayer':
      ArcGISLayer = MapImageLayer
      break;
    case 'featureLayer':
      ArcGISLayer = FeatureLayer
      break;
    case 'ImageryLayer':
      ArcGISLayer = ImageryLayer
      break;
    default:
      break;
  }
  let maplayer = view.map.layers.items//获取地图上的所有图层
  let layerIds = maplayer.map((item) => { item.id })//获取所有图层的id
  //如果已经添加过图层删掉该图层，并更新layersIds和maplayer如果没有添加过该图层加上该图层
  if (layerIds.includes(item.id)) {
    const resultslayer = view.map.findLayerById(item.id)
    if (resultslayer) {
      view.map.remove(resultslayer)
      maplayer = view.map.layers.items
      layerIds = maplayer.map((item) => { item.id })
      alreadyAddLayerIds.value = layerIds
    }

  } else {
    if (ArcGISLayer) {
      const Nlayer = new ArcGISLayer({
        url: item.url,
        id: item.id
      })
      view.map.add(Nlayer)
      maplayer = view.map.layers.items
      layerIds = maplayer.map((item) => { item.id })
      alreadyAddLayerIds.value = layerIds
    }

  }

}//图层列表点击事件



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
  }
])//设置图表的数据 属性有id location option
const chartInstances = []//存储图表实例

 //波纹效果相关函数
function handlePointMove(event) {
    const view = mapViewIstance.value
    if (!view||!view.ready) {
      return
    }
    view.hitTest(event).then((response) => {
      // console.log(response.results)
      const results = response.results
      // console.log('12345678'+results)
      let hitTargetGraphic = null
      const graphicRipple = results.find((result) => {
        return result.graphic && result.graphic.attributes&&result.graphic.attributes.id==='point2'
      })
      if (graphicRipple) {
        console.log(graphicRipple)
        // console.log(mapViewNode.value)
        hitTargetGraphic = graphicRipple.graphic
        console.log(hitTargetGraphic)
      }
      if (hitTargetGraphic) {
        if (activeRippleGraphic !== hitTargetGraphic) {
          clearRippleEffect()
          activeRippleGraphic = hitTargetGraphic
          createRippleEffect(hitTargetGraphic)
        }
      } else {
        if (activeRippleGraphic) {
          clearRippleEffect()
          activeRippleGraphic = null
        }
      }
     })

  }
function createRippleEffect(graphic) {
    const view = mapViewIstance.value
    if(!graphic||!view||!graphic.geometry) {
      return
    }
    const screenPoint = view.toScreen(graphic.geometry)
    console.log("099874"+screenPoint)
    if (!screenPoint) {return }

    const rippleCount = 3
    const rippleDuration = 1.5
    const rippleDelayIncrement = 0.3
    const rippleColor = "rgba(0,150,255,0.7)"
    for (let i = 0; i < rippleCount; i++) {
      const ripple = document.createElement('div')
      ripple.style.position = 'absolute'
      ripple.style.borderRad = '50%'
      ripple.style.backgroundColor = rippleColor
      ripple.style.width = '10px'
      ripple.style.height = '10px'
      // ripple.style.transform = 'translate(-50%,50%) scale(0)'
      ripple.style.opacity = '1'
      ripple.style.pointerEvents = 'none'
      ripple.style.zIndex = '0'
      const symbolSize = parseFloat(graphic.symbol.size)||24
      const offsetY = symbolSize / 2 + 10
      ripple.style.left = `${screenPoint.x}px`;
      ripple.style.top = `${screenPoint.y + offsetY}px`; // 在点的下方
      //css动画
      // ripple.style.animation = `ripple-wave ${rippleDuration}s ease-out ${i*rippleDelayIncrement}s infinite`
      ripple.style.animationName = 'ripple-wave';
      ripple.style.animationDuration = `${rippleDuration}s`;
      ripple.style.animationTimingFunction = 'ease-out';
      ripple.style.animationDelay = `${i * rippleDelayIncrement}s`;
      ripple.style.animationIterationCount = 'infinite';
      mapViewNode.value.appendChild(ripple)
      rippleEffectElements.push(ripple)
    }
    //
  }
  //清除波纹效果
  function clearRippleEffect() {
    rippleEffectElements.forEach(rippleEl => {
      if (rippleEl.parentNode) {
        rippleEl.parentNode.removeChild(rippleEl)
      }
    })
    rippleEffectElements = []

  }//设置波纹函数和清除波纹函数

onMounted(async() => {
  if (!mapviewDataStore.timestrdata) {
    console.log('没有空气数据，正在获取')
    await mapviewDataStore.bird()
    await mapviewDataStore.airQuality()
    await mapviewDataStore.A_station(mapviewDataStore.stations)
    mapviewDataStore.datachuli()
    console.log('数据处理完毕')
   }
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
  mapViewIstance.value=view


  let graphicslayer = markRaw(new GraphicsLayer({
    listMode: 'hide',//设置图层列表模式为隐藏
  }))
map.add(graphicslayer)
  view.when(() => {
    console.log(view.map.layers.items)//打印出地图上的所有图层
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
    // setInterval(() => {
    //  console.log(text.value = Math.floor(Math.random() * 100))
    // }, 2000)
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
    view.on("pointer-leave", () => {
      clearRippleEffect()
      activeRippleGraphic = null
      // lastHoveredGraphicId = null
    })
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
  // console.log(event.x, event.y)//打印出屏幕坐标
  let screenPoint = {
    x: event.x,
    y: event.y
  }
  let point = view.toMap(screenPoint)
  // console.log(point.longitude, point.latitude)//打印出经纬度

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
//更新图表的显示位置
const updateEcharts = function () {
    chartInstances.forEach((item, index) => {
      const screen = view.toScreen(item.location)
      // console.log(item.location)

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






})

// const initializeMap = () => {



// }


onUnmounted(() => {
  clearRippleEffect()
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
<style>
@keyframes ripple-wave {
  0% {
    transform: translate(-50%, -50%) scale(0.1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(3); /* 波纹扩散到的最大尺寸 */
    opacity: 0;
  }
}
</style>
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

.layer-list-icon{
  position:absolute;
  top:10px;
  right:16px;
  width: 36px;
  height:36px;
  padding: 2px;
  background-color: #fff;
  border:2px solid #fff;
  box-sizing: border-box;
  cursor: pointer;

}
.layer-list-icon:hover{
  border-color: #409eff;
}
.layer-list-icon img{
  width:100%;
  height:100%;
}
.layer-list-view{
  position:absolute;
  top:10px;
  right:60px;
  width:260px;
  height:400px;
  padding: 0 16px;
  background-color:rgba(255, 255, 255, 0.9);
  border:2px solid #fff;
  box-sizing: border-box;
}
.layer-list-herder{
  height: 48px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
}
.layer-list-herder span{
  font-size: 16px;
  font-weight: 600;
}
.layer-list-content{
  height:calc(100%-48px);
  padding-top:8px;
}
.layer-list-item{
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 8px;
  box-sizing: border-box;
}
.layer-toggle-icon { /* Style for the new Element Plus icon */
  font-size: 18px; /* Default icon size */
  cursor: pointer;
  color: #606266; /* Default icon color */
  transition: font-size 0.2s, color 0.2s;
}
/* .layer-list>img{
  width: 16px;
  height: 16px;
  cursor: pointer;
} */
.layer-list-item:hover{
  background-color: #f5f5f5;
  padding-left: 8px;
  font-weight:600;
}
.layer-list-item:hover .layer-toggle-icon{
  font-size: 22px;
  color: #409eff;
}
/* ArcGIS View 焦点轮廓
:deep(.esri-view .esri-view-surface:focus::after), /* 对 scoped 样式使用 :deep */
/* :deep(.esri-view .esri-view-surface--inset-outline:focus::after) {
    outline: none !important;
}  */

/* 消除地图点击时显示蓝色边框 */
.esri-view{
    /* --esri-view-outline-color: var(--calcite-color-brand); */
    --esri-view-outline: 0px solid var(--esri-view-outline-color);

}
</style>
