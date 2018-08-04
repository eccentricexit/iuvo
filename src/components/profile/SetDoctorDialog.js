import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const SetDoctorDialog = (props) => {
  const { isOpen, handleCloseSetDoctor, handleSubmitSetDoctor } = props
  return (
    <Dialog
      open={isOpen}
      onClose={handleCloseSetDoctor}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>Set your doctor data</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This will register you as a doctor on iuvo.
        </DialogContentText>
        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='Name/Title'
          placeholder='Dr. Smith'
          type='email'
          fullWidth
        />
        <TextField
          margin='dense'
          id='bio'
          label='Bio'
          fullWidth
        />
        <TextField
          margin='dense'
          id='profilePicIpfsAddr'
          label='Profile picture IPFS Address'
          fullWidth
        />
        <TextField
          margin='dense'
          id='contractIpfsAddr'
          label='Contract IPFS Address'
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseSetDoctor} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleSubmitSetDoctor} color='primary'>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SetDoctorDialog
