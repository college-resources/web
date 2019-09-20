import { useState, useContext, cloneElement, Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import AppBar from '@material-ui/core/AppBar'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Avatar from '@material-ui/core/Avatar'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Button from '@material-ui/core/Button'
import UserContext from './UserContext'
import ButtonLink from './ButtonLink'
import SideBar from './SideBar'

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

  return cloneElement(children, {
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
  fullList: {
    width: 'auto'
  },
  avatar: {
    width: '32px',
    height: '32px'
  }
}))

export default function (props) {
  const classes = useStyles()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { user } = useContext(UserContext)

  const toggleDrawer = (open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setDrawerOpen(open)
  }

  return (
    <Fragment>
      <ElevationScroll {...props}>
        <AppBar className={classes.navbar}>
          <Toolbar>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <SwipeableDrawer
              open={drawerOpen}
              onOpen={toggleDrawer(true)}
              onClose={toggleDrawer(false)}
            >
              <SideBar setDrawerOpen={setDrawerOpen} />
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
    </Fragment>
  )
}
