import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/teams/:id',
    name: 'TeamList',
    component: () => import('../views/TeamList.vue'),
    props: true
  },
  {
    path: '/teams/profile/:id',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    props: true
  },
  {
    path: '/players/:id',
    name: 'Player',
    component: () => import('../views/Player.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
