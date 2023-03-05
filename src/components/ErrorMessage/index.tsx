import React from 'react'

interface Props {
  error: string
}

const ErrorMessage: React.FC<Props> = ({ error }) => {
  return (
    <strong className='text-red'>{error}</strong>
  )
}

export default ErrorMessage
