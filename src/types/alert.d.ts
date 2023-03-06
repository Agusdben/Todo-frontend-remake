export interface Alert {
  message: string
  isOpen: boolean
  setMessage: React.Dispatch<React.SetStateAction<string>>
  onClose: () => void
  displayMessage: ({ message }: AlertMessage) => void
}
export type AlertMessage = Pick<Alert, 'message'>

export type AlertWindow = Pick<Alert, 'onClose' | 'isOpen' | 'message'>
