/* eslint-disable react-refresh/only-export-components */

import { lazy } from 'react'
import ProtectUser from './ProtectUser'
import { privateRoutes } from './privateRoutes'
const Dashboard = lazy(() => import('../../pages/Dashboard'))

export const getRoutes = () => {
  return {
    path: '/dashboard',
    element: <ProtectUser />,
    children: [
      {
        path: '',
        element: <Dashboard />,
        children: privateRoutes,
      },
    ],
  }
}
