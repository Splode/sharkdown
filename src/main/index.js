'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'

import { editorSettings } from './../utils/default-store'

const localStore = editorSettings()

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
  let alwaysOnTop = localStore.get('alwaysOnTop')
  let { width, height } = localStore.get('windowBounds')
  console.log(localStore)
  createWindow({
    alwaysOnTop,
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

ipcMain.on('title-change', (event, arg) => {
  const title = `Waldo - ${arg}`
  mainWindow.setTitle(title)
})

ipcMain.on('toggle-alwaysOnTop', (event, arg) => {
  mainWindow.setAlwaysOnTop(arg)
})

ipcMain.on('window-close', (event, arg) => {
  mainWindow.close()
})

ipcMain.on('window-maximize', (event, arg) => {
  mainWindow.maximize()
})

ipcMain.on('window-unmaximize', (event, arg) => {
  mainWindow.unmaximize()
})

ipcMain.on('window-minimize', (event, arg) => {
  mainWindow.minimize()
})

function createWindow (opts) {
  mainWindow = new BrowserWindow({
    alwaysOnTop: opts.alwaysOnTop,
    backgroundColor: '#282a36',
    frame: false,
    show: false,
    useContentSize: true,
    width: opts.width,
    height: opts.height
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

  mainWindow.on('resize', () => {
    const windowIsMaximized = mainWindow.isMaximized()
    mainWindow.webContents.send('win-resized', windowIsMaximized)
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
