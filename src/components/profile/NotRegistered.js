import React from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const NotRegistered = props => {
  const { handleCreateDoctor } = props
  return (
    <div>
      <Typography variant='headline' component='h3'>
        You are not registerd as a doctor
      </Typography>
      <br />
      <Button
        variant='contained'
        color='primary'
        onClick={() => handleCreateDoctor()}
      >
        Become a doctor
      </Button>
    </div>
  )
}

export default NotRegistered
