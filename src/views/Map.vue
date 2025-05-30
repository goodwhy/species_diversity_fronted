<!-- <template>
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

          <el-icon class="layer-toggle-icon" @click="handleLayerItemClick(item)">
              <View v-if="alreadyAddLayerIds.includes(item.id)" />
              <Hide v-else />
          </el-icon>
        </div>

      </div>
    </div>
  </div>



</template> -->
<!-- <script setup>
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


</script> -->
<!-- <style>
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
</style> -->
<!-- <style scoped>

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
</style> -->
<template>
<div id="GeoMap">

</div>
<div class="echarts-overlay">
  <div class="echarts-buttons">
    <el-button type="primary" @click="clickLine">折线图</el-button>
    <el-button type="primary" @click="clickTime">时间表</el-button>
  </div>
  <div class="echarts-line" v-if="echartsshow">
  </div>
  <div class="echarts-time" v-else>
    <div class="timeline-container">
      <div class="timeline" ref="timelineref" @click="handleTimelineClick">
        <div class="timeline-handle" :style="{left:subTimeLineLeft+'px'}" @mousedown.prevent="startDragHandle"></div>
      </div>
      <div class="time-labels">
        <span v-for="(hour,index) in hours" :key="index">{{hour}}
        </span>
       </div>
    </div>

    <div class="player-controls">
      <el-button-group>
        <el-button @click="playTimeLine" circle type="primary"  v-if="!isPlaying">
          <el-icon><VideoPlay /></el-icon>
        </el-button>
        <el-button @click="pauseTimeLine" circle type="primary"  v-else>
          <el-icon><VideoPause /></el-icon>
        </el-button>

      </el-button-group>


    </div>


  </div>
</div>
</template>
<script setup>
import * as echarts from "echarts";
import { VideoPlay,VideoPause, RefreshRight } from "@element-plus/icons-vue";
import Map from "@geoscene/core/Map";
import MapView from "@geoscene/core/views/MapView";
import BasemapToggle from "@geoscene/core/widgets/BasemapToggle";//添加切换底图微件
import BasemapGallery from "@geoscene/core/widgets/BasemapGallery";//添加底图图层库
import Graphic from "@geoscene/core/Graphic";
import GraphicsLayer from "@geoscene/core/layers/GraphicsLayer";
import Popup from "@geoscene/core/widgets/Popup";
import { useMapViewDataStore } from "@/stores/mapviewdata";
import { onMounted, ref , computed,watch,nextTick ,onUnmounted} from "vue";


const mapviewDataStore = useMapViewDataStore();

let hours = ref([])//时间轴的小时标签
const subTimeLineLeft = ref(0)
const currentTimeIndex = ref(0)//当前时间索引
const timelineref = ref(null)//时间轴的ref
const timelineWidth = ref(0)//时间轴的宽度
const handleWidth = 14//滑块的宽度应与css中的Width一致
const isPlaying = ref(false)//是否正在播放
const playInterval = ref(null)//播放的定时器

let timelineResizeObserver = null

const updateHandlePosition = () => {
  if(timelineWidth.value>0&&hours.value.length>0){
    const segmentWidth = timelineWidth.value / (hours.value.length - 1)//这是每小时滑块进步的宽度
    subTimeLineLeft.value = currentTimeIndex.value * segmentWidth //计算滑块的位置  这样会使滑块左边溢出当currentTimeIndex为0时滑块左边会溢出
    console.log('滑块位置:', subTimeLineLeft.value,segmentWidth);
    subTimeLineLeft.value = Math.max(0, Math.min(subTimeLineLeft.value, timelineWidth.value - handleWidth))//确保滑块位置在时间轴范围内
  }
}
const updateTimeFromHanle = () => {
  if (timelineWidth.value > 0 && hours.value.length > 2) {
    const segmentWidth = timelineWidth.value / (hours.value.length - 1);
    const handleCenterPosition = subTimeLineLeft.value ;
    let newIndex = Math.round(handleCenterPosition / segmentWidth);//Math.round()四舍五入
    newIndex = Math.max(0, Math.min(newIndex, hours.value.length - 1));//确保索引在范围内
    if(currentTimeIndex.value !== newIndex){
      currentTimeIndex.value = newIndex;
      console.log('当前时间索引:', currentTimeIndex.value,hours.value.length);
      updateHandlePosition();
    }

    console.log('当前时间索引:', currentTimeIndex.value);
  }
}




