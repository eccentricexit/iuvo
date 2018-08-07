<br />
<br />
<p align="center">
    <img alt="iuvo" src="assets/iuvo.png" />
</p>
<br />
<br />

![](https://img.shields.io/badge/uPort-ready-%235c50ca.svg)
![](https://img.shields.io/badge/ipfs-inside-6acad1.svg)
![](https://img.shields.io/badge/material-ui-blue.svg)
[![](https://travis-ci.org/mtsalenc/iuvo.svg?branch=master)](https://travis-ci.org/mtsalenc/iuvo)

> The decentralized health services marketplace.

On `iuvo`, you can hire doctors or put your services up on a list to be hired.
Hiring a doctor, means deploying a [Kleros] arbitrable transaction, which gives an oportuninty to either party appeal if there is a dispute.

**Features:**
- Upgradable pattern;
- uPort integration;
- IPFS integration;
- Circuit breaks;
- Automated tests;
- Material UI.

## Notes on local deployment

This project's frontend uses uPort's infrastructure for interaction and authentication. This means you must use Rinkeby.

You may however, deploy the contracts locally, run the tests and interact with them through `truffle console`.

## Screenshots

TODO

## Install

Simply run `npm install`

## Tests

1. Start a testnet by running `npm run ganache`
2. Run the tests with `truffle test --network development`

This project was built using the [Truffle Framework](https://truffleframework.com), with tests written with mocha and chai. They can be found inside the `test` folder.

## Usage

This dapp integrates with [uPort](https://www.uport.me/). This means you don't need Metamask, but you do need a smartphone with uPort installed.

Simply run `npm start`.

## License

MIT © 2018 Matheus Alencar
