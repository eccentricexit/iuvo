var IuvoCore = artifacts.require("./IuvoCore.sol")

contract('IuvoCore', function(accounts) {

  it("Have some doctors by default.", function() {
    return IuvoCore.deployed().then(async (instance) => {
      let iuvoCoreInstance = instance

      const doctorArray = await iuvoCoreInstance.doctorsArray(0)      
      console.info(doctorArray)

      const doctorArraySize = await iuvoCoreInstance.doctorsArraySize()
      console.info(doctorArraySize)
    })
  })

})