// 播放时间轴
const playTimeLine = () => {
  if (isPlaying.value) return; // 如果已经在播放，直接返回
  isPlaying.value = true;
  clearInterval(playInterval.value); // 清除之前的定时器
  playInterval.value = setInterval(() => {
    currentTimeIndex.value = (currentTimeIndex.value + 1) % hours.value.length; // 循环播放
  },1000)

};

// 暂停时间轴
const pauseTimeLine = () => {
  isPlaying.value = false;
  clearInterval(playInterval.value); // 清除定时器
};

const handleTimelineClick = (event) => {
  if (!timelineref.value) return;
  const rect = timelineref.value.getBoundingClientRect();
  const clickX = event.clientX - rect.left; // 获取点击位置相对于时间轴的左边距
  let newLeft = clickX ; // 计算滑块的新位置
  newLeft = Math.max(0, Math.min(newLeft, rect.width - handleWidth)); // 确保滑块位置在时间轴范围内
  subTimeLineLeft.value = newLeft; // 更新滑块位置
  updateTimeFromHanle(); // 更新当前时间索引
  if(isPlaying.value) {
    pauseTimeLine(); // 如果正在播放，暂停
  }
}
//滑块移动逻辑
let isDragging = false
let dragStartX = 0
let initialHandleLeft = 0
const startDragHandle = (event) => {
  isDragging = true;
  dragStartX = event.clientX; // 鼠标按下时的X坐标
  initialHandleLeft = subTimeLineLeft.value; // 记录滑块初始位置
  if(isPlaying.value) {
    pauseTimeLine(); // 如果正在播放，暂停
  }
  document.addEventListener('mousemove', onDragHandle);
  document.addEventListener('mouseup', endDragHandle);

};
const onDragHandle = (event) => {
  if (!isDragging) return;
  const deltaX = event.clientX - dragStartX; // 计算鼠标移动的距离
  let newLeft = initialHandleLeft + deltaX; // 更新滑块位置
  const rect = timelineref.value.getBoundingClientRect();
  newLeft = Math.max(0, Math.min(newLeft, rect.width - handleWidth)); // 确保滑块位置在时间轴范围内
  subTimeLineLeft.value = newLeft; // 更新滑块位置
  updateTimeFromHanle(); // 更新当前时间索引
};
const endDragHandle = () => {
  isDragging = false;
  document.removeEventListener('mousemove', onDragHandle);
  document.removeEventListener('mouseup', endDragHandle);
};
watch(currentTimeIndex, (newIndex) => {
  updateHandlePosition();
  console.log('当前时间索引:', newIndex);
});














let echartsshow = ref(true)//控制图表的显示和隐藏

