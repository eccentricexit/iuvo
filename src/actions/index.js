import {
  SET_USER_DATA,
  SET_UPORT_IUVO_CORE,
  SET_DOCTOR
} from './types'

export function setUserData (payload) {
  return {
    type: SET_USER_DATA,
    payload
  }
}

export function setUportIuvoCoreInstance (payload) {
  return {
    type: SET_UPORT_IUVO_CORE,
    payload
  }
}

export function setDoctor (payload) {
  return {
    type: SET_DOCTOR,
    payload
  }
}
