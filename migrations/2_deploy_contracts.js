const IuvoCore = artifacts.require('IuvoCore')
const PausableProxy = artifacts.require('PausableProxy')
const IuvoCoreByProxy = artifacts.require('IuvoCore')

module.exports = async (deployer, network, accounts) => {
  const owner = accounts[0]
  const ratingOracle = accounts[1]

  deployer.deploy(IuvoCore, { gas: 4612388, from: owner }).then(async () => {
    await deployer.deploy(PausableProxy, IuvoCore.address, { gas: 4612388, from: owner })
    const iuvoCoreByProxy = await IuvoCoreByProxy.at(PausableProxy.address)
    await iuvoCoreByProxy.initialize({ gas: 4612388, from: owner })

    console.info('proxy ==> ', iuvoCoreByProxy.address)
    console.info('setting rating oracle as ', ratingOracle)
    await iuvoCoreByProxy.setRatingOracle(
      ratingOracle,
      { from: owner, gas: 4612388 }
    )
  })
}
