import { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
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
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  avatar: {
    width: '32px',
    height: '32px'
  }
}))

const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)

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
            <Button color='inherit' component={ButtonLink} href='/login'>Login</Button>
          )}
        </Toolbar>
      </AppBar>
      <PermanentBar />
      <Toolbar />
    </>
  )
}
