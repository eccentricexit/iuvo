import React, { Component } from 'react'
import ResponsiveDrawer from './ResponsiveDrawer'
import { drizzleConnect } from 'drizzle-react'


class ResponsiveDrawerContainer extends Component {
  state = {
    mobileOpen: false
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }))
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  }

  render() {
    const { mobileOpen } = this.state

    return (
      <ResponsiveDrawer 
        {...this.props} 
        mobileOpen={mobileOpen}
        handleDrawerToggle={() => this.handleDrawerToggle()}
      />
    )
  }
}

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = ({ accounts,drizzleStatus,userData }) => {
  return {
    accounts,
    drizzleStatus,
    userData
  }
}

export default drizzleConnect(ResponsiveDrawerContainer, mapStateToProps)
