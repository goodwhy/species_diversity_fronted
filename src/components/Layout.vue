<template>
  <div class="common-layout">
    <el-container class="layout">
      <!-- 侧边栏 -->
      <el-aside :width="asideWidth" class="aside-container">
        <div class="logo">
          <img
              src="@/assets/favicon.ico"
              class="logo-icon"
              :style="{width: isCollapse ? '30px' : '24px'}"
          >
         <span v-show="!isCollapse">GeoC147组</span>
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
          <el-menu-item index="/map">
            <el-icon><icon-menu /></el-icon>
            <template #title>地图显示</template>
          </el-menu-item>

          <el-sub-menu index="2">
            <template #title>
              <el-icon><document /></el-icon>
              <span>功能显示</span>
            </template>

            <el-menu-item index="/advanced1">
              <el-icon><document /></el-icon>
              高级功能1
            </el-menu-item>
            <el-menu-item index="/advanced2">
              <el-icon><document /></el-icon>
              高级功能2
            </el-menu-item>
          </el-sub-menu>

          <el-menu-item index="/user">
            <el-icon><user /></el-icon>
            <template #title>用户管理</template>
          </el-menu-item>
        </el-menu>
        <div class="collapse-wrapper">
        <el-icon class="collapse-icon" @click="toggleCollapse">
          <Fold v-if="isCollapse" />
          <Expand v-else />
        </el-icon>
        </div>


      </el-aside>

      <el-container>
        <!-- 头部 -->
        <el-header class="header">
          <div class="header-left">
            <span class="system-title">后台管理系统</span>
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

        <el-main class="main-container">
          <div class="content-wrapper"><router-view></router-view></div>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  Menu as IconMenu,
  Document,
  User,
  Fold,
  Expand
} from '@element-plus/icons-vue'

const isCollapse = ref(false)

// 侧边栏宽度计算属性
const asideWidth = computed(() => {
  return isCollapse.value ? '64px' : '200px'
})

// 切换折叠状态
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}
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
.common-layout {
   /* 调整高度保留底部间距 */
   height: 100vh;

  display: flex;
  overflow: hidden; /* 隐藏容器溢出 */
  ;
}
.layout {
  flex: 1;
  height: 100vh;
  overflow: hidden;
  display: flex;
}

.aside-container {
  background-color: #ffff;
  transition: width 0.3s;
  position: relative;
  border: 1px solid #dcdfe6;
  border-radius: 5px; /* 设置圆角半径 */
  top: 8px;
  left: 0;
  bottom: 0px;




  overflow: hidden;

}

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
  min-width:35px ;
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
  margin-left: 200px;
  background-color: #ffffff;
  // overflow: hidden;
  border: 1px solid #dcdfe6;
  border-radius: 5px; /* 设置圆角半径 */

}

.system-title {
  font-size: 20px;
  font-weight: bold;
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
  margin-left: 200px;
  height: calc(100vh - 60px) !important;
  overflow: hidden;
  .content-wrapper {
    height: 100%;
    overflow-y: auto;
    padding-right: 10px; /* 防止内容被滚动条遮挡 */
    // margin-right: -10px;
    // -ms-overflow-style: none;
    // scrollbar-width: none;
  }
  // /* 隐藏主内容区滚动条 */
  // .content-wrapper::-webkit-scrollbar {
  //   display: none;

  // }



}
/* 新增折叠按钮样式 */
.collapse-wrapper {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;

  .collapse-icon {
    padding: 10px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      color: var(--el-color-primary);
      transform: scale(1.1);
    }
  }
}

</style>
