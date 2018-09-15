<br />
<br />
<p align="center">
    <img alt="iuvo" src="assets/iuvo.png" />
</p>
<br />
<br />

[![](https://img.shields.io/badge/uPort-ready-%235c50ca.svg)](https://www.uport.me)
[![](https://img.shields.io/badge/kleros-ready-292b2c.svg)](https://kleros.io)
[![](https://img.shields.io/badge/ipfs-inside-6acad1.svg)](https://ipfs.io)
[![](https://img.shields.io/badge/material-ui-blue.svg)](https://material-ui.com)
[![](https://travis-ci.org/mtsalenc/iuvo.svg?branch=master)](https://travis-ci.org/mtsalenc/iuvo)

> The decentralized health services marketplace. Buidlt for educational purposes.

On `iuvo`, you can hire doctors or put your services up on a list to be hired. Built for educational purposes.

## Table of Contents
- [Table of Contents](#table-of-contents)
- [What is this?](#what-is-this)
- [User stories](#user-stories)
- [Install](#install)
- [Tests](#tests)
- [Usage](#usage)
    - [Interacting with the deployed contracts](#interacting-with-the-deployed-contracts)
    - [Interacting with new contracts](#interacting-with-new-contracts)
        - [Local testnet:](#local-testnet)
        - [Rinkeby testnet:](#rinkeby-testnet)
- [Screenshots](#screenshots)
- [License](#license)

## What is this?

This is an app (built for educational purposes) and market place to work as a meeting point between anyone who: 
- Wants to hire a doctor for an appointment;
- Wants to display themselves as a doctor available for hiring.

See the "User stories" section of this document for a better overview.

> **Feel free to report issues**: If you have any problems using the frontend, either open an issue or ping me at mtsalenc@gmail.com.

**Features:**
- Upgradable pattern;
- uPort integration;
- IPFS integration;
- Kleros integration;
- Circuit breaks;
- Acess restrictions;
- EthPM package usage;
- Automated tests;
- Material UI.

> **Note for the reviewer**: You will need some test ether to hire doctors. Ping me @ mtsalenc@gmail.com if you don't want to use rinkeby's faucet.

## User stories
- As a user, I can log into the dapp with uPort on my smartphone and see a list of doctors.

- As a user, I can click on a doctor from a list to see details about that doctor. This view allows me to hire that doctor or see his terms of service contract.

- When a doctor is hired, a new [Kleros](https://kleros.io/) arbitrable transaction contract is deployed. I can see the contract address on the appointment in the Appointments list.

- When someone clicks to "See contract" on the doctor view, a new tab is opened with the doctor's data from an ipfs gateway.

- As a user, I can place my services for hiring by creating a profile. Once that is done, I can see myself on the list of doctors.

- As a doctor, I can delete my doctor profile so my services are no longer listed on the list of doctors.

- As a user, I can see a list of appointments with details of where the contract is deployed and who the arbitrator is.

## Install

Simply run `npm install`

## Tests

1. `ganache-cli` in one terminal;
2. `truffle test` in another.

This project was built using the [Truffle Framework](https://truffleframework.com), with tests written with mocha and chai so they can be found inside the `test` folder.

## Usage

The frontend depends on uPort and usage depends on weather:
1. You want to interact with the contracts already deployed on Rinkeby testnet;
2. You want to interact with your own, newly deployed contracts instances to Rinkeby;
3. You want to interact with contracts on your own testnet.

> If you are a reviewer, you want option 1: interact with the contracts already deployed. See the next section.

### Interacting with the deployed contracts

> **Note for the reviewer**: This is what you want to grade this project.

This project's frontend uses [uPort's](https://www.uport.me/) infrastructure for interaction and authentication. This means that:
- You don't need Metamask, but you do need a smartphone with uPort installed. 
- You will interact with the contracts already deployed on Rinkeby.

See below on how to use the frontend with your own instances of the contracts.

Simply run `npm start` to serve the frontend.

> **Regarding uPort**: For now, uPort QRCodes can get quite big. Just zoom out if one doesn't fit your screen.

> **Regarding ipfs addresses**: Ipfs hash fields for profile picture and contract come pre-filled and locked. If this were to be used in production, we would allow the user to set this field.

### Interacting with new contracts

For new contracts we have two options: deploy on a local testnet and deploy on rinkeby.

#### Local testnet: 

If you choose to deploy locally, you will have to interact with the contracts directly through the `truffle console`. This is because the frontend requires uPort's infrastructure and smart contracts.

Also note that to hire a doctor, you need to pass the function an address of an arbitrator. This can be any address if you don't plan on raising a dispute (you probably don't).

#### Rinkeby testnet:

If you choose to deploy the contracts to Rinkeby, you get the benefit of using the frontend. But you need to update it's configuration with your own dapp data and infura api key on truffle.js (for truffle migrations):

1. See [uPort's documentation](https://developer.uport.me/gettingstarted#1-get-the-u-port-app) on how to register.
2. Update `src/util/connectors.js`
3. `npm start`

## Screenshots

![](assets/dashboard.png)
![](assets/doctordetails.png)
![](assets/editprofile.png)
![](assets/appointments.png)

## License

MIT © 2018 Matheus Alencar
