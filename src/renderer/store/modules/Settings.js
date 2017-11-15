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
  settings: localStore.data
}

const getters = {
  settings: state => state.settings
}

const actions = {
  setState ({ commit }, payload) {
    commit('SET_STATE', payload)
  }
}

const mutations = {
  SET_STATE (state, payload) {
    localStore.set(payload.key, payload.val)
    state.settings[payload.key] = payload.val
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
