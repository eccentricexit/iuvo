const IuvoCore = artifacts.require('IuvoCore')
const PausableProxy = artifacts.require('PausableProxy')
const IuvoCoreByProxy = artifacts.require('IuvoCore')


module.exports = async (deployer) => {
  await deployer.deploy(IuvoCore)
  await deployer.deploy(PausableProxy,IuvoCore.address)
  const iuvoCoreByProxy = await IuvoCoreByProxy.at(PausableProxy.address)
  await iuvoCoreByProxy.initialize()
}
