const IuvoCore = artifacts.require('IuvoCore')
const PausableProxy = artifacts.require('PausableProxy')
const IuvoCoreByProxy = artifacts.require('IuvoCore')

module.exports = async (deployer, network, accounts) => {
  const owner = accounts[0]
  const ratingOracle = accounts[9]
  const doctorA = accounts[1]
  const doctorB = accounts[2]
  const doctorC = accounts[3]
  const doctorD = accounts[4]

  deployer.deploy(IuvoCore)
    .then(async () => {
      await deployer.deploy(PausableProxy, IuvoCore.address)
      const iuvoCoreByProxy = await IuvoCoreByProxy.at(PausableProxy.address)
      await iuvoCoreByProxy.initialize()

      console.info('proxy ==> ', iuvoCoreByProxy.address)
      await iuvoCoreByProxy.setRatingOracle(
        ratingOracle,
        { from: owner }
      )

      await iuvoCoreByProxy.setDoctor(
        'Dr. Nancy',
        'Love taking care of people',
        'QmcSD36n81qTdHWCiHoFt1jiVpcW1eZoHJALFbBJxYRhLf',
        'QmeKSTWokWbyJ8BG122WLty4adXi1mXEee2evxuHQWNfYm',
        { from: doctorA }
      )
      await iuvoCoreByProxy.setRating(
        doctorA,
        "4.2",
        { from: ratingOracle }
      )

      await iuvoCoreByProxy.setDoctor(
        'Dr. John McClaine',
        'Building relationships one happy patient at a time',
        'QmPHFmDDcaXWPu7yxUC3PnZBvo9B61MgxHu6YUTsH7C8hD',
        'QmeKSTWokWbyJ8BG122WLty4adXi1mXEee2evxuHQWNfYm',
        { from: doctorB }
      )
      await iuvoCoreByProxy.setRating(
        doctorB,
        "4.0",
        { from: ratingOracle }
      )

      await iuvoCoreByProxy.setDoctor(
        'Dr. Naman',
        'Ready to make you healthier!',
        'QmYnz2Bsnrt6cvatDgoxwFVNBLknfxnrpduYkxqfYHpuwT',
        'QmeKSTWokWbyJ8BG122WLty4adXi1mXEee2evxuHQWNfYm',
        { from: doctorC }
      )
      await iuvoCoreByProxy.setRating(
        doctorC,
        "4.4",
        { from: ratingOracle }
      )

      await iuvoCoreByProxy.setDoctor(
        'Dr. Ellen',
        'Come in sick, go out treated',
        'QmSmxngeX8YbswMcjsH3xQskq3v6RvJ1mGRsF1K5oiTXxh',
        'QmeKSTWokWbyJ8BG122WLty4adXi1mXEee2evxuHQWNfYm',
        { from: doctorD }
      )
      await iuvoCoreByProxy.setRating(
        doctorD,
        "3.5",
        { from: ratingOracle }
      )
      
    })
}
