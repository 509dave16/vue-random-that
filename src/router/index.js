import Vue from 'vue'
import { IonicVueRouter } from '@modus/ionic-vue'
import App from '../pages/App.vue'
Vue.use(IonicVueRouter)

const routes = [
  {
    path: '/:tab',
    name: 'App',
    component: App,
  },
  {
    path: '*',
    redirect: '/home',
  },
]

const router = new IonicVueRouter({
  routes,
})

export default router
