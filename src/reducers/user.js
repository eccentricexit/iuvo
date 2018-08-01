import {
  SET_USER_DATA
} from '../actions/types'

export function userData (state = { initialized: false }, action) {
  const { userData } = action
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        initialized: true,
        userData
      }
    }
    default:
      return state
  }
}
