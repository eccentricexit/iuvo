import {
  SET_USER_DATA,
  SET_UPOR_IUVO_CORE
} from '../actions/types'

export function setUserData (userData) {
  return {
    type: SET_USER_DATA,
    userData
  }
}

export function setUportIuvoCoreInstance(iuvoCoreByProxy){
  return {
    type: SET_UPOR_IUVO_CORE,
    iuvoCoreByProxy
  }
}
