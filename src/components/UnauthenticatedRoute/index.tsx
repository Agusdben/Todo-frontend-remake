import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import useUser from '../../hooks/useUser'

interface Props {
  children: React.ReactNode
}

const UnauthenticatedRoute: React.FC<Props> = ({ children }) => {
  const { authenticating, user } = useUser()

  const navigate = useNavigate()

  useEffect(() => {
    if (authenticating) return
    if (user != null) navigate('/')
  }, [authenticating, user])

  return (
    authenticating || user !== null
      ? <p>Loading...</p>
      : <>{children}</>
  )
}

export default UnauthenticatedRoute
