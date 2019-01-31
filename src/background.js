'use strict'

import { app, protocol, BrowserWindow, ipcMain, dialog, globalShortcut, Menu } from 'electron'
import { createProtocol, installVueDevtools } from 'vue-cli-plugin-electron-builder/lib'

import axios from 'axios';

const APPP = require('../package.json') // Load Package JSON File

const isDevelopment = process.env.NODE_ENV !== 'production'

var fs = require('fs');
// const FileSystem = require('original-fs')

const EAU = require('electron-asar-hot-updater-v1');
const ProgressBar = require('electron-progressbar');

/**
 * Create Debug File in Resources Folder
 */
var logger = require('tracer').console({
  transport: function (data) {
    var logFile = fs.createWriteStream(process.resourcesPath + "\\appDebug.log", { flags: 'a' });
    logFile.write(data.rawoutput + '\n');
  }
});

function compareVersions(v1, v2) {
  v1 = v1.split(".");
  v2 = v2.split(".");
  var longestLength = v1.length > v2.length ? v1.length : v2.length;
  for (var i = 0; i < longestLength; i++) {
    if (v1[i] != v2[i]) {
      return v1 > v2 ? 1 : -1;
    }
  }
  return 0;
}

function formatBytes(bytes, decimals) {
  if (bytes == 0) return '0';
  var k = 1024,
      dm = decimals <= 0 ? 0 : decimals || 2,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
  return {
    "size": parseFloat((bytes / Math.pow(k, i)).toFixed(dm)), 
    "format": sizes[i]
  }
}

// Main Window
let win
let progressBar

