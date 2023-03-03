import { type RegisterFormErrors, type RegisterRegex } from '../types/register'

export const REGISTER_FORM_FIELDS = {
  username: 'username',
  password: 'password',
  confirmPassword: 'confirmPassword'
} as const

export const REGISTER_REGEX: RegisterRegex = {
  username: /^[a-zA-Z0-9_-]{3,16}$/,
  password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,}$/,
  confirmPassword: /.*/
}

export const REGISTER_ERRORS: RegisterFormErrors = {
  username: 'The username is invalid. It must be between 3 and 16 characters long, and can only contain letters, numbers, hyphens(-), and underscores(_).',
  password: 'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one symbol (such as @, #, $, etc.)',
  confirmPassword: 'Passwords do not match. Please enter the same password in both fields.'
}
