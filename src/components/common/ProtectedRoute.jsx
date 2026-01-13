// ProtectedRoute.jsx - Bảo vệ các route cần đăng nhập
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  // Đang kiểm tra trạng thái đăng nhập
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-500 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Đang kiểm tra đăng nhập...</p>
        </div>
      </div>
    )
  }

  // Chưa đăng nhập -> redirect đến trang login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Đã đăng nhập -> render children
  return children
}

export default ProtectedRoute

