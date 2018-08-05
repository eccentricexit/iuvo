import React, { Component } from 'react'
import { connect } from 'react-redux'
import DoctorList from './DoctorList'
import { setDoctor } from '../../actions'

class DoctorListContainer extends Component {
  componentDidMount () {
    console.info('DoctorList: componentDidMount')
  }

  componentWillReceiveProps () {
    console.info('DoctorList: componentWillReceiveProps')
  }

  render () {
    const { doctors } = this.props.iuvoData
    return <DoctorList {...this.props} doctors={doctors} />
  }
}

const mapStateToProps = ({ userData, iuvoCoreByProxy, iuvoData }) => {
  return { userData, iuvoCoreByProxy, iuvoData }
}

export default connect(mapStateToProps, { setDoctor })(DoctorListContainer)
