import {
  SET_DOCTOR
} from '../actions/types'

export function iuvoData (state = {}, action) {
  const { payload } = action
  switch (action.type) {
    case SET_DOCTOR: {
      return {
        ...state,
        [payload.doctorAddr]: payload
      }
    }
    default:
      return state
  }
}
