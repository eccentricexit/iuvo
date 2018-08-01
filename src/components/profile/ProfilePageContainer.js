import React, { Component } from 'react'
import ProfilePage from './ProfilePage'
import { drizzleConnect } from 'drizzle-react'
import { setUserData } from '../../actions'


class ProfilePageContainer extends Component {
  render () {
    return <ProfilePage />
  }
}

const mapStateToProps = ({userData}) => {
  return {userData}
}

export default drizzleConnect(
  ProfilePageContainer, 
  mapStateToProps,  
  { setUserData }
)
