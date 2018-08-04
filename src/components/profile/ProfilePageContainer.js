import React, { Component } from 'react'
import DoctorForm from './DoctorForm'
import NotRegistered from './NotRegistered'
import { setUserData } from '../../actions'
import { web3 } from '../../util/connectors'
import { waitForMined } from '../../util/waitForMined'
import { connect } from 'react-redux'

class ProfilePageContainer extends Component {
  state = {
    isSettingDoctor: false,
    doctor: null
  }

  updateDoctor = doctor => {
    const { iuvoCoreByProxy } = this.props
    console.info('iuvoCoreByProxy',iuvoCoreByProxy)
    iuvoCoreByProxy.iuvoCoreByProxy.setDoctor(
      doctor.name,
      doctor.bio,
      doctor.profilePicIpfsAddr,
      doctor.contractIpfsAddr,
      (err,txHash) => {
        if(err) { throw err }
        waitForMined(
          txHash,
          { blockNumber: null},
          web3,
          function pendingCB () {
            console.info('pending...')
          },
          function successCB (data) {
            console.info('success!')
          }
        )
    })    
  }

  handleToggleEdit = () => {
    this.setState({
      isSettingDoctor: !this.state.isSettingDoctor
    })
  } 

  handleDeleteDoctor(){
    console.info('TODO')
  }
  
  componentWillReceiveProps(nextProps){
    const { iuvoData, userData } = nextProps       
    const docFromRedux = iuvoData.doctors[userData.specificNetworkAddress]
    console.info('docFromRedux',docFromRedux)
  }

  render () {
    const { iuvoData, userData } = this.props        
    const docFromRedux = iuvoData.doctors[userData.specificNetworkAddress]
    if(docFromRedux && !this.state.doctor){
      this.setState({
        doctor: docFromRedux
      })
    }
    console.info('docFromRedux',docFromRedux)
    console.info('doctor from stat',this.state.doctor)

    return (
      <div>
        {!this.state.doctor || !this.state.doctor.doctorAddr
          ? <NotRegistered handleToggleEdit={this.handleToggleEdit} />
          : <DoctorForm 
              isSettingDoctor={this.state.isSettingDoctor}
              handleToggleEdit={this.handleToggleEdit}
              updateDoctor={this.updateDoctor}
              doctor={this.state.doctor}
            />
        }
      </div>
    )
  }
}

const mapStateToProps = ({ userData, iuvoData, iuvoCoreByProxy }) => {
  return { userData, iuvoData, iuvoCoreByProxy }
}

export default connect(mapStateToProps, { setUserData })(ProfilePageContainer)