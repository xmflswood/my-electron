import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/common.css'
import './assets/css/icon-font/iconfont.css'
import {remote} from 'electron'
const fs = require('fs')
const path = require('path')

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
window.$h8 = 1000 * 60 * 60 * 8

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

function getData () {
  const dbPath = process.env.NODE_ENV === 'production' ? path.resolve(remote.app.getAppPath(), '../', 'price-db.json') : path.resolve(remote.app.getAppPath(), 'price-db.json')
  window.$data = JSON.parse(fs.readFileSync(dbPath))['方培']
}
getData()
