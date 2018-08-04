import React, { Component } from 'react'
import { connect } from 'react-redux'
import DoctorList from './DoctorList'
import { IUVO_CORE_BY_PROXY } from '../../util/contractNames'
import { ipfs } from '../../util/getIpfs'
import { setDoctor } from '../../actions'

class DoctorListContainer extends Component {  
 
  render () {
    const { doctors } = this.props.iuvoData
    console.info('doctorsList: ',doctors)

    return <DoctorList {...this.props} doctors={doctors}/>
  }
}

const mapStateToProps = ({ userData, iuvoCoreByProxy, iuvoData }) => {
  return { userData, iuvoCoreByProxy, iuvoData }
}

export default connect(mapStateToProps, { setDoctor })(DoctorListContainer)
