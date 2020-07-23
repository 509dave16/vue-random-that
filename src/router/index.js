import Vue from "vue"
import { IonicVueRouter } from '@modus/ionic-vue'
import App from "../pages/App.vue"
import Home from "../pages/Home.vue"
import About from "../pages/About.vue"
import Database from '../pages/Database'
Vue.use(IonicVueRouter)

const routes = [
  {
    path: "/",
    name: 'App',
    component: App,
    children: [
      {
        path: "/home",
        name: "Home",
        component: Home,
      },
      {
        path: "/about",
        name: "About",
        component: About,
      },
      {
        path: "/database",
        name: "Database",
        component: Database,
      }
    ]
  },
];

const router = new IonicVueRouter({
  routes
});

export default router;
