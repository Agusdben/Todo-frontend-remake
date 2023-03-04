import type React from 'react'
import { useRef, useState } from 'react'
import { type Todo } from '../../types/todos.d.'

interface ReturnType {
  handleUpdateTodo: (e?: React.FormEvent<HTMLFormElement>) => void
  isEditing: boolean
  handleStopEditing: () => void
  handleTodoValue: (e: React.ChangeEvent<HTMLInputElement>) => void
  todoValue: string
  handleStartEditing: () => void
}

const useTodo = ({ id, description, done, user }: Todo): ReturnType => {
  const [isEditing, setIsEditing] = useState(false)
  const [todoValue, setTodoValue] = useState(description)
  const lastValidValue = useRef(description)

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
      setTodoValue(lastValidValue.current)
      return
    }
    lastValidValue.current = todoValue
    handleUpdateTodo()
  }

  const handleUpdateTodo = (e?: React.FormEvent<HTMLFormElement>): void => {
    e?.preventDefault()
  }

  return { handleUpdateTodo, isEditing, handleStopEditing, handleTodoValue, todoValue, handleStartEditing }
}

export default useTodo
