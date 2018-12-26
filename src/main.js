import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

// Electron
const { remote, ipcRenderer } = require('electron')
const { Menu } = remote

const template = [
   {
      label: 'Main',
      submenu: [
         {
            label: "Home Page",
            click: () => {
               router.push("/")
            }
         },
         { role: 'togglefullscreen' },
         { role: 'reload' },
         { type: 'separator' },
         // { role: 'toggledevtools' },
         { role: "quit" }
      ],
   },
   {
      label: 'Learn Typing',
      submenu: [
         { 
            label: "Learn English Typing",
            click: () => {
               router.push("/learn/english")
            }            
         },
         {
            label: "Learn Inscript Hindi Typing",
            click: () => {
               router.push("/learn/hindi/inscript")
            }
         }
      ],
   },
   {
      label: 'Typing Test',
      submenu: [
         { 
            label: "English Typing Test",
            click: () => {
               router.push("/typing-test/english")
            }
         },
         { 
            label: "Inscript Hindi Typing Test",
            click: () => {
               router.push("/typing-test/hindi/inscript")
            }
         }
      ]
   },
   {
      label: 'Help',
      submenu: [
         { 
            label: "Welcome",
            click: () => {
               ipcRenderer.send('toggle-welcome-win')
            }
         },
         { 
            label: "About",
            click: () => {
               ipcRenderer.send('toggle-about-win')
            }
         }
      ]
   }
]
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
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
