// AIChatbox Component - Chatbox AI trợ lý về Chủ nghĩa xã hội khoa học
import { useState, useRef, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiChat, HiX, HiPaperAirplane, HiLightBulb, HiTrash, HiLogin } from 'react-icons/hi'
import { sendMessageToGemini, resetConversation } from '../../services/geminiService'
import { useAuth } from '../../context/AuthContext'

// Key lưu trữ trong localStorage
const STORAGE_KEY = 'mln131_chat_history'

// Các câu hỏi gợi ý
const SUGGESTED_QUESTIONS = [
  'Giai cấp công nhân là gì?',
  'Thách thức của Công nhân 4.0?',
  'Cơ hội trong thời đại 4.0?',
  'Sứ mệnh lịch sử của GCCN?'
]

// Hàm format markdown thành React elements
const formatMarkdown = (text) => {
  // Nếu không có text thì return null
  if (!text) return null

  // Tách text thành các dòng
  const lines = text.split('\n')
  const elements = []
  let listItems = []
  let listType = null // 'ul' hoặc 'ol'
  let currentIndex = 0

  // Hàm xử lý inline formatting (bold, italic, code)
  const processInlineFormatting = (line) => {
    const parts = []
    let remaining = line
    let keyIndex = 0

    // Regex patterns
    const patterns = [
      { regex: /\*\*(.+?)\*\*/g, component: (match, key) => <strong key={key} className="font-semibold text-primary-700">{match}</strong> },
      { regex: /\*(.+?)\*/g, component: (match, key) => <em key={key} className="italic text-gray-700">{match}</em> },
      { regex: /`(.+?)`/g, component: (match, key) => <code key={key} className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono text-primary-600">{match}</code> }
    ]

    // Xử lý **bold** trước
    const boldRegex = /\*\*(.+?)\*\*/g
    let lastIndex = 0
    let match

    while ((match = boldRegex.exec(remaining)) !== null) {
      // Thêm text trước match
      if (match.index > lastIndex) {
        parts.push(remaining.slice(lastIndex, match.index))
      }
      // Thêm bold text
      parts.push(
        <strong key={`bold-${keyIndex++}`} className="font-semibold text-primary-700">
          {match[1]}
        </strong>
      )
      lastIndex = match.index + match[0].length
    }
    // Thêm phần còn lại
    if (lastIndex < remaining.length) {
      parts.push(remaining.slice(lastIndex))
    }

    // Nếu không có match nào, return text gốc
    if (parts.length === 0) return remaining

    return parts
  }

  // Hàm flush list items vào elements
  const flushList = () => {
    if (listItems.length > 0) {
      if (listType === 'ol') {
        elements.push(
          <ol key={`ol-${currentIndex}`} className="list-decimal list-inside space-y-1.5 my-2 pl-2">
            {listItems}
          </ol>
        )
      } else {
        elements.push(
          <ul key={`ul-${currentIndex}`} className="space-y-1.5 my-2 pl-2">
            {listItems}
          </ul>
        )
      }
      listItems = []
      listType = null
      currentIndex++
    }
  }

  // Xử lý từng dòng
  lines.forEach((line, index) => {
    const trimmedLine = line.trim()

    // Dòng trống
    if (!trimmedLine) {
      flushList()
      return
    }

    // Ordered list (1. 2. 3. ...)
    const olMatch = trimmedLine.match(/^(\d+)\.\s+(.+)/)
    if (olMatch) {
      if (listType !== 'ol') {
        flushList()
        listType = 'ol'
      }
      listItems.push(
        <li key={`li-${index}`} className="text-gray-700 leading-relaxed">
          <span className="font-medium text-primary-600 mr-1">{olMatch[1]}.</span>
          {processInlineFormatting(olMatch[2])}
        </li>
      )
      return
    }

    // Unordered list (* hoặc -)
    const ulMatch = trimmedLine.match(/^[\*\-]\s+(.+)/)
    if (ulMatch) {
      if (listType !== 'ul') {
        flushList()
        listType = 'ul'
      }
      listItems.push(
        <li key={`li-${index}`} className="text-gray-700 leading-relaxed flex items-start">
          <span className="text-primary-500 mr-2 mt-1.5">•</span>
          <span>{processInlineFormatting(ulMatch[1])}</span>
        </li>
      )
      return
    }

    // Heading với ##
    if (trimmedLine.startsWith('## ')) {
      flushList()
      elements.push(
        <h4 key={`h4-${currentIndex++}`} className="font-bold text-primary-800 mt-3 mb-1.5 text-sm">
          {processInlineFormatting(trimmedLine.slice(3))}
        </h4>
      )
      return
    }

    // Heading với #
    if (trimmedLine.startsWith('# ')) {
      flushList()
      elements.push(
        <h3 key={`h3-${currentIndex++}`} className="font-bold text-primary-900 mt-3 mb-2">
          {processInlineFormatting(trimmedLine.slice(2))}
        </h3>
      )
      return
    }

    // Paragraph bình thường
    flushList()
    elements.push(
      <p key={`p-${currentIndex++}`} className="text-gray-700 leading-relaxed mb-1.5">
        {processInlineFormatting(trimmedLine)}
      </p>
    )
  })

  // Flush list cuối cùng nếu có
  flushList()

  return elements
}

// Component hiển thị nội dung đã format
const FormattedContent = ({ content, isUser }) => {
  // Nếu là user message thì không cần format
  if (isUser) {
    return <p className="text-sm whitespace-pre-wrap leading-relaxed">{content}</p>
  }

  // Format markdown cho AI message
  const formattedContent = useMemo(() => formatMarkdown(content), [content])

  return (
    <div className="text-sm formatted-content">
      {formattedContent}
    </div>
  )
}

const AIChatbox = () => {
  // Lấy thông tin đăng nhập từ AuthContext
  const { isAuthenticated, user } = useAuth()
  
  // State quản lý chatbox
  const [isOpen, setIsOpen] = useState(false)              // Trạng thái mở/đóng chatbox
  const [messages, setMessages] = useState([])             // Danh sách tin nhắn
  const [inputValue, setInputValue] = useState('')         // Nội dung input
  const [isLoading, setIsLoading] = useState(false)        // Trạng thái đang gửi
  const [showSuggestions, setShowSuggestions] = useState(true) // Hiển thị gợi ý
  
  // Ref để scroll xuống tin nhắn mới nhất
  const messagesEndRef = useRef(null)
  // Ref cho input
  const inputRef = useRef(null)

  // Effect load lịch sử từ localStorage khi mount
  useEffect(() => {
    try {
      // Đọc lịch sử từ localStorage
      const savedHistory = localStorage.getItem(STORAGE_KEY)
      if (savedHistory) {
        // Parse JSON và convert timestamp string thành Date object
        const parsedHistory = JSON.parse(savedHistory)
        const historyWithDates = parsedHistory.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
        // Set messages
        setMessages(historyWithDates)
        // Ẩn suggestions nếu đã có tin nhắn
        if (historyWithDates.length > 0) {
          setShowSuggestions(false)
        }
      }
    } catch (error) {
      // Log lỗi nếu parse fail
      console.error('Error loading chat history:', error)
    }
  }, [])

  // Effect lưu lịch sử vào localStorage khi messages thay đổi
  useEffect(() => {
    try {
      // Chỉ lưu nếu có tin nhắn
      if (messages.length > 0) {
        // Lưu vào localStorage (giới hạn 50 tin nhắn gần nhất)
        const historyToSave = messages.slice(-50)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(historyToSave))
      }
    } catch (error) {
      // Log lỗi nếu save fail
      console.error('Error saving chat history:', error)
    }
  }, [messages])

  // Effect scroll xuống khi có tin nhắn mới
  useEffect(() => {
    // Scroll smooth xuống cuối
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Effect focus input khi mở chatbox
  useEffect(() => {
    // Focus input khi mở
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  // Hàm gửi tin nhắn
  const handleSendMessage = async (message = inputValue.trim()) => {
    // Kiểm tra tin nhắn rỗng
    if (!message || isLoading) return

    // Ẩn gợi ý khi đã có tin nhắn
    setShowSuggestions(false)
    // Reset input
    setInputValue('')

    // Thêm tin nhắn của user vào danh sách
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])

    // Bật trạng thái loading
    setIsLoading(true)

    try {
      // Gọi Gemini API
      const response = await sendMessageToGemini(message)
      
      // Thêm response của AI vào danh sách
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: response,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      // Thêm tin nhắn lỗi
      const errorMessage = {
        id: Date.now() + 1,
        type: 'error',
        content: error.message || 'Có lỗi xảy ra. Vui lòng thử lại!',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      // Tắt loading
      setIsLoading(false)
    }
  }

  // Hàm xử lý nhấn Enter
  const handleKeyPress = (e) => {
    // Kiểm tra phím Enter và không có Shift
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Hàm reset hội thoại
  const handleResetConversation = () => {
    // Reset state
    setMessages([])
    setShowSuggestions(true)
    // Reset service
    resetConversation()
    // Xóa localStorage
    localStorage.removeItem(STORAGE_KEY)
  }

  // Hàm chọn câu hỏi gợi ý
  const handleSelectSuggestion = (question) => {
    // Gửi câu hỏi gợi ý
    handleSendMessage(question)
  }

  // Hàm format thời gian
  const formatTime = (date) => {
    // Kiểm tra date hợp lệ
    if (!(date instanceof Date) || isNaN(date)) {
      return ''
    }
    // Format giờ:phút
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <>
      {/* Nút mở chatbox - Fixed ở góc phải dưới */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-primary-600 to-primary-800 text-white rounded-full shadow-2xl flex items-center justify-center hover:shadow-primary-500/50 transition-shadow"
            aria-label="Mở trợ lý AI"
          >
            {/* Icon chat */}
            <HiChat className="w-7 h-7" />
            {/* Badge thông báo */}
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-gold text-primary-900 text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
              AI
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chatbox panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[550px] max-h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-700 to-primary-900 text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center space-x-3">
                {/* Avatar AI */}
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xl">🤖</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm">Trợ lý ảo MLN131</h3>
                  <p className="text-xs text-white/70">Hỏi đáp về CNXHKH</p>
                </div>
              </div>
              {/* Nút actions */}
              <div className="flex items-center space-x-1">
                {/* Nút reset */}
                <button
                  onClick={handleResetConversation}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  title="Xóa lịch sử & Bắt đầu lại"
                >
                  <HiTrash className="w-5 h-5" />
                </button>
                {/* Nút đóng */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  title="Đóng"
                >
                  <HiX className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {/* Yêu cầu đăng nhập nếu chưa authenticated */}
              {!isAuthenticated ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full py-8"
                >
                  <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HiLogin className="w-10 h-10 text-primary-600" />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2 text-lg">Yêu cầu Đăng nhập</h4>
                  <p className="text-sm text-gray-600 mb-6 text-center px-4">
                    Vui lòng đăng nhập để sử dụng<br />
                    <span className="font-medium text-primary-600">Trợ lý AI MLN131</span>
                  </p>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-full transition-colors font-medium shadow-lg"
                  >
                    <HiLogin className="w-5 h-5" />
                    <span>Đăng nhập ngay</span>
                  </Link>
                </motion.div>
              ) : (
                <>
                  {/* Tin nhắn chào mừng */}
                  {messages.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-4"
                    >
                      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-3xl">📚</span>
                      </div>
                      <h4 className="font-bold text-gray-800 mb-1">
                        Xin chào{user?.displayName ? `, ${user.displayName.split(' ').pop()}` : ''}!
                      </h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Tôi là trợ lý AI về môn CNXHKH.<br />
                      </p>
                    </motion.div>
                  )}

                  {/* Gợi ý câu hỏi */}
                  {showSuggestions && messages.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center space-x-2 text-gray-500 text-xs mb-2">
                        <HiLightBulb className="w-4 h-4 text-accent-gold" />
                        <span>Gợi ý câu hỏi:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {SUGGESTED_QUESTIONS.map((question, index) => (
                          <button
                            key={index}
                            onClick={() => handleSelectSuggestion(question)}
                            className="px-3 py-1.5 bg-white text-sm text-gray-700 rounded-full border border-gray-200 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 transition-all"
                          >
                            {question}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

              {/* Danh sách tin nhắn */}
              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                      msg.type === 'user'
                        ? 'bg-primary-600 text-white rounded-br-md'
                        : msg.type === 'error'
                        ? 'bg-red-100 text-red-700 border border-red-200 rounded-bl-md'
                        : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-md'
                    }`}
                  >
                    {/* Nội dung tin nhắn - có format cho AI */}
                    <FormattedContent content={msg.content} isUser={msg.type === 'user'} />
                    {/* Thời gian */}
                    <p className={`text-xs mt-1 ${
                      msg.type === 'user' ? 'text-white/70' : 'text-gray-400'
                    }`}>
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </motion.div>
              ))}

                  {/* Loading indicator */}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-gray-100">
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                            <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                            <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                          </div>
                          <span className="text-xs text-gray-400">Đang trả lời...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Scroll anchor */}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input area - Chỉ hiển thị khi đã đăng nhập */}
            {isAuthenticated && (
              <div className="p-3 bg-white border-t border-gray-100 flex-shrink-0">
                <div className="flex items-end space-x-2">
                  {/* Input field */}
                  <div className="flex-1 relative">
                    <textarea
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Nhập câu hỏi về CNXHKH..."
                      rows={1}
                      className="w-full px-4 py-2.5 pr-12 bg-gray-100 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-sm max-h-24"
                      disabled={isLoading}
                    />
                  </div>
                  {/* Nút gửi */}
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() || isLoading}
                    className={`p-2.5 rounded-xl transition-all ${
                      inputValue.trim() && !isLoading
                        ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <HiPaperAirplane className="w-5 h-5 transform rotate-90" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AIChatbox
