// AuthContext.jsx - Quản lý trạng thái đăng nhập
import { createContext, useContext, useState, useEffect } from 'react'
import { auth, onAuthStateChanged, isFirebaseConfigured } from '../services/firebase'
import { signInWithGoogle, signOutUser } from '../services/authService'

// Tạo context
const AuthContext = createContext(null)

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Lắng nghe thay đổi trạng thái đăng nhập
  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // Đăng nhập Google
  const login = async () => {
    setError(null)
    setLoading(true)
    
    const result = await signInWithGoogle()
    
    if (result.error) {
      setError(result.error)
    }
    
    setLoading(false)
    return result
  }

  // Đăng xuất
  const logout = async () => {
    setError(null)
    setLoading(true)
    
    const result = await signOutUser()
    
    if (result.error) {
      setError(result.error)
    } else {
      setUser(null)
    }
    
    setLoading(false)
    return result
  }

  // Value cung cấp cho context
  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    logout,
    clearError: () => setError(null)
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook để sử dụng AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext

