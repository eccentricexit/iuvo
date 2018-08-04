import React, { Component } from 'react'
import DoctorListContainer from './DoctorListContainer'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  gridItem: {
    flexGrow: 1
  },
  doctors: {
    flexGrow: 8
  },
  container: {
    direction: 'row',
    justify: 'flex-start',
    alignItems: 'flex-start'
  },
  title: {
    fontSize: 14
  }
})

class HomeContainer extends Component {
  render () {
    const { classes } = this.props
    return (
      <Grid container className={classes.container} spacing={24} >
        <Grid item className={classes.gridItem} >
          <DoctorListContainer />
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(HomeContainer)
