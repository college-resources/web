import React from 'react'
import UserContext from '../components/UserContext'

export default function () {
  const { user } = React.useContext(UserContext)

  // TODO: Add some styling
  return (
    <div>
      {JSON.stringify(user)}
    </div>
  )
}
