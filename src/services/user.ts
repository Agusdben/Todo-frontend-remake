import { API_URL } from '../config/api'
import { type LoginFormFields } from '../types/login'
import { type User } from '../types/user'
import { mappedUser } from '../utiles'

export const loginWithToken = async (token: string): Promise<User> => {
  return await fetch(
    `${API_URL}/login/token`,
    {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    .then(async res => {
      if (!res.ok) {
        throw new Error(`Filed with status code ${res.status}`)
      }
      const data = await res.json()
      const user = mappedUser(data)
      return user
    })
    .catch(error => {
      throw new Error(error)
    })
}

export const loginWithUsernameAndPassword = async (body: LoginFormFields): Promise<User> => {
  return await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(async res => {
    if (!res.ok) {
      const { error } = await res.json()
      throw new Error(error)
    }
    const data = await res.json()
    const user = mappedUser(data)
    return user
  }).catch(error => {
    if (error.message === 'Failed to fetch') {
      throw new Error('Connection lost')
    }
    throw new Error(error.message)
  })
}
