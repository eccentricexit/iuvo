import React, { Component } from 'react'
import AppointmentsPage from './AppointmentsPage'
import { drizzleConnect } from 'drizzle-react'
import { setUserData } from '../../actions'


class AppointmentsPageContainer extends Component {  

  render () {
    return (
      <AppointmentsPage {...this.props} />
    )
  }
}

const mapStateToProps = ({userData}) => {
  return {userData}
}

export default drizzleConnect(
  AppointmentsPageContainer, 
  mapStateToProps,  
  { setUserData }
)
