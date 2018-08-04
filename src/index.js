import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'

// Layouts
import App from './App'
import HomeContainer from './components/home/HomeContainer'
import ProfilePageContainer from './components/profile/ProfilePageContainer'
import AppointmentsPageContainer from './components/appointments/AppointmentsPageContainer'

import store from './store'

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  (
    <Provider store={store}>
      <Router history={history}>
        <Route path='/' component={App}>
          <IndexRoute component={HomeContainer} />
        </Route>
        <Route path='/profile' component={App}>
          <IndexRoute component={ProfilePageContainer} />
        </Route>
        <Route path='/appointments' component={App}>
          <IndexRoute component={AppointmentsPageContainer} />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
)
