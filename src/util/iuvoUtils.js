import IuvoCoreJson from '../../build/contracts/IuvoCore.json'
import PausableProxyJson from '../../build/contracts/PausableProxy.json'

export const getIuvoCoreReference = (web3) => {
  // We need to use uPort's web3 to sign transactions with it.
  const IuvoCoreJsonAbi = IuvoCoreJson.abi
  const IuvoCore = web3.eth.contract(IuvoCoreJsonAbi)        
  
  // We do not reference the IuvoCore contract directly, instead we reference 
  // the proxy contract. This is part of the upgradable pattern.
  const pausableProxyAddress = PausableProxyJson.networks[process.env.REACT_APP_NETWORK_ID].address
  const iuvoCoreByProxy = IuvoCore.at(pausableProxyAddress)

  return iuvoCoreByProxy
}