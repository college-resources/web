import { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import Router from 'next/router'
import HomeIcon from '@material-ui/icons/Home'
import BookIcon from '@material-ui/icons/Book'
import RestaurantIcon from '@material-ui/icons/Restaurant'
import SettingsIcon from '@material-ui/icons/Settings'
import SignoutIcon from '@material-ui/icons/ExitToApp'
import UserContext from './UserContext'
import ButtonLink from './ButtonLink'

const useStyles = makeStyles({
  list: {
    width: 250
  }
})

function ListItemLink (props) {
  return (
    <ListItem button component={ButtonLink} {...props} />
  )
}

export default function (props) {
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
        <ListItemLink button href='/' key='Home'>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary='Home' />
        </ListItemLink>
        <ListItemLink button href='/lesson-list' key='Lesson List'>
          <ListItemIcon><BookIcon /></ListItemIcon>
          <ListItemText primary='Lesson List' />
        </ListItemLink>
        <ListItemLink button href='/feeding' key='Feeding'>
          <ListItemIcon><RestaurantIcon /></ListItemIcon>
          <ListItemText primary='Feeding' />
        </ListItemLink>
      </List>
      {user && (
        <>
          <Divider />
          <List>
            {['Settings [TODO]'].map((text) => (
              <ListItem disabled='true' button key={text}>
                <ListItemIcon><SettingsIcon /></ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Log out'].map((text) => (
              <ListItem
                button key={text} onClick={() => {
                  setUser(null)
                  Router.push('/auth/logout')
                }}
              >
                <ListItemIcon><SignoutIcon /></ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </div>
  )
}
