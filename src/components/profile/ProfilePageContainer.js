import React, { Component } from 'react'
import ProfilePage from './ProfilePage'
import { setUserData } from '../../actions'
import { web3 } from '../../util/connectors'
import { waitForMined } from '../../util/waitForMined'
import { connect } from 'react-redux'

class ProfilePageContainer extends Component {
  state = {
    isSettingDoctor: false
  }

  handleToggleEdit(){
    this.setState({
      isSettingDoctor: !this.state.isSettingDoctor
    })
  } 


  handleDeleteDoctor(){
    console.info('TODO')
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
    const { isSettingDoctor } = this.state
    return (
      <div>
        <ProfilePage 
          isSettingDoctor={isSettingDoctor}
          handleToggleEdit={() => this.handleToggleEdit()}
          handleSubmitSetDoctor={() => this.handleSubmitSetDoctor()}
          handleDeleteDoctor={() => this.handleDeleteDoctor()}
          {...this.props}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ userData, iuvoData }) => {
  return { userData, iuvoData }
}

export default connect(mapStateToProps, { setUserData })(ProfilePageContainer)