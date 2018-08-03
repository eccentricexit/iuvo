import React, { Component } from 'react'
import ProfilePage from './ProfilePage'
import { drizzleConnect } from 'drizzle-react'
import { setUserData } from '../../actions'
import SetDoctorDialog from './SetDoctorDialog'
import { web3 } from '../../util/connectors'

class ProfilePageContainer extends Component {
  state = {
    isSetDoctorOpen: false
  }

  handleOpenSetDoctor(){
    this.setState({
      isSetDoctorOpen: true
    })
  }

  handleCloseSetDoctor(){
    this.setState({
      isSetDoctorOpen: false
    })
  }

  handleSubmitSetDoctor(){
    console.info('TODO')
  }

  handleSetDoctor

  render () {
    const { isSetDoctorOpen } = this.state
    return (
      <div>
        <ProfilePage handleOpenSetDoctor={() => this.handleOpenSetDoctor()}/>
        <SetDoctorDialog 
          isOpen={isSetDoctorOpen} 
          handleSubmitSetDoctor={() => this.handleSubmitSetDoctor()} 
          handleCloseSetDoctor={() => this.handleCloseSetDoctor()}
        />
      </div>
    )
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
