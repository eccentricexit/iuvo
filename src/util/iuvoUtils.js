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

export const appointmentFromArray = (appointment) => {
  return {
    doctor: appointment[0],
    patient: appointment[1],
    arbitrableAppointment: appointment[2],
    contractIpfsAddr: appointment[3]
  }
}

export const updateLocalDoctorData = (iuvoCoreByProxy, userAddress, setDoctor) => {
  console.info('fetching doctor from blockchain')

  iuvoCoreByProxy.iuvoCoreByProxy.doctorPosition(userAddress, (err, res) => {
    if (err) { throw err }

    
    const posInStorage = res.toNumber()
    iuvoCoreByProxy.iuvoCoreByProxy.doctors(posInStorage, (err, res) => {
      if (err) { throw err }
      const doctor = doctorFromArray(res)
      setDoctor(doctor)

      ipfs.files.cat(doctor.profilePicIpfsAddr, (err, file) => {
        if (err) { throw err }
        doctor.imgRaw = 'data:image/png;base64,' + file.toString('base64')
        setDoctor(doctor)
      })
    })
    
  })
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
          iuvoCoreByProxy.doctorExists(doctor.doctorAddr, (err, res) => {
            if (err) { throw err }
            if (res === true) {
              setDoctor(doctor)
              ipfs.files.cat(doctor.profilePicIpfsAddr, (err, file) => {
                if (err) { throw err }
                doctor.imgRaw = 'data:image/png;base64,' + file.toString('base64')
                setDoctor(doctor)
              })
            }
          })
        })
      }
    }
  )
}

export const updateLocalAppointmentsData = (iuvoCoreByProxy, userAddress, addAppointment, web3) => {
  iuvoCoreByProxy = getIuvoCoreReference(web3)
  console.info('fetching appointments from blockchain', iuvoCoreByProxy)

  iuvoCoreByProxy.patientAppointmentsLength.call(
    userAddress,
    (err, res) => {
      if (err) { throw err }

      const numAppointments = res.toNumber()

      for (let i = 0; i < numAppointments; i++) {
        iuvoCoreByProxy.appointments(i, (err, res) => {
          if (err) { throw err }
          const appointment = appointmentFromArray(res)

          addAppointment(appointment)
        })
      }
    }
  )
}
