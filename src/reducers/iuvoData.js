import {
  SET_DOCTOR,
  DELETE_DOCTOR
} from '../actions/types'

export function iuvoData (state = { doctors: {} }, action) {
  const { payload } = action
  switch (action.type) {
    case SET_DOCTOR: {
      const doctor = payload
      const newDoctors = {
        ...state.doctors,
        [doctor.doctorAddr]: doctor
      }
      return {
        ...state,
        doctors: newDoctors
      }
    }
    case DELETE_DOCTOR: {
      console.info('received delete doctor request')
      const address = payload
      const newState = { ...state }
      newState.doctors[address] = {}
      delete newState.doctors[address]
      console.info('state after deleting doctor of addr:', newState)
      return newState
    }
    default:
      return state
  }
}
