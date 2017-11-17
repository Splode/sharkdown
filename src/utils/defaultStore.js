import LocalStore from './local-store'

export function editorSettings () {
  const localStore = new LocalStore({
    configName: 'app-state',
    dirName: 'settings',
    defaults: {
      currentDoc: 'untitled',
      documentDir: 'documents',
      userDir: false,
      theme: 'dracula',
      font: 'Roboto',
      fontSize: '16'
    }
  })
  return localStore
}
