import { API_URL } from '../config/api'
import { type LoginFormFields } from '../types/login'
import { type RegisterFormValues } from '../types/register'
import { type User } from '../types/user'
import { mappedUser } from '../utilities'
import { handleErrors } from './utilities'

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
    return handleErrors(error)
  })
}

export const registerNewUser = async (body: RegisterFormValues): Promise<void> => {
  await fetch(`${API_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(async (res) => {
      if (!res.ok) {
        const { error } = await res.json()
        throw new Error(error)
      }
    })
    .catch(error => handleErrors(error))
}
