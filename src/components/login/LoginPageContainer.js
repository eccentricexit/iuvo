import React, { Component } from 'react'
import LoginPage from './LoginPage'
import { uport } from '../../util/connectors'
import { setUserData, setUportIuvoCoreInstance, setDoctor } from '../../actions'
import { decode as mnidDecode } from 'mnid'
import { web3 } from '../../util/connectors'
import { connect } from 'react-redux'
import { getIuvoCoreReference, doctorFromArray } from '../../util/iuvoUtils'
import { ipfs } from '../../util/getIpfs'

class LoginPageContainer extends Component {
  handleClick () {
    const { setUserData, setUportIuvoCoreInstance, setDoctor } = this.props
    uport.requestCredentials({requested: ['name', 'avatar']}).then(credentials => {
      credentials.decodedID = mnidDecode(credentials.address)
      credentials.specificNetworkAddress = credentials.decodedID.address
      setUserData(credentials)

      const iuvoCoreByProxy = getIuvoCoreReference(web3)
      setUportIuvoCoreInstance(iuvoCoreByProxy)

      // Callback hell since we don't have a Promise powered uPort web3 yet.
      iuvoCoreByProxy.doctorsArrayLength.call(
        (err, res) => {
          if (err) { throw err }

          const numDocs = res.toNumber()

          for (let i = 0; i < numDocs; i++) {
            iuvoCoreByProxy.doctors(i, (err, res) => {
              if (err) { throw err }
              const doctor = doctorFromArray(res)
              setDoctor(doctor)

              ipfs.files.cat(doctor.profilePicIpfsAddr, (err, file) => {
                if (err) { throw err }
                doctor.imgRaw = 'data:image/png;base64,' + file.toString('base64')
                setDoctor(doctor)
              })
            })
          }
        }
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
  { setUserData, setUportIuvoCoreInstance, setDoctor }
)(LoginPageContainer)
