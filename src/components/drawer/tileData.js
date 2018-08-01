import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Timer from '@material-ui/icons/Timer'
import ViewListIcon from '@material-ui/icons/ViewList'
import PersonIcon from '@material-ui/icons/Person'

export const menuListItems = (
  <div>
    <ListItem button onClick={() => {console.info('yay')}}>
      <ListItemIcon>
        <ViewListIcon />
      </ListItemIcon>
      <ListItemText primary='Doctor List' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary='My Account' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Timer />
      </ListItemIcon>
      <ListItemText primary='Appointments' />
    </ListItem>
  </div>
)
