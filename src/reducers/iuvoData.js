import {
  SET_DOCTOR
} from '../actions/types'

export function iuvoData (state = { doctors: {}}, action) {
  const { payload } = action
  switch (action.type) {
    case SET_DOCTOR: {
      const doctor = payload
      const doctors = Object.assign(...state.doctors, { [doctor.doctorAddr]: doctor })
      return {
        ...state,
        doctors
      }
    }
    default:
      return state
  }
}
