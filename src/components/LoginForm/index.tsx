import { colors } from '../../config/theme'
import { LOGIN_FORM_FIELDS } from '../../constants/login'
import Button from '../Button'
import ErrorMessage from '../ErrorMessage'
import LockIcon from '../Icons/LockIncon'
import UserIcon from '../Icons/UserIcon'
import InputText from '../InputText'
import useLoginForm from './useLoginForm'

const LoginForm: React.FC = () => {
  const { formState, loading, error, handleOnChange, handleLogin } = useLoginForm()

  return (
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
  )
}

export default LoginForm
