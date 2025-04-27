<template>
  <div class="common-layout">
    <el-container class="layout">
      <!-- 侧边栏 -->
      <el-aside :width="asideWidth" class="aside-container" v-show="!isFullscreen">
        <div class="logo">
          <img
              src="@/assets/146.ico"
              class="logo-icon"
              :style="{width: isCollapse ? '30px' : '24px'}"
          >
         <span v-show="!isCollapse">生态管理系统</span>
        </div>
        <el-menu
          router
          :default-active="$route.path"
          class="el-menu-vertical"
          :collapse="isCollapse"
          background-color="#ffff"
          text-color="black"
          active-text-color="#ffff"
        >
          <el-menu-item index="/layout/map">
            <el-icon><icon-menu /></el-icon>
            <template #title>地图显示</template>
          </el-menu-item>
          <!-- <el-sub-menu index="/">
            <template #title>
              <el-icon><icon-menu /></el-icon>
              <span>地图显示</span>
            </template>

            <el-menu-item index="/layout/map">
              <el-icon><Picture /></el-icon>
              2D地图
            </el-menu-item>
            <el-menu-item index="/layout/scence">
              <el-icon><PictureRounded /></el-icon>
              3D地图
            </el-menu-item>
          </el-sub-menu> -->

          <el-sub-menu index="/features">
            <template #title>
              <el-icon><document /></el-icon>
              <span>功能显示</span>
            </template>

            <el-menu-item index="/features/advanced1">
              <el-icon><document /></el-icon>
              高级功能1
            </el-menu-item>
            <el-menu-item index="/features/advanced2">
              <el-icon><document /></el-icon>
              高级功能2
            </el-menu-item>
          </el-sub-menu>

          <el-menu-item index="/layout/user">
            <el-icon><user /></el-icon>
            <template #title>用户管理</template>
          </el-menu-item>
        </el-menu>



      </el-aside>

      <el-container>
        <!-- 头部 -->
        <el-header class="header" v-show="!isFullscreen">
          <div class="header-left">
            <el-icon class="header-collapse-icon" @click="toggleCollapse">
              <Fold v-if="isCollapse" />
              <Expand v-else />
            </el-icon>
             <!-- 新增全屏按钮 -->
            <el-icon class="fullscreen-icon" @click="toggleFullscreen">
              <FullScreen v-if="!isFullscreen" />
               <Aim v-else />
            </el-icon>
            <!-- 面包屑导航 -->
            <el-breadcrumb separator=">" class="breadcrumb">
              <el-breadcrumb-item
                v-for="(item, index) in breadcrumbList"
                :key="index"
                :to="index<breadcrumbList.length-1 ? item.path : undefined"
              >
              <template #default>
                <div class="breadcrumb-item">
                  <el-icon class="breadcrumb-icon">
                    <component :is="item.meta.icon" /> <!-- 动态图标组件 -->
                  </el-icon>
                  <span>{{ item.meta.name || item.meta.title }}</span>
                </div>
              </template>
              </el-breadcrumb-item>
            </el-breadcrumb>

          </div>
          <div class="header-right">
            <el-dropdown>
              <span class="user-info">
                <el-avatar :size="30" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
                <span class="user-name">管理员</span>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>个人中心</el-dropdown-item>
                  <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>

        <!-- 主要内容 -->

        <el-main class="main-container" :class="{ 'fullscreen-mode': isFullscreen }">
          <div class="content-wrapper"><router-view></router-view></div>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref, computed ,onMounted,onUnmounted} from 'vue'
import {
  Menu as IconMenu,
  Document,
  User,
  Fold,
  Expand,
  FullScreen,
  Aim,
  ArrowRight,
  Picture,
  PictureRounded
} from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
const route = useRoute()
const isCollapse = ref(false)
const isFullscreen = ref(false)
// 计算面包屑导航数据
const breadcrumbList = computed(() => {
  const matched = route.matched.filter(item => item.meta.title)
  console.log(route.matched)
  console.log(route.matched.filter(item => item.meta.title))
  // 添加首页（可选）
  return matched

})
console.log(breadcrumbList.value)

// 侧边栏宽度计算属性
const asideWidth = computed(() => {
  return isCollapse.value ? '64px' : '200px'
})

// 切换折叠状态
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}
// 切换全屏状态
const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
  ElMessage({
    message: '按下Esc键退出全屏',
    plain: true,
    icon: ArrowRight,
    showClose: true,

  })

}
// 监听全屏状态变化
const handleKeydown = (e) => {
  if(e.key === 'Escape' && isFullscreen.value) {
    isFullscreen.value = !isFullscreen.value
  }
}
// 监听全屏状态变化
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})
// 清理事件监听器
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

</script>

<style scoped lang="scss">
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100vw;
  overflow: hidden;
  /* 隐藏全局滚动条 */
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
// .aside-container,
// .header {
//   transition: all 0.3s;
//   display: v-bind('isFullscreen ? "none" : "block"');
// }
.common-layout {
   /* 调整高度保留底部间距 */
   height: 100vh;

  display: flex;
  overflow: hidden; /* 隐藏容器溢出 */
  ;
}
.layout {
  // flex-direction: column; /* 改为纵向布局 */
  // height: 100vh;
  flex: 1;
  height: 100vh;
  overflow: hidden;
  display: flex;
}

