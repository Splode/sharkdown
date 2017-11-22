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
      currentDoc: 'untitled',
      documentDir: 'documents',
      userDir: false,
      theme: 'dracula',
      font: 'Roboto',
      fontSize: '1',
      lineHeight: '2',
      colWidth: '11',
      autoSave: true,
      focusMode: false
    }
  })
  return localStore
}
