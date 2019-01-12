import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

// Electron
const { ipcRenderer } = require('electron')

/**
 * Action: Open Routes
 */
ipcRenderer.on('open-route', function (event, route) {
  router.push(route)
})

// Show console.log
ipcRenderer.on('console-log', function (event, d) {
  if (d.msg !== undefined) {
    if (d.type !== undefined && d.type !== "") {
      if (d.type === "e") { console.error(d.msg) }
      else if (d.type === "w") { console.warn(d.msg) }
      else if (d.type === "l") { console.log(d.msg) }
    } else {
      console.log(d.msg)
    }
  }
})

// Electron : END

Vue.config.productionTip = false

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
Vue.use(Buefy, {
  defaultIconPack: 'mdi',
})

import 'mdi/css/materialdesignicons.min.css'

import VueProgressBar from 'vue-progressbar'
Vue.use(VueProgressBar, {
  color: '#29d', // #29d, rgb(143, 255, 199)
  failedColor: 'red',
  height: '2px',
  thickness: '4px'
})

new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    // Prevent blank screen in Electron builds
    this.$router.push('/')
  }
}).$mount('#app')
