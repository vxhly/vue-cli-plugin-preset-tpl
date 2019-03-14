import {
  EXAMPLE
} from '../types/example-types'

const example = {
  namespaced: true,

  state: {
    example:''
  },

  mutations: {
    [EXAMPLE]: (state, payload) => {
      state.example = payload
    }
  },

  actions: {
    changeExample ({ commit }, payload) {
      commit(EXAMPLE, payload)
    }
  },

  getters: {
    example: state => state.example
  }
}

export default example
