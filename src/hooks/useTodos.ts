import { useState } from 'react'
import { TODO_FILTERS } from '../constants/todos'
import { TODOS } from '../moks/todos'
import { type TodoIdDone, type TodoId, type Todo, type FilterValue, type TodoDescription } from '../types/todos.d.'

interface ReturnTypes {
  todos: Todo[]
  filterSelected: FilterValue
  activeCount: number
  doneCount: number
  handleFilterChange: (filter: FilterValue) => void
  removeTodo: ({ id }: TodoId) => void
  handleClearDone: () => void
  handleDone: ({ id, done }: TodoIdDone) => void
  createTodo: ({ description }: TodoDescription) => void
}

const useTodos = (): ReturnTypes => {
  const [todos, setTodos] = useState(TODOS)
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.all)

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }

  const handleClearDone = (): void => {
    setTodos(todos => todos.filter(t => !t.done))
  }

  const removeTodo = ({ id }: TodoId): void => {
    setTodos(todos => todos.filter(t => t.id !== id))
  }

  const handleDone = ({ id, done }: TodoIdDone): void => {
    setTodos(todos =>
      todos.map(t =>
        t.id === id ? { ...t, done } : t
      )
    )
  }

  const createTodo = ({ description }: TodoDescription): void => {

  }

  const activeCount = todos.filter(t => !t.done).length

  const filteredTodos = todos.filter(t => {
    if (filterSelected === TODO_FILTERS.active) return !t.done
    if (filterSelected === TODO_FILTERS.done) return t.done
    return t
  })

  return {
    todos: filteredTodos,
    filterSelected,
    activeCount,
    doneCount: todos.length - activeCount,
    handleFilterChange,
    removeTodo,
    handleClearDone,
    handleDone,
    createTodo
  }
}

export default useTodos