// Standard scheme must be registered before the app is ready
protocol.registerStandardSchemes(['app'], { secure: true })
function createWindow() {

  // console.log(process.env.INIT_CWD); // F:\Project\_Projects\Easy Typing\EasyTyping-Electron\easy-typing
  // console.log(__dirname); // F:\Project\_Projects\Easy Typing\EasyTyping-Electron\easy-typing\dist_electron
  // console.log(__static); // F:\Project\_Projects\Easy Typing\EasyTyping-Electron\easy-typing\public
  // F:\Project\_Projects\Easy Typing\EasyTyping-Electron\easy-typing\dist_electron\win-ia32-unpacked\resources\app.asar
  // process.resourcesPath // "F:\Project\_Projects\Easy Typing\EasyTyping-Electron\easy-typing\dist_electron\win-ia32-unpacked\resources"
  // process.resourcesPath // "easy-typing\node_modules\electron\dist\resources
  // app.getAppPath() // "F:\Project\_Projects\Easy Typing\EasyTyping-Electron\easy-typing\dist_electron\win-ia32-unpacked\resources\app.asar"

  /**
   * Create the Main window
   */
  win = new BrowserWindow({
    show: false,
    title: APPP.productName + ' ' + APPP.version,
    icon: __static + '/img/icons/logo-32.png'
  })
  win.maximize()
  win.show()
  win.on('page-title-updated', (evt) => {
    evt.preventDefault();
  });
  // Set Menu
  const template = [
    {
      label: 'Main',
      submenu: [
        {
          label: "Home Page",
          click: () => {
            win.webContents.send('open-route', "/")
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
            win.webContents.send('open-route', "/learn/english")
          }
        },
        {
          label: "Learn KrutiDev Hindi Typing",
          click: () => {
            win.webContents.send('open-route', "/learn/hindi/krutidev")
          }
        },
        {
          label: "Learn Inscript Hindi Typing",
          click: () => {
            win.webContents.send('open-route', "/learn/hindi/inscript")
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
            win.webContents.send('open-route', "/typing-test/english")
          }
        },
        {
          label: "KrutiDev Hindi Typing Test",
          click: () => {
            win.webContents.send('open-route', "/typing-test/hindi/krutidev")
          }
        },
        {
          label: "Inscript Hindi Typing Test",
          click: () => {
            win.webContents.send('open-route', "/typing-test/hindi/inscript")
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
            var options = {
              type: 'info',
              title: 'Welcome',
              message: APPP.productName + " " + APPP.version,
              detail: "To Use Hindi (Inscript, Kruti Dev) and English Typing and Test, Download the Application or use online \n\nFor Feedback & Complaints email to speedtypingtutor@gmail.com",
            }
            dialog.showMessageBox(options)
          }
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
                  var options = {
                    type: 'info',
                    title: 'A new version available',
                    message: "v" + resp.data.version,
                    detail: "A new version available. Click the button below to download the latest version.",
                    buttons: ['Download New Version'],
                    cancelId: 1
                  }
                  dialog.showMessageBox(options, function (index) {
                    if (index === 0) {
                      require('electron').shell.openExternal('https://github.com/ctechhindi/Speed-Typing-Tutor/releases')
                    }
                  })
                } else {
                  var options = {
                    type: 'error',
                    title: APPP.productName + ' is up to date',
                    detail: "There is no update to the application right now. ♥ Enjoy",
                  }
                  dialog.showMessageBox(options)
                }
              }
            }).catch(function (error) {
              console.log(error);
            });
          }
        },
        {
          label: "About",
          click: () => {
            var options = {
              type: 'info',
              title: 'About',
              message: APPP.productName,
              detail: "Version: " + APPP.version + "\nDate: " + APPP.date + "\nNode: " + process.versions.node + "\nChrome: " + process.versions.chrome + "\nElectron : " + process.versions.electron,
            }
            dialog.showMessageBox(options)
          }
        },
      ]
    }
  ]
  const menu = Menu.buildFromTemplate(template)
  win.setMenu(menu);


  /**
   * About Window
   */
  // aboutWin = new BrowserWindow({
  //   width: 400,
  //   modal: true,
  //   height: 400,
  //   parent: win,
  //   center: true,
  //   maximizable: false,
  //   minimizable: false,
  //   resizable: false,
  //   skipTaskbar: true,
  //   // frame: false, 
  //   // transparent: true,
  //   alwaysOnTop: true,
  //   show: false,
  //   autoHideMenuBar: true,
  //   title: 'About',
  //   webPreferences: { webSecurity: false }
  // })

  if (isDevelopment || process.env.IS_TEST) {

    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)

    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {

  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    await installVueDevtools()
  }

  // Create Shortcut Key : Open Dev Tools
  globalShortcut.register('CommandOrControl+Shift+c', () => {
    win.webContents.openDevTools()
  })

  createWindow()

  // Initiate the module
  EAU.init({
    'api': 'https://raw.githubusercontent.com/ctechhindi/Speed-Typing-Tutor/master/package.json', // The API EAU will talk to
    'server': false // Where to check. true: server side, false: client side, default: true.
  });

  EAU.check(function (error, last, body) {
    if (error) {
      if (error === 'no_update_available') { return false; }
      logger.error('API Error: %j', error)
      return false
    } else {
      if (body !== undefined) {
        const options = {
          type: 'info',
          title: 'A new version available',
          message: "v" + body.version,
          detail: "A new version available. Click the button below to download the latest version.",
          buttons: ["Update New Version"],
          cancelId: 1
        }
        dialog.showMessageBox(win, options, function (index) {
          if (index === 0) {
            // Update New Version
            var fileSize = formatBytes(body.size)
            progressBar = new ProgressBar({
              indeterminate: false,
              title: 'Downloading...',
              text: 'Preparing data...',
              detail: 'Wait...',
              browserWindow: {
                parent: win,
                icon: __static + '/img/icons/logo-32.png'
              },
              maxValue: fileSize.size, // File Size in 
            });

            progressBar.on('completed', function () {
              progressBar.detail = 'Downloading completed...';
            }).on('progress', function (value) {
              progressBar.detail = `Downloading ${value} ${fileSize.format} out of ${progressBar.getOptions().maxValue} ${fileSize.format}`;
            })
            .on('aborted', function () {
              dialog.showMessageBox(win, {
                type: 'warning',
                title: 'Download Aborted',
                message: 'Downloading Aborted.',
              }, function () {});
            });

            EAU.progress(function (state) {
              if (!progressBar.isCompleted()) {
                var transferredSizeMB = (state.size.transferred / Math.pow(1024,2)).toFixed(2)
                progressBar.value = parseFloat(transferredSizeMB)
              }
              // {
              //   "time": { "elapsed":63.327, "remaining":0.249 },
              //   "speed": 581835.2045730889,
              //   "percent": 0.996081191780516,
              //   "size": { "total":36990838, "transferred":36845878 }
              // }
            })

            EAU.download(function (error) {
              logger.log('Download progress : %j', error)
              if (error) {
                dialog.showErrorBox('info', error)
                return false
              }
              progressBar.setCompleted();
              dialog.showErrorBox('info', 'App updated successfully! Restart it please.')
            })
          }
        })
      }
    }
  })
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}