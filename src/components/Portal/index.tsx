import { useEffect } from 'react'
import ReactDOM from 'react-dom'

interface Props {
  children: React.ReactNode
  elementID: 'modal'
}

const el = document.createElement('div')

const Portal: React.FC<Props> = ({ children, elementID }) => {
  const portalRoot = document.getElementById(elementID)

  useEffect(() => {
    if (portalRoot == null) return
    portalRoot.appendChild(el)
  }, [children, elementID])

  return ReactDOM.createPortal(children, el)
}

export default Portal
