export interface Alert {
  message: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
  isOpen: boolean
  onClose: () => void
  displayMessage: ({ message }: AlertMessage) => void
}
export type AlertMessage = Pick<Alert, 'message'>

export type AlertWindow = Pick<Alert, 'onClose' | 'isOpen' | 'message'>
