import React, { Component } from 'react'
import HireForm from './HireForm'
import { connect } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'
import { web3 } from '../../util/connectors'
import { waitForMined } from '../../util/waitForMined'
import { updateLocalAppointmentsData } from '../../util/iuvoUtils'
import { setUserData, setDoctor, deleteDoctor, addAppointment } from '../../actions'

class HireDoctorContainer extends Component {
  state = {
    txPendingOpen: false,
    txConfirmedOpen: false
  }

  handleRequestService = (doctor,arbitrator,timeout) => {
    const { iuvoCoreByProxy, userData, addAppointment } = this.props
    const componentContext = this    

    iuvoCoreByProxy.iuvoCoreByProxy.hireDoctor(
      doctor.doctorAddr,
      doctor.contractIpfsAddr,
      arbitrator,
      'kleros.io',
      timeout,
      '0x0',
      (err,txHash) => {
        if(err) { throw err }
        waitForMined(
          txHash,
          { blockNumber: null },
          web3,
          function pendingCB () {
            componentContext.setState({ txPendingOpen: true })
          },
          function successCB () {
            componentContext.setState({ 
              txPendingOpen: false,
              txConfirmedOpen: true
            })

            updateLocalAppointmentsData(
              iuvoCoreByProxy,
              userData,
              addAppointment
            )
          }
        )
      }
    )

  }


  handleViewContract = (doctor) => {
    const contractTab = window.open(
      `https://gateway.ipfs.io/ipfs/${doctor.contractIpfsAddr}`,
      '_blank'
    )
    contractTab.focus()
  }

  handleCloseTxConfirmed = () => {
    this.setState({ txConfirmedOpen: false })
  }
  
  render () {
    const { iuvoData, doctorAddr } = this.props
    const doctor = iuvoData.doctors[doctorAddr]

    return (
      <div>
        {doctor
        ? <HireForm 
            isTxPending={this.state.txPendingOpen}
            handleViewContract={this.handleViewContract}
            handleRequestService={this.handleRequestService}
            doctor={doctor}
          />
        : <h1>404!</h1>
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

const mapStateToProps = ({ userData, iuvoData, iuvoCoreByProxy }, ownProps) => {
  return { 
    doctorAddr: ownProps.params.id,
    userData,
    iuvoData,
    iuvoCoreByProxy
  }
}

export default connect(
  mapStateToProps, 
  { setUserData, setDoctor, deleteDoctor, addAppointment }
)(HireDoctorContainer)