import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AuthRoute from './components/AuthRoute'
import UnauthenticatedRoute from './components/UnauthenticatedRoute'
import HomePage from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Welcome from './pages/Welcome'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <AuthRoute><HomePage /></AuthRoute>
  },
  {
    path: '/login',
    element: <UnauthenticatedRoute><Login /></UnauthenticatedRoute>
  },
  {
    path: '/register',
    element: <UnauthenticatedRoute><Register /></UnauthenticatedRoute>
  },
  {
    path: '/welcome',
    element: <Welcome />
  },
  {
    path: '*',
    element: <p>cualquiera</p>
  }
])

const App = (): JSX.Element => {
  return <RouterProvider router={routes} />
}

export default App
