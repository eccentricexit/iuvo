import React from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import { browserHistory } from 'react-router'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'


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

const AppointmentListItem = ({ appointment, classes }) => {
  
  return (
    <ListItem dense button className={classes.listItem} key={name}>
      {/* <Avatar alt='Portrait' src={} /> */}
      <ListItemText primary={'asdfasd'} secondary={'asfasdf'} />
      <Typography>{`rating: 3142`}</Typography>
      <Divider />
    </ListItem>
  )
}

const AppointmentsPage = (props) => {
  const { appointments, classes } = props
  return (
    <div>
      {!appointments
        ? <NoAppointments />
        : <Card className={classes.card}>
            <CardContent>
              <Typography variant='title' color='inherit'>
                Appointments
              </Typography>            
              <AppointmentListItem classes={classes} />            
            </CardContent>
          </Card>
      }
    </div>
  )
}

export default AppointmentsPage
