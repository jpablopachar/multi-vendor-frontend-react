/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'

const Dashboard = lazy(() => import('../../components/dashboard'))
const Orders = lazy(() => import('../../components/dashboard/Orders'))
const ChangePassword = lazy(() =>
  import('../../components/dashboard/ChangePassword')
)
const Wishlist = lazy(() => import('../../components/dashboard/Wishlist'))
const OrderDetails = lazy(() =>
  import('../../components/dashboard/OrderDetails')
)
const Chat = lazy(() => import('../../components/dashboard/Chat'))

export const dashboardRoutes = [
  {
    index: true,
    element: <Dashboard />,
  },
  {
    path: 'my-orders',
    element: <Orders />,
  },
  {
    path: 'change-password',
    element: <ChangePassword />,
  },
  {
    path: 'my-wishlist',
    element: <Wishlist />,
  },
  {
    path: 'order/details/:orderId',
    element: <OrderDetails />,
  },
  {
    path: 'chat',
    element: <Chat />,
  },
  {
    path: 'chat/:sellerId',
    element: <Chat />,
  },
]
