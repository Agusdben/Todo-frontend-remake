import AppFooter from '../AppFooter'
import AppHeader from '../AppHeader'

interface Props {
  children: React.ReactNode
}

const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="max-w-screen min-h-screen overflow-x-hidden grid gap-4 grid-rows-layout bg-black-900 text-white">
      <AppHeader />
      <main className="px-2">{children}</main>
      <AppFooter />
    </div>
  )
}

export default AppLayout
