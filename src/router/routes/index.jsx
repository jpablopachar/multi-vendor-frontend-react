import { Outlet } from 'react-router-dom'
import { privateRoutes } from './privateRoutes'
import ProtectUser from './ProtectUser'

export const getRoutes = () => {
  privateRoutes.forEach((r) => {
    r.element = <ProtectUser>{r.element}</ProtectUser>
  })

  return {
    path: '/dashboard',
    element: <Outlet />,
    children: privateRoutes,
  }
}
