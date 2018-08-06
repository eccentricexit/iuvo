import React, { Component } from 'react'
import AppointmentsPage from './AppointmentsPage'
import { connect } from 'react-redux'
import { setUserData } from '../../actions'

class AppointmentsPageContainer extends Component {
  render () {
    return (
      <AppointmentsPage {...this.props} />
    )
  }
}

const mapStateToProps = ({ userData }) => {
  return { userData }
}

export default connect(
  mapStateToProps,
  { setUserData }
)(AppointmentsPageContainer)
