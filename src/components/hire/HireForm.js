import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { withFormik } from 'formik'
import Avatar from '@material-ui/core/Avatar'

const enhanceWithFormik = withFormik({
  mapPropsToValues: (props) => ({
    name: props.doctor.name,
    doctorAddr: props.doctor.doctorAddr,
    bio: props.doctor.bio,
    imgRaw: props.doctor.imgRaw,
    rating: props.doctor.rating,
    price: props.doctor.price,
    profilePicIpfsAddr: props.doctor.profilePicIpfsAddr,
    contractIpfsAddr: props.doctor.contractIpfsAddr
  }),
  mapValuesToPayload: x => x,
  handleSubmit: (payload, bag) => {
    bag.props.handleRequestService(
      payload,
      '0x60c24da2a9220693b8f2f79d57dad8e5658eccd2', // Arbitrator
      432000 // Dispute timeout
    )
  },
  displayName: 'HireForm'
})

const styles = theme => ({
  card: {
    display: 'flex'
  },
  cover: {
    width: 221,
    height: 221,
    alignSelf: 'center'
  },
  grow: {
    flex: 1
  },
  avatar: {
    marginLeft: 20,
    width: 220,
    height: 220,
    alignSelf: 'center'
  }
})

class HireForm extends Component {
  render () {
    const { classes } = this.props

    return (
      <Card className={classes.card} >
        <Avatar
          className={classes.avatar}
          src={this.props.values.imgRaw} />
        <div className={classes.grow}>
          <form onSubmit={this.props.handleSubmit}>
            <CardContent >
              <Typography variant='title' color='inherit'>
                Doctor data
              </Typography>
              <TextField
                id='name'
                value={this.props.values.name}
                onBlur={this.props.handleBlur}
                autoFocus
                margin='dense'
                label='Name/Title'
                disabled
                fullWidth
              />
              <TextField
                id='rating'
                value={this.props.values.rating}
                onBlur={this.props.handleBlur}
                autoFocus
                margin='dense'
                label='Rating'
                disabled
                fullWidth
              />
              <TextField
                id='bio'
                value={this.props.values.bio}
                margin='dense'
                label='Bio'
                fullWidth
                onBlur={this.props.handleBlur}
                disabled
              />
              <TextField
                id='price'
                value={this.props.values.price}
                margin='dense'
                label='Price in ether'
                fullWidth
                onBlur={this.props.handleBlur}
                disabled
              />
              <TextField
                id='doctorAddr'
                value={this.props.values.doctorAddr}
                onBlur={this.props.handleBlur}
                autoFocus
                margin='dense'
                label='Address: '
                disabled
                fullWidth
              />
              <TextField
                id='arbitrator'
                value='0x60c24da2a9220693b8f2f79d57dad8e5658eccd2'
                margin='dense'
                label='Kleros arbitrator address'
                fullWidth
                onChange={this.props.handleChange}
                onBlur={this.props.handleBlur}
                disabled
              />
              <TextField
                id='timeout'
                value='5 days'
                margin='dense'
                label='Time after which a non responding party looses a dispute'
                fullWidth
                onChange={this.props.handleChange}
                onBlur={this.props.handleBlur}
                disabled
              />
            </CardContent>
            <CardActions>
              <Button
                variant='contained'
                color='primary'
                type='submit'
                disabled={this.props.isTxPending}
              >
                {this.props.isTxPending ? 'Please wait...' : 'Request Services'}
              </Button>
              <Button
                variant='outlined'
                color='primary'
                onClick={() => this.props.handleViewContract(this.props.doctor)}
              >
                View Contract
              </Button>
            </CardActions>
          </form>
        </div>
      </Card>
    )
  }
}

HireForm.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

const EnhancedDoctorFrom = enhanceWithFormik(withStyles(styles, { withTheme: true })(HireForm))

export default EnhancedDoctorFrom

// export default HireForm