/* 全屏按钮样式 */
.fullscreen-icon {
  font-size: 17px;
  cursor: pointer;
  transition: all 0.3s;
  color: #666;
  margin-left: 2px;

  &:hover {
    color: var(--el-color-primary);
    transform: scale(1.1);
  }
}
.aside-container {
  background-color: #ffff;
  transition: width 0.3s;
  position: relative;
  border: 1px solid #dcdfe6;
  border-radius: 5px; /* 设置圆角半径 */
  top: 0px;
  left: 0;
  bottom: 0px;




  overflow: hidden;

}
/* 动态控制侧边栏和头部显示 */


.logo {
  height: 60px;
  line-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap:8px;
  padding: 0 10px;
  overflow: hidden;
  transition: all 0.3s;
  font-size: 18px;
  background-color:#ffff;
  &-icon{
  transition: all 0.3s;
  min-width:60px ;
  }
   /* 折叠状态下调整 */
   .el-aside[width="64px"] & {
    justify-content: center;
    padding: 0;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
}

.el-menu {
  border-right: none;
}

/* 新增菜单项悬停效果 */
:deep(.el-menu-item) {
  transition: all 0.3s;
  margin: 4px 8px;
  border-radius: 6px !important;

  &:hover {
    background-color: #f5f7fa !important;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  &.is-active {
    background-color: var(--el-color-primary) !important;
    color: #fff !important;
  }
}

/* 子菜单标题样式 */
:deep(.el-sub-menu__title) {
  transition: all 0.3s;
  margin: 4px 8px;
  border-radius: 6px !important;

  &:hover {
    background-color: #f5f7fa !important;
  }
}

/* 折叠状态下的样式调整 */
.el-menu--collapse {
  :deep(.el-menu-item),
  :deep(.el-sub-menu__title) {
    margin: 4px 0;
  }
}

/* 原有其他样式保持不变... */

.header {
  display: flex;
  justify-content: space-between;

  align-items: center;
  margin-left: 10px;
  background-color: #ffffff;
  // overflow: hidden;
  border: 1px solid #dcdfe6;
  border-radius: 5px; /* 设置圆角半径 */

}
.header-left {
  display: flex;
  align-items: center;
  gap:20px;

  .header-collapse-icon {
    font-size: 20px;
    cursor: pointer;
    transition: all 0.3s;
    color: #666;

    &:hover {
      color: var(--el-color-primary);
      transform: scale(1.1);
    }
  }
  .breadcrumb {
    // 面包屑样式调整
    :deep(.el-breadcrumb__inner) {

      color: #666;

      &.is-link {
        color: var(--el-color-primary);
        font-weight: normal;
      }
    }
    //悬停到面包屑的样式
    :deep(.el-breadcrumb__item) {
    .el-breadcrumb__inner {
      display: inline-flex;
      align-items: center;
      padding: 8px 2px;
      border-radius: 6px;
      transition: all 0.3s;
      // 当前页样式
      &:last-child {
        .el-breadcrumb__inner {
          &:hover {
          background: transparent !important;
          box-shadow: none;
          transform: none;
          cursor:default;


          }
          color: #666 !important;
          .breadcrumb-icon {
            color: #999;
          }

        }
      }

       // 保持前几项的交互效果
    &:not(:last-child) {
      .el-breadcrumb__inner {
        &:hover {
          background-color: #f5f7fa;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          transform: translateY(-1px);
        }
      }
    }

      // 图标样式
      .breadcrumb-icon {
        margin-right: 5px;
        font-size: 20px;
        transform: translateY(4px);
        margin-top: -10px;

      }

      // 链接状态
      &.is-link {
        color: var(--el-color-primary);
        font-weight: normal;
      }

      // 当前页样式
      &:last-child {
        .el-breadcrumb__inner {
          &:hover {
          background: transparent !important;
          box-shadow: none;
          transform: none;
          cursor:default;

          color: #666;
          }

        }
      }
      }
    }
  }
  // 分隔符样式
  :deep(.el-breadcrumb__separator) {
    margin: 0 4px;
    color: #999;
  }
}



.system-title {
  display: none;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.user-name {
  margin-left: 10px;
}

.main-container {
  background-color: #f0f2f5;
  padding: 20px;
  border: 1px solid #dcdfe6;
  border-radius: 5px; /* 设置圆角半径 */
  position: relative;
  top: 10px;
  bottom: 10px;
  margin-left: 10px;
  height: calc(100vh - 60px);
  overflow: hidden;
  transition: all 0.3s;
  &.fullscreen-mode {
    height: 100vh;
    margin-left: 0;
    margin-top: 0;
    top: 0;
    bottom: 0;

    overflow: hidden; /* 隐藏溢出内容 */
  }
  .content-wrapper {
    height: 100%;
    overflow-y: auto;
    padding-right: 10px; /* 防止内容被滚动条遮挡 */
    // margin-right: -10px;
    // -ms-overflow-style: none;
    // scrollbar-width: none;
    // &::-webkit-scrollbar {
    //   width: 6px;
    // }
    // &::-webkit-scrollbar-thumb {
    //   background: rgba(144,147,153,.3);
    //   border-radius: 3px;
    // }
  }

  // /* 隐藏主内容区滚动条 */
  // .content-wrapper::-webkit-scrollbar {
  //   display: none;

  // }



}
</style>
