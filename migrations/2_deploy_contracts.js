const IuvoCore = artifacts.require('IuvoCore')
const PausableProxy = artifacts.require('PausableProxy')
const IuvoCoreByProxy = artifacts.require('IuvoCore')

module.exports = async (deployer, network, accounts) => {
  const owner = accounts[0]
  const ratingOracle = '0x7556f79d01bd9e56b5fb39804a4de4eb740aa7ee'
  const doctorA = '0xdd80f75f2a8fc4771c53e99bf9f5f5a5bcb0cc73'
  const doctorB = '0x0dbb42e12a14e8360c02e35e013be8118a769185'
  const doctorC = '0x6d066c17d3c2760e9eb2eaa94e025799e7cb6477'
  const doctorD = '0x40886f09442ae7a5cd2ea8db3a458d41104bf8e2'
  const patientA = '0x3e6d4b2f753d37ec4d299607ef7a65cb4e2c93d1'

  deployer.deploy(IuvoCore, { gas: 4612388, from: owner }).then(async () => {
      await deployer.deploy(PausableProxy, IuvoCore.address, { gas: 4612388, from: owner })
      const iuvoCoreByProxy = await IuvoCoreByProxy.at(PausableProxy.address)
      await iuvoCoreByProxy.initialize({ gas: 4612388, from: owner })

      console.info('proxy ==> ', iuvoCoreByProxy.address)
      console.info('setting rating oracle as ',ratingOracle)
      await iuvoCoreByProxy.setRatingOracle(
        ratingOracle,
        { from: owner, gas: 4612388 }
      )

      // console.info('setting doctor')
      // await iuvoCoreByProxy.setDoctor(
      //   'Dr. Nancy',
      //   'Love taking care of people',
      //   'QmcSD36n81qTdHWCiHoFt1jiVpcW1eZoHJALFbBJxYRhLf',
      //   'QmeKSTWokWbyJ8BG122WLty4adXi1mXEee2evxuHQWNfYm',
      //   { from: doctorA, gas: 4612388 }
      // )

      // console.info('setting rating')
      // await iuvoCoreByProxy.setRating(
      //   doctorA,
      //   '4.2',
      //   { from: ratingOracle, gas: 4612388 }
      // )

      // await iuvoCoreByProxy.setDoctor(
      //   'Dr. John McClaine',
      //   'Building relationships one happy patient at a time',
      //   'QmPHFmDDcaXWPu7yxUC3PnZBvo9B61MgxHu6YUTsH7C8hD',
      //   'QmeKSTWokWbyJ8BG122WLty4adXi1mXEee2evxuHQWNfYm',
      //   { from: doctorB, gas: 4612388 }
      // )
      // await iuvoCoreByProxy.setRating(
      //   doctorB,
      //   '4.0',
      //   { from: ratingOracle, gas: 4612388 }
      // )

      // await iuvoCoreByProxy.setDoctor(
      //   'Dr. Naman',
      //   'Ready to make you healthier!',
      //   'QmYnz2Bsnrt6cvatDgoxwFVNBLknfxnrpduYkxqfYHpuwT',
      //   'QmeKSTWokWbyJ8BG122WLty4adXi1mXEee2evxuHQWNfYm',
      //   { from: doctorC, gas: 4612388 }
      // )
      // await iuvoCoreByProxy.setRating(
      //   doctorC,
      //   '4.4',
      //   { from: ratingOracle, gas: 4612388 }
      // )

      // await iuvoCoreByProxy.setDoctor(
      //   'Dr. Ellen',
      //   'Come in sick, go out treated',
      //   'QmSmxngeX8YbswMcjsH3xQskq3v6RvJ1mGRsF1K5oiTXxh',
      //   'QmeKSTWokWbyJ8BG122WLty4adXi1mXEee2evxuHQWNfYm',
      //   { from: doctorD,gas: 4612388 }
      // )
      // await iuvoCoreByProxy.setRating(
      //   doctorD,
      //   '3.5',
      //   { from: ratingOracle, gas: 4612388 }
      // )

      // await iuvoCoreByProxy.hireDoctor(
      //   doctorA,
      //   'QmeKSTWokWbyJ8BG122WLty4adXi1mXEee2evxuHQWNfYm',
      //   0x0,
      //   'https://kleros.io',
      //   100,
      //   0x0,
      //   { from: patientA, gas: 4612388 }
      // )
    })
}
