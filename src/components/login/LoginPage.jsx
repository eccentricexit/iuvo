import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'

const styles = {
  appBar: {
    position: 'relative'
  },
  flex: {
    flex: 1
  },
  card: {
    maxWidth: 500,
    marginTop: 64,
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    alignItems: 'center'
  },
  centeredItem: {
    flex: 1
  }
}

const LoginPage = (props) => {
  const { handleClick, classes } = props
  return (
    <div>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant='title' color='inherit' className={classes.flex}>
            IuvoCore | Login
          </Typography>
        </Toolbar>
      </AppBar>
      <Card className={classes.card}>
        <CardContent className={classes.centeredItem}>
          <Typography variant='headline' component='h3' >
            No need to register.
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant='contained'
            color='primary'
            className={classes.centeredItem}
            onClick={handleClick}
          >
            Click Login with <br /> uPort
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LoginPage)
