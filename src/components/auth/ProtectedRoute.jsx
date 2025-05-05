import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import LoadingAnimation from '../shared/LoadingAnimation'

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth()

  if (currentUser === null) {
    // Still determining authentication state
    return <LoadingAnimation />
  }

  if (!currentUser) {
    // Not authenticated, redirect to login
    return <Navigate to="/login" />
  }

  // Authenticated, render children
  return children
}

export default ProtectedRoute