import React, { Component } from 'react'
import AppointmentsPage from './AppointmentsPage'

class AppointmentsPageContainer extends Component {
  render () {
    return (
      <AppointmentsPage {...this.props} />
    )
  }
}

export default AppointmentsPageContainer
