import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT
} from '../actions/types'

export function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user
  }
}

function userLoggedOut(user) {
  return {
    type: USER_LOGGED_OUT,
    payload: user
  }
}