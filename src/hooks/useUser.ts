import { useContext } from 'react'
import { LOCAL_STORAGE_KEYS } from '../constants/localstorage'
import { TOKEN_ERRORS } from '../constants/tokenErrors'
import { UserContext } from '../contexts/UserContext'
import { loginWithUsernameAndPassword } from '../services/user'
import { type LoginFormFields } from '../types/login'
import { type User } from '../types/user'

interface ReturnType {
  user: User | null
  authenticating: boolean
  login: ({ password, username }: LoginFormFields) => Promise<void>
  checkTokenError: (error: string) => void
  logout: () => void
}

const useUser = (): ReturnType => {
  const { user, setUser, authenticating } = useContext(UserContext)

  const login = async ({ password, username }: LoginFormFields): Promise<void> => {
    await loginWithUsernameAndPassword({ password, username })
      .then(user => {
        setUser(user)
        window.localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, user.token)
      })
  }

  const logout = (): void => {
    window.localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN)
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
    logout,
    checkTokenError
  }
}

export default useUser
