// App.jsx - Main application component với routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QuizProvider } from './context/QuizContext'
import { AuthProvider } from './context/AuthContext'

// Layout components
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

// Page components
import HomePage from './pages/HomePage'
import ContentPage from './pages/ContentPage'
import QuizPage from './pages/QuizPage'
import GamePage from './pages/GamePage'
import AboutPage from './pages/AboutPage'
import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage'

// Protected Route
import ProtectedRoute from './components/common/ProtectedRoute'

// AI Chatbox Component
import AIChatbox from './components/common/AIChatbox'

// Main App component - Component chính của ứng dụng
function App() {
  return (
    // AuthProvider wrap toàn bộ app để quản lý authentication
    <AuthProvider>
      {/* QuizProvider wrap toàn bộ app để quản lý state quiz */}
      <QuizProvider>
        <Router>
          {/* Container chính với min height full screen */}
          <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Header - Thanh điều hướng */}
            <Header />
            
            {/* Main content - Nội dung chính */}
            <main className="flex-grow">
              <Routes>
                {/* Trang chủ */}
                <Route path="/" element={<HomePage />} />
                
                {/* Trang nội dung bài giảng */}
                <Route path="/content" element={<ContentPage />} />
                <Route path="/content/:section" element={<ContentPage />} />
                
                {/* Trang Quiz multiplayer */}
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/quiz/:roomId" element={<QuizPage />} />
                
                {/* Trang Mini games */}
                <Route path="/games" element={<GamePage />} />
                
                {/* Trang Giới thiệu */}
                <Route path="/about" element={<AboutPage />} />
                
                {/* Trang Đăng nhập */}
                <Route path="/login" element={<LoginPage />} />
                
                {/* Trang Admin - Cần đăng nhập */}
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute>
                      <AdminPage />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>
            
            {/* Footer */}
            <Footer />
            
            {/* AI Chatbox - Trợ lý AI về CNXHKH */}
            <AIChatbox />
          </div>
        </Router>
      </QuizProvider>
    </AuthProvider>
  )
}

export default App
