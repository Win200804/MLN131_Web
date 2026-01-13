// authService.js - Xử lý đăng nhập Google
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut,
  isFirebaseConfigured 
} from './firebase'

/**
 * Đăng nhập bằng Google
 * @returns {Promise<{user: object, error: string|null}>}
 */
export const signInWithGoogle = async () => {
  if (!isFirebaseConfigured || !auth) {
    return { 
      user: null, 
      error: 'Firebase chưa được cấu hình. Vui lòng setup Firebase trước.' 
    }
  }

  try {
    const result = await signInWithPopup(auth, googleProvider)
    const user = result.user
    
    return {
      user: {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      },
      error: null
    }
  } catch (error) {
    console.error('Google sign-in error:', error)
    
    let errorMessage = 'Đã xảy ra lỗi khi đăng nhập'
    if (error.code === 'auth/popup-closed-by-user') {
      errorMessage = 'Bạn đã đóng cửa sổ đăng nhập'
    } else if (error.code === 'auth/network-request-failed') {
      errorMessage = 'Lỗi kết nối mạng'
    } else if (error.code === 'auth/cancelled-popup-request') {
      errorMessage = 'Yêu cầu đăng nhập đã bị hủy'
    }
    
    return { user: null, error: errorMessage }
  }
}

/**
 * Đăng xuất
 * @returns {Promise<{success: boolean, error: string|null}>}
 */
export const signOutUser = async () => {
  if (!isFirebaseConfigured || !auth) {
    return { success: false, error: 'Firebase chưa được cấu hình' }
  }

  try {
    await firebaseSignOut(auth)
    return { success: true, error: null }
  } catch (error) {
    console.error('Sign out error:', error)
    return { success: false, error: 'Không thể đăng xuất' }
  }
}

/**
 * Lấy thông tin user hiện tại
 * @returns {object|null}
 */
export const getCurrentUser = () => {
  if (!isFirebaseConfigured || !auth) {
    return null
  }
  
  const user = auth.currentUser
  if (!user) return null
  
  return {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL
  }
}

