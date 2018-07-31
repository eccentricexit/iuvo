import React, { Component } from 'react'
import LoginPage from './LoginPage'
import { drizzleConnect } from 'drizzle-react'

class LoginContainer extends Component {
  render () {
    return <LoginPage />
  }
}

const mapStateToProps = () => {
  return {}
}

export default drizzleConnect(LoginContainer, mapStateToProps)
