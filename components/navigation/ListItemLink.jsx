import ButtonLink from 'components/ButtonLink'
import ListItem from '@material-ui/core/ListItem'

export default function ListItemLink (props) {
  return (
    <ListItem
      button
      component={ButtonLink}
      {...props}
    />
  )
}
