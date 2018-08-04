import React, { Component } from 'react'
import ProfilePage from './ProfilePage'
import { setUserData } from '../../actions'
import SetDoctorDialog from './SetDoctorDialog'
import { web3 } from '../../util/connectors'
import { waitForMined } from '../../util/waitForMined'
import { connect } from 'react-redux'

class ProfilePageContainer extends Component {
  state = {
    isSetDoctorOpen: false
  }

  handleOpenSetDoctor(){
    this.setState({
      isSetDoctorOpen: true
    })
  }

  handleCloseSetDoctor(){
    this.setState({
      isSetDoctorOpen: false
    })
  }

  handleSubmitSetDoctor(){
    const { iuvoCoreByProxy } = this.props.uportContract
    iuvoCoreByProxy.setDoctor(
      'Dr. John McClaine',
      'Building relationships one happy patient at a time',
      'QmThprKyc4eFS1xDTW1s8jd2Zhhsxj9vTW3UDHhLiFXBZW',
      'QmeKSTWokWbyJ8BG122WLty4adXi1mXEee2evxuHQWNfYm',
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

  render () {
    const { isSetDoctorOpen } = this.state
    console.info('userData',this.props.userData)
    return (
      <div>
        <ProfilePage handleOpenSetDoctor={() => this.handleOpenSetDoctor()} {...this.props}/>
        <SetDoctorDialog 
          isOpen={isSetDoctorOpen} 
          handleSubmitSetDoctor={() => this.handleSubmitSetDoctor()} 
          handleCloseSetDoctor={() => this.handleCloseSetDoctor()}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ userData, iuvoData }) => {
  return { userData, iuvoData }
}

export default connect(mapStateToProps, { setUserData })(ProfilePageContainer)