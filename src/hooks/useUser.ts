import { useContext } from 'react'
import { TOKEN_ERRORS } from '../constants/tokenErrors'
import { UserContext } from '../contexts/UserContext'
import { loginWithUsernameAndPassword } from '../services/user'
import { type LoginFormFields } from '../types/login'
import { type User } from '../types/user'

interface ReturnedProps {
  user: User | null
  authenticating: boolean
  login: ({ password, username }: LoginFormFields) => Promise<void>
  checkTokenError: (error: string) => void
}

const useUser = (): ReturnedProps => {
  const { user, setUser, authenticating } = useContext(UserContext)

  const login = async ({ password, username }: LoginFormFields): Promise<void> => {
    await loginWithUsernameAndPassword({ password, username })
      .then(setUser)
  }

  const logout = (): void => {
    setUser(null)
  }

  const checkTokenError = (error: string): void => {
    if (Object.values(TOKEN_ERRORS).some(val => val === error)) {
      logout()
    }
  }

  return {
    user,
    authenticating,
    login,
    checkTokenError
  }
}

export default useUser
