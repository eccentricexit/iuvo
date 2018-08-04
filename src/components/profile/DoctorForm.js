import React from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import { withFormik } from 'formik'

const DoctorForm = ({
  handleToggleEdit,
  handleDeleteDoctor,
  isSettingDoctor,
  values,
  touched,
  errors,
  dirty,
  isSubmitting,
  handleChange,
  handleBlur,
  handleSubmit,
  handleReset
}) => {
  return (
    <Card>
      <form onSubmit={handleSubmit}>
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
            disabled={!isSettingDoctor}
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
            disabled={!isSettingDoctor}
          />
          <TextField
            id='profilePicIpfsAddr'
            value={this.props.values.profilePicIpfsAddr}
            margin='dense'
            label='Profile picture IPFS Address'
            fullWidth
            onChange={this.props.handleChange}
            onBlur={this.props.handleBlur}
            disabled={!isSettingDoctor}
          />
          <TextField
            id='contractIpfsAddr'
            margin='dense'
            value={this.props.values.contractIpfsAddr}
            label='Contract IPFS Address'
            fullWidth
            onChange={this.props.handleChange}
            onBlur={this.props.handleBlur}
            disabled={!isSettingDoctor}
          />
        </CardContent>
        <CardActions>
          <Button
            variant='contained'
            color='primary'
            onClick={this.props.handleToggleEdit}
            disabled={isSettingDoctor}
          >
            Edit
          </Button>
          <Button
            variant='contained'
            color='primary'
            type='submit'
            disabled={!isSettingDoctor || isSubmitting}
          >
            {isSubmitting ? 'Please wait...' : 'Submit'}
          </Button>
          <Button
            variant='outlined'
            color='primary'
            onClick={this.props.handleToggleEdit}
            disabled={!isSettingDoctor}
          >
            Cancel
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default withFormik({
  mapPropsToValues: props => ({
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
})(DoctorForm)
