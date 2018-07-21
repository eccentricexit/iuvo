import React, { Component } from 'react'
import DoctorList from './DoctorList'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'

class DoctorListContainer extends Component {
  constructor (props, context) {
    super(props)
    const { IuvoCore } = context.drizzle.contracts
    this.doctors = []

    IuvoCore.methods.doctorsArraySize().call().then(size => {
      for (let i = 0; i < size; i++) {
        IuvoCore.methods.doctorsArray(i).call().then(doctor => {
          this.doctors.push(doctor)
        })
      }
    })
  }
  render () {
    const { IuvoCore } = this.props.contracts

    if (!IuvoCore.initialized) {
      return <span>Initializing...</span>
    }

    return <DoctorList {...this.props} doctors={this.doctors} />
  }
}

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
    IuvoCore: state.contracts.IuvoCore,
    contracts: state.contracts
  }
}

DoctorListContainer.contextTypes = {
  drizzle: PropTypes.object
}

export default drizzleConnect(DoctorListContainer, mapStateToProps)
