import { useContext, useEffect } from 'react'
import { TODO_FILTERS } from '../constants/todos'
import { TodosContext } from '../contexts/TodosContext'
import { createTodo, searchTodosOfUser } from '../services/todos'
import { type TodoIdDone, type TodoId, type Todo, type FilterValue, type TodoDescription } from '../types/todos.d.'
import { textIncludesQuery } from '../utiles'
import useUser from './useUser'

interface ReturnTypes {
  todos: Todo[]
  filterSelected: FilterValue
  activeCount: number
  doneCount: number
  handleFilterChange: (filter: FilterValue) => void
  handleQuery: (q: string) => void
  removeTodo: ({ id }: TodoId) => void
  handleClearDone: () => void
  handleDone: ({ id, done }: TodoIdDone) => void
  handleCreateTodo: ({ description }: TodoDescription) => Promise<void>
}

const cache: { todos: Todo[] | null } = { todos: null }

const useTodos = (): ReturnTypes => {
  const { user, checkTokenError } = useUser()
  const { filterSelected, setFilterSelected, setTodos, todos, query, setQuery } = useContext(TodosContext)

  useEffect(() => {
    if (user === null) return
    if (cache.todos !== null) {
      setTodos(cache.todos)
      return
    }
    searchTodosOfUser(user.id, user.token)
      .then(setTodos)
      .catch(error => {
        console.error(error)
        checkTokenError(error.message)
      })
  }, [user])

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }

  const handleQuery = (q: string): void => {
    setQuery(q)
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

  const handleCreateTodo = async ({ description }: TodoDescription): Promise<void> => {
    if (user === null) {
      return
    }
    createTodo({ username: user.username, description, token: user.token })
      .then(todo => {
        setTodos(todos => [...todos, todo])
      })
      .catch(error => {
        checkTokenError(error.message)
        throw new Error(error.message)
      })
  }

  const activeCount = todos.filter(t => !t.done).length

  const isTodoMatchingFilter = (todo: Todo): boolean => {
    if (filterSelected === TODO_FILTERS.active) {
      return !todo.done
    }
    if (filterSelected === TODO_FILTERS.done) {
      return todo.done
    }
    return true
  }

  const isTodoMatchingQuery = (todo: Todo): boolean => {
    return query === '' || textIncludesQuery({ text: todo.description, q: query })
  }

  const filteredTodos = todos.filter(todo => {
    return isTodoMatchingFilter(todo) && isTodoMatchingQuery(todo)
  })

  return {
    todos: filteredTodos,
    filterSelected,
    activeCount,
    doneCount: todos.length - activeCount,
    handleFilterChange,
    handleQuery,
    removeTodo,
    handleClearDone,
    handleDone,
    handleCreateTodo
  }
}

export default useTodos
