import type React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LOCAL_STORAGE_KEYS } from '../../constants/localstorage'
import { REGISTER_ERRORS, REGISTER_REGEX } from '../../constants/register'
import useUser from '../../hooks/useUser'
import { registerNewUser } from '../../services/user'
import { type RegisterFormValues, type KeyInRegisterFormFields, type RegisterFormFields } from '../../types/register'

interface ReturnType {
  formState: RegisterFormFields
  error: string
  loading: boolean
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleConfirmPassword: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSignin: (e: React.FormEvent<HTMLFormElement>) => void
}

const useRegisterForm = (): ReturnType => {
  const { login } = useUser()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [formState, setFormState] =
  useState<RegisterFormFields>({
    username: { value: '', error: '' },
    password: { value: '', error: '' },
    confirmPassword: { value: '', error: '' }
  })

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    let error: string = ''
    const regex = REGISTER_REGEX[name as KeyInRegisterFormFields]

    if (!regex.test(value)) {
      const errorMessage = REGISTER_ERRORS[name as KeyInRegisterFormFields]
      e.target.setCustomValidity(errorMessage)
      error = errorMessage
    } else {
      e.target.setCustomValidity('')
    }

    setFormState((formState) => {
      return {
        ...formState,
        [name]: { value, error }
      }
    })
  }

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    let error: string = ''

    if (value !== formState.password.value) {
      const errorMessage = REGISTER_ERRORS[name as KeyInRegisterFormFields]
      e.target.setCustomValidity(errorMessage)
      error = errorMessage
    } else {
      e.target.setCustomValidity('')
    }

    setFormState((formState) => {
      return {
        ...formState,
        [name]: {
          error,
          value
        }
      }
    })
  }

  const handleSignin = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const body: RegisterFormValues = {
      username: formState.username.value,
      password: formState.password.value,
      confirmPassword: formState.confirmPassword.value
    }
    registerNewUser(body)
      .then(() => {
        window.localStorage.setItem(LOCAL_STORAGE_KEYS.newUser, body.username)

        login({ password: body.password, username: body.username })
          .catch(error => { console.error(error) })

        navigate('/welcome')
      })
      .catch(error => { setError(error.message) })
      .finally(() => { setLoading(false) })
  }

  return {
    formState,
    error,
    loading,
    handleOnChange,
    handleConfirmPassword,
    handleSignin
  }
}

export default useRegisterForm