let Pointdata = ref(null)//获取北京市各区的综合数据 目的是将这些点渲染到地图上
const aqicolor = (aqi) => {
  if (aqi <= 50) return 'green';
  if (aqi <= 100) return 'yellow';
  if (aqi <= 150) return 'orange';
  if (aqi <= 200) return 'red';
  if (aqi <= 300) return 'purple';
  return 'maroon'; // 超过300的AQI值

}
const aqicolorvalue = (aqi) => {

    if (aqi <= 50) return '优';
    if (aqi <= 100) return '良';
    if (aqi <= 150) return '轻度污染';
    if (aqi <= 200) return '中度污染';
    if (aqi <= 300) return '重度污染';
    return '严重污染'; // 超过300的AQI值

}
const initLineEcharts = async () => {
  await mapviewDataStore.A_station(mapviewDataStore.stations)
  mapviewDataStore.datachuli()//处理数据 为了渲染echarts图表
  mapviewDataStore.timeArryData() //获取时间轴数据
  hours.value = mapviewDataStore.timearry//时间轴的小时标签
  const echartsinit = echarts.init(document.querySelector('.echarts-line'))
  const option = {
    grid: {
      left: '0%',
      right: '5%',
      top: '25%',
      bottom: '5%',
      containLabel: true
    },
    title: {
      text: '北京市城市空气质量检测折线图 -- 24小时aqi数据的变化',
      left: 20,
      textStyle: {
        color: 'white',//设置标题文字颜色
        fontSize: 16,
        // fontWeight: 'bold'
      }
    },
    // legend: {
    //   data: ['aqi', 'PM2.5','PM10','NO2','CO','O3','SO2'],
    //   right: 'center',
    //   top: '0',
    //   textStyle: {
    //     color: 'white',//设置图例文字颜色
    //   }
    // },
    tooltip: {
      show: true,
      trigger: 'axis',//触发类型
    },
    xAxis: {
      type: 'category',
      data: mapviewDataStore.timestrdata,
      boundaryGap: false,//紧挨边缘
      axisLabel: {
        color: 'white',//设置x轴文字颜色
      },
      axisLine: {
        lineStyle: {
          color: 'white'//设置x轴线颜色
        }
      },

    },
    yAxis: {
      type: 'value',
      show:false,
      scale: true,//设置y轴的刻度脱离0值比例
    },
    series: [
      {
        name: 'aqi',
        type: 'line',
        data: mapviewDataStore.aqidata,
        markPoint: {
          data: [
            { type: 'max', name: '最大值' },
            { type: 'min', name: '最小值' }
          ]
        },
        // markLine: {
        //   data: [
        //     { type: 'average', name: '平均值' }
        //   ]
        // },

        smooth: true,//设置折线图平滑
        lineStyle: {
          color: 'yellow',//设置折线的颜色
          type: 'solid',//设置折线的类型 dashed(虚线), dotted(点线), solid
        },//设置折线的样式
        // areaStyle: {
        //   color: 'rgba(255, 0, 0, 0.5)'//设置折线下面的颜色
        // },
        // stack:'alll'


      },
      // {
      //   name: 'PM2.5',
      //   type: 'line',

      //   data: mapviewDataStore.pm25data,
      //   // stack: 'alll',
      //   // areaStyle: {
      //   //   color: 'rgba(0, 0, 255, 0.5)'//设置折线下面的颜色
      //   // },
      // },//堆叠图，在第一个折线图的基础上加一个折线图
      // {
      //   name: 'PM10',
      //   type: 'line',

      //   data: mapviewDataStore.pm10data,
      //   // stack: 'alll',
      //   // areaStyle: {
      //   //   color: 'rgba(0, 0, 255, 0.5)'//设置折线下面的颜色
      //   // },
      // },
      // {
      //   name: 'NO2',
      //   type: 'line',

      //   data: mapviewDataStore.no2data,
      //   // stack: 'alll',
      //   // areaStyle: {
      //   //   color: 'rgba(0, 0, 255, 0.5)'//设置折线下面的颜色
      //   // },
      // },
      // {
      //   name: 'CO',
      //   type: 'line',

      //   data: mapviewDataStore.codata,
      //   // stack: 'alll',
      //   areaStyle: {
      //     color: 'rgba(0, 0, 255, 0.5)'//设置折线下面的颜色
      //   },
      // },
      // {
      //   name: 'O3',
      //   type: 'line',

      //   data: mapviewDataStore.o3data,
      //   // stack: 'alll',
      //   // areaStyle: {
      //   //   color: 'rgba(0, 0, 255, 0.5)'//设置折线下面的颜色
      //   // },
      // },
      // {
      //   name: 'SO2',
      //   type: 'line',

      //   data: mapviewDataStore.so2data,
      //   // stack: 'alll',
      //   // areaStyle: {
      //   //   color: 'rgba(0, 0, 255, 0.5)'//设置折线下面的颜色
      //   // },
      // }
    ]
  }
  echartsinit.setOption(option)//设置折线图的option

}
const pupoptem = new Popup({
  collapseEnabled: false,
  dockEnabled: false,
  dockOptions: {
    buttonEnabled: false,
  },
  visibleElements: {
    actionBar: false,
  },


})//创建一个弹出框
const clickLine = () => {
  echartsshow.value = true

  initLineEcharts()//初始化折线图
}
const clickTime = async() => {
  echartsshow.value = false
  // initTimeEcharts()//初始化时间表
  await nextTick()//确保时间轴的DOM元素已经渲染完成
  if(timelineref.value){
    timelineWidth.value = timelineref.value.offsetWidth//获取时间轴的宽度
    updateHandlePosition()//更新滑块的位置
    if (timelineResizeObserver) {
      timelineResizeObserver.disconnect(); // 断开之前的观察者

    }
    timelineResizeObserver = new ResizeObserver((entries) => {
      for(let entry of entries) {
        const width = entry.contentRect.width;
        timelineWidth.value = width; // 更新时间轴宽度
        updateHandlePosition(); // 更新滑块位置
      }

    });
    timelineResizeObserver.observe(timelineref.value); // 观察时间轴的宽度变化
  }
  console.log('时间表')
}

