import React, { Component } from 'react'
import DoctorForm from './DoctorForm'
import NotRegistered from './NotRegistered'
import { setUserData, setDoctor, deleteDoctor } from '../../actions'
import { connect } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'
import { web3 } from '../../util/connectors'
import { waitForMined } from '../../util/waitForMined'
import { updateLocalDoctorData } from '../../util/iuvoUtils'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

class ProfilePageContainer extends Component {
  state = {
    isSettingDoctor: false,
    isCreatingDoctor: false,
    doctor: null,
    txPendingOpen: false,
    txConfirmedOpen: false,
    notEnoughFundsDialogOpen: false  
  }

  handleCloseFundsDialog = () => {
    this.setState({ notEnoughFundsDialogOpen: false })
  }  

  handleSetDoctor = doctor => {
    const { iuvoCoreByProxy, userData, setDoctor, deleteDoctor } = this.props
    const componentContext = this
    
    if(userData.balanceInEther<0.0001){
      this.setState({ notEnoughFundsDialogOpen: true })
      return
    }

    iuvoCoreByProxy.iuvoCoreByProxy.setDoctor(
      doctor.name,
      doctor.bio,
      doctor.profilePicIpfsAddr,
      doctor.contractIpfsAddr,
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
            componentContext.setState({ 
              txPendingOpen: false,
              isSettingDoctor: false,
              txConfirmedOpen: true
            })
            updateLocalDoctorData(
              iuvoCoreByProxy, 
              userData.specificNetworkAddress, 
              setDoctor,
              deleteDoctor
            )
          }
        )
    }) 
  }

  handleCloseTxConfirmed = () => {
    this.setState({ txConfirmedOpen: false })
  }

  handleToggleEdit = () => {
    this.setState({ isSettingDoctor: !this.state.isSettingDoctor })
    this.setState({ isCreatingDoctor: false })
  }

  handleCreateDoctor = () => {
    const { userData } = this.props
    const startOfHash = userData.avatar.uri.lastIndexOf('/')+1
    const userProfilePicHash = userData.avatar.uri.substring(startOfHash)
    this.setState({ 
      isCreatingDoctor:true,
      isSettingDoctor: true,
      doctor: {
        doctorAddr: userData.specificNetworkAddress,
        contractIpfsAddr: 'QmeKSTWokWbyJ8BG122WLty4adXi1mXEee2evxuHQWNfYm', //solidity docs by default
        profilePicIpfsAddr: userProfilePicHash
      }
    })
  }

  handleDeleteDoctor = () => {
    const { iuvoCoreByProxy, userData, deleteDoctor } = this.props
    const componentContext = this
    
    if(userData.balanceInEther<0.0001){
      this.setState({ notEnoughFundsDialogOpen: true })
      return
    }
    
    iuvoCoreByProxy.iuvoCoreByProxy.deleteDoctor(
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
              isSettingDoctor: false,
              txConfirmedOpen: true
            })
            deleteDoctor(userData.specificNetworkAddress)
          }
        )
    })
  }  

  componentWillReceiveProps (nextProps) {
    const { iuvoData, userData } = nextProps
    const docFromRedux = iuvoData.doctors[userData.specificNetworkAddress]
    if(!docFromRedux && this.state.doctor){ // deleted doctor
      this.setState({ doctor: docFromRedux })
    }
  }

  componentDidMount() {
    const { iuvoData, userData } = this.props
    const docFromRedux = iuvoData.doctors[userData.specificNetworkAddress]
    if(docFromRedux && !this.state.doctor){
      this.setState({ doctor: docFromRedux })
    }
  }

  render () {
    const { userData } = this.props
    return (
      <div>
        {this.state.doctor && this.state.doctor.doctorAddr
          ? <DoctorForm
              isTxPending={this.state.txPendingOpen}
              isSettingDoctor={this.state.isSettingDoctor}
              handleToggleEdit={this.handleToggleEdit}
              handleSetDoctor={this.handleSetDoctor}
              handleDeleteDoctor={this.handleDeleteDoctor}
              doctor={this.state.doctor}
            />
          : <NotRegistered 
              handleCreateDoctor={this.handleCreateDoctor}
              isCreatingDoctor={this.state.isCreatingDoctor}
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
              You only have {userData.balanceInEther} which may not be enough to 
              interact with the contract. Either mail the developer 
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

const mapStateToProps = ({ userData, iuvoData, iuvoCoreByProxy }) => {
  return { userData, iuvoData, iuvoCoreByProxy }
}

export default connect(
  mapStateToProps, 
  { setUserData, setDoctor, deleteDoctor }
)(ProfilePageContainer)