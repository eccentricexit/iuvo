import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Favorite from '@material-ui/icons/Favorite'
import IconButton from '@material-ui/core/IconButton'
import Hidden from '@material-ui/core/Hidden'
import Divider from '@material-ui/core/Divider'
import MenuIcon from '@material-ui/icons/Menu'
import Avatar from '@material-ui/core/Avatar'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { menuListItems } from './tileData'


const drawerWidth = 240

const styles = theme => ({
  root: { 
    flexGrow: 1,    
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },  
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  rowDirecton: {
    flexDirection: 'row'
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  title: {
    color: theme.palette.text.secondary,
    fontFamily:'Abril Fatface, cursive',
    marginBottom: theme.spacing.unit / 2,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  toolbar: {
    ...theme.mixins.toolbar,      
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  accountAddress: {
    marginLeft: 'auto',
    marginRight: '1em'
  }
})

const ResponsiveDrawer = (props) => {
  
  const { 
    classes, 
    theme, 
    children, 
    currentPage, 
    handleDrawerToggle,
    mobileOpen,    
  } = props  

  const userData = props.userData.initialized 
    ? props.userData.userData 
    : props.userData

  const drawer = (
    <div>        
      <div className={classes.toolbar}>          
        <Favorite className={classes.icon} color="secondary"/>
        <Typography variant="title" color="inherit" className={classes.title}>
          IUVO
        </Typography>          
      </div>
      <Divider />
      <List>{menuListItems}</List>        
    </div>
  ) 

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerToggle}
            className={classes.navIconHide}
          >
            <MenuIcon />
          </IconButton> 
          <Typography variant="title" color="inherit" noWrap>
            {currentPage}
          </Typography>
          <Typography className={classes.accountAddress} color="inherit">
            {userData
              ? 'uPort addr: '+userData.address
              : ''
            }
          </Typography>
          <IconButton
            color="inherit"
          >
            {userData
              ? <Avatar alt="Profile pic" src={userData.avatar.uri} />
              : <AccountCircle  />
            }
          </IconButton>
        </Toolbar>
      </AppBar>
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          variant="permanent"
          open
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  )
  
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer)