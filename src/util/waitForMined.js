export async function waitForMined (txHash, response, web3, pendingCB, successCB) {
  if (response.blockNumber) {
    successCB()
  } else {
    pendingCB()
    pollingLoop(txHash, response,  web3, pendingCB, successCB)
  }
}

const pollingLoop = (txHash, response, web3, pendingCB, successCB) => {
  setTimeout(() => {
    web3.eth.getTransaction(txHash, (error, response) => {
      if (error) { throw error }
      if (response === null) {
        response = { blockNumber: null }
      } // Some nodes do not return pending tx
      waitForMined(txHash, response, web3, pendingCB, successCB)
    })
  }, 1000) // check again in one sec.
}
