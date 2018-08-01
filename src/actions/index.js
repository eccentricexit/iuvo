import {
  SET_USER_DATA
} from '../actions/types'

export function setUserData (userData) {
  return {
    type: SET_USER_DATA,
    userData
  }
}
