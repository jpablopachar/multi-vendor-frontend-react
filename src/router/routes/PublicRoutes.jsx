/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'

const Home = lazy(() => import('../../pages/Home'))
const Login = lazy(() => import('../../pages/Login'))
const Register = lazy(() => import('../../pages/Register'))
const Shops = lazy(() => import('../../pages/Shops'))
const Card = lazy(() => import('../../pages/Card'))
const Shipping = lazy(() => import('../../pages/Shipping'))
const Payment = lazy(() => import('../../pages/Payment'))
const CategoryShop = lazy(() => import('../../pages/CategoryShop'))
const SearchProducts = lazy(() => import('../../pages/SearchProducts'))
const Details = lazy(() => import('../../pages/Details'))
const ConfirmOrder = lazy(() => import('../../pages/ConfirmOrder'))

const publicRoutes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/shops',
    element: <Shops />,
  },
  {
    path: '/card',
    element: <Card />,
  },
  {
    path: '/shipping',
    element: <Shipping />,
  },
  {
    path: '/payment',
    element: <Payment />,
  },
  {
    path: '/products',
    element: <CategoryShop />,
  },
  {
    path: '/products/search',
    element: <SearchProducts />,
  },
  {
    path: '/product/details/:slug',
    element: <Details />,
  },
  {
    path: '/order/confirm',
    element: <ConfirmOrder />,
  },
]

export default publicRoutes
