import { useState, useContext } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Avatar from '@material-ui/core/Avatar'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Button from '@material-ui/core/Button'
import SwipeableBar from './SwipeableBar'
import PermanentBar from './PermanentBar'
import UserContext from '../UserContext'
import ButtonLink from '../ButtonLink'
import { useChangeTheme } from '../ThemeContext'

const useStyles = makeStyles(theme => ({
  navbar: {
    backgroundColor: theme.palette.primary.dark,
    zIndex: theme.zIndex.drawer + 1
  },
  swipebar: {
    [theme.breakpoints.up('xl')]: {
      display: 'none'
    }
  },
  menuButton: {
    [theme.breakpoints.up('xl')]: {
      display: 'none'
    },
    color: theme.palette.common.white,
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    color: theme.palette.common.white
  },
  avatar: {
    width: '32px',
    height: '32px'
  },
  button: {
    color: theme.palette.common.white
  }
}))

const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)

export default function (props) {
  const classes = useStyles()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { user } = useContext(UserContext)

  const theme = useTheme()
  const changeTheme = useChangeTheme()
  const handleTogglePaletteType = () => {
    const paletteType = theme.palette.type === 'light' ? 'dark' : 'light'

    changeTheme({ paletteType })
  }

  const toggleDrawer = (open) => event => {
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
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            className={classes.swipebar}
            open={drawerOpen}
            onOpen={toggleDrawer(true)}
            onClose={toggleDrawer(false)}
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
          >
            <SwipeableBar setDrawerOpen={setDrawerOpen} />
          </SwipeableDrawer>
          <Typography variant='h6' className={classes.title}>
            {props.title}
          </Typography>
          <Button color='inherit' onClick={handleTogglePaletteType} className={classes.button}>
            Theme toggle
          </Button>
          {user ? (
            <IconButton
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              color='inherit'
              component={ButtonLink}
              href='/profile'
            >
              {user.picture ? (
                <Avatar alt='account picture' src={user.picture} className={classes.avatar} />
              ) : (
                <AccountCircle className={classes.avatar} />
              )}
            </IconButton>
          ) : (
            <Button color='inherit' component={ButtonLink} href='/login' className={classes.button}>Login</Button>
          )}
        </Toolbar>
      </AppBar>
      <PermanentBar />
      <Toolbar />
    </>
  )
}