onMounted(() => {
  const map = new Map({
    basemap:"tianditu-vector",
  })
  const view = new MapView({
    container: "GeoMap",
    map: map,
    center: [116.391275, 39.906217],
    zoom: 10,
    background: {
      color: [10, 10, 10]
    },
    popup:pupoptem
    // constraints: {
    //   snapToZoom: false,
    // },
  });
  const graphicsLayer = new GraphicsLayer({

  });//创建一个图形图层
  map.add(graphicsLayer);//将图形图层添加到地图上

  const togglemap = new BasemapToggle({
    view: view,
    nextBasemap: "tianditu-image"
  });//切换底图微件
  const gallery = new BasemapGallery({
    view: view,
    source: {
      query: {
        title: "Tianditu",

      }
    }
  });//底图画廊微件
  view.ui.add(togglemap, "top-right");
  // view.ui.add(gallery, "top-right");
  view.ui.remove(["attribution", "zoom"]);
  view.on('click', (event) => {
    console.log(hours)
    if (!event.mapPoint) {
      return;
    }
    view.hitTest(event).then((e) => {
      // console.log(e.results[0].graphic.attributes.value)//打印出点击的图形的属性
      if (e.results.length>0&&e.results[0].graphic.attributes.value) {


        mapviewDataStore.stations = e.results[0].graphic.attributes.value//将点击的图形的属性赋值给mapviewDataStore.stations
        mapviewDataStore.A_station(mapviewDataStore.stations)//获取该站点的aqi数据
        mapviewDataStore.datachuli()//处理数据 为了渲染echarts图表
        initLineEcharts()//初始化折线图
        echartsshow.value = true//显示折线图
      }

    })
  //监听地图点击事件
   })//监听地图点击事件  并将单击的点数据渲染到echarts  aqi图表上
  view.when(async() => {


    initLineEcharts()//初始化折线图


    await mapviewDataStore.airQuality()
    mapviewDataStore.Pointdata//获取北京市各区的综合数据
    for (let i = 0; i < mapviewDataStore.Pointdata.length; i++) {
      const point = mapviewDataStore.Pointdata[i];
      let popuphtml =
          `<div class="custom-popup-content">
            <div class="popup-row-first">
              <span class="popup-aqi-value">${point.aqi_data.aqi}</span>
              <span class="popup-aqi-color" style="background-color: ${aqicolor(point.aqi_data.aqi)};">${aqicolorvalue(point.aqi_data.aqi)}</span>
              <span class='popup-aqi-time'>
                <div>监测站点id：${point.station_id}</div>
                <div> 更新时间：${point.aqi_data.timestr}</div>
              </span>
            </div>

            <div class="popup-row">
              <span class="popup-label">健康指引：</span>
              <span class="popup-value">${point.aqi_data.description || '无数据'}</span>
            </div>
            <div class="popup-row">
              <span class="popup-label">建议措施：</span>
              <span class="popup-value">${point.aqi_data.measure || '无数据'}</span>
            </div>
          </div>


      `
      const popupTemplate = {
        title: `<div class="popup-row-title">
          <span class="custom-popup-title">${point.station_name}</span>
          <span class="title-contents">AQI</span>
          </div>
         `,
        content: popuphtml,
      }




      const pointGraphic = new Graphic({
        geometry: {
          type: "point",
          longitude: point.location.longitude,
          latitude: point.location.latitude,
        },
        symbol: {
          type: "simple-marker",
          style: "circle",
          color: aqicolor(point.aqi_data.aqi), // 使用函数获取颜色
          size: "20px",
          // outline: {
          //   color: "black",
          //   width: 1
          // }
        },
        attributes: {
          name: point.station_name,
          value: point.station_id
        },
        popupTemplate: popupTemplate
      });
      graphicsLayer.add(pointGraphic);
    }//添加北京市各个站点显示到底图上





  })
})

