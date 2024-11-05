/* eslint-disable react-refresh/only-export-components */ 
import { lazy } from 'react'

const Index = lazy(() => import('../../components/dashboard'))
const Wishlist = lazy(() => import('../../components/dashboard/Wishlist'))

export const dashboardRoutes = [
  {
    path: '',
    element: <Index />,
  },
  {
    path: 'dashboard/my-wishlist',
    element: <Wishlist />,
  },
]
