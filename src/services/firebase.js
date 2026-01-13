// Firebase configuration và initialization
// Cấu hình kết nối Firebase Realtime Database + Authentication

import { initializeApp } from 'firebase/app'
import { getDatabase, ref, set, get, push, onValue, update, remove, off } from 'firebase/database'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'

// Kiểm tra xem đã config Firebase chưa
const isFirebaseConfigured = !!(
  import.meta.env.VITE_FIREBASE_API_KEY && 
  import.meta.env.VITE_FIREBASE_DATABASE_URL &&
  import.meta.env.VITE_FIREBASE_PROJECT_ID
)

// Firebase config từ environment variables
// Copy file env.example thành .env và điền thông tin Firebase của bạn
const firebaseConfig = isFirebaseConfigured ? {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
} : null

// Khởi tạo Firebase app
let app = null
let database = null
let auth = null
let googleProvider = null

if (firebaseConfig) {
  try {
    app = initializeApp(firebaseConfig)
    database = getDatabase(app)
    auth = getAuth(app)
    googleProvider = new GoogleAuthProvider()
    console.log('Firebase initialized successfully')
  } catch (error) {
    console.warn('Firebase initialization failed:', error.message)
  }
} else {
  console.warn('Firebase chưa được cấu hình. Quiz multiplayer sẽ không hoạt động.')
  console.warn('Vui lòng tạo file .env từ env.example và điền thông tin Firebase.')
}

// Export database instance và các hàm cần thiết
export { 
  database, ref, set, get, push, onValue, update, remove, off, 
  isFirebaseConfigured,
  auth, googleProvider, signInWithPopup, signOut, onAuthStateChanged 
}
export default app
