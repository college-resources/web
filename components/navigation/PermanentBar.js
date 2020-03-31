import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import SideBarList from './SideBarList'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    [theme.breakpoints.down('lg')]: {
      display: 'none'
    },
    width: drawerWidth
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar
}))

export default function ClippedDrawer () {
  const classes = useStyles()

  return (
    <Drawer
      variant='permanent'
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.toolbar} />
      <SideBarList />
    </Drawer>
  )
}
