import React from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { browserHistory } from 'react-router'
import ListItem from '@material-ui/core/ListItem'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Avatar from '@material-ui/core/Avatar'

const NoAppointments = (props) => {
  return (
    <div>
      <Typography variant='headline' component='h3'>
        You have not hired any doctors
      </Typography>
      <br />
      <Button
        variant='contained'
        color='primary'
        onClick={() => browserHistory.push('/')}
      >
        Hire a doctor
      </Button>
    </div>
  )
}

const styles = theme => ({
  card: {
    display: 'flex'
  },
  cover: {
    width: 221,
    height: 221,
    alignSelf: 'center'
  },
  grow: {
    flex: 1
  },
  avatar: {
    marginLeft: 20,
    width: 220,
    height: 220,
    alignSelf: 'center'
  }
})

const AppointmentListItem = ({ appointment, doctor, classes }) => {
  return (
    <ListItem >
      <Card className={classes.card} >
        <Avatar src={doctor.imgRaw} className={classes.avatar} />
        <div className={classes.grow}>
          <CardContent >
            <Typography variant='title' color='inherit'>
                Doctor data
            </Typography>
            <TextField
              id='name'
              value={doctor.name}
              autoFocus
              margin='dense'
              label='Name/Title'
              disabled
              fullWidth
            />
            <TextField
              id='rating'
              value={doctor.rating}
              autoFocus
              margin='dense'
              label='Rating'
              disabled
              fullWidth
            />
            <TextField
              id='bio'
              value={doctor.bio}
              margin='dense'
              label='Bio'
              fullWidth

              disabled
            />
            <TextField
              id='doctorAddr'
              value={doctor.doctorAddr}

              autoFocus
              margin='dense'
              label='Address: '
              disabled
              fullWidth
            />
            <TextField
              id='arbitrableContract'
              value={appointment.arbitrableAppointment}
              margin='dense'
              label='Kleros arbitrable contract address'
              fullWidth
              disabled
            />
          </CardContent>
        </div>
      </Card>
    </ListItem>
  )
}

const StyledAppointmentItem = withStyles(styles, { withTheme: true })(AppointmentListItem)

const AppointmentsPage = (props) => {
  const { appointments, doctors } = props

  return (
    <div>
      {!appointments
        ? <NoAppointments />
        : <div>
          <Typography variant='title' color='inherit'>
                Appointments
          </Typography>
          {appointments.map((appointment, index) => (
            <StyledAppointmentItem
              appointment={appointment}
              key={index}
              doctor={doctors[appointment.doctor]}
            />
          ))}
        </div>
      }
    </div>
  )
}

export default AppointmentsPage
