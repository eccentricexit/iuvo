import {
  SET_UPOR_IUVO_CORE
} from '../actions/types'

// We have to keep a separate store for uPort contract instances alongside
// drizzle's, because the two don't integrate well right now. Specifically,
// we would need to make drizzle use uPort's web3.
export function uportContract (state = {}, action) {
  const { iuvoCoreByProxy } = action
  switch (action.type) {
    case SET_UPOR_IUVO_CORE: {
      return {
        iuvoCoreByProxy
      }
    }
    default:
      return state
  }
}
