import React, { useState } from 'react'
import { status as authStatus, selectStatus, selectUser } from 'redux/authSlice'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import AccountCircle from '@material-ui/icons/AccountCircle'
import AppBar from '@material-ui/core/AppBar'
import Avatar from '@material-ui/core/Avatar'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import Button from '@material-ui/core/Button'
import ButtonLink from 'components/ButtonLink'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import PermanentBar from './PermanentBar'
import SwipeableBar from './SwipeableBar'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { useChangeTheme } from 'components/ThemeContext'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: '32px',
    width: '32px'
  },
  button: {
    color: theme.palette.common.white
  },
  menuButton: {
    [theme.breakpoints.up('xl')]: {
      display: 'none'
    },
    color: theme.palette.common.white,
    marginRight: theme.spacing(2)
  },
  navbar: {
    backgroundColor: theme.palette.primary.dark,
    zIndex: theme.zIndex.drawer + 1
  },
  swipebar: {
    [theme.breakpoints.up('xl')]: {
      display: 'none'
    }
  },
  title: {
    color: theme.palette.common.white,
    flexGrow: 1
  }
}))

const iOS = process.browser && (/iPad|iPhone|iPod/u).test(navigator.userAgent)

export default function NavBar (props) {
  const classes = useStyles()
  const [
    drawerOpen,
    setDrawerOpen
  ] = useState(false)
  const { title } = props
  const user = useSelector(selectUser)
  const currentAuthStatus = useSelector(selectStatus)

  const theme = useTheme()
  const changeTheme = useChangeTheme()
  function handleTogglePaletteType () {
    const paletteType = theme.palette.type === 'light'
      ? 'dark'
      : 'light'

    changeTheme({ paletteType })
  }

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setDrawerOpen(open)
  }

  return (
    <>
      <AppBar className={classes.navbar}>
        <Toolbar>
          <IconButton
            aria-label="menu"
            className={classes.menuButton}
            color="inherit"
            edge="start"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            className={classes.swipebar}
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            open={drawerOpen}
          >
            <SwipeableBar setDrawerOpen={setDrawerOpen} />
          </SwipeableDrawer>
          <Typography
            className={classes.title}
            variant="h6"
          >
            {title}
          </Typography>
          <IconButton
            color="inherit"
            onClick={handleTogglePaletteType}
          >
            {
              theme.palette.type === 'light'
                ? <Brightness4Icon />
                : <Brightness7Icon />
            }
          </IconButton>
          {currentAuthStatus === authStatus.AUTHENTICATED ? (
            <IconButton
              aria-controls="menu-appbar"
              aria-haspopup="true"
              aria-label="account of current user"
              color="inherit"
              component={ButtonLink}
              href="/profile"
            >
              {user.picture ? (
                <Avatar
                  alt="account picture"
                  className={classes.avatar}
                  src={user.picture}
                />
              ) : (
                <AccountCircle className={classes.avatar} />
              )}
            </IconButton>
          ) : (
            <Button
              className={classes.button}
              color="inherit"
              component={ButtonLink}
              href="/login"
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <PermanentBar />
      <Toolbar />
    </>
  )
}
