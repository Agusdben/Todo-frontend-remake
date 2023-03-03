import React, { useRef, useState } from 'react'
import { colors } from '../../config/theme'
import { type Todo as TodoType } from '../../types/todos.d.'
import CheckIcon from '../Icons/CheckIcon'
import TrashBinIcon from '../Icons/TrashBinIcon'

const Todo: React.FC<TodoType> = ({ id, description, done, user }) => {
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

  return (
    <div className='flex px-2 py-4 items-center gap-4 bg-black-500'>
      <label className='p-3 rounded-full border-1 border-primary w-4 h-4 relative cursor-pointer'>
        {
          done && (
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
              <CheckIcon fill={colors.primary} />
            </div>
          )
        }
        <input type='checkbox' className='hidden' checked={done} onChange={e => {}} />
      </label>
      {
        isEditing
          ? (
              <form className='flex-1' onSubmit={handleUpdateTodo}>
                <input
                  className='p-2 bg-transparent outline-none border-1 border-primary w-full'
                  autoFocus
                  onBlur={handleStopEditing}
                  onChange={handleTodoValue}
                  value={todoValue}
                />
                <button type='submit' />
              </form>
            )
          : (
              <label
                onClick={handleStartEditing}
                className={`p-2 flex-1 break-words ${done ? 'line-through opacity-50' : 'hover:bg-black-700 cursor-text'}`}
              >
                {todoValue}
              </label>
            )
      }
      <button className='p-2 hover:brightness-75'><TrashBinIcon fill={colors.primary}/></button>
    </div>
  )
}

export default Todo
