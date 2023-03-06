import React, { useEffect, useRef } from 'react'
import { type AlertWindow } from '../../types/alert'
import Portal from '../Portal'

const Alert: React.FC<AlertWindow> = ({ onClose, isOpen, message }) => {
  const alertRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!isOpen || (alertRef.current == null)) return

    const el = alertRef.current

    el.addEventListener('animationend', onClose)

    return () => {
      el.removeEventListener('animationend', onClose)
    }
  }, [isOpen, alertRef.current])

  return (
    <>
    {
      isOpen
        ? (
        <Portal elementID='alert'>
          <section ref={alertRef} className='w-screen h-auto px-4 pb-4 overflow-hidden fixed z-50 -bottom-full left-0 text-black font-bold animate-alert'>
            <p className='py-2 px-6 m-auto bg-primary rounded-full max-w-xs shadow-black shadow-md text-center'>{message}</p>
          </section>
        </Portal>
          )
        : null
    }
    </>
  )
}

export default Alert
