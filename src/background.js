'use strict'

import { app, protocol, BrowserWindow, ipcMain, dialog, globalShortcut, ipcRenderer } from 'electron'
import { createProtocol, installVueDevtools } from 'vue-cli-plugin-electron-builder/lib'

const APPP = require('../package.json') // Load Package JSON File

const isDevelopment = process.env.NODE_ENV !== 'production'

// Main Window
let win

// Standard scheme must be registered before the app is ready
protocol.registerStandardSchemes(['app'], { secure: true })
function createWindow() {

  // console.log(process.env.INIT_CWD); // F:\Project\_Projects\Easy Typing\EasyTyping-Electron\easy-typing
  // console.log(__dirname); // F:\Project\_Projects\Easy Typing\EasyTyping-Electron\easy-typing\dist_electron
  // console.log(__static); // F:\Project\_Projects\Easy Typing\EasyTyping-Electron\easy-typing\public

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

  // require('update-electron-app')()
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


/**
 * Show About Window (toggle-about-win)
 */
ipcMain.on('toggle-about-win', (event, arg) => {
  const options = {
    type: 'info',
    title: 'About',
    message: APPP.productName,
    detail: "Version: " + APPP.version + "\nDate: " + APPP.date + "\nNode: " + process.versions.node + "\nChrome: " + process.versions.chrome + "\nElectron : " + process.versions.electron,
  }
  dialog.showMessageBox(options, function () { })
})

/**
 * Show Welcome Menu (toggle-welcome-win)
 */
ipcMain.on('toggle-welcome-win', (event, arg) => {
  const options = {
    type: 'info',
    title: 'Welcome',
    message: APPP.productName + " " + APPP.version,
    detail: "To Use Hindi (Inscript, Kruti Dev) and English Typing and Test, Download the Application or use online",
  }
  dialog.showMessageBox(options, function () { })
})

/**
 * Show Welcome Menu (open-updates-win)
 */
ipcMain.on('open-updates-win', (event, arg) => {
  if (arg === "alreadyUpdate") {
    const options = {
      type: 'error',
      title: APPP.productName + ' is up to date',
      detail: "There is no update to the application right now. ♥ Enjoy",
    }
    dialog.showMessageBox(options, function () {})

  } else {
    const options = {
      type: 'info',
      title: 'A new version available',
      message: "v"+ arg,
      detail: "A new version available. Click the button below to download the latest version.",
      buttons: ['Download New Version'],
      cancelId: 1
    }
    dialog.showMessageBox(options, function (index) {
      event.sender.send('updates-dialog-selection', index)
    })
  }
})