import React, { Component } from 'react'
import LoginPage from './LoginPage'
import { uport, web3 } from '../../util/connectors'
import { decode as mnidDecode } from 'mnid'
import { connect } from 'react-redux'
import { setUserData, setUportIuvoCoreInstance, setDoctor, addAppointment } from '../../actions'
import {
  getIuvoCoreReference,
  updateLocalDoctorsData,
  updateLocalAppointmentsData
} from '../../util/iuvoUtils'

class LoginPageContainer extends Component {
  handleClick () {
    const { setUserData, setUportIuvoCoreInstance, setDoctor, addAppointment } = this.props
    uport.requestCredentials({requested: ['name', 'avatar']}).then(credentials => {
      credentials.decodedID = mnidDecode(credentials.address)
      credentials.specificNetworkAddress = credentials.decodedID.address
      console.info('Got user data: ', credentials)
      setUserData(credentials)

      const iuvoCoreByProxy = getIuvoCoreReference(web3)
      setUportIuvoCoreInstance(iuvoCoreByProxy)
      updateLocalDoctorsData(iuvoCoreByProxy, setDoctor)
      updateLocalAppointmentsData(
        iuvoCoreByProxy,
        credentials.specificNetworkAddress,
        addAppointment,
        web3
      )
    }).catch(err => {
      console.error(err)
    })
  }

  render () {
    const { userData } = this.props
    const isOpen = !userData
    return <LoginPage isOpen={isOpen} handleClick={() => this.handleClick()} />
  }
}

const mapStateToProps = ({ userData }) => {
  return { userData }
}

export default connect(
  mapStateToProps,
  {
    setUserData,
    setUportIuvoCoreInstance,
    setDoctor,
    updateLocalAppointmentsData,
    addAppointment
  }
)(LoginPageContainer)
