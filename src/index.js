import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { DrizzleProvider } from 'drizzle-react'

// Layouts
import App from './App'
import HomeContainer from './components/home/HomeContainer'
import ProfilePageContainer from './components/profile/ProfilePageContainer'
import AppointmentsPageContainer from './components/appointments/AppointmentsPageContainer'
import { LoadingContainer } from 'drizzle-react-components'

import store from './store'
import drizzleOptions from './drizzleOptions'

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  (
    <DrizzleProvider options={drizzleOptions} store={store}>
      <LoadingContainer>
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
      </LoadingContainer>
    </DrizzleProvider>
  ),
  document.getElementById('root')
)
