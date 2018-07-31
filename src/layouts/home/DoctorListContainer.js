import React, { Component } from 'react'
import DoctorList from './DoctorList'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'
import { IUVO_CORE_BY_PROXY } from '../../util/contractNames'
import { ipfs } from '../../util/web3/getIpfs'

class DoctorListContainer extends Component {
  constructor (props, context) {
    super(props)
    const { web3, contracts } = context.drizzle
    const { IuvoCore, PausableProxy } = contracts
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

    if (props.drizzleStatus.initialized) {
      iuvoCoreByProxyInstance
        .methods
        .returnDoctorsArray()
        .call()
        .then(doctorAddresses => {
          // We must loop over each position because the evm doesn't support returning
          // arrays of structs yet
          doctorAddresses.forEach(address => {
            // Using drizzle's call() instead of cacheCall() beacause
            // cachecCall() is not available here yet.
            iuvoCoreByProxyInstance.methods.doctorPosition(address).call()
            .then(doctorPosition => {
              return iuvoCoreByProxyInstance.methods.doctors(doctorPosition).call()
            })
            .then(doctor => {
              ipfs.files.cat(doctor.profilePicIpfsAddr, (err, file) => {
                if (err) {
                  throw err
                }
                const img = file.toString('base64')
                doctor.imgRaw = 'data:image/png;base64,' + img
              })
              this.doctors.push(doctor)
            })
          })

          console.info('done adding doctors')
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
