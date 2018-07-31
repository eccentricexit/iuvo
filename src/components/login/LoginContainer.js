import React, { Component } from 'react'
import Login from './Login'
import { drizzleConnect } from 'drizzle-react'

class LoginContainer extends Component {
  render () {
    return <Login />
  }
}

const mapStateToProps = () => {
  return {    
  }
}

export default drizzleConnect(LoginContainer, mapStateToProps)
