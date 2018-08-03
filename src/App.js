import React, { Component } from 'react'
import ResponsiveDrawerContainer from '../src/components/drawer/ResponsiveDrawerContainer'
import LoginPageContainer from './components/login/LoginPageContainer'
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'
import './App.css'

class App extends Component {
  render () {
    const OnlyAuthPages = VisibleOnlyAuth(() =>
      <ResponsiveDrawerContainer currentPage='Home'>
        {this.props.children}
      </ResponsiveDrawerContainer>
    )

    const OnlyGuestPages = HiddenOnlyAuth(() =>
      <LoginPageContainer />
    )

    return (
      <div className='App'>
        <OnlyAuthPages />
        <OnlyGuestPages />
      </div>
    )
  }
}

export default App
