import React, { Component } from 'react'
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
import { uport, web3 } from '../../util/connectors'

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
  accountIcon: {
    marginLeft: 'auto'
  }
})

class ResponsiveDrawer extends Component {
  state = {
    mobileOpen: false,
    credentials: null
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }))
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  }

  handleLogin = () => {
    uport.requestCredentials({requested: ['name','avatar']}).then(credentials => {
      console.info(credentials.avatar)
      this.setState({credentials})
    })
  }

  render() {
    const { classes, theme, children, currentPage } = this.props
    const { credentials } = this.state

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
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton> 
            <Typography variant="title" color="inherit" noWrap>
              {currentPage}
            </Typography>            
            <IconButton
              onClick={this.handleLogin}
              color="inherit"
              className={classes.accountIcon}
            >
              {!credentials
                ? <AccountCircle  />
                : <Avatar alt="Profile pic" src={credentials.avatar.uri} />
              }
            </IconButton>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
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
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer)