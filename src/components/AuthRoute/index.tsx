import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useUser from '../../hooks/useUser'

interface Props {
  children: React.ReactNode
}

const AuthRoute: React.FC<Props> = ({ children }) => {
  const { user, authenticating } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (authenticating) return
    if (user == null) {
      navigate('/login')
    }
  }, [user, authenticating])

  return (authenticating || user === null
    ? <p>Loading...</p>
    : <>{children}</>
  )
}

export default AuthRoute
