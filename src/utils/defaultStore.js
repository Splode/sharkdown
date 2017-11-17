import LocalStore from './local-store'

export function editorSettings () {
  const localStore = new LocalStore({
    configName: 'editor-settings',
    dirName: 'settings',
    defaults: {
      theme: 'dracula',
      font: 'Roboto'
    }
  })
  return localStore
}

export function editorState () {
  const localStore = new LocalStore({
    configName: 'app-state',
    dirName: 'settings',
    defaults: {
      currentDoc: 'untitled',
      documentDir: 'documents',
      userDir: false
    }
  })
  return localStore
}
