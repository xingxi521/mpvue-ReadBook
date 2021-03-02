import Vue from 'vue'
import App from './App'
import MpvueRouterPatch from 'mpvue-router-patch'
import api from './api'
Vue.use(MpvueRouterPatch)
Vue.prototype.$api = api
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
