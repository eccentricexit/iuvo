import React, { Component } from 'react'
import HireForm from './HireForm'
import { connect } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'
import { web3 } from '../../util/connectors'
import { waitForMined } from '../../util/waitForMined'
import { updateLocalAppointmentsData } from '../../util/iuvoUtils'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { 
  setUserData,
  setDoctor,
  deleteDoctor,
  addAppointment,
  clearAppointments
} from '../../actions'

class HireDoctorContainer extends Component {
  state = {
    txPendingOpen: false,
    txConfirmedOpen: false,
    notEnoughFundsDialogOpen: false
  }
  
  handleCloseFundsDialog = () => {
    this.setState({ notEnoughFundsDialogOpen: false })
  }

  handleRequestService = async (doctor,arbitrator,timeout) => {
    const { iuvoCoreByProxy, userData, addAppointment, clearAppointments } = this.props
    const componentContext = this
    
    if(userData.balanceInEther<doctor.price){
      this.setState({ notEnoughFundsDialogOpen: true })
      return
    }
    
    iuvoCoreByProxy.iuvoCoreByProxy.hireDoctor(
      doctor.doctorAddr,
      doctor.contractIpfsAddr,
      arbitrator,
      'kleros.io',
      timeout,
      '0x0',
      { 
        value: web3.toWei(doctor.price,'ether'), 
        from: userData.specificNetworkAddress
      },
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
            clearAppointments()
            updateLocalAppointmentsData(
              iuvoCoreByProxy,
              userData.specificNetworkAddress,
              addAppointment,
              web3
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
    const { iuvoData, doctorAddr, userData } = this.props
    const doctor = iuvoData.doctors[doctorAddr]
    
    if(!userData || !userData.specificNetworkAddress){
      return <h1>No user data available</h1>
    }
  
    if(doctor) { doctor.price = 0.003 }

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
          message={<span id="msg-tx-confirmed">Transaction processed!</span>}
        />
        <Dialog
          open={this.state.notEnoughFundsDialogOpen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Not enough funds"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You seem to not have enough funds to hire this doctor. His services
              cost 0.003 ether, but you have {userData.balanceInEther} ether. Either mail the developer 
              (mtsalenc@gmail.com) to get some or use Rinkeby's faucet: https://faucet.rinkeby.io/
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseFundsDialog} color="primary" autoFocus>
              Will do!
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = ({ userData, iuvoData, iuvoCoreByProxy, }, ownProps) => {
  return { 
    doctorAddr: ownProps.params.id,
    userData,
    iuvoData,
    iuvoCoreByProxy
  }
}

export default connect(
  mapStateToProps, 
  { setUserData, setDoctor, deleteDoctor, addAppointment, clearAppointments }
)(HireDoctorContainer)