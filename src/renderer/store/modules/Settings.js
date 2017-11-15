import LocalStore from './../../../utils/local-store'

const localStore = new LocalStore({
  configName: 'editor-settings',
  dirName: 'settings',
  defaults: {
    theme: 'Dracula',
    font: 'Fira Sans'
  }
})

const state = {
  localStore: localStore.data
}

const getters = {
  settings: state => state.localStore
}

const actions = {
  setSetting ({ commit }, payload) {
    commit('SET_SETTING', payload)
  }
}

const mutations = {
  SET_SETTING (state, payload) {
    localStore.set(payload.key, payload.val)
    state.localStore[payload.key] = payload.val
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
