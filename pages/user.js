import React, { useEffect } from 'react'
import UserContext from '../components/UserContext'

export default function (props) {
  const { user } = React.useContext(UserContext)

  useEffect(() => {
    props.updateTitle('Profile')
  }, [])

  // TODO: Add some styling
  return (
    <div>
      {JSON.stringify(user)}
    </div>
  )
}
