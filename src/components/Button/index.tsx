import React, { type ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const Button: React.FC<Props> = ({ children, ...props }) => {
  return (
    <button className='border-1 border-primary px-4 py-2 hover:bg-primary hover:text-black transition-colors duration-150' {...props}>{children}</button>
  )
}

export default Button
