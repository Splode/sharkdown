const state = {
  title: null,
  lastSaveTime: null,
  wordCount: null
}

const getters = {
  editorState: state => state
}

const actions = {
  setEditorState ({ commit }, payload) {
    commit('SET_VIEW_STATE', payload)
  }
}

const mutations = {
  SET_EDITOR_STATE (state, payload) {
    state[payload.key] = payload.val
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
