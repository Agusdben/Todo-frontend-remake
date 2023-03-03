import { Link } from 'react-router-dom'
import AppLayout from '../../components/AppLayout'
import LoginForm from '../../components/LoginForm'
import SectionTitle from '../../components/SectionTitle'

const Login: React.FC = () => {
  return (
    <AppLayout>
      <div className='w-full h-full flex flex-col items-center justify-center gap-4'>
        <section className='max-w-xs w-full p-4 flex flex-col items-center justify-center bg-black-700 rounded-md'>
          <SectionTitle>Login</SectionTitle>
          <LoginForm />
        </section>
        <section>
          <Link to={'/register'}>Create an account</Link>
        </section>
      </div>
    </AppLayout>
  )
}

export default Login
