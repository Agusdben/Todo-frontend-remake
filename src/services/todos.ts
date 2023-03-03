import { API_URL } from '../config/api'
import { type Todo } from '../types/todos.d.'
import { handleErrors } from './utiles'

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
        const { message } = data
        throw new Error(message)
      }
      return data
    })
    .catch(error => {
      return handleErrors(error)
    })
}
