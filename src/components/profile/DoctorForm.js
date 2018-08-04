import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import { withFormik } from 'formik'

const enhanceWithFormik = withFormik({
  mapPropsToValues: (props) => ({
    name: props.doctor.name,
    bio: props.doctor.bio,
    profilePicIpfsAddr: props.doctor.profilePicIpfsAddr,
    contractIpfsAddr: props.doctor.contractIpfsAddr
  }),
  mapValuesToPayload: x => x,
  handleSubmit: (payload, bag) => {
    console.info('payload', payload)
    bag.setSubmitting(false)
    bag.props.updateDoctor(payload)
  },
  displayName: 'DoctorForm'
})

class DoctorForm extends Component {
  componentWillReceiveProps (nextProps) {
    if (nextProps.doctor.name !== this.props.doctor.name) {
      this.props.resetForm(nextProps)
    }
  }

  render () {
    return (
      <Card>
        <form onSubmit={this.props.handleSubmit}>
          <CardContent>
            <Typography variant='title' color='inherit'>
              Doctor data
            </Typography>
            <TextField
              id='name'
              value={this.props.values.name}
              onChange={this.props.handleChange}
              onBlur={this.props.handleBlur}
              autoFocus
              margin='dense'
              label='Name/Title'
              placeholder='Dr. Smith'
              disabled={!this.props.isSettingDoctor}
              fullWidth
            />
            <TextField
              id='bio'
              value={this.props.values.bio}
              margin='dense'
              label='Bio'
              fullWidth
              onChange={this.props.handleChange}
              onBlur={this.props.handleBlur}
              disabled={!this.props.isSettingDoctor}
            />
            <TextField
              id='profilePicIpfsAddr'
              value={this.props.values.profilePicIpfsAddr}
              margin='dense'
              label='Profile picture IPFS Address'
              fullWidth
              onChange={this.props.handleChange}
              onBlur={this.props.handleBlur}
              disabled={!this.props.isSettingDoctor}
            />
            <TextField
              id='contractIpfsAddr'
              margin='dense'
              value={this.props.values.contractIpfsAddr}
              label='Contract IPFS Address'
              fullWidth
              onChange={this.props.handleChange}
              onBlur={this.props.handleBlur}
              disabled={!this.props.isSettingDoctor}
            />
          </CardContent>
          <CardActions>
            <Button
              variant='contained'
              color='primary'
              onClick={this.props.handleToggleEdit}
              disabled={this.props.isSettingDoctor}
            >
              Edit
            </Button>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              disabled={!this.props.isSettingDoctor || this.props.isSubmitting}
            >
              {this.props.isSubmitting ? 'Please wait...' : 'Submit'}
            </Button>
            <Button
              variant='outlined'
              color='primary'
              onClick={this.props.handleToggleEdit}
              disabled={!this.props.isSettingDoctor}
            >
              Cancel
            </Button>
          </CardActions>
        </form>
      </Card>
    )
  }
}

const EnhancedDoctorFrom = enhanceWithFormik(DoctorForm)

export default EnhancedDoctorFrom

// export default withFormik({
//   mapPropsToValues: () => ({
//     name: '',
//     bio: '',
//     profilePicIpfsAddr: '',
//     contractIpfsAddr: ''
//   }),
//   handleSubmit: (payload, bag) => {
//     console.info('payload', payload)
//     bag.setSubmitting(false)
//     bag.props.updateDoctor(payload)
//   },
//   displayName: 'DoctorForm'
// })(DoctorForm)
