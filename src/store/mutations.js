import * as types from './mutation-types'

const mutatioins = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  }
}

export default mutatioins
