const IuvoCore = artifacts.require('./IuvoCore.sol')
const PausableProxy = artifacts.require('./PausableProxy.sol')

contract('IuvoCore', function (accounts) {
  let pausableProxy
  let iuvoCorebyProxy
  let iuvoCore

  beforeEach(async () => {
    iuvoCore = await IuvoCore.new()
    pausableProxy = await PausableProxy.new(iuvoCore.address)
    console.info('pausable Proxy: ', pausableProxy.address)
    iuvoCorebyProxy = IuvoCore.at(pausableProxy.address)
    console.info('iuvoCorebyProxy: ', iuvoCorebyProxy.address)
    await iuvoCorebyProxy.initialize()
  })

  it('should allow adding doctors through proxy', async () => {
    const length = (await iuvoCorebyProxy.doctorsArrayLength.call()).toNumber()
    console.info('length', length)
  })
})
