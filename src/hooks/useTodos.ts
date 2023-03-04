import { useContext, useEffect } from 'react'
import { TODO_FILTERS } from '../constants/todos'
import { TodosContext } from '../contexts/TodosContext'
import { createTodo, deleteTodo, searchTodosOfUser, updateTodo } from '../services/todos'
import { type TodoId, type Todo, type FilterValue, type TodoDescription, type TodoIdDoneDescription, type UpdateTodoFn, type RemoveTodoFn } from '../types/todos.d.'
import { textIncludesQuery } from '../utiles'
import useUser from './useUser'

interface ReturnTypes {
  todos: Todo[]
  filterSelected: FilterValue
  activeCount: number
  doneCount: number
  handleFilterChange: (filter: FilterValue) => void
  handleQuery: (q: string) => void
  handleClearDone: () => void
  handleUpdateTodo: UpdateTodoFn
  handleRemoveTodo: RemoveTodoFn
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

  const handleRemoveTodo = async ({ id }: TodoId): Promise<void> => {
    if (user === null) return

    const [todoDeleted] = todos.filter(t => t.id === id)
    const todoToDeleteIndex = todos.indexOf(todoDeleted)

    setTodos(todos => todos.filter(t => t.id !== id))

    try {
      await deleteTodo({ id, token: user.token })
    } catch (error: any) {
      checkTokenError(error.message)
      setTodos(currentTodos => {
        const todosFistHalf = currentTodos.filter((_, index) => index < todoToDeleteIndex)
        const todosSecondHalf = currentTodos.filter((_, index) => index >= todoToDeleteIndex)
        return [...todosFistHalf, todoDeleted, ...todosSecondHalf]
      })
      throw new Error('Failed to remove todo')
    }
  }

  const handleUpdateTodo = async ({ id, done, description }: TodoIdDoneDescription): Promise<void> => {
    if (user === null) return

    const [todoBeforeUpdate] = todos.filter(t => t.id === id)
    const todoBeforeUpdateIndex = todos.indexOf(todoBeforeUpdate)

    setTodos(todos =>
      todos.map(t =>
        t.id === id ? { ...t, done, description } : t
      )
    )

    await updateTodo({ id, done, description, token: user.token })
      .catch((error) => {
        checkTokenError(error.message)
        setTodos(currentTodos => {
          const newTodos = [...currentTodos]
          newTodos[todoBeforeUpdateIndex] = todoBeforeUpdate
          return newTodos
        })
        throw new Error('Failed to update todo')
      })
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
    handleRemoveTodo,
    handleClearDone,
    handleUpdateTodo,
    handleCreateTodo
  }
}

export default useTodos
