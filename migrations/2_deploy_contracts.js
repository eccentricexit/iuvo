const IuvoCore = artifacts.require('IuvoCore')
const PausableProxy = artifacts.require('PausableProxy')
const IuvoCoreByProxy = artifacts.require('IuvoCore')

module.exports = async (deployer, network, accounts) => {
  const owner = accounts[0]
  const doctorA = accounts[1]
  const doctorB = accounts[2]
  const doctorC = accounts[3]

  deployer.deploy(IuvoCore)
    .then(async () => {
      await deployer.deploy(PausableProxy, IuvoCore.address)
      const iuvoCoreByProxy = await IuvoCoreByProxy.at(PausableProxy.address)
      await iuvoCoreByProxy.initialize()

      console.info('proxy ==> ', iuvoCoreByProxy.address)

      await iuvoCoreByProxy.setDoctor(
        'Dr. Nancy',
        '4.4',
        'Love taking care of people',
        'QmcSD36n81qTdHWCiHoFt1jiVpcW1eZoHJALFbBJxYRhLf',
        'QmeKSTWokWbyJ8BG122WLty4adXi1mXEee2evxuHQWNfYm',
        { from: doctorA }
      )

      await iuvoCoreByProxy.setDoctor(
        'Dr. John McClaine',
        '4.0',
        'Building relationships one happy patient at a time',
        'QmPHFmDDcaXWPu7yxUC3PnZBvo9B61MgxHu6YUTsH7C8hD',
        'QmeKSTWokWbyJ8BG122WLty4adXi1mXEee2evxuHQWNfYm',
        { from: doctorB }
      )

      await iuvoCoreByProxy.setDoctor(
        'Dr. Naman',
        '4.1',
        'Ready to make you healthier!',
        'QmYnz2Bsnrt6cvatDgoxwFVNBLknfxnrpduYkxqfYHpuwT',
        'QmeKSTWokWbyJ8BG122WLty4adXi1mXEee2evxuHQWNfYm',
        { from: doctorC }
      )

      await iuvoCoreByProxy.setDoctor(
        'Dr. Ellen',
        '4.0',
        'Come in sick, go out treated',
        'QmSmxngeX8YbswMcjsH3xQskq3v6RvJ1mGRsF1K5oiTXxh',
        'QmeKSTWokWbyJ8BG122WLty4adXi1mXEee2evxuHQWNfYm',
        { from: doctorC }
      )
    })
}
