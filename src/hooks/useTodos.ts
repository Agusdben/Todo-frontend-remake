import { useContext, useEffect } from 'react'
import { TODO_FILTERS } from '../constants/todos'
import { TodosContext } from '../contexts/TodosContext'
import { createTodo, deleteTodo, searchTodosOfUser, updateTodo } from '../services/todos'
import { type TodoId, type Todo, type FilterValue, type TodoDescription, type TodoIdDoneDescription, type UpdateTodoFn, type RemoveTodoFn, type TodoToDelete } from '../types/todos.d.'
import { insertTodoInIndex, textIncludesQuery } from '../utilities'
import useUser from './useUser'

interface ReturnTypes {
  todos: Todo[]
  filterSelected: FilterValue
  activeCount: number
  doneCount: number
  handleFilterChange: (filter: FilterValue) => void
  handleQuery: (q: string) => void
  handleClearDone: () => Promise<void>
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

  const handleClearDone = async (): Promise<void> => {
    if (user === null) return
    setTodos(todos => todos.filter(t => !t.done))

    const todosToDelete = todos.reduce((acc: TodoToDelete[], t: Todo, index) => {
      if (t.done) {
        acc.push({ ...t, index })
      }
      return acc
    }, [])

    const promises = todosToDelete.map(async t => await deleteTodo({ id: t.id, token: user.token }))
    const responses = await Promise.allSettled(promises)

    responses.forEach((res, i) => {
      if (res.status === 'rejected') {
        const todoNotDeleted = todosToDelete[i]
        const indexOfTodoNotDeleted = todoNotDeleted.index
        setTodos(currentTodos => {
          return insertTodoInIndex({ insertInIndex: indexOfTodoNotDeleted, todo: todoNotDeleted, todos: currentTodos })
        })
      }
    })
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
        return insertTodoInIndex({ insertInIndex: todoToDeleteIndex, todo: todoDeleted, todos: currentTodos })
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
