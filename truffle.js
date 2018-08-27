const HDWalletProvider = require('truffle-hdwallet-provider')
const mnemonic = 'valley grocery power bridge language angle together ranch average high tribe meat'

module.exports = {
  migrations_directory: './migrations',
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*' // Match any network id
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/<infura_key_here> ')
      },
      network_id: 4
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 500
    }
  }
}
