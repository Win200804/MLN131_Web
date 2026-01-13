// Header Component - Thanh điều hướng chính
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX, HiHome, HiBookOpen, HiLightningBolt, HiPuzzle, HiInformationCircle, HiCog, HiLogin, HiLogout } from 'react-icons/hi'
import { useAuth } from '../../context/AuthContext'
import { isAdmin } from '../../config/adminConfig'

// Danh sách menu items
const menuItems = [
  { path: '/', label: 'Trang chủ', icon: HiHome },
  { path: '/content', label: 'Nội dung', icon: HiBookOpen },
  { path: '/quiz', label: 'Quiz', icon: HiLightningBolt },
  { path: '/games', label: 'Mini Games', icon: HiPuzzle },
  { path: '/about', label: 'Giới thiệu', icon: HiInformationCircle }
]

const Header = () => {
  // State cho mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const location = useLocation()
  const { user, isAuthenticated, logout } = useAuth()

  // Kiểm tra active link
  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  // Đăng xuất
  const handleLogout = async () => {
    await logout()
    setShowUserMenu(false)
  }

  return (
    <header className="bg-primary-900 text-white shadow-lg sticky top-0 z-50">
      {/* Container chính */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo và tiêu đề */}
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
            {/* Vietnam Flag Colors Bar */}
            <div className="flex flex-col h-10 w-2 rounded-full overflow-hidden">
              <div className="flex-1 bg-accent-red"></div>
              <div className="flex-1 bg-accent-gold"></div>
            </div>
            <div>
              <h1 className="font-heading font-bold text-xl tracking-tight">Công dân 4.0</h1>
              <p className="text-xs text-gray-400 hidden sm:block">Thách thức & Cơ hội</p>
            </div>
          </Link>

          {/* Desktop Navigation - Căn giữa */}
          <nav className="hidden md:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center space-x-2 bg-white/5 rounded-xl p-1">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-white/20 text-white shadow-sm'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* User Menu / Login Button - Bên phải */}
          <div className="hidden md:flex items-center flex-shrink-0">
            <div className="relative">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 pl-2 pr-3 py-1.5 rounded-full transition-colors border border-white/10"
                  >
                    {user?.photoURL ? (
                      <img src={user.photoURL} alt="" className="w-7 h-7 rounded-full ring-2 ring-white/20" />
                    ) : (
                      <div className="w-7 h-7 bg-accent-gold rounded-full flex items-center justify-center text-primary-900 font-bold text-sm">
                        {user?.displayName?.charAt(0)}
                      </div>
                    )}
                    <span className="text-sm font-medium">{user?.displayName?.split(' ').pop()}</span>
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50"
                      >
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900 truncate">{user?.displayName}</p>
                          <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                          {isAdmin(user?.email) && (
                            <span className="inline-block mt-1 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">
                              Admin
                            </span>
                          )}
                        </div>
                        {/* Chỉ Admin mới thấy link Quản lý phòng */}
                        {isAdmin(user?.email) && (
                          <Link
                            to="/admin"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            <HiCog className="w-5 h-5 mr-2" />
                            <span>Quản lý phòng</span>
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <HiLogout className="w-5 h-5 mr-2" />
                          <span>Đăng xuất</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-2 bg-accent-gold hover:bg-yellow-400 text-primary-900 px-4 py-2 rounded-full transition-colors font-medium text-sm shadow-lg"
                >
                  <HiLogin className="w-4 h-4" />
                  <span>Đăng nhập</span>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <HiX className="w-6 h-6" />
            ) : (
              <HiMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-primary-800 border-t border-primary-700"
          >
            <nav className="px-4 py-3 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-white/20 text-white'
                        : 'text-gray-200 hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )
              })}

              {/* Mobile User Section */}
              <div className="border-t border-primary-700 pt-3 mt-3">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center space-x-3 px-4 py-2">
                      {user?.photoURL ? (
                        <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full" />
                      ) : (
                        <div className="w-8 h-8 bg-accent-gold rounded-full flex items-center justify-center text-primary-900 font-bold">
                          {user?.displayName?.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="text-white font-medium">{user?.displayName}</p>
                        <p className="text-gray-400 text-xs">{user?.email}</p>
                      </div>
                    </div>
                    {/* Chỉ Admin mới thấy link Quản lý phòng */}
                    {isAdmin(user?.email) && (
                      <Link
                        to="/admin"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 text-gray-200 hover:bg-white/10 rounded-lg"
                      >
                        <HiCog className="w-5 h-5" />
                        <span>Quản lý phòng</span>
                      </Link>
                    )}
                    <button
                      onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-white/10 rounded-lg"
                    >
                      <HiLogout className="w-5 h-5" />
                      <span>Đăng xuất</span>
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 bg-accent-gold text-primary-900 rounded-lg font-medium"
                  >
                    <HiLogin className="w-5 h-5" />
                    <span>Đăng nhập</span>
                  </Link>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
