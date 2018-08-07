import {
  SET_DOCTOR,
  DELETE_DOCTOR,
  ADD_APPOINTMENT
} from '../actions/types'

export function iuvoData (state = { doctors: {}, appointments: [] }, action) {
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
      const address = payload
      const newState = { ...state }
      newState.doctors[address] = {}
      delete newState.doctors[address]
      return newState
    }
    case ADD_APPOINTMENT: {
      console.info('received add appointment request')
      const appointment = payload
      const newState = { ...state }
      newState.appointments.push(appointment)
      return newState
    }
    default:
      return state
  }
}
