import React, { Component } from 'react'
import DoctorListContainer from './DoctorListContainer'
import Grid from '@material-ui/core/Grid'


class HomeContainer extends Component {
  render () {
    const { classes } = this.props
    return (
      <Grid container spacing={24} >
        <Grid item >
          <DoctorListContainer />
        </Grid>
      </Grid>
    )
  }
}

export default HomeContainer
