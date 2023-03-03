import React, { useState } from 'react'

interface Props {
  type: 'text' | 'password' | 'email'
  name: string
  required: boolean
  placeholder: string
  error?: string
  value: string
  icon?: React.ReactNode
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputText: React.FC<Props> = ({
  type,
  name,
  required,
  placeholder,
  error = '',
  icon,
  value,
  onChange
}) => {
  const [focused, setFocused] = useState<boolean>(false)

  const wasClicked = (): void => {
    setFocused(true)
  }

  return (
    <div className='flex flex-col gap-1'>
      <div className='flex items-center bg-black-500 border-1 border-r-0 border-primary '>
        {icon !== null ? <div className='p-2 '>{icon}</div> : null}
        <input
          autoComplete='off'
          className='flex-1 bg-transparent outline-none peer p-2 border-r-4 border-transparent invalid:border-red-700 valid:border-green-700'
          value={value}
          placeholder={`${placeholder}${required ? '*' : ''}`}
          name={name}
          type={type}
          required={required}
          onChange={onChange}
          onBlur={wasClicked}
        />
      </div>
      {error !== '' && focused && (
        <small>{error}</small>
      )}
    </div>
  )
}

export default InputText
