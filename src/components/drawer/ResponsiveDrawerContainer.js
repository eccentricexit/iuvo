import React, { Component } from 'react'
import ResponsiveDrawer from './ResponsiveDrawer'
import { connect } from 'react-redux'


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

const mapStateToProps = ({ userData }) => {
  return {
    userData
  }
}

export default connect(mapStateToProps)(ResponsiveDrawerContainer)
