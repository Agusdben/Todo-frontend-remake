import { useState } from 'react'
import { type AlertMessage, type Alert } from '../types/alert'

const useAlert = (): Alert => {
  const [message, setMessage] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const onClose = (): void => {
    setMessage('')
    setIsOpen(false)
  }

  const displayMessage = ({ message }: AlertMessage): void => {
    setMessage(message)
    setIsOpen(true)
  }

  return {
    message,
    setMessage,
    isOpen,
    onClose,
    displayMessage
  }
}

export default useAlert
