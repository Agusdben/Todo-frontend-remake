export const handleErrors = (error: any): never => {
  if (error.message === 'Failed to fetch') {
    throw new Error('Connection lost')
  }
  throw new Error(error.message)
}
