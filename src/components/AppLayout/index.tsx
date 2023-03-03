
interface Props {
  children: React.ReactNode
}

const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-screen min-h-screen overflow-x-hidden grid grid-rows-layout bg-black-900 text-white">
      <header>
        <h1>Hola</h1>
      </header>
      <main>{children}</main>
      <footer>footer</footer>
    </div>
  )
}

export default AppLayout
