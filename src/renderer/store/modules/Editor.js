import LocalStore from './../../../utils/local-store'

const localStore = new LocalStore({
  configName: 'app-state',
  dirName: 'settings',
  defaults: {
    currentDoc: 'untitled',
    documentDir: 'documents'
  }
})

const state = {
  localStore: localStore.data
}

const getters = {
  editor: state => state.localStore
}

const actions = {
  setState ({ commit }, payload) {
    commit('SET_STATE', payload)
  }
}

const mutations = {
  SET_STATE (state, payload) {
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
