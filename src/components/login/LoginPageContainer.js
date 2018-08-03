import React, { Component } from 'react'
import LoginPage from './LoginPage'
import { drizzleConnect } from 'drizzle-react'
import { uport } from '../../util/connectors'
import { setUserData, setUportIuvoCoreInstance } from '../../actions'
import { decode as mnidDecode } from 'mnid'
import { web3 } from '../../util/connectors'
import IuvoCoreJson from '../../../build/contracts/IuvoCore.json'
import PausableProxyJson from '../../../build/contracts/PausableProxy.json'

class LoginPageContainer extends Component {
  handleClick () {
    const { setUserData } = this.props
    uport.requestCredentials({requested: ['name', 'avatar']}).then(credentials => {
      console.info('uport addr: ',credentials.address)
      credentials.decodedID = mnidDecode(credentials.address)
      credentials.specificNetworkAddress = credentials.decodedID.address
      setUserData(credentials)
      
      // We need to use uPort's web3 to sign transactions with it.
      const IuvoCoreJsonAbi = IuvoCoreJson.abi
      const IuvoCore = web3.eth.contract(IuvoCoreJsonAbi)
      
      // We do not reference the IuvoCore contract directly, instead we reference 
      // the proxy contract. This is part of the upgradable pattern.
      const pausableProxyAddress = PausableProxyJson.networks[process.env.NETWORK_ID].address
      const iuvoCoreByProxy = IuvoCore.at(pausableProxyAddress)
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
  { setUserData, setUportIuvoCoreInstance }
)
