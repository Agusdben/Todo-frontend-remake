import React from 'react'
import useUser from '../../hooks/useUser'
import Button from '../Button'

const AppHeader: React.FC = () => {
  const { logout, user } = useUser()
  return (
    <header className='flex max-w-lg m-auto justify-center items-center py-6 w-full'>
      <h1 className='text-primary font-bold text-5xl'>ToDo <span className='text-black px-2 bg-primary'>List</span></h1>
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
