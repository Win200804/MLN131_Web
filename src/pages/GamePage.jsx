// GamePage - Trang Mini Games
// 2 games: Điền từ còn thiếu, Sắp xếp Timeline

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiPuzzle, HiCheck, HiX, HiRefresh, HiLightBulb, HiClock, HiArrowRight, HiStar, HiLockClosed } from 'react-icons/hi'
import { saveGameHistory } from '../services/storageService'
import { useAuth } from '../context/AuthContext'

const GamePage = () => {
  const { user, isAuthenticated, loading } = useAuth()
  const [activeGame, setActiveGame] = useState(null)

  const games = [
    {
      id: 'fill-blank',
      title: 'Điền từ còn thiếu',
      description: 'Hoàn thành các câu quan trọng về giai cấp công nhân bằng cách điền từ còn thiếu vào chỗ trống.',
      icon: '✏️',
      color: 'bg-blue-500',
      difficulty: 'Trung bình'
    },
    {
      id: 'timeline',
      title: 'Sắp xếp Timeline',
      description: 'Sắp xếp các sự kiện lịch sử về phong trào công nhân theo đúng thứ tự thời gian.',
      icon: '📅',
      color: 'bg-green-500',
      difficulty: 'Dễ - Trung bình'
    }
  ]

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    )
  }

  // Chưa đăng nhập - yêu cầu login (giống QuizPage)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-500 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="max-w-md w-full"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <HiPuzzle className="w-10 h-10 text-accent-gold" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-white mb-2">Mini Games</h1>
            <p className="text-white/70">Đăng nhập để tham gia trò chơi</p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
            <div className="text-center">
              <h2 className="font-heading text-xl font-bold text-gray-900 mb-2">Vui lòng đăng nhập</h2>
              <p className="text-gray-500 text-sm">Để chơi Mini Games, bạn cần đăng nhập trước</p>
            </div>

            <Link
              to="/login"
              state={{ from: { pathname: '/games' } }}
              className="w-full btn-primary flex items-center justify-center space-x-3 py-4"
            >
              <HiLockClosed className="w-6 h-6" />
              <span className="font-bold">Đăng nhập với Google</span>
            </Link>

            <p className="text-center text-xs text-gray-400">
              Học qua trò chơi - Vừa vui vừa nhớ lâu!
            </p>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <HiPuzzle className="w-16 h-16 mx-auto mb-4" />
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Mini Games
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Học qua trò chơi - Vừa vui vừa nhớ lâu!
            </p>
          </motion.div>
        </div>
      </div>

      {/* Games Selection / Active Game */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {!activeGame ? (
            // Games Selection
            <motion.div
              key="selection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {games.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="cursor-pointer"
                  onClick={() => setActiveGame(game.id)}
                >
                  <div className="card hover:shadow-2xl hover:scale-105 transition-all">
                    <div className={`${game.color} w-16 h-16 rounded-xl flex items-center justify-center text-3xl mb-4`}>
                      {game.icon}
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-heading text-xl font-bold text-gray-900">
                        {game.title}
                      </h3>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                        {game.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{game.description}</p>
                    <div className="flex items-center text-primary-900 font-medium">
                      <span>Chơi ngay</span>
                      <HiArrowRight className="w-5 h-5 ml-2" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : activeGame === 'fill-blank' ? (
            // Fill in the Blank Game
            <FillBlankGame onBack={() => setActiveGame(null)} />
          ) : activeGame === 'timeline' ? (
            // Timeline Game
            <TimelineGame onBack={() => setActiveGame(null)} />
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ==========================================
// Game 1: Điền từ còn thiếu
// ==========================================
// Helper function: So sánh chuỗi tiếng Việt thông minh
// Chỉ normalize khoảng trắng và lowercase, GIỮ NGUYÊN dấu
const normalizeForCompare = (str) => {
  if (!str) return ''
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ') // normalize multiple spaces to single
}

// Hàm bỏ dấu tiếng Việt (dùng để so sánh backup)
const removeVietnameseTones = (str) => {
  if (!str) return ''
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
}

// So sánh đáp án: ưu tiên exact match (có dấu), fallback không dấu
const compareAnswers = (userAnswer, correctAnswer) => {
  const normalizedUser = normalizeForCompare(userAnswer)
  const normalizedCorrect = normalizeForCompare(correctAnswer)
  
  // 1. So sánh chính xác (có dấu)
  if (normalizedUser === normalizedCorrect) {
    return { isCorrect: true, matchType: 'exact' }
  }
  
  // 2. So sánh không dấu (fallback cho user nhập không dấu)
  const userNoTone = removeVietnameseTones(userAnswer)
  const correctNoTone = removeVietnameseTones(correctAnswer)
  
  if (userNoTone === correctNoTone) {
    return { isCorrect: true, matchType: 'no-tone' }
  }
  
  return { isCorrect: false, matchType: 'none' }
}

const FillBlankGame = ({ onBack }) => {
  // Câu hỏi điền từ - đã kiểm tra và sửa lại hint cho chính xác
  const questions = [
    {
      id: 1,
      sentence: 'Giai cấp công nhân là con đẻ của nền _____ tư bản chủ nghĩa.',
      answer: 'đại công nghiệp',
      hint: 'Sản xuất quy mô lớn, máy móc hiện đại'
    },
    {
      id: 2,
      sentence: 'Trong chủ nghĩa tư bản, công nhân không sở hữu _____ của xã hội.',
      answer: 'tư liệu sản xuất',
      hint: 'Công cụ, máy móc, nhà xưởng để sản xuất'
    },
    {
      id: 3,
      sentence: 'Giai cấp công nhân bị giai cấp tư sản bóc lột _____.',
      answer: 'giá trị thặng dư',
      hint: 'Phần giá trị công nhân tạo ra nhưng không được nhận'
    },
    {
      id: 4,
      sentence: '_____ là nhân tố chủ quan quan trọng nhất để giai cấp công nhân thực hiện sứ mệnh lịch sử.',
      answer: 'Đảng Cộng sản',
      hint: 'Đội tiên phong của giai cấp công nhân, lãnh đạo cách mạng'
    },
    {
      id: 5,
      sentence: 'Giai cấp công nhân Việt Nam ra đời gắn liền với chính sách khai thác thuộc địa của _____.',
      answer: 'thực dân Pháp',
      hint: 'Nước phương Tây đô hộ Việt Nam gần 100 năm'
    },
    {
      id: 6,
      sentence: 'Xu hướng _____ của giai cấp công nhân hiện đại gắn liền với cách mạng khoa học công nghệ.',
      answer: 'trí tuệ hóa',
      hint: 'Nâng cao tri thức, kỹ năng công nghệ cao'
    },
    {
      id: 7,
      sentence: 'Sứ mệnh lịch sử của giai cấp công nhân bao gồm ba nội dung: kinh tế, _____ và văn hóa tư tưởng.',
      answer: 'chính trị xã hội',
      hint: 'Liên quan đến quyền lực nhà nước và tổ chức xã hội'
    },
    {
      id: 8,
      sentence: 'Cách mạng công nghiệp lần thứ tư còn được gọi là Cách mạng công nghiệp _____.',
      answer: '4.0',
      hint: 'Một con số, viết dạng thập phân'
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [completed, setCompleted] = useState(false)

  const currentQuestion = questions[currentIndex]

  const handleCheck = () => {
    // So sánh thông minh: ưu tiên exact match, fallback không dấu
    const result = compareAnswers(userAnswer, currentQuestion.answer)
    setIsCorrect(result.isCorrect)
    setIsChecked(true)
    if (result.isCorrect) {
      setScore(prev => prev + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setUserAnswer('')
      setIsChecked(false)
      setIsCorrect(false)
      setShowHint(false)
    } else {
      // Hoàn thành game
      setCompleted(true)
      saveGameHistory({
        game: 'fill-blank',
        score,
        total: questions.length
      })
    }
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setUserAnswer('')
    setIsChecked(false)
    setIsCorrect(false)
    setScore(0)
    setShowHint(false)
    setCompleted(false)
  }

  if (completed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="card">
          <HiStar className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
          <h2 className="font-heading text-3xl font-bold text-gray-900 mb-2">
            Hoàn thành!
          </h2>
          <p className="text-gray-600 mb-6">
            Bạn đã trả lời đúng <span className="font-bold text-primary-900">{score}/{questions.length}</span> câu
          </p>
          <div className="flex space-x-4 justify-center">
            <button onClick={handleRestart} className="btn-secondary flex items-center">
              <HiRefresh className="w-5 h-5 mr-2" />
              Chơi lại
            </button>
            <button onClick={onBack} className="btn-primary">
              Quay lại
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-3xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="text-gray-600 hover:text-gray-900 flex items-center">
          ← Quay lại
        </button>
        <div className="text-sm text-gray-500">
          Câu {currentIndex + 1}/{questions.length} | Điểm: {score}
        </div>
      </div>

      {/* Game Card */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <span className="text-3xl">✏️</span>
          <h2 className="font-heading text-2xl font-bold text-gray-900">
            Điền từ còn thiếu
          </h2>
        </div>

        {/* Question */}
        <div className="bg-gray-50 p-6 rounded-xl mb-6">
          <p className="text-lg text-gray-800 leading-relaxed">
            {currentQuestion.sentence.split('_____').map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className="inline-block mx-1 px-4 py-1 bg-primary-100 border-b-2 border-primary-500 min-w-[150px] text-center">
                    {isChecked ? (
                      <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                        {userAnswer || '___'}
                      </span>
                    ) : (
                      '___'
                    )}
                  </span>
                )}
              </span>
            ))}
          </p>
        </div>

        {/* Answer Input */}
        <div className="mb-6">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            disabled={isChecked}
            placeholder="Nhập câu trả lời của bạn..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100"
            onKeyPress={(e) => e.key === 'Enter' && !isChecked && handleCheck()}
          />
        </div>

        {/* Hint */}
        {!isChecked && (
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center text-sm text-gray-500 hover:text-primary-900 mb-4"
          >
            <HiLightBulb className="w-4 h-4 mr-1" />
            {showHint ? 'Ẩn gợi ý' : 'Hiện gợi ý'}
          </button>
        )}

        {showHint && !isChecked && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-4">
            <p className="text-yellow-800 text-sm">
              <strong>Gợi ý:</strong> {currentQuestion.hint}
            </p>
          </div>
        )}

        {/* Result */}
        {isChecked && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg mb-4 ${
              isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            <div className="flex items-center mb-2">
              {isCorrect ? (
                <HiCheck className="w-6 h-6 mr-2" />
              ) : (
                <HiX className="w-6 h-6 mr-2" />
              )}
              <span className="font-bold">
                {isCorrect ? 'Chính xác!' : 'Chưa đúng!'}
              </span>
            </div>
            {!isCorrect && (
              <p className="text-sm">
                Đáp án đúng: <strong>{currentQuestion.answer}</strong>
              </p>
            )}
          </motion.div>
        )}

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          {!isChecked ? (
            <button
              onClick={handleCheck}
              disabled={!userAnswer.trim()}
              className="btn-primary disabled:opacity-50"
            >
              Kiểm tra
            </button>
          ) : (
            <button onClick={handleNext} className="btn-primary flex items-center">
              {currentIndex < questions.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'}
              <HiArrowRight className="w-5 h-5 ml-2" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ==========================================
// Game 2: Sắp xếp Timeline (Drag & Drop)
// ==========================================
const TimelineGame = ({ onBack }) => {
  // Các sự kiện cần sắp xếp
  const originalEvents = [
    { id: 1, year: 1848, event: 'Tuyên ngôn của Đảng Cộng sản ra đời', order: 1 },
    { id: 2, year: 1917, event: 'Cách mạng Tháng Mười Nga thành công', order: 2 },
    { id: 3, year: 1920, event: 'Nguyễn Ái Quốc tiếp cận chủ nghĩa Mác-Lênin', order: 3 },
    { id: 4, year: 1930, event: 'Đảng Cộng sản Việt Nam ra đời', order: 4 },
    { id: 5, year: 1945, event: 'Cách mạng Tháng Tám thành công', order: 5 },
    { id: 6, year: 1986, event: 'Đại hội VI - Bắt đầu công cuộc Đổi mới', order: 6 },
    { id: 7, year: 2008, event: 'Nghị quyết TW6 khóa X về xây dựng giai cấp công nhân', order: 7 },
    { id: 8, year: 2021, event: 'Đại hội XIII - Định hướng công nhân thích ứng CMCN 4.0', order: 8 }
  ]

  // Shuffle events
  const shuffleArray = (array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const [events, setEvents] = useState(() => shuffleArray(originalEvents))
  const [draggedIndex, setDraggedIndex] = useState(null)
  const [dragOverIndex, setDragOverIndex] = useState(null)
  const [isChecked, setIsChecked] = useState(false)
  const [score, setScore] = useState(0)

  // Drag handlers
  const handleDragStart = (e, index) => {
    if (isChecked) return
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
    // Thêm timeout để có hiệu ứng kéo đẹp hơn
    setTimeout(() => {
      e.target.style.opacity = '0.5'
    }, 0)
  }

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1'
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const handleDragOver = (e, index) => {
    e.preventDefault()
    if (isChecked || draggedIndex === null) return
    setDragOverIndex(index)
  }

  const handleDragLeave = () => {
    setDragOverIndex(null)
  }

  const handleDrop = (e, dropIndex) => {
    e.preventDefault()
    if (isChecked || draggedIndex === null || draggedIndex === dropIndex) {
      setDragOverIndex(null)
      return
    }

    // Reorder: di chuyển item từ draggedIndex đến dropIndex
    const newEvents = [...events]
    const draggedItem = newEvents[draggedIndex]
    
    // Xóa item khỏi vị trí cũ
    newEvents.splice(draggedIndex, 1)
    // Chèn vào vị trí mới
    newEvents.splice(dropIndex, 0, draggedItem)
    
    setEvents(newEvents)
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const handleCheck = () => {
    let correct = 0
    events.forEach((event, index) => {
      if (event.order === index + 1) {
        correct++
      }
    })
    setScore(correct)
    setIsChecked(true)
    
    saveGameHistory({
      game: 'timeline',
      score: correct,
      total: events.length
    })
  }

  const handleRestart = () => {
    setEvents(shuffleArray(originalEvents))
    setDraggedIndex(null)
    setDragOverIndex(null)
    setIsChecked(false)
    setScore(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-3xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="text-gray-600 hover:text-gray-900 flex items-center">
          ← Quay lại
        </button>
        {isChecked && (
          <div className="text-sm text-gray-500">
            Điểm: {score}/{events.length}
          </div>
        )}
      </div>

      {/* Game Card */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <span className="text-3xl">📅</span>
          <div>
            <h2 className="font-heading text-2xl font-bold text-gray-900">
              Sắp xếp Timeline
            </h2>
            <p className="text-sm text-gray-500">
              Kéo thả các sự kiện để sắp xếp theo thứ tự thời gian
            </p>
          </div>
        </div>

        {/* Timeline - Drag & Drop */}
        <div className="space-y-3 mb-6">
          {events.map((event, index) => {
            const isCorrect = isChecked && event.order === index + 1
            const isWrong = isChecked && event.order !== index + 1
            const isDragging = draggedIndex === index
            const isDragOver = dragOverIndex === index

            return (
              <motion.div
                key={event.id}
                layout
                draggable={!isChecked}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index)}
                className={`p-4 rounded-lg border-2 transition-all select-none ${
                  !isChecked ? 'cursor-grab active:cursor-grabbing' : ''
                } ${
                  isDragging
                    ? 'border-primary-500 bg-primary-50 shadow-lg scale-[1.02]'
                    : isDragOver
                    ? 'border-primary-400 bg-primary-50/50 border-dashed'
                    : isCorrect
                    ? 'border-green-500 bg-green-50'
                    : isWrong
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  {/* Số thứ tự */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 font-bold transition-colors ${
                    isCorrect ? 'bg-green-500 text-white' :
                    isWrong ? 'bg-red-500 text-white' :
                    isDragging ? 'bg-primary-500 text-white' :
                    'bg-gray-200 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center flex-wrap">
                      <HiClock className="w-4 h-4 text-gray-400 mr-2" />
                      {/* Chỉ hiện năm sau khi check để tăng độ khó */}
                      {isChecked && (
                        <span className="font-bold text-primary-900 mr-3">{event.year}</span>
                      )}
                      <span className="text-gray-700">{event.event}</span>
                    </div>
                  </div>
                  {/* Drag indicator hoặc Result icon */}
                  <div className="ml-4 flex-shrink-0">
                    {isChecked ? (
                      isCorrect ? (
                        <HiCheck className="w-6 h-6 text-green-500" />
                      ) : (
                        <HiX className="w-6 h-6 text-red-500" />
                      )
                    ) : (
                      <div className="w-6 h-6 flex flex-col justify-center items-center text-gray-400">
                        <span className="text-lg">⋮⋮</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Result Message */}
        {isChecked && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg mb-4 ${
              score === events.length
                ? 'bg-green-100 text-green-800'
                : score >= events.length / 2
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            <div className="flex items-center">
              {score === events.length ? (
                <>
                  <HiStar className="w-6 h-6 mr-2" />
                  <span className="font-bold">Tuyệt vời! Bạn sắp xếp đúng tất cả!</span>
                </>
              ) : (
                <>
                  <HiLightBulb className="w-6 h-6 mr-2" />
                  <span>Bạn sắp xếp đúng {score}/{events.length} sự kiện</span>
                </>
              )}
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          {isChecked ? (
            <button onClick={handleRestart} className="btn-primary flex items-center">
              <HiRefresh className="w-5 h-5 mr-2" />
              Chơi lại
            </button>
          ) : (
            <button onClick={handleCheck} className="btn-primary">
              Kiểm tra
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default GamePage

