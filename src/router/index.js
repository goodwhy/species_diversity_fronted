import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { name: 'login', path: '/login', component: () => import('../components/Login.vue') },
    {
      name: 'layout', path: '/', component: () => import('../components/Layout.vue'),
      redirect: '/map',
      children: [
        { name: 'map', path: '/map', component: () => import('../views/Map.vue') },
        {name: 'Advanced1', path: '/advanced1', component: () => import('../views/Advanced1.vue')},
      ]
    },



  ],
})

export default router
