import LocalStore from './local-store'

export function appConfig () {
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
  return localStore
}

export function editorSettings () {
  const localStore = new LocalStore({
    configName: 'user-config',
    dirName: 'settings',
    defaults: {
      alwaysOnTop: false,
      autoSave: true,
      colWidth: '11',
      currentDoc: 'untitled',
      documentDir: 'documents',
      focusMode: false,
      font: 'Roboto',
      fontSize: '1',
      justify: false,
      lineHeight: '2',
      theme: 'dracula',
      userDir: false,
      windowBounds: {
        width: 1024,
        height: 1024
      }
    }
  })
  return localStore
}
