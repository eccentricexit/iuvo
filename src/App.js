import React, { Component } from 'react'
import { connect } from 'react-redux'
import ResponsiveDrawerContainer from './components/drawer/ResponsiveDrawerContainer'
import './App.css'
import LoginPageContainer from './components/login/LoginPageContainer'

class App extends Component {
  render () {
    const { userData } = this.props
    return (
      <div className='App'>
        {!userData.initialized
          ? <ResponsiveDrawerContainer currentPage='Home'>
            {this.props.children}
          </ResponsiveDrawerContainer>
          : <LoginPageContainer />
        }
      </div>
    )
  }
}

const mapStateToProps = ({ userData }) => {
  return {
    userData
  }
}

export default connect(mapStateToProps)(App)
