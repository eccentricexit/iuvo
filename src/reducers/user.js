import {
  SET_USER_DATA
} from '../actions/types'

export function userData (state = { initialized: false }, action) {
  const { payload } = action
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        initialized: true,
        userData: payload
      }
    }
    default:
      return state
  }
}
