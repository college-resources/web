import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Drawer from '@material-ui/core/Drawer'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import BookIcon from '@material-ui/icons/Book'
import SettingsIcon from '@material-ui/icons/Settings'
import SignoutIcon from '@material-ui/icons/ExitToApp'

function ElevationScroll (props) {
  const { children, window } = props
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined
  })

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  })
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  }
}))

function ListItemLink (props) {
  return <ListItem button component='a' {...props} />
}

export default function ElevateAppBar (props) {
  const classes = useStyles()
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  })

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setState({ ...state, [side]: open })
  }

  const sideList = side => (
    <div
      className={classes.list}
      role='presentation'
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItemLink button href='/' key={'Home'}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary={'Home'} />
        </ListItemLink>
        <ListItemLink button href='lesson-list' key={'Lesson List'}>
          <ListItemIcon><BookIcon /></ListItemIcon>
          <ListItemText primary={'Lesson List'} />
        </ListItemLink>
      </List>
      <Divider />
      <List>
        {['Settings'].map((text) => (
          <ListItem button key={text}>
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Log out'].map((text) => (
          <ListItem button key={text}>
            <ListItemIcon><SignoutIcon /></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <React.Fragment>
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
              onClick={toggleDrawer('left', true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
              {sideList('left')}
            </Drawer>
            <Typography variant='h6' className={classes.title}>
              {props.title}
            </Typography>
            <IconButton
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  )
}
