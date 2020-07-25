import Vue from 'vue'
import '@ionic/core/css/ionic.bundle.css'
import Ionic from '@modus/ionic-vue'
Vue.use(Ionic)

import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.config.devtools = false

new Vue({ router, store }).$mount('ion-app')
