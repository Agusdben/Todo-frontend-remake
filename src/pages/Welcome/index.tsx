import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../../components/AppLayout'
import Button from '../../components/Button'
import SectionTitle from '../../components/SectionTitle'
import { LOCAL_STORAGE_KEYS } from '../../constants/localstorage'

const Welcome: React.FC = () => {
  const newUser = window.localStorage.getItem(LOCAL_STORAGE_KEYS.newUser)
  const navigate = useNavigate()

  useEffect(() => {
    newUser === null && navigate('/')
  }, [])

  const handleContinue = (): void => {
    window.localStorage.removeItem(LOCAL_STORAGE_KEYS.newUser)
    navigate('/')
  }

  return (
    newUser !== null
      ? (
      <AppLayout>
      <section className='w-full h-full flex flex-col items-center justify-center'>
        <div className='relative w-full h-auto max-w-xs aspect-square m-0'>
          <img className='w-full h-auto object-contain' src="/welcome.svg" alt="image to greet a new user for creating an account" />
          <p className='text-black font-bold text-3xl text-center rounded-full shadow-lg shadow-black-500 w-full absolute top-1/2 left-0 -translate-y-1/2 bg-primary p-2'>{newUser}!</p>
        </div>
        <SectionTitle>You&apos;ve successfully signed up!</SectionTitle>
        <Button type='button' onClick={handleContinue}>Continue</Button>
      </section>
    </AppLayout>
        )
      : <></>
  )
}

export default Welcome
