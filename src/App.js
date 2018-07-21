import React, { Component } from 'react'
import ResponsiveDrawerContainer from '../src/layouts/drawer/ResponsiveDrawerContainer'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <ResponsiveDrawerContainer currentPage='Home'>
          {this.props.children}
        </ResponsiveDrawerContainer>
      </div>
    )
  }
}

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
    IuvoCore: state.contracts.IuvoCore,
    contracts: state.contracts
  }
}


App.contextTypes = {
  drizzle: PropTypes.object  
}

export default drizzleConnect(App,mapStateToProps)
