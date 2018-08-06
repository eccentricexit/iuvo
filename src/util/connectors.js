import { Connect, SimpleSigner } from 'uport-connect'

export const uport = new Connect('Iuvo 1.0.0', {
  clientId: '2oosESr6NaTEM6niz8HZz63n5T82Ay1geMN',
  network: 'rinkeby',
  signer: SimpleSigner('21e1068504b1ab86ce16066a74975288cda8a043a8b75eeca534c701a66ac09d')
})

export const web3 = uport.getWeb3()
