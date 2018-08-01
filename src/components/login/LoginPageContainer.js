import React, { Component } from 'react'
import LoginPage from './LoginPage'
import { drizzleConnect } from 'drizzle-react'
import { uport } from '../../util/connectors'
import { setUserData } from '../../actions'

class LoginContainer extends Component {
  handleClick(){
    const { setUserData } = this.props
    uport.requestCredentials({requested: ['name','avatar']}).then(credentials => {
      setUserData(credentials)
    })
  }

  render () {
    const { userData } = this.props
    console.info('userData',userData)
    const isOpen = userData ? false : true
    return <LoginPage isOpen={isOpen} handleClick={() => this.handleClick()} />
  }
}

const mapStateToProps = ({userData}) => {
  return {userData}
}

export default drizzleConnect(
  LoginContainer, 
  mapStateToProps,  
  { setUserData }
)
