import React, { useState } from 'react'

const CreateTodo: React.FC = () => {
  const [todoValue, setTodoValue] = useState('')

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <input
        value={todoValue}
        onChange={(e) => { setTodoValue(e.target.value) }}
        autoFocus
        placeholder="What do you want to do?"
      />
    </form>
  )
}

export default CreateTodo
