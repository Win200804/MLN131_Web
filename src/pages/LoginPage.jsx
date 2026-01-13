// LoginPage.jsx - Trang đăng nhập với Google
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FcGoogle } from 'react-icons/fc'
import { HiLightningBolt, HiShieldCheck, HiUserGroup, HiArrowLeft } from 'react-icons/hi'
import { useAuth } from '../context/AuthContext'
import { isAdmin } from '../config/adminConfig'

const LoginPage = () => {
  const { user, login, loading, error, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  // Redirect nếu đã đăng nhập - dựa vào role
  useEffect(() => {
    if (isAuthenticated && user?.email) {
      if (isAdmin(user.email)) {
        // Admin -> chuyển đến trang admin
        navigate('/admin', { replace: true })
      } else {
        // Player -> chuyển đến quiz hoặc trang trước đó
        const from = location.state?.from?.pathname || '/quiz'
        navigate(from, { replace: true })
      }
    }
  }, [isAuthenticated, user, navigate, location])

  // Xử lý đăng nhập
  const handleGoogleLogin = async () => {
    setIsLoggingIn(true)
    const result = await login()
    setIsLoggingIn(false)
    
    if (!result.error && result.user) {
      // Redirect dựa trên role
      if (isAdmin(result.user.email)) {
        navigate('/admin', { replace: true })
      } else {
        const from = location.state?.from?.pathname || '/quiz'
        navigate(from, { replace: true })
      }
    }
  }

  // Quay lại trang trước
  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        {/* Back Button */}
        <button
          onClick={handleGoBack}
          className="text-white/70 hover:text-white mb-6 flex items-center transition-colors"
        >
          <HiArrowLeft className="w-5 h-5 mr-2" />
          Quay lại
        </button>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 px-8 py-10 text-center text-white">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <HiLightningBolt className="w-8 h-8 text-accent-gold" />
            </div>
            <h1 className="font-heading text-2xl font-bold mb-2">
              Đăng nhập Quiz
            </h1>
            <p className="text-white/80 text-sm">
              Đăng nhập để tạo phòng và quản lý quiz
            </p>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={isLoggingIn || loading}
              className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-4 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoggingIn ? (
                <>
                  <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>Đang đăng nhập...</span>
                </>
              ) : (
                <>
                  <FcGoogle className="w-6 h-6" />
                  <span>Đăng nhập bằng Google</span>
                </>
              )}
            </button>

            {/* Benefits */}
            <div className="mt-8 space-y-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Lợi ích khi đăng nhập
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <HiShieldCheck className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Quản lý phòng Quiz</p>
                    <p className="text-gray-500 text-xs">Tạo, điều khiển và quản lý phòng của bạn</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <HiUserGroup className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Host Quiz cho lớp</p>
                    <p className="text-gray-500 text-xs">Mời tối đa 40 người chơi cùng lúc</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Note */}
            <p className="text-center text-gray-400 text-xs mt-6">
              Admin sẽ tự động được chuyển đến trang quản lý.<br/>
              Player sẽ được chuyển đến trang chơi Quiz.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default LoginPage

