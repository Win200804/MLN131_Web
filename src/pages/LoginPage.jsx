// LoginPage.jsx - Trang đăng nhập với Google
import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FcGoogle } from 'react-icons/fc'
import { HiLightningBolt, HiArrowLeft, HiSparkles } from 'react-icons/hi'
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
        navigate('/admin', { replace: true })
      } else {
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
      if (isAdmin(result.user.email)) {
        navigate('/admin', { replace: true })
      } else {
        const from = location.state?.from?.pathname || '/quiz'
        navigate(from, { replace: true })
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-red/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-sm w-full relative z-10"
      >
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors group"
        >
          <HiArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span>Về trang chủ</span>
        </Link>

        {/* Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl"
        >
          {/* Icon */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-br from-accent-gold to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-accent-gold/30"
          >
            <HiLightningBolt className="w-10 h-10 text-white" />
          </motion.div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="font-heading text-2xl font-bold text-white mb-2">
              Chào mừng đến Website
            </h1>
            <p className="text-white/60 text-sm">
              Đăng nhập để tham gia trò chơi
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-3 rounded-xl mb-6 text-sm text-center"
            >
              {error}
            </motion.div>
          )}

          {/* Google Login Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleLogin}
            disabled={isLoggingIn || loading}
            className="w-full flex items-center justify-center space-x-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {isLoggingIn ? (
              <>
                <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                <span>Đang đăng nhập...</span>
              </>
            ) : (
              <>
                <FcGoogle className="w-6 h-6" />
                <span>Tiếp tục với Google</span>
              </>
            )}
          </motion.button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-white/20"></div>
            <HiSparkles className="w-4 h-4 text-white/40 mx-3" />
            <div className="flex-1 h-px bg-white/20"></div>
          </div>

          {/* Info */}
          <p className="text-center text-white/50 text-xs leading-relaxed">
            Sử dụng tài khoản Google để đăng nhập nhanh chóng và an toàn
          </p>
        </motion.div>

        {/* Footer */}
        <p className="text-center text-white/30 text-xs mt-6">
          © 2025 Công nhân 4.0 - MLN131
        </p>
      </motion.div>
    </div>
  )
}

export default LoginPage
