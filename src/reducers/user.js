import {
  SET_USER_DATA  
} from '../actions/types'

export function userData (state = {}, action) {
  const { userData } = action
  switch (action.type) {
    case SET_USER_DATA: {      
      return {
        userData
      }
    }    
    default:
      return state
  }
}