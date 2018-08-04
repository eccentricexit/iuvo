import {
  SET_UPORT_IUVO_CORE  
} from '../actions/types'

export function iuvoCoreByProxy (state = {}, action) {
  const { payload } = action
  switch (action.type) {
    case SET_UPORT_IUVO_CORE: {
      return {
        ...state,
        iuvoCoreByProxy: payload
      }
    }    
    default:
      return state
  }
}
