import React from 'react'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'

const DoctorListItem = ({ doctor, classes }) => {
  const { name, bio, rating } = doctor

  return (
    <ListItem dense button className={classes.listItem}>
      <Avatar alt='Portrait' src={require('../../../assets/portrait.jpg')} />
      <ListItemText primary={name} secondary={bio} />
      <Divider />
    </ListItem>
  )
}

export default DoctorListItem
