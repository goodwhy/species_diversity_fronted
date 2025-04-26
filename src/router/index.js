import { createRouter, createWebHistory } from 'vue-router'
import {
  Menu as IconMenu,
  Document,
  User,

} from '@element-plus/icons-vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: '注册页面', path: '/login', component: () => import('../components/Login.vue'),
    },

    {
      name: '首页', path: '/', component: () => import('../components/Layout.vue'),
      redirect: '/layout/map',
      children: [
        {
          name: '地图显示', path: '/layout/map', component: () => import('../views/Map.vue'),
          meta: {
            title: '地图显示',
            keepAlive: false,
            icon: IconMenu,
          }
        },
        {
          name: '功能显示', path: '/features', component: () => import('../views/features/Features.vue'),
          redirect: '/features/advanced1',
          meta: {
            title: '功能显示',
            keepAlive: false,
            icon: Document,
          },
          children:[{
            name: '高级功能1', path: '/features/advanced1', component: () => import('../views/Advanced1.vue'),
            meta: {
              title: '高级功能1',
              keepAlive: false,
              icon: Document,
            }
          },
          {
            name: '高级功能2', path: '/features/advanced2', component: () => import('../views/Advanced2.vue'),
            meta: {
              title: '高级功能2',
              keepAlive: false,
              icon: Document,
            }
          },]
        },
        {
          name: '用户管理', path: '/layout/user', component: () => import('../views/personal/Personal.vue'),
          meta: {
            title: '用户管理',
            keepAlive: false,
            icon: User,
          }
        }

      ]
    },




  ],
})

export default router
