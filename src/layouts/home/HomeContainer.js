import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import DoctorListContainer from './DoctorListContainer'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  categories: {
    flexGrow: 1
  },
  doctors: {
    flexGrow: 8
  },
  container: {
    direction: 'row',
    justify: 'flex-start',
    alignItems: 'flex-start'
  },
  title: {
    fontSize: 14
  }
})

class HomeContainer extends Component {
  render () {
    const { classes } = this.props
    return (      
      <Grid container spacing={24} className={classes.container}>
        <Grid item className={classes.categories}>
          <DoctorListContainer />
        </Grid>          
      </Grid>
    )
  }
}

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
  }
}

HomeContainer.contextTypes = {
  drizzle: PropTypes.object  
}

export default withStyles(styles)(drizzleConnect(HomeContainer, mapStateToProps))
