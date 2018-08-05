import React, { Component } from 'react'
import DoctorForm from './DoctorForm'
import NotRegistered from './NotRegistered'
import { setUserData } from '../../actions'
import { connect } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'
import { web3 } from '../../util/connectors'
import { waitForMined } from '../../util/waitForMined'


class ProfilePageContainer extends Component {
  state = {
    isSettingDoctor: false,
    doctor: null,
    txPendingOpen: false,
    txConfirmedOpen: false
  }

  updateDoctor = doctor => {
    const { iuvoCoreByProxy } = this.props
    const componentContext = this

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
            componentContext.setState({ txPendingOpen: true })
          },
          function successCB (data) {            
            componentContext.setState({ 
              txPendingOpen: false,
              txConfirmedOpen: true
            })
          }
        )
    }) 
  }

  handleCloseTxConfirmed = () => {
    this.setState({ txConfirmedOpen: false })
  }

  handleToggleEdit = () => {
    this.setState({ isSettingDoctor: !this.state.isSettingDoctor  })
  } 

  handleDeleteDoctor(){
    console.info('TODO')
  }

  componentWillReceiveProps () {
    const { iuvoData, userData } = this.props
    const docFromRedux = iuvoData.doctors[userData.specificNetworkAddress]
    if(docFromRedux && !this.state.doctor){
      this.setState({ doctor: docFromRedux })
    }
  }

  render () {
    return (
      <div>
        {!this.state.doctor || !this.state.doctor.doctorAddr
          ? <NotRegistered handleToggleEdit={this.handleToggleEdit} />
          : <DoctorForm 
              isTxPending={this.state.txPendingOpen}
              isSettingDoctor={this.state.isSettingDoctor}
              handleToggleEdit={this.handleToggleEdit}
              updateDoctor={this.updateDoctor}
              doctor={this.state.doctor}
            />
        }
        <Snackbar
          key='notif-transaction-pending'
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={this.state.txPendingOpen}
          ContentProps={{
            'aria-describedby': 'msg-tx-pending',
          }}
          message={<span id="msg-tx-pending">Transaction pending...</span>}
        />
        <Snackbar
          key='notif-transaction-confirmed'
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          onClose={this.handleCloseTxConfirmed}
          open={this.state.txConfirmedOpen}
          autoHideDuration={6000}
          ContentProps={{
            'aria-describedby': 'msg-tx-confirmed',
          }}
          message={<span id="msg-tx-confirmed">Transaction confirmed!</span>}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ userData, iuvoData, iuvoCoreByProxy }) => {
  return { userData, iuvoData, iuvoCoreByProxy }
}

export default connect(mapStateToProps, { setUserData })(ProfilePageContainer)