import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'
import ResponsiveDrawerContainer from '../drawer/ResponsiveDrawerContainer'
import { withStyles } from '@material-ui/core/styles';
import DoctorListContainer from './DoctorListContainer'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  categories: {
    flexGrow: 1,
  },
  doctors: {
    flexGrow: 8,
  },
  container: {    
    direction: 'row',
    justify: 'flex-start',
    alignItems: 'flex-start'
  },
  title:{
    fontSize: 14
  }
})

class HomeContainer extends Component{  
  render(){
    const { classes } = this.props
    return (
      <ResponsiveDrawerContainer currentPage='Home'>
         <Grid container spacing={24} className={classes.container}>          
          <Grid item className={classes.categories}>            
            <DoctorListContainer />
          </Grid>
          <Grid item className={classes.doctors}>
            <DoctorListContainer />
          </Grid>          
        </Grid>        
      </ResponsiveDrawerContainer>
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

HomeContainer.contextTypes = {
  drizzle: PropTypes.object,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(drizzleConnect(HomeContainer, mapStateToProps))
