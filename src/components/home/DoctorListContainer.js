import React, { Component } from 'react'
import { connect } from 'react-redux'
import DoctorList from './DoctorList'
import { IUVO_CORE_BY_PROXY } from '../../util/contractNames'
import { ipfs } from '../../util/getIpfs'
import { setDoctor } from '../../actions'

class DoctorListContainer extends Component {  
 
  render () {
    // const { iuvoData } = this.props
    // console.info('doctorsList: ',iuvoData)

    return <DoctorList {...this.props} doctors={[]} />
  }
}

const mapStateToProps = ({ userData, iuvoCoreByProxy, iuvoData }) => {
  return { userData, iuvoCoreByProxy, iuvoData }
}

export default connect(mapStateToProps, { setDoctor })(DoctorListContainer)
