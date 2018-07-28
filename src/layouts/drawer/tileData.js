import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Timer from '@material-ui/icons/Timer'
import StarIcon from '@material-ui/icons/Star'
import ReportIcon from '@material-ui/icons/Report'

export const menuListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <StarIcon />
      </ListItemIcon>
      <ListItemText primary='Favorites' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ReportIcon />
      </ListItemIcon>
      <ListItemText primary='Disputes' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Timer />
      </ListItemIcon>
      <ListItemText primary='Ongoing contracts' />
    </ListItem>
  </div>
)
