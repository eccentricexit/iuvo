import React, { Component } from 'react'
import LoginPage from './LoginPage'
import { uport } from '../../util/connectors'
import { setUserData, setUportIuvoCoreInstance, setDoctor } from '../../actions'
import { decode as mnidDecode } from 'mnid'
import { web3 } from '../../util/connectors'
import { connect } from 'react-redux'
import { getIuvoCoreReference } from '../../util/iuvoUtils'

class LoginPageContainer extends Component {
  handleClick () {
    const { setUserData, setUportIuvoCoreInstance, setDoctor } = this.props
    uport.requestCredentials({requested: ['name', 'avatar']}).then(credentials => {              
      credentials.decodedID = mnidDecode(credentials.address)
      credentials.specificNetworkAddress = credentials.decodedID.address        
      setUserData(credentials)
      
      const iuvoCoreByProxy = getIuvoCoreReference(web3)
      setUportIuvoCoreInstance(iuvoCoreByProxy)
      
      const userAddr = credentials.specificNetworkAddress
      // We need to iterate through each doctor since the evm can't return
      // struct arrays yet.
      iuvoCoreByProxy.doctorsArrayLength.call(
        userAddr,
        (err,res) => {
          if (err) { throw err }
          const numDocs = res.toNumber()
          console.info('numDocs',numDocs)
          const doctorsList = []
          for(let i = 0; i < numDocs ; i++){
            // iuvoCoreByProxy.doctors(i,(err,res) => {
            //   console.info('doctor: ',res)
            //   // setDoctor(res)
            // })
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