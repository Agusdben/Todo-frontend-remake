import React, { useState } from 'react'
import { colors } from '../../config/theme'
import { type TodoDescription } from '../../types/todos.d.'
import NoteIcon from '../Icons/NoteIcon'
import PaperPlaneIcon from '../Icons/PaperPlaneIcon'

interface Props {
  onSubmit: (description: TodoDescription) => Promise<void>
}

const MAX_CHARACTERS = 75

const CreateTodo: React.FC<Props> = ({ onSubmit }) => {
  const [todoValue, setTodoValue] = useState('')
  const [loading, setLoading] = useState(false)

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setLoading(true)
    if (todoValue === '') {
      setLoading(false)
      return
    }
    onSubmit({ description: todoValue })
      .then(() => {
        setTodoValue('')
      })
      .finally(() => { setLoading(false) })
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value.length > MAX_CHARACTERS) {
      return
    }
    setTodoValue(e.target.value)
  }

  return (
    <div className='flex flex-col gap-2 break-words max-w-full'>
      <form onSubmit={handleOnSubmit} className='border-1 border-primary text-xl flex'>
        <div className='flex flex-1 items-center'>
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
          <small className={`mr-2 ${todoValue.length === MAX_CHARACTERS ? 'text-primary font-bold' : ''}`}>{todoValue.length}/{MAX_CHARACTERS}</small>
        </div>
        <button type='submit' className='p-2 bg-primary hover:brightness-90' disabled={loading}>
          <PaperPlaneIcon fill={colors.black}/>
        </button>
      </form>
      {loading && <p className='text-primary'>Adding...</p>}
    </div>
  )
}

export default CreateTodo
