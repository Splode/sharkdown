import { editorSettings } from '../../../utils/default-store'

const localStore = editorSettings()

const state = {
  localStore: localStore
}

const getters = {
  userDataPath: state => state.localStore.userDataPath,
  settings: state => state.localStore.data
}

const actions = {
  setSetting ({ commit }, payload) {
    commit('SET_SETTING', payload)
  }
}

const mutations = {
  SET_SETTING (state, payload) {
    localStore.set(payload.key, payload.val)
    state.localStore.data[payload.key] = payload.val
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
