import { useContext, forwardRef, Fragment } from 'react'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import Router from 'next/router'
import UserContext from './UserContext'
import HomeIcon from '@material-ui/icons/Home'
import BookIcon from '@material-ui/icons/Book'
import RestaurantIcon from '@material-ui/icons/Restaurant'
import SettingsIcon from '@material-ui/icons/Settings'
import SignoutIcon from '@material-ui/icons/ExitToApp'

const useStyles = makeStyles(theme => ({
  list: {
    width: 250
  }
}))

const ButtonLink = forwardRef((props, ref) => (
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

export default function Semester (props) {
  const classes = useStyles()
  const { user, setUser } = useContext(UserContext)

  const toggleDrawer = (open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    props.setDrawerOpen(open)
  }

  return (
    <div
      className={classes.list}
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
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
        <ListItemLink button href='/feeding' key={'Feeding'}>
          <ListItemIcon><RestaurantIcon /></ListItemIcon>
          <ListItemText primary={'Feeding'} />
        </ListItemLink>
      </List>
      {user && (
        <Fragment>
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
        </Fragment>
      )}
    </div>
  )
}
