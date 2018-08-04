import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import DoctorListItem from './DoctorListItem'

const styles = {
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
}

function DoctorList (props) {
  const { classes } = props
  const doctors = props.doctors
    ? Object.keys(props.doctors).map(doctorAddr => props.doctors[doctorAddr])
    : []
  const numDoctors = doctors.length

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color='textSecondary'>
          Available Doctors: {numDoctors}
        </Typography>
        {doctors && doctors.map(doctor => (
          <DoctorListItem key={doctor.name} doctor={doctor} classes={classes} />
        ))}
      </CardContent>
    </Card>
  )
}

export default withStyles(styles)(DoctorList)