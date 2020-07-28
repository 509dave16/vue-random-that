import '@ionic/core/css/ionic.bundle.css'
require('./assets/app.css')
import addIonicons from './config/addIonicons'
import './database'
import './registerServiceWorker'
import './tabs'
import './pages'

addIonicons()

import Vue from 'vue'
import Ionic from '@modus/ionic-vue'
Vue.use(Ionic)

import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.config.devtools = false

new Vue({ router, store }).$mount('ion-app')
