import React, { Component } from 'react'
import ProfilePage from './ProfilePage'
import { drizzleConnect } from 'drizzle-react'
import { setUserData } from '../../actions'
import SetDoctorDialog from './SetDoctorDialog'
import { web3 } from '../../util/connectors'
import { waitForMined } from '../../util/waitForMined'

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
      'QmPHFmDDcaXWPu7yxUC3PnZBvo9B61MgxHu6YUTsH7C8hD',
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
    return (
      <div>
        <ProfilePage handleOpenSetDoctor={() => this.handleOpenSetDoctor()}/>
        <SetDoctorDialog 
          isOpen={isSetDoctorOpen} 
          handleSubmitSetDoctor={() => this.handleSubmitSetDoctor()} 
          handleCloseSetDoctor={() => this.handleCloseSetDoctor()}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ userData, uportContract }) => {
  return { userData, uportContract }
}

export default drizzleConnect(
  ProfilePageContainer, 
  mapStateToProps,  
  { setUserData }
)
