interface Props {
  children: React.ReactNode
}

const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <header></header>
      <main>{children}</main>
      <footer></footer>
    </div>
  )
}

export default AppLayout
