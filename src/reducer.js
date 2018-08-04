import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux/lib'
import { userData } from './reducers/user'
import { iuvoCoreByProxy } from './reducers/iuvoCoreByProxy'
import { iuvoData } from './reducers/iuvoData'

const reducer = combineReducers({
  routing: routerReducer,
  userData,
  iuvoCoreByProxy,
  iuvoData,
})

export default reducer
