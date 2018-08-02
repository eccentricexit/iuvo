import React from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'

const NotRegistered = (props) => {
  const { handleOpenSetDoctor } = props
  return (
    <div>
      <Typography variant='headline' component='h3'>
        You are not registerd as a doctor
      </Typography>
      <br />
      <Button
        variant='contained'
        color='primary'
        onClick={handleOpenSetDoctor}
      >
        Become a doctor
      </Button>
    </div>
  )
}

const ProfilePage = (props) => {
  const { handleOpenSetDoctor, userData } = props
  return (
    <div>
      {userData
        ? <NotRegistered handleOpenSetDoctor={handleOpenSetDoctor} />
        : <Card>
          <CardContent>
            <Typography variant='title' color='inherit'>
              Doctor data
            </Typography>
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Name/Title'
              placeholder='Dr. Smith'
              type='email'
              fullWidth
              disabled
            />
            <TextField
              margin='dense'
              id='bio'
              label='Bio'
              fullWidth
              disabled
            />
            <TextField
              margin='dense'
              id='ipfsProfilePicAddr'
              label='Profile picture IPFS Address'
              fullWidth
              disabled
            />
            <TextField
              margin='dense'
              id='ipfsContractAddr'
              label='Contract IPFS Address'
              fullWidth
              disabled
            />
          </CardContent>
          <CardActions>
            <Button
              variant='contained'
              color='primary'
              onClick={() => handleOpenSetDoctor()}
            >
              Update data
            </Button>
          </CardActions>
        </Card>
      }
    </div>
  )
}

export default ProfilePage
