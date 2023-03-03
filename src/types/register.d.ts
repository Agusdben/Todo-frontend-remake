import { type REGISTER_FORM_FIELDS } from '../constants/register'

export type RegisterFormFields = { [key in keyof typeof REGISTER_FORM_FIELDS]: { value: string, error: string } }
export type RegisterFormErrors = { [key in keyof typeof REGISTER_FORM_FIELDS]: string }
export type RegisterFormValues = { [key in keyof typeof REGISTER_FORM_FIELDS]: string }
export type RegisterRegex = { [key in keyof typeof REGISTER_FORM_FIELDS]: RegExp }
export type KeyInRegisterFormFields = typeof REGISTER_FORM_FIELDS[keyof typeof REGISTER_FORM_FIELDS]
