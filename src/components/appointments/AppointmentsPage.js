import React from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
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

const AppointmentListItem = ({ appointment, key }) => {
  return (
    <ListItem dense button key={name}>
      {/* <Avatar alt='Portrait' src={} /> */}
      <ListItemText primary={'asdfasd'} secondary={'asfasdf'} />
      <Typography>{`rating: 3142`}</Typography>
      <Divider />
    </ListItem>
  )
}

const AppointmentsPage = (props) => {
  // const { appointments } = props
  const appointments = [{
    arbitrableAppointment: '0x3c238e38784a95cb49b1216af4391fae197ae496',
    contractIpfsAddr: '0x3c238e38784a95cb49b1216af4391fae197ae496',
    doctor: '0xb6ceaf96b4686b57d14c36a5932f5a9eb07bbac6',
    patient: '0x3b768d17af19f200647245c04f840747226bd5f0'
  }]

  console.info('appointments', appointments)
  return (
    <div>
      {!appointments
        ? <NoAppointments />
        : <Card >
          <CardContent>
            <Typography variant='title' color='inherit'>
                Appointments
            </Typography>
            <AppointmentListItem />
          </CardContent>
        </Card>
      }
    </div>
  )
}

export default AppointmentsPage
