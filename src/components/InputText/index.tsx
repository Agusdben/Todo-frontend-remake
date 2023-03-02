import React, { useState } from 'react'

interface Props {
  type: 'text' | 'password' | 'email'
  name: string
  required: boolean
  placeholder: string
  error?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputText: React.FC<Props> = ({
  type,
  name,
  required,
  placeholder,
  error = '',
  value,
  onChange
}) => {
  const [focused, setFocused] = useState<boolean>(false)

  const wasClicked = (): void => {
    setFocused(true)
  }

  return (
    <div className='flex flex-col gap-1'>
      <input
        autoComplete='off'
        className='bg-transparent outline-none peer border-b-2 p-2 invalid:border-red-900 valid:border-green-900 '
        value={value}
        placeholder={`${placeholder} ${required ? '*' : ''}`}
        name={name}
        type={type}
        required={required}
        onChange={onChange}
        onBlur={wasClicked}
      />
      {error !== '' && (
        <small
          className={`${
            focused ? 'peer-invalid:block peer-valid:hidden' : 'hidden'
          }`}
        >
          {error}
        </small>
      )}
    </div>
  )
}

export default InputText
