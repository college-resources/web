import Drawer from '@material-ui/core/Drawer'
import SideBarList from './SideBarList'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    backgroundColor: theme.palette.background.tertiary,
    [theme.breakpoints.down('lg')]: {
      display: 'none'
    },
    width: 240
  },
  // Necessary for content to be below app bar
  toolbar: theme.mixins.toolbar
}))

export default function PermanentBar() {
  const classes = useStyles()

  return (
    <Drawer
      classes={{
        paper: classes.drawerPaper
      }}
      variant="permanent"
    >
      <div className={classes.toolbar} />
      <SideBarList />
    </Drawer>
  )
}
