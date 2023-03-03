import { Link } from 'react-router-dom'
import AppLayout from '../../components/AppLayout'
import SectionTitle from '../../components/SectionTitle'
import RegisterForm from '../../components/RegisterForm'

const Register: React.FC = () => {
  return (
    <AppLayout>
      <div className='w-full h-full flex flex-col items-center justify-center gap-4'>
        <section className='max-w-xs w-full p-4 flex flex-col items-center justify-center bg-black-700 rounded-md'>
          <SectionTitle>Register</SectionTitle>
          <RegisterForm />
        </section>
        <section>
          <Link to={'/login'}>Already have an account?</Link>
        </section>
      </div>
    </AppLayout>
  )
}

export default Register
