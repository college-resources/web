import { useContext } from 'react'
import Router from 'next/router'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import BookIcon from '@material-ui/icons/Book'
import RestaurantIcon from '@material-ui/icons/Restaurant'
import SettingsIcon from '@material-ui/icons/Settings'
import SignoutIcon from '@material-ui/icons/ExitToApp'
import Divider from '@material-ui/core/Divider'
import UserContext from '../UserContext'
import ButtonLink from '../ButtonLink'

function ListItemLink (props) {
  return (
    <ListItem button component={ButtonLink} {...props} />
  )
}

export default function () {
  const { user, setUser } = useContext(UserContext)

  return (
    <>
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
              <ListItem disabled button key={text}>
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
    </>
  )
}
