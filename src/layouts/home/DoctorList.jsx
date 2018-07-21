import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'

const styles = {
  card: {
    minWidth: 275
  },  
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },  
}

function DoctorList (props) {
  const { classes } = props  
  const doctors = [{
    name: 'Dr. John Doe',
    rating: 4.2,    
    bio: 'I\'m awesome.'
  },{
    name: 'Dr. Doe Joe',
    rating: 3.2,    
    bio: 'I\'m working on it.'
  }]

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color='textSecondary'>
            Available Doctors
          </Typography>
          {doctors && doctors.map(doctor => (
            <ListItem key={doctor.name} doctor={doctor} classes={classes}/>
          ))}
        </CardContent>        
      </Card>
    </div>
  )
}

const ListItem = ({ doctor, classes }) => {  
  const {name, rating, bio} = doctor

  return (
    <div>
      <Typography variant='headline' component='h2'>
        {name}
      </Typography>
      <Typography className={classes.pos} color='textSecondary'>
        {bio}
      </Typography>
      <Typography component='p'>
        {rating}
      </Typography>
      <CardActions>
        <Button color='primary'>Hire</Button>
      </CardActions>
    </div>
  )
}

DoctorList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(DoctorList)
