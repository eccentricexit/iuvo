import React from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'

const NotRegistered = (props) => {
  const { handleToggleEdit } = props
  return (
    <div>
      <Typography variant='headline' component='h3'>
        You are not registerd as a doctor
      </Typography>
      <br />
      <Button
        variant='contained'
        color='primary'
        onClick={() => handleToggleEdit()}
      >
        Become a doctor
      </Button>
    </div>
  )
}

const ProfilePage = ({
  userData,
  iuvoData,
  handleToggleEdit,
  handleSubmitSetDoctor,
  handleDeleteDoctor,
  isSettingDoctor
}) => {
  const doctor = iuvoData.doctors[userData.specificNetworkAddress]

  return (
    <div>
      {!doctor || !doctor.doctorAddr
        ? <NotRegistered handleToggleEdit={handleToggleEdit} />
        : (
          <Card>
            <CardContent>
              <Typography variant='title' color='inherit'>
                Doctor data
              </Typography>
              <TextField
                value={doctor.name}
                autoFocus
                margin='dense'
                id='name'
                label='Name/Title'
                placeholder='Dr. Smith'
                fullWidth
                disabled={!isSettingDoctor}
              />
              <TextField
                value={doctor.bio}
                margin='dense'
                id='bio'
                label='Bio'
                fullWidth
                disabled={!isSettingDoctor}
              />
              <TextField
                value={doctor.profilePicIpfsAddr}
                margin='dense'
                id='profilePicIpfsAddr'
                label='Profile picture IPFS Address'
                fullWidth
                disabled={!isSettingDoctor}
              />
              <TextField
                margin='dense'
                value={doctor.contractIpfsAddr}
                id='contractIpfsAddr'
                label='Contract IPFS Address'
                fullWidth
                disabled={!isSettingDoctor}
              />
            </CardContent>
            <CardActions>
              <Button
                variant='contained'
                color='primary'
                onClick={() => handleToggleEdit()}
                disabled={isSettingDoctor}
              >
                Edit
              </Button>
              <Button
                variant='contained'
                color='secondary'
                onClick={() => handleDeleteDoctor()}
                disabled={isSettingDoctor}
              >
                Delete
              </Button>
              <Button
                variant='contained'
                color='primary'
                onClick={() => handleSubmitSetDoctor()}
                disabled={!isSettingDoctor}
              >
                Submit
              </Button>
              <Button
                variant='outlined'
                color='primary'
                onClick={() => handleToggleEdit()}
                disabled={!isSettingDoctor}
              >
                Cancel
              </Button>
            </CardActions>
          </Card>
        )
      }
    </div>
  )
}

export default ProfilePage
