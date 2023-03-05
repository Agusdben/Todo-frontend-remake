import type React from 'react'
import { useState } from 'react'
import { type Todo } from '../../types/todos.d.'

interface ReturnType {
  isEditing: boolean
  handleStopEditing: () => void
  handleTodoValue: (e: React.ChangeEvent<HTMLInputElement>) => void
  todoValue: string
  handleStartEditing: () => void
}

const useTodo = ({ id, description, done, user }: Todo): ReturnType => {
  const [isEditing, setIsEditing] = useState(false)
  const [todoValue, setTodoValue] = useState(description)

  const handleTodoValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target
    setTodoValue(value)
  }

  const handleStartEditing = (): void => {
    if (done) return
    setIsEditing(true)
  }

  const handleStopEditing = (): void => {
    setIsEditing(false)
    if (todoValue === '') {
      setTodoValue(description)
    }
  }

  return { isEditing, handleStopEditing, handleTodoValue, todoValue, handleStartEditing }
}

export default useTodo
