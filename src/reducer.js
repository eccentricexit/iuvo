import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { drizzleReducers } from 'drizzle'
import { userData } from './reducers/user'
import { uportContract } from './reducers/iuvoCore.js'

const reducer = combineReducers({
  routing: routerReducer,
  userData,
  uportContract,
  ...drizzleReducers
})

export default reducer
