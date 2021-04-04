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
import NotesIcon from '@material-ui/icons/Notes'
import RestaurantIcon from '@material-ui/icons/Restaurant'
import SettingsIcon from '@material-ui/icons/Settings'
import SignoutIcon from '@material-ui/icons/ExitToApp'
import { selectVersion } from '../../redux/envSlice'
import { Typography } from '@material-ui/core'

export default function SideBarList() {
  const dispatch = useDispatch()
  const currentAuthStatus = useSelector(selectStatus)
  const version = useSelector(selectVersion)

  function handleLogout() {
    dispatch(logout())
  }

  return (
    <>
      <List>
        <ListItemLink button href="/" key="Home">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemLink>
        <ListItemLink button href="/courses" key="Courses">
          <ListItemIcon>
            <BookIcon />
          </ListItemIcon>
          <ListItemText primary="Courses" />
        </ListItemLink>
        <ListItemLink button href="/notes" key="Notes">
          <ListItemIcon>
            <NotesIcon />
          </ListItemIcon>
          <ListItemText primary="Notes" />
        </ListItemLink>
        <ListItemLink button href="/feeding" key="Feeding">
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
              <ListItem button disabled key={text}>
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
              <ListItem button key={text} onClick={handleLogout}>
                <ListItemIcon>
                  <SignoutIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </>
      )}
      <Divider />
      <List style={{ marginTop: 'auto' }}>
        <ListItem>
          <Typography>{`Version: ${version}`}</Typography>
        </ListItem>
      </List>
    </>
  )
}
