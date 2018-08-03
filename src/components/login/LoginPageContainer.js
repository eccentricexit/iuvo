import React, { Component } from 'react'
import LoginPage from './LoginPage'
import { drizzleConnect } from 'drizzle-react'
import { uport } from '../../util/connectors'
import { setUserData } from '../../actions'
import { decode as mnidDecode } from 'mnid'

class LoginPageContainer extends Component {
  handleClick () {
    const { setUserData } = this.props
    uport.requestCredentials({requested: ['name', 'avatar']}).then(credentials => {
      console.info('uport addr: ',credentials.address)
      credentials.decodedID = mnidDecode(credentials.address)
      credentials.specificNetworkAddress = credentials.decodedID.address
      setUserData(credentials)
    })
  }

  render () {
    const { userData } = this.props
    const isOpen = !userData
    return <LoginPage isOpen={isOpen} handleClick={() => this.handleClick()} />
  }
}

const mapStateToProps = ({userData}) => {
  return {userData}
}

export default drizzleConnect(
  LoginPageContainer,
  mapStateToProps,
  { setUserData }
)
