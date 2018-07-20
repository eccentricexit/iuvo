import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import ResponsiveDrawerContainer from '../drawer/ResponsiveDrawerContainer'
import DoctorListContainer from './DoctorListContainer'

class Home extends Component {
  render() {
    return (      
      <ResponsiveDrawerContainer currentPage="Home">
        <DoctorListContainer />
      </ResponsiveDrawerContainer>
    )
  }
}

export default Home