onUnmounted(() => {
  clearInterval(playInterval.value); // 清除播放定时器
  if (timelineResizeObserver) {
    timelineResizeObserver.disconnect(); // 断开之前的观察者
    timelineResizeObserver = null;
  }
})

</script>
<style>
#GeoMap {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;

  position: absolute;
}
.echarts-overlay {
  position: absolute;
  bottom: 10px;
  left: 5px;
  /* right: 10px; */
  border-radius: 8px;
  width: 99%;
  height: 250px;
  background-color:rgba(0,0,0,0.5);
  pointer-events: auto; /* 禁用鼠标事件 */
  z-index: 10;
  border:1px solid #ccc;
}
.echarts-buttons{

  position: relative;
  top: 10px;
  left: 10px;
}
.echarts-line{
  position: relative;
  top: 20px;

  left: 9px;
  right: 10px;
  /* display: flex; */
  /* background-color: rgba(0, 0, 0, 0.5); */
  width: 99%;
  height: 200px;

  border-radius: 9px;
  /* bottom: 10px; */
}
.echarts-time{
  position: relative;
  top: 20px; /* 与折线图区域对齐 */
  left: 0;
  width: 100%;
  /* background-color: #286090; */
  height: calc(100% - 50px); /* 确保高度与折线图区域一致 */
  /* background-color: rgba(0, 0, 0, 0.5); /* 移除，父级已有背景 */
  border-radius: 9px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center; /* 垂直居中内容 */
  align-items: center;
  padding: 20px; /* 增加内边距 */
}
.timeline-container {
  width: 90%; /* 时间轴容器宽度 */
  margin: 0 auto; /* 水平居中 */
  /* background-color: #ccc; */
  display: flex;
  flex-direction: column;
  align-items: center;
}
.timeline{
  position: relative;
  width: 100%; /* 占满容器宽度 */
  height: 20px; /* 时间轴条更细 */
  background-color: #555; /* 深色时间轴背景 */
  border-radius: 9px; /* 圆角 */
  cursor: pointer;
  margin-bottom: 10px; /* 与标签的间距 */
}

.timeline-handle {
  position: absolute;
  width: 16px; /* 滑块宽度 */
  height: 16px; /* 滑块高度 */
  background-color: #409eff; /* Element Plus 主题色 */
  border: 2px solid white; /* 白色边框，使其更突出 */
  border-radius: 50%; /* 圆形滑块 */
  cursor: grab; /* 拖动指针 */
  top: 50%; /* 垂直居中 */
  transform: translateY(-50%); /* 精确垂直居中 */
  box-shadow: 0 0 8px rgba(0,0,0,0.5); /* 轻微阴影 */
  z-index: 12; /* 确保在时间轴之上 */
}
.timeline-handle:active {
  cursor: grabbing; /* 拖动时的指针样式 */
}
.time-labels {
  width: 100%; /* 占满容器宽度 */
  display: flex;
  justify-content: space-between;
  color: #fff;
  font-size: 13px;
  padding: 0 0px; /* 微调，让首尾标签不完全贴边 */
  box-sizing: border-box;
  margin-bottom: 0px; /* 与播放控件的间距 */
}
.time-labels span {
  flex-shrink: 0;
   transform: translateX(-50%);
}
.time-labels span:first-child {
  transform: translateX(0%);
}
.time-labels span:nth-child(n+9):nth-child(-n+24) {
  transform: translateX(-5%);
}




.player-controls {



  display: flex;
  padding: 0 100px;
  align-items: center;
  margin-top: 10px;
}
.el-button-group {
  position: relative;
  left: 50%;
  transform: translateX(-50%);

}


/* .time-lables{
  position: relative;
  top: 100px;
  /* left: 0; */
  /* width: 100%; */
  /* display: flex; */
  /* justify-content: space-between; */
  /*color: #fff;  时间标签颜色

} */
.geoscene-view{
    /* --esri-view-outline-color: var(--calcite-color-brand); */
    --geoscene-view-outline: 0px solid var(--geoscene-view-outline-color);

}
.geoscene-popup__main-container {
  background-color: #f9f9f9; /* 更改背景色 */
  border-radius: 6px;       /* 圆角 */
  box-shadow: 0 2px 8px rgba(0,0,0,0.15); /* 添加阴影 */
  color:#333333
}

