import React from 'react'
import { type Todo as TodoType } from '../../types/todos.d.'

const Todo: React.FC<TodoType> = ({ id, description, done, user }) => {
  return (
    <div>
      <input type='checkbox' checked={done} onChange={e => {}} />
      <label>{description}</label>
      <button>🗑</button>
    </div>
  )
}

export default Todo
