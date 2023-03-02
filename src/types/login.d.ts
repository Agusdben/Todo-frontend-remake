import { type LOGIN_FORM_FIELDS } from '../constants/login'

export type LoginFormFields = { [key in keyof typeof LOGIN_FORM_FIELDS]: string }
