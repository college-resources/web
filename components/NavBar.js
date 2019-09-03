import React from 'react'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Avatar from '@material-ui/core/Avatar'
import AccountCircle from '@material-ui/icons/AccountCircle'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'
import HomeIcon from '@material-ui/icons/Home'
import BookIcon from '@material-ui/icons/Book'
import SettingsIcon from '@material-ui/icons/Settings'
import SignoutIcon from '@material-ui/icons/ExitToApp'
import UserContext from './UserContext'
import Router from 'next/router'

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
    flexGrow: 1
  },
  navbar: {
    backgroundColor: theme.palette.primary.dark
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
  },
  avatar: {
    width: '32px',
    height: '32px'
  }
}))

const ButtonLink = React.forwardRef((props, ref) => (
  <Link href={props.href} children={(
    <a {...props} ref={ref} href='#'>
      {props.children}
    </a>
  )} />
))

function ListItemLink (props) {
  return (
    <ListItem button component={ButtonLink} {...props} />
  )
}

export default function (props) {
  const classes = useStyles()
  const [state, setState] = React.useState({
    left: false
  })
  const { user, setUser } = React.useContext(UserContext)

  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
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
        <ListItemLink button href='/lesson-list' key={'Lesson List'}>
          <ListItemIcon><BookIcon /></ListItemIcon>
          <ListItemText primary={'Lesson List'} />
        </ListItemLink>
      </List>
      {user && (
        <React.Fragment>
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
              <ListItem button key={text} onClick={() => {
                setUser(null)
                Router.push('/auth/logout')
              }}>
                <ListItemIcon><SignoutIcon /></ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </React.Fragment>
      )}
    </div>
  )

  return (
    <React.Fragment>
      <ElevationScroll {...props}>
        <AppBar className={classes.navbar}>
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
            <SwipeableDrawer
              open={state.left}
              onOpen={toggleDrawer('left', true)}
              onClose={toggleDrawer('left', false)}
            >
              {sideList('left')}
            </SwipeableDrawer >
            <Typography variant='h6' className={classes.title}>
              {props.title}
            </Typography>
            {user ? (
              <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                color='inherit'
                component={ButtonLink}
                href='/user'
              >
                {user.picture ? (
                  <Avatar alt='account picture' src={user.picture} className={classes.avatar} />
                ) : (
                  <AccountCircle className={classes.avatar} />
                )}
              </IconButton>
            ) : (
              <Button color='inherit' href='/login'>Login</Button>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  )
}
