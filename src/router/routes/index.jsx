import { privateRoutes } from "./privateRoutes"
import ProtectUser from "./ProtectUser"

export const getRoutes = () => {
  return {
    path: '/dashboard',
    element: <ProtectUser />,
    children: privateRoutes,
  }
}