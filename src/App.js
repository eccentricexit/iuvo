import React, { Component } from 'react'
import ResponsiveDrawerContainer from '../src/layouts/drawer/ResponsiveDrawerContainer'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'
import './App.css'
import LoginContainer from './layouts/login/LoginContainer'

class App extends Component {
  render () {
    const { userData } = this.props
    return (
      <div className='App'>
        {userData
          ?(<ResponsiveDrawerContainer currentPage='Home'>
            {this.props.children}
            </ResponsiveDrawerContainer>)
          : <LoginContainer />
        }
      </div>
    )
  }
}

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = ({ userData }) => {
  return {
    userData
  }
}

App.contextTypes = {
  drizzle: PropTypes.object
}

export default drizzleConnect(App, mapStateToProps)
