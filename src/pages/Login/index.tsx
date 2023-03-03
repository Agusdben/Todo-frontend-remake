import { useState } from 'react'
import { Link } from 'react-router-dom'
import AppLayout from '../../components/AppLayout'
import Button from '../../components/Button'
import ErrorMessage from '../../components/ErrorMessage'
import LockIcon from '../../components/Icons/LockIncon'
import UserIcon from '../../components/Icons/UserIcon'
import InputText from '../../components/InputText'
import SectionTitle from '../../components/SectionTitle'
import { colors } from '../../config/theme'
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
      <div className='w-full h-full flex flex-col items-center justify-center gap-4'>
        <section className='max-w-xs w-full p-4 flex flex-col items-center justify-center bg-black-700'>
          <SectionTitle>Login</SectionTitle>
          <form className='w-full flex flex-col gap-4' onSubmit={handleLogin}>
            <InputText
              icon={<UserIcon fill={colors.primary}/>}
              name={LOGIN_FORM_FIELDS.username}
              onChange={handleOnChange}
              placeholder='username'
              required
              type='text'
              value={formState.username}
            />
            <InputText
              icon={<LockIcon fill={colors.primary}/>}
              name={LOGIN_FORM_FIELDS.password}
              onChange={handleOnChange}
              placeholder='password'
              required
              type='password'
              value={formState.password}
            />
            {error !== '' && <ErrorMessage error={error}/>}
            <Button type='submit'>{loading ? 'loading' : 'Login'}</Button>
          </form>
        </section>
        <section>
          <Link to={'/register'}>Create an account</Link>
        </section>
      </div>
    </AppLayout>
  )
}

export default Login
