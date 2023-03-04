import React, { useState } from 'react'
import { colors } from '../../config/theme'
import NoteIcon from '../Icons/NoteIcon'
import PaperPlaneIcon from '../Icons/PaperPlaneIcon'

const CreateTodo: React.FC = () => {
  const [todoValue, setTodoValue] = useState('')

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleOnSubmit} className=' border-1 border-primary text-xl flex'>
      <div className='flex flex-1'>
        <div className='p-2 grid place-content-center'>
          <NoteIcon width={'1em'} height={'1em'} fill={colors.white} />
        </div>
        <input
          name='todo'
          onChange={(e) => { setTodoValue(e.target.value) }}
          placeholder="What do you want to do?"
          value={todoValue}
          required
          type='text'
          className='w-full py-4 px-2  bg-transparent outline-none'
        />
      </div>
      <button type='submit' className='p-2 bg-primary hover:brightness-90'><PaperPlaneIcon fill={colors.black}/></button>
    </form>
  )
}

export default CreateTodo
