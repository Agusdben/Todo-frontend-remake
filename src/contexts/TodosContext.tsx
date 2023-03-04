import { createContext, useState } from 'react'
import { TODO_FILTERS } from '../constants/todos'
import { type FilterValue, type Todo } from '../types/todos.d.'

interface TodoContext {
  todos: Todo[]
  filterSelected: FilterValue
  query: string
  setQuery: React.Dispatch<React.SetStateAction<string>>
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  setFilterSelected: React.Dispatch<React.SetStateAction<FilterValue>>
}

export const TodosContext =
  createContext<TodoContext>(
    {
      todos: [],
      filterSelected: TODO_FILTERS.all,
      query: '',
      setQuery: () => {},
      setFilterSelected: () => {},
      setTodos: () => {}
    })

interface Props {
  children: React.ReactNode
}

export const TodosContextProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.all)
  const [query, setQuery] = useState<string>('')

  return (
    <TodosContext.Provider value={{ todos, filterSelected, setTodos, setFilterSelected, query, setQuery }}>
      {children}
    </TodosContext.Provider>
  )
}
