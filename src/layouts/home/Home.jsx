import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import ResponsiveDrawerContainer from '../drawer/ResponsiveDrawerContainer'

class Home extends Component {
  render() {
    return (      
      <ResponsiveDrawerContainer>
        <Typography noWrap>{'You think water moves fast? You should see Mariner 5.'}</Typography>
      </ResponsiveDrawerContainer>
    )
  }
}

export default Home
