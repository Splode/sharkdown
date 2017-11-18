const state = {
  drawerComponent: '',
  drawerOpen: false
}

const getters = {
  viewState: state => state
}

const actions = {
  setViewState ({ commit }, payload) {
    commit('SET_VIEW_STATE', payload)
  }
}

const mutations = {
  SET_VIEW_STATE (state, payload) {
    state[payload.key] = payload.val
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
