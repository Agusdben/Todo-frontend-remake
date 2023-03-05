import { API_URL } from '../config/api'
import { type NewTodo, type Todo, type DeleteTodo, type TodoId, type UpdateTodo } from '../types/todos.d.'
import { handleErrors } from './utilities'

export const searchTodosOfUser = async (id: string, token: string): Promise<Todo[]> => {
  const URL = `${API_URL}/todos/${id}`
  return await fetch(URL, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`
    }
  })
    .then(async res => {
      const data = await res.json()
      if (!res.ok) {
        const { error } = data
        throw new Error(error)
      }
      return data
    })
    .catch(error => {
      return handleErrors(error)
    })
}

export const createTodo = async ({ username, description, token }: NewTodo): Promise<Todo> => {
  return await fetch(`${API_URL}/todos`, {
    method: 'POST',
    body: JSON.stringify({ username, description }),
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
    .then(async (res) => {
      const data = await res.json()
      if (!res.ok) {
        const { error } = data
        throw new Error(error)
      }
      return data
    })
    .catch(error => {
      return handleErrors(error)
    })
}

export const deleteTodo = async ({ id, token }: DeleteTodo): Promise<TodoId> => {
  return await fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`
    }
  })
    .then(async (res) => {
      if (!res.ok) {
        const data = await res.json()
        const { error } = data
        throw new Error(error)
      }
      return { id }
    })
    .catch(error => {
      return handleErrors(error)
    })
}

export const updateTodo = async ({ description, done, id, token }: UpdateTodo): Promise<Todo> => {
  return await fetch(`${API_URL}/todos`, {
    method: 'PUT',
    body: JSON.stringify({ description, done, todoID: id, token }),
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
    .then(async (res) => {
      const data = await res.json()
      if (!res.ok) {
        const { error } = data
        throw new Error(error)
      }
      return data
    })
    .catch(error => {
      return handleErrors(error)
    })
}
