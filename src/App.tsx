import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/Home'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  }
])

const App = (): JSX.Element => {
  return <RouterProvider router={routes} />
}

export default App
