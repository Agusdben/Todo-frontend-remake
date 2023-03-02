import { useState } from 'react'
import AppLayout from '../../components/AppLayout'
import InputText from '../../components/InputText'
import { LOGIN_FORM_FIELDS } from '../../constants/login'
import useUser from '../../hooks/useUser'
import { type LoginFormFields } from '../../types/login'

const Login: React.FC = () => {
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

  return (
    <AppLayout>
      <section className='w-full h-full flex flex-col items-center justify-center'>
        <h2>Login</h2>
        <form className='max-w-xs w-full p-4 flex flex-col gap-4' onSubmit={handleLogin}>
          <InputText
            name={LOGIN_FORM_FIELDS.username}
            onChange={handleOnChange}
            placeholder='username'
            required
            type='text'
            value={formState.username}
          />
          <InputText
            name={LOGIN_FORM_FIELDS.password}
            onChange={handleOnChange}
            placeholder='password'
            required
            type='password'
            value={formState.password}
          />
          {error !== '' && <strong>{error}</strong>}
          <button type='submit'>{loading ? 'loading' : 'Login'}</button>
        </form>
      </section>
    </AppLayout>
  )
}

export default Login
