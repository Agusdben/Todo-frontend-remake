import { colors } from '../../config/theme'
import { REGISTER_FORM_FIELDS } from '../../constants/register'
import Button from '../Button'
import ErrorMessage from '../ErrorMessage'
import LockIcon from '../Icons/LockIncon'
import UserIcon from '../Icons/UserIcon'
import InputText from '../InputText'
import useRegisterForm from './useRegisterForm'

const RegisterForm: React.FC = () => {
  const { formState, error, loading, handleOnChange, handleConfirmPassword, handleSignin } = useRegisterForm()

  return (
    <form className='w-full flex flex-col gap-4' onSubmit={handleSignin}>
      <InputText
        icon={<UserIcon fill={colors.primary}/>}
        error={formState.username.error}
        name={REGISTER_FORM_FIELDS.username}
        value={formState.username.value}
        onChange={handleOnChange}
        placeholder='username'
        required
        type='text'
      />
      <InputText
        icon={<LockIcon fill={colors.primary}/>}
        error={formState.password.error}
        name={REGISTER_FORM_FIELDS.password}
        onChange={handleOnChange}
        placeholder='password'
        required
        type='password'
        value={formState.password.value}
      />
      <InputText
        icon={<LockIcon fill={colors.primary}/>}
        error={formState.confirmPassword.error}
        name={REGISTER_FORM_FIELDS.confirmPassword}
        onChange={handleConfirmPassword}
        placeholder='confirm password'
        required
        type='password'
        value={formState.confirmPassword.value}
      />
      {error !== '' && <ErrorMessage error={error}/>}
      <Button type='submit'>{loading ? 'loading' : 'Register'}</Button>
    </form>
  )
}

export default RegisterForm
