import React from 'react'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import { Typography } from '@material-ui/core'


const DoctorListItem = ({ doctor, classes }) => {
  const { name, bio, rating, imgRaw } = doctor

  return (
    <ListItem dense button className={classes.listItem} key={name}>
      <Avatar alt='Portrait' src={imgRaw} />
      <ListItemText primary={name} secondary={bio} />
      <Typography>{`rating: ${rating}`}</Typography>
      <Divider />
    </ListItem>
  )
}

export default DoctorListItem
