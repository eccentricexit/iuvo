import IuvoCoreJson from '../../build/contracts/IuvoCore.json'
import PausableProxyJson from '../../build/contracts/PausableProxy.json'
import { ipfs } from '../util/getIpfs'

export const getIuvoCoreReference = (web3) => {
  // We need to use uPort's web3 to sign transactions with it.
  const IuvoCoreJsonAbi = IuvoCoreJson.abi
  const IuvoCore = web3.eth.contract(IuvoCoreJsonAbi)

  // We do not reference the IuvoCore contract directly, instead we reference
  // the proxy contract. This is part of the upgradable pattern.
  const pausableProxyAddress = PausableProxyJson.networks[process.env.REACT_APP_NETWORK_ID].address
  const iuvoCoreByProxy = IuvoCore.at(pausableProxyAddress)

  return iuvoCoreByProxy
}

export const doctorFromArray = (doctor) => {
  return {
    name: doctor[0],
    rating: doctor[1],
    bio: doctor[2],
    profilePicIpfsAddr: doctor[3],
    contractIpfsAddr: doctor[4],
    doctorAddr: doctor[5]
  }
}

export const updateLocalDoctorsData = (iuvoCoreByProxy, setDoctor) => {
  console.info('fetching doctors from blockchain')

  iuvoCoreByProxy.doctorsArrayLength.call(
    (err, res) => {
      if (err) { throw err }

      const numDocs = res.toNumber()
      console.info(`got ${numDocs} doctors`)

      for (let i = 0; i < numDocs; i++) {
        iuvoCoreByProxy.doctors(i, (err, res) => {
          if (err) { throw err }
          const doctor = doctorFromArray(res)
          setDoctor(doctor)

          ipfs.files.cat(doctor.profilePicIpfsAddr, (err, file) => {
            if (err) { throw err }
            doctor.imgRaw = 'data:image/png;base64,' + file.toString('base64')
            setDoctor(doctor)
          })
        })
      }
    }
  )
}

export const updateLocalDoctorData = (iuvoCoreByProxy, specificNetworkAddress, setDoctor, deleteDoctor) => {
  console.info('fetching doctor from blockchain')
  console.info('iuvoCoreByProxy', iuvoCoreByProxy)
  console.info('specificNetworkAddress', specificNetworkAddress)

  iuvoCoreByProxy.iuvoCoreByProxy.doctorPosition(specificNetworkAddress, (err, res) => {
    if (err) { throw err }
    console.info('res', res)

    if (res !== 0) { // doctor exists
      const posInStorage = res.toNumber()
      console.info('converted from bn: ', posInStorage)
      iuvoCoreByProxy.iuvoCoreByProxy.doctors(posInStorage, (err, res) => {
        if (err) { throw err }
        console.info('docs', res)
        const doctor = doctorFromArray(res)
        setDoctor(doctor)

        ipfs.files.cat(doctor.profilePicIpfsAddr, (err, file) => {
          if (err) { throw err }
          doctor.imgRaw = 'data:image/png;base64,' + file.toString('base64')
          setDoctor(doctor)
        })
      })
    }
  })
}
