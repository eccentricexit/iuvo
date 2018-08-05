import {
  SET_USER_DATA,
  SET_UPORT_IUVO_CORE,
  SET_DOCTOR,
  DELETE_DOCTOR
} from './types'

export function deleteDoctor (address) {
  console.info('creating delete doctor action for: ', address)
  return {
    type: DELETE_DOCTOR,
    payload: address
  }
}

export function setUserData (userData) {
  return {
    type: SET_USER_DATA,
    payload: userData
  }
}

export function setUportIuvoCoreInstance (iuvoCoreByProxy) {
  return {
    type: SET_UPORT_IUVO_CORE,
    payload: iuvoCoreByProxy
  }
}

export function setDoctor (doctor) {
  console.info('sending setDoctor')
  return {
    type: SET_DOCTOR,
    payload: doctor
  }
}
