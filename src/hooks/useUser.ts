import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { loginWithUsernameAndPassword } from '../services/user'
import { type LoginFormFields } from '../types/login'
import { type User } from '../types/user'

interface ReturnedProps {
  user: User | null
  authenticating: boolean
  login: ({ password, username }: LoginFormFields) => Promise<void>
}

const useUser = (): ReturnedProps => {
  const { user, setUser, authenticating } = useContext(UserContext)

  const login = async ({ password, username }: LoginFormFields): Promise<void> => {
    await loginWithUsernameAndPassword({ password, username })
      .then(setUser)
  }

  return {
    user,
    authenticating,
    login
  }
}

export default useUser
