import React, { useState } from 'react'
import { colors } from '../../config/theme'
import { type TodoDescription } from '../../types/todos.d.'
import ErrorMessage from '../ErrorMessage'
import NoteIcon from '../Icons/NoteIcon'
import PaperPlaneIcon from '../Icons/PaperPlaneIcon'

interface Props {
  onSubmit: (description: TodoDescription) => Promise<void>
}

const CreateTodo: React.FC<Props> = ({ onSubmit }) => {
  const [todoValue, setTodoValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setLoading(true)
    setError('')
    if (todoValue === '') {
      setError('Empty value')
      setLoading(false)
      return
    }
    onSubmit({ description: todoValue })
      .then(() => {
        setTodoValue('')
      })
      .catch(error => {
        console.error(error)
        setError(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setError('')
    setTodoValue(e.target.value)
  }

  return (
    <div className='flex flex-col gap-2 break-words max-w-full'>
      <form onSubmit={handleOnSubmit} className='border-1 border-primary text-xl flex'>
        <div className='flex flex-1'>
          <div className='p-2 grid place-content-center'>
            <NoteIcon width={'1em'} height={'1em'} fill={colors.white} />
          </div>
          <input
            autoFocus
            name='todo'
            onChange={handleOnChange}
            placeholder="What do you want to do?"
            value={todoValue}
            required
            type='text'
            className='w-full py-4 px-2  bg-transparent outline-none'
          />
        </div>
        <button type='submit' className='p-2 bg-primary hover:brightness-90' disabled={loading}>
          <PaperPlaneIcon fill={colors.black}/>
        </button>
      </form>
      {error !== '' && <ErrorMessage error={error}/>}
      {loading && <p className='text-primary'>Adding...</p>}
    </div>
  )
}

export default CreateTodo
