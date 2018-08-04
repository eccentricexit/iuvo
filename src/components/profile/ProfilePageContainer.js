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
    statefulDoctor: null
  }

  updateStatefulDoctor = doctor => {
    this.state({
      statefulDoctor: doctor
    })
  }

  handleToggleEdit(){
    this.setState({
      isSettingDoctor: !this.state.isSettingDoctor
    })
  } 

  handleDeleteDoctor(){
    console.info('TODO')
  }  

  render () {
    const { iuvoData } = this.props
    const doctor = iuvoData.doctors[userData.specificNetworkAddress]    
    const { isSettingDoctor, userData, statefulDoctor } = this.state
    if(doctor && !statefulDoctor){
      this.setState({
        statefulDoctor : doctor
      })
    }
    console.info('statfulDoctor',statefulDoctor)

    return (
      <div>
        {!statefulDoctor || !statefulDoctor.doctorAddr
          ? <NotRegistered handleToggleEdit={this.handleToggleEdit} />
          : <DoctorForm 
              isSettingDoctor={isSettingDoctor} 
              updateDoctor={this.updateStatefulDoctor}
              doctor={statefulDoctor}
            />
        }
      </div>
    )
  }
}

const mapStateToProps = ({ userData, iuvoData }) => {
  return { userData, iuvoData }
}

export default connect(mapStateToProps, { setUserData })(ProfilePageContainer)