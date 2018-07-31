import {
  SET_USER_DATA
} from '../actions/types'

export function setNetwork (userData) {
  return {
    type: SET_USER_DATA,
    userData
  }
}

