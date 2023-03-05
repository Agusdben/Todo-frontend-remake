import React, { type ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  solid?: boolean
}

const Button: React.FC<Props> = ({ children, solid, ...props }) => {
  const className = solid === true
    ? 'bg-primary text-black hover:brightness-125'
    : 'hover:bg-primary hover:text-black'
  return (
    <button
      className={`px-4 py-2 transition-colors duration-150 border-1 border-primary ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
