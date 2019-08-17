import { createContext } from 'react'

const UserContext = createContext({
  user: null,
  signIn: null,
  signOut: null
})

export default UserContext
