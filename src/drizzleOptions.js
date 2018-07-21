import IuvoCore from './../build/contracts/IuvoCore.json'

const drizzleOptions = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  },
  contracts: [
    IuvoCore    
  ],
  events: {
    
  },
  polls: {
    accounts: 1500
  }
}

export default drizzleOptions
