import {
  USER_LOGGED_IN
} from '../actions/types'

const initialState = {
  data: null,
  isLoading: true
}

export function userReducer (state = initialState, action) {
  const { userData } = action
  switch (action.type) {
    case 'USER_LOGGED_IN':
      return Object.assign({}, state, {
        data: action.payload
      })
    case 'USER_LOGGED_OUT':
      return Object.assign({}, state, {
        data: null
      })
    default:
      return state
  }
}