.popup-row-title {
  display: flex; /* 使用 flex 布局方便对齐 */
  /* flex-direction: column; */
  align-items: flex-start;
  height: 20px; /* 每行高度 */
  margin-bottom: 0px; /* 每行之间的间距 */
}
/* 自定义 Popup 标题样式 */
.custom-popup-title {
  font-size: 25px; /* 标题字号 */
  /* font-weight: bold; */
  color: #5dade2; /* 标题颜色 */
  display: block; /* 确保标题独占一行 */
  margin-top: 5px;




}
.title-contents {
  font-size: 17px; /* 标题内容字号 */
  display: inline;
  color: #eaf2f8; /* 标题内容颜色 */
  background-color: #286090;  /* 标题内容背景颜色 */
  padding: 4px 20px; /* 添加内边距 */
  border-radius: 10px; /* 圆角 */
  margin-left: 20px;





}

/* 自定义 Popup 内容区域样式 */
.custom-popup-content {
  font-family: "Microsoft YaHei", "微软雅黑", sans-serif; /* 使用更美观的中文字体 */
  font-size: 14px;
  color:black; /* 内容颜色 */

  line-height: 1.6; /* 行高 */
  /* padding-top:0px */
}
.popup-row-first{
  display: flex; /* 使用 flex 布局方便对齐 */
  height: 60px;
  background-color: #337ab7; /* AQI 值背景颜色 */
  padding: 0px 10px; /* 内边距 */
  align-items: center; /* 垂直居中 */
  border-radius: 4px; /* 圆角 */
  margin-bottom: 10px;
}
.popup-aqi-value {
  font-size: 30px; /* AQI 值字号 */
  font-weight: bold; /* AQI 值加粗 */
  color: #fff; /* AQI 值颜色 */
  background-color: #337ab7; /* AQI 值背景颜色 */
  padding: 4px 15px; /* 内边距 */
  border-radius: 4px; /* 圆角 */
  margin-right: 30px; /* 与其他内容的间距 */
}
.popup-aqi-color {
  font-size: 13px; /* AQI 状态字号 */
  /* color: #fff; AQI 状态颜色 */
  /* margin-left: 0px; 与 AQI 值的间距 */
  margin-right: 35px;
  height: 30px; /* AQI 状态高度 */
  line-height: 30px;
  text-align: center; /* AQI 状态文字居中 */

  display: flex;

  /* background-color: yellow; */
  padding: 0px 15px;
  border-radius: 13px; /* 圆角 */

}
.popup-aqi-time{
  font-size: 12px; /* AQI 时间字号 */
  color: #fff; /* AQI 时间颜色 */
  margin-left: 0px; /* 与 AQI 值的间距 */
  /* display: flex; */
  /* flex-direction: column; 垂直排列 */
}
.popup-row {
  display: flex; /* 使用 flex 布局方便对齐 */
  /* flex-direction: column; */
  align-items: flex-start;
  height: 30px; /* 每行高度 */
  margin-bottom: 20px; /* 每行之间的间距 */
}

.popup-label {
  font-weight: 600; /* 标签加粗 */
  color: #f9f9f9;       /* 标签颜色稍浅 */
  min-width: 90px; /* 固定标签宽度，使其对齐 */
  /* margin-right: 5px; */
  flex-shrink: 0;
  margin-bottom: 10px;
}


.popup-value {
  flex-grow: 1;
  color: #f9f9f9;   /* 值颜色 */
  word-break: break-word; /* 自动换行 */

  margin-bottom: 20px;
}

/* 如果使用了 actions，可以为 action 按钮添加样式 */
/* .geoscene-popup__action-button {
   自定义按钮样式
  background-color: #337ab7;
  color: white;
  padding: 6px 10px;
  border-radius: 4px;
} */
/* .geoscene-popup__action-button:hover {
  background-color: #f2f5f8;
} */
 .geoscene-popup__header-buttons .geoscene-icon {
  color: #f9f9f9 !important; /* 灰色图标 */
}
.geoscene-popup__header-buttons .geoscene-button:hover .geoscene-icon {
  color: #f9f9f9 !important; /* 悬停时深色图标 */
}

</style>
