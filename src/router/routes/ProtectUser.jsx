import { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectUser = ({ children }) => {
  const { userInfo } = useSelector(state => state.auth)

  if (!userInfo) return <Navigate to="/login" replace={true} />
  
  if (userInfo) return <Suspense fallback={null}>{children}</Suspense>
}

export default ProtectUser
