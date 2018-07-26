import React, { Component } from 'react'
import DoctorList from './DoctorList'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'
import IuvoCore from '../../../build/contracts/IuvoCore.json'

class DoctorListContainer extends Component {
  constructor (props, context) { 
    super(props)
    const { web3, contracts } = context.drizzle
    this.doctors = []
    
    const proxyAddress = contracts.PausableProxy.address
    const iuvoCoreAbi = IuvoCore.abi
    const iuvoCoreByProxy = new web3.eth.Contract(
      iuvoCoreAbi,
      proxyAddress
    )
       
    context.drizzle.addContract({
      contractName: 'IuvoCore',
      web3Contract: iuvoCoreByProxy
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

const mapStateToProps = ({ accounts, drizzleStatus, contracts, web3}) => {
  return {
    accounts,
    drizzleStatus,
    contracts,
    web3
  }
}

DoctorListContainer.contextTypes = {
  drizzle: PropTypes.object
}

export default drizzleConnect(DoctorListContainer, mapStateToProps)
