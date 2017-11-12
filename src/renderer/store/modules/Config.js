import LocalStore from './../../../utils/local-store'

const localStore = new LocalStore({
  configName: 'user-preferences',
  defaults: {
    theme: 'Dracula'
  }
})

const state = {
  settings: localStore.data
}

export default {
  state
}
