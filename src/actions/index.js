import {
  SET_USER_DATA,
  SET_UPORT_IUVO_CORE,
  SET_DOCTOR,
  DELETE_DOCTOR,
  ADD_APPOINTMENT
} from './types'

export function addAppointment (appointment) {
  console.info('creating add appointment action for: ', appointment)
  return {
    type: ADD_APPOINTMENT,
    payload: appointment
  }
}

export function deleteDoctor (address) {
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
