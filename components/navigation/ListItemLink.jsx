import ButtonLink from 'components/ButtonLink'
import ListItem from '@material-ui/core/ListItem'
import React from 'react'

export default function ListItemLink (props) {
  return (
    <ListItem
      button
      component={ButtonLink}
      {...props}
    />
  )
}
