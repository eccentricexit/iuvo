import React from 'react'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import Avatar from '@material-ui/core/Avatar'

const DoctorListItem = ({ doctor, classes }) => {
    const { name, bio ,rating } = doctor

    return (
      <ListItem dense button className={classes.listItem}>
        <Avatar alt="Portrait" src={require('../../../assets/portrait.jpg')} />
        <ListItemText primary={name} secondary={bio}/>
        <Divider />
      </ListItem>
    )
}

export default DoctorListItem