import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { drizzleReducers } from 'drizzle'
import { userData } from './reducers/user'

const reducer = combineReducers({
  routing: routerReducer,
  userData,
  ...drizzleReducers
})

export default reducer
