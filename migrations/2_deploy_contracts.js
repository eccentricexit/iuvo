const IuvoCore = artifacts.require('IuvoCore')
const PausableProxy = artifacts.require('PausableProxy')
const IuvoCoreByProxy = artifacts.require('IuvoCore')


module.exports = async (deployer,network,accounts) => {
  const owner = accounts[0]
  const doctorA = accounts[1]
  const doctorB = accounts[2]
  const doctorC = accounts[3]

  deployer.deploy(IuvoCore)
  .then(async () => {
    await deployer.deploy(PausableProxy, IuvoCore.address)
    const iuvoCoreByProxy = await IuvoCoreByProxy.at(PausableProxy.address)
    await iuvoCoreByProxy.initialize()

    console.info('proxy ==> ',iuvoCoreByProxy.address)

    await iuvoCoreByProxy.setDoctor(
      "Dr. Nancy",
      "4.4",
      "Love taking care of people",
      "ipfshashProfilePic",
      "contract for my services",
      { from: doctorA }
    )

    await iuvoCoreByProxy.setDoctor(
      "Dr. John McClaine",
      "4.0",
      "Love taking care of money",
      "ipfshashProfilePic",
      "ipfshashcontract for my services",
      { from: doctorB }
    )

    await iuvoCoreByProxy.setDoctor(
      "Dr. Naman",
      "4.1",
      "Love taking care of people",
      "ipfshashProfilePic",
      "ipfshashcontract for my services",
      { from: doctorC }
    )
  })
  
}
