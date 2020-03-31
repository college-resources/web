import { makeStyles } from '@material-ui/core/styles'
import SideBarList from './SideBarList'

const useStyles = makeStyles({
  list: {
    width: 240
  }
})

export default function (props) {
  const classes = useStyles()

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
      <SideBarList />
    </div>
  )
}
