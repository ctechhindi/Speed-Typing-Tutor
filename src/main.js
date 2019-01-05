import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import axios from 'axios';

// Electron
const APPP = require('../package.json') // Load Package JSON File

const { remote, ipcRenderer } = require('electron')
const { Menu } = remote

/**
 * Compare Versions
 * @param {new version} v1 
 * @param {old version} v2 
 */
function compareVersions(v1, v2) {
  v1 = v1.split('.');
  v2 = v2.split('.');
  var longestLength = (v1.length > v2.length) ? v1.length : v2.length;
  for (var i = 0; i < longestLength; i++) {
    if (v1[i] != v2[i]) {
      return (v1 > v2) ? 1 : -1
    }
  }
  return 0;
}

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
        label: "Learn KrutiDev Hindi Typing",
        click: () => {
          router.push("/learn/hindi/krutidev")
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
        label: "KrutiDev Hindi Typing Test",
        click: () => {
          router.push("/typing-test/hindi/krutidev")
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
        click: () => { ipcRenderer.send('toggle-welcome-win') }
      },
      {
        label: 'Source Code',
        click() { require('electron').shell.openExternal('https://github.com/ctechhindi/Speed-Typing-Tutor') }
      },
      {
        label: "Report Issue",
        click() { require('electron').shell.openExternal('https://github.com/ctechhindi/Speed-Typing-Tutor/issues') }
      },
      {
        label: "Check for Updates...",
        click: () => {
          axios.get('https://raw.githubusercontent.com/ctechhindi/Speed-Typing-Tutor/master/package.json').then(function (resp) {
            if (resp.data.version !== undefined) {
              if (compareVersions(resp.data.version, APPP.version)) {
                ipcRenderer.send('open-updates-win', resp.data.version)
              } else {
                ipcRenderer.send('open-updates-win', "alreadyUpdate")
              }
            }
          }).catch(function (error) {
            console.log(error);
          });
        }
      },
      {
        label: "About",
        click: () => { ipcRenderer.send('toggle-about-win') }
      },
    ]
  }
]
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

/**
 * Action: Update Dialog Box Selection
 */
ipcRenderer.on('updates-dialog-selection', function (event, index) {
  if (index === 0) {
    require('electron').shell.openExternal('https://github.com/ctechhindi/Speed-Typing-Tutor/releases')
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
