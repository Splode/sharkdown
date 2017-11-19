'use strict'

import { app, BrowserWindow } from 'electron'

import LocalStore from './../utils/local-store'

const localStore = new LocalStore({
  configName: 'app-config',
  dirName: 'settings',
  defaults: {
    windowBounds: {
      width: 1024,
      height: 1024
    }
  }
})

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`
// const menu = new Menu()

app.on('ready', () => {
  let { width, height } = localStore.get('windowBounds')
  console.log(localStore)
  createWindow({
    width,
    height
  })
  // Menu.setApplicationMenu(menu)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

function createWindow (opts) {
  mainWindow = new BrowserWindow({
    backgroundColor: '#282a36',
    width: opts.width,
    height: opts.height,
    show: false,
    useContentSize: true
  })

  mainWindow.loadURL(winURL)

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.on('resize', () => {
    let { width, height } = mainWindow.getBounds()
    localStore.set('windowBounds', {
      width,
      height
    })
  })
}

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
