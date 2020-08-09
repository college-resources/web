import { status as authStatus, logout, selectStatus } from 'redux/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import BookIcon from '@material-ui/icons/Book'
import Divider from '@material-ui/core/Divider'
import HomeIcon from '@material-ui/icons/Home'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemLink from './ListItemLink'
import ListItemText from '@material-ui/core/ListItemText'
import React from 'react'
import RestaurantIcon from '@material-ui/icons/Restaurant'
import SettingsIcon from '@material-ui/icons/Settings'
import SignoutIcon from '@material-ui/icons/ExitToApp'

export default function SideBarList () {
  const dispatch = useDispatch()
  const currentAuthStatus = useSelector(selectStatus)

  function handleLogout () {
    dispatch(logout())
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
          href="/courses"
          key="Courses"
        >
          <ListItemIcon>
            <BookIcon />
          </ListItemIcon>
          <ListItemText primary="Courses" />
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
      {currentAuthStatus === authStatus.AUTHENTICATED && (
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
