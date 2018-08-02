import React from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const NotRegistered = (props) => {  
  const { handleOpenSetDoctor } = props
  return (
    <div>
      <Typography variant="headline" component="h3">
        You are not registerd as a doctor
      </Typography>
      <br />
      <Button 
        variant="contained" 
        color="primary"
        onClick={handleOpenSetDoctor}
      >
        Become a doctor
      </Button>
    </div>
  )
}

const ProfilePage = (props) => {
  const { handleOpenSetDoctor } = props  
  return (
    <NotRegistered handleOpenSetDoctor={handleOpenSetDoctor}/>
  )
}

export default ProfilePage
