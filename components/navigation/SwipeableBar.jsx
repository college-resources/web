import SideBarList from './SideBarList'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  list: {
    width: 240,
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  }
})

export default function SwipeableBar(props) {
  const classes = useStyles()

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    props.setDrawerOpen(open)
  }

  return (
    <div
      className={classes.list}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      role="presentation"
    >
      <SideBarList />
    </div>
  )
}
