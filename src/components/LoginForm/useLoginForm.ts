import { useState } from 'react'
import useUser from '../../hooks/useUser'
import { type LoginFormFields } from '../../types/login'

interface ReturnType {
  formState: LoginFormFields
  loading: boolean
  error: string
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void
}

const useLoginForm = (): ReturnType => {
  const { login } = useUser()
  const [formState, setFormState] = useState<LoginFormFields>({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target

    setFormState((formState) => {
      return {
        ...formState,
        [name]: value
      }
    })
  }

  const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setLoading(true)
    setError('')
    login(formState)
      .catch(error => { setError(error.message) })
      .finally(() => { setLoading(false) })
  }
  return { formState, loading, error, handleOnChange, handleLogin }
}

export default useLoginForm
