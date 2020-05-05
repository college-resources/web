import React, { useContext } from 'react'
import BookIcon from '@material-ui/icons/Book'
import Divider from '@material-ui/core/Divider'
import HomeIcon from '@material-ui/icons/Home'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemLink from './ListItemLink'
import ListItemText from '@material-ui/core/ListItemText'
import RestaurantIcon from '@material-ui/icons/Restaurant'
import Router from 'next/router'
import SettingsIcon from '@material-ui/icons/Settings'
import SignoutIcon from '@material-ui/icons/ExitToApp'
import UserContext from '../UserContext'

export default function SideBarList () {
  const { user, setUser } = useContext(UserContext)

  function handleLogout () {
    setUser(null)
    Router.push('/auth/logout')
  }

  return (
    <>
      <List>
        <ListItemLink
          button
          href="/"
          key="Home"
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemLink>
        <ListItemLink
          button
          href="/lesson-list"
          key="Lesson List"
        >
          <ListItemIcon>
            <BookIcon />
          </ListItemIcon>
          <ListItemText primary="Lesson List" />
        </ListItemLink>
        <ListItemLink
          button
          href="/feeding"
          key="Feeding"
        >
          <ListItemIcon>
            <RestaurantIcon />
          </ListItemIcon>
          <ListItemText primary="Feeding" />
        </ListItemLink>
      </List>
      {user && (
        <>
          <Divider />
          <List>
            {['Settings [TODO]'].map((text) => (
              <ListItem
                button
                disabled
                key={text}
              >
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Log out'].map((text) => (
              <ListItem
                button
                key={text}
                onClick={handleLogout}
              >
                <ListItemIcon>
                  <SignoutIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </>
  )
}
