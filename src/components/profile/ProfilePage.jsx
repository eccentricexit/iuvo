import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'


const styles = {
  appBar: {
    position: 'relative'
  },
  flex: {
    flex: 1    
  },
  card: {
    maxWidth: 500,
    marginTop: 64,
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredItem: {
    flex: 1
  }
}

const ProfilePage = (props) => {
  const { classes } = props  
  return (
    <Grid container spacing={24} className={classes.container}>
      <Grid item className={classes.categories}>
        <h1>Hello there</h1>
      </Grid>
    </Grid>
  )
}

ProfilePage.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProfilePage)
