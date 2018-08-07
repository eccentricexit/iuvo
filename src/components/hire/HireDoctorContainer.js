import React, { Component } from 'react'
import HireForm from './HireForm'
import { setUserData, setDoctor, deleteDoctor } from '../../actions'
import { connect } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'
import { web3 } from '../../util/connectors'
import { waitForMined } from '../../util/waitForMined'

class HireDoctorContainer extends Component {
  state = {
    txPendingOpen: false,
    txConfirmedOpen: false
  }

  handleRequestService = (doctor,arbitrator,timeout) => {
    console.info('request service from container: ',doctor)
    const { iuvoCoreByProxy } = this.props
    const componentContext = this

    console.info('data:', doctor.doctorAddr)
    console.info('data:', doctor.contractIpfsAddr)
    console.info('data:', arbitrator)
    console.info('data:', 'kleros.io')
    console.info('data:', timeout)
    console.info('data:', '0x0')

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
          function successCB (data) {
            console.info('success data',data)
            componentContext.setState({ 
              txPendingOpen: false,
              txConfirmedOpen: true
            })
          }
        )
      }
    )

  }


  handleViewContract = (doctor) => {
    console.info('request view contract from container')
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
  { setUserData, setDoctor, deleteDoctor }
)(HireDoctorContainer)