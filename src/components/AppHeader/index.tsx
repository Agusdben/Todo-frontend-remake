import React from 'react'
import useUser from '../../hooks/useUser'
import Button from '../Button'

const AppHeader: React.FC = () => {
  const { logout, user } = useUser()
  return (
    <header className='flex max-w-lg mx-auto justify-center items-center px-4 py-2 w-full sm:px-0'>
      <h1 className='text-primary font-bold text-3xl sm:text-4xl overflow-hidden'>ToDo <span className='text-black px-2 bg-primary uppercase'>List</span></h1>
      {
        user !== null && (
          <section className='ml-auto'>
            <Button onClick={logout}>Logout</Button>
          </section>
        )
      }
    </header>
  )
}

export default AppHeader
