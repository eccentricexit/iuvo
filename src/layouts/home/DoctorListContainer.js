import React, { Component } from 'react'
import DoctorList from './DoctorList'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'
import { IUVO_CORE_BY_PROXY } from '../../util/contractNames'

class DoctorListContainer extends Component {
  constructor (props, context) { 
    super(props)
    const { web3, contracts } = context.drizzle
    const { IuvoCore, PausableProxy, IuvoCoreByProxy } = contracts
    this.doctors = []
    
    const proxyAddress = PausableProxy.address
    const iuvoCoreAbi = IuvoCore.abi
    const iuvoCoreByProxyInstance = new web3.eth.Contract(
      iuvoCoreAbi,
      proxyAddress
    )

    context.drizzle.addContract({
      contractName: IUVO_CORE_BY_PROXY,
      web3Contract: iuvoCoreByProxyInstance
    })

    if(props.drizzleStatus.initialized){
      iuvoCoreByProxyInstance
        .methods
        .returnDoctorsArray()
        .call()
        .then(doctorAddresses => {
          doctorAddresses.forEach(address => {
            iuvoCoreByProxyInstance.methods.doctors(address).call().then( doctor => {
              this.doctors.push(doctor)
            })            
          })
        })
    }
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
