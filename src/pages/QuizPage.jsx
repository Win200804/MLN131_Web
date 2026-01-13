// QuizPage - Trang Quiz multiplayer kiểu Kahoot
// Hỗ trợ tối đa 40 người chơi
// Admin tự động chuyển đến /admin, Player chơi quiz

import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  HiLightningBolt, HiUsers, HiPlay, HiClock, HiCheck, HiX, 
  HiClipboardCopy, HiRefresh, HiHome, HiStar, HiChevronRight, HiCog, HiLogin
} from 'react-icons/hi'
import { useQuiz } from '../context/QuizContext'
import { useAuth } from '../context/AuthContext'
import { 
  createQuizRoom, joinQuizRoom, startQuiz, submitAnswer, 
  updatePlayerScore, nextQuestion, finishQuiz, getLeaderboard 
} from '../services/quizService'
import { getPlayerName, savePlayerName } from '../services/storageService'
import quizQuestions from '../data/quizQuestions'
import { copyToClipboard, formatNumber } from '../utils/helpers'
import { QUIZ_SETTINGS } from '../utils/constants'
import { isAdmin } from '../config/adminConfig'

const QuizPage = () => {
  const { roomId } = useParams()
  const navigate = useNavigate()
  const quiz = useQuiz()
  const { user, isAuthenticated } = useAuth()
  
  // Local states
  const [view, setView] = useState('lobby') // lobby, waiting, playing, results
  const [playerName, setPlayerName] = useState(getPlayerName() || '')
  const [joinCode, setJoinCode] = useState(roomId || '')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [timeLeft, setTimeLeft] = useState(QUIZ_SETTINGS.TIME_PER_QUESTION)
  const [showAnswer, setShowAnswer] = useState(false)
  const [leaderboard, setLeaderboard] = useState([])
  const [currentQuestionData, setCurrentQuestionData] = useState(null)
  const lastProcessedQuestion = useRef(-1) // Track câu hỏi đã xử lý

  // Effect: Load saved player name or use Google display name
  useEffect(() => {
    if (user?.displayName && !playerName) {
      setPlayerName(user.displayName)
    } else {
      const savedName = getPlayerName()
      if (savedName) setPlayerName(savedName)
    }
  }, [user])

  // Effect: Auto redirect Admin to /admin page
  useEffect(() => {
    if (isAuthenticated && user?.email && isAdmin(user.email)) {
      // User là Admin -> chuyển đến trang admin
      navigate('/admin', { replace: true })
    }
  }, [isAuthenticated, user, navigate])

  // Effect: Subscribe to room updates và currentQuestion changes
  useEffect(() => {
    if (!quiz.roomData) return

    const { status, currentQuestion: firebaseQuestion } = quiz.roomData

    // Khi quiz kết thúc
    if (status === 'finished' && view !== 'results') {
      setView('results')
      loadLeaderboard()
      return
    }

    // Khi quiz đang chơi
    if (status === 'playing') {
      // Chuyển view sang playing nếu chưa
      if (view !== 'playing') {
        setView('playing')
      }

      // Cập nhật câu hỏi nếu có thay đổi
      if (firebaseQuestion !== undefined && firebaseQuestion !== lastProcessedQuestion.current) {
        console.log('Question changed:', lastProcessedQuestion.current, '->', firebaseQuestion)
        lastProcessedQuestion.current = firebaseQuestion
        setCurrentQuestionData(quizQuestions[firebaseQuestion])
        setTimeLeft(QUIZ_SETTINGS.TIME_PER_QUESTION)
        setShowAnswer(false)
        quiz.nextQuestion(firebaseQuestion)
      }
    }
  }, [quiz.roomData?.status, quiz.roomData?.currentQuestion])

  // Effect: Countdown timer
  useEffect(() => {
    if (view !== 'playing' || showAnswer) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          handleTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [view, showAnswer, quiz.currentQuestion])

  // Tạo phòng mới - Yêu cầu đăng nhập
  const handleCreateRoom = async () => {
    // Kiểm tra đăng nhập
    if (!isAuthenticated) {
      setError('Bạn cần đăng nhập để tạo phòng')
      return
    }

    if (!playerName.trim()) {
      setError('Vui lòng nhập tên của bạn')
      return
    }

    try {
      setError('')
      savePlayerName(playerName.trim())
      
      // Tạo phòng với hostId (Firebase UID) để phân quyền
      const roomCode = await createQuizRoom(
        playerName.trim(), 
        {
          timePerQuestion: QUIZ_SETTINGS.TIME_PER_QUESTION,
          totalQuestions: quizQuestions.length
        },
        user.uid // Lưu Firebase UID của host
      )
      
      quiz.setRoom(roomCode, true)
      quiz.setPlayer('host', playerName.trim())
      
      // Host tự động join phòng
      await joinQuizRoom(roomCode, playerName.trim())
      
      setView('waiting')
      navigate(`/quiz/${roomCode}`)
    } catch (err) {
      setError(err.message || 'Không thể tạo phòng')
    }
  }

  // Tham gia phòng
  const handleJoinRoom = async () => {
    if (!playerName.trim()) {
      setError('Vui lòng nhập tên của bạn')
      return
    }
    if (!joinCode.trim() || joinCode.length !== 6) {
      setError('Mã phòng phải có 6 ký tự')
      return
    }

    try {
      setError('')
      savePlayerName(playerName.trim())
      
      const { playerId, roomData } = await joinQuizRoom(
        joinCode.toUpperCase().trim(), 
        playerName.trim()
      )
      
      quiz.setRoom(joinCode.toUpperCase().trim(), false)
      quiz.setPlayer(playerId, playerName.trim())
      
      setView('waiting')
      navigate(`/quiz/${joinCode.toUpperCase().trim()}`)
    } catch (err) {
      setError(err.message || 'Không thể tham gia phòng')
    }
  }

  // Bắt đầu quiz (Host only)
  const handleStartQuiz = async () => {
    if (!quiz.isHost) return
    
    try {
      await startQuiz(quiz.roomCode)
      setCurrentQuestionData(quizQuestions[0])
      setView('playing')
    } catch (err) {
      setError(err.message || 'Không thể bắt đầu quiz')
    }
  }

  // Chọn đáp án - Countdown vẫn tiếp tục, chỉ ghi nhận đáp án
  const handleSelectAnswer = async (answerIndex) => {
    if (quiz.isAnswered || showAnswer) return

    quiz.selectAnswer(answerIndex)
    // KHÔNG setShowAnswer ở đây - đợi hết countdown mới hiện đáp án
    
    try {
      const { baseScore, timeBonus } = await submitAnswer(
        quiz.roomCode,
        quiz.playerId,
        quiz.currentQuestion,
        answerIndex,
        timeLeft
      )

      // Cập nhật điểm nếu đúng
      if (answerIndex === currentQuestionData.correctAnswer) {
        await updatePlayerScore(quiz.roomCode, quiz.playerId, baseScore + timeBonus)
      }
    } catch (err) {
      console.error('Error submitting answer:', err)
    }
  }

  // Hết thời gian - Hiển thị đáp án cho TẤT CẢ
  const handleTimeUp = () => {
    console.log('Time up! Showing answer...')
    setShowAnswer(true)
    
    // Lấy roomCode ngay lập tức (closure)
    const roomCode = quiz.roomCode
    const currentQ = quiz.roomData?.currentQuestion ?? 0
    
    console.log('Will move to next question in 5 seconds... roomCode:', roomCode, 'currentQ:', currentQ)
    
    // Sau 5 giây, chuyển câu tiếp theo
    setTimeout(async () => {
      const nextIndex = currentQ + 1
      console.log('Moving to next question now... nextIndex:', nextIndex)
      
      if (!roomCode) {
        console.error('No roomCode!')
        return
      }
      
      try {
        if (nextIndex >= quizQuestions.length) {
          console.log('Quiz finished!')
          await finishQuiz(roomCode)
        } else {
          console.log('Calling Firebase nextQuestion:', roomCode, nextIndex)
          await nextQuestion(roomCode, nextIndex)
          console.log('Firebase nextQuestion called successfully')
        }
      } catch (err) {
        console.error('Error moving to next question:', err)
      }
    }, 5000)
  }

  // Chuyển câu tiếp theo (manual - cho host dùng nếu cần)
  const handleNextQuestion = async () => {
    const currentQ = quiz.roomData?.currentQuestion ?? 0
    const nextIndex = currentQ + 1
    
    try {
      if (nextIndex >= quizQuestions.length) {
        await finishQuiz(quiz.roomCode)
      } else {
        await nextQuestion(quiz.roomCode, nextIndex)
      }
    } catch (err) {
      console.error('Error moving to next question:', err)
    }
  }

  // Load leaderboard
  const loadLeaderboard = async () => {
    try {
      const board = await getLeaderboard(quiz.roomCode)
      setLeaderboard(board)
    } catch (err) {
      console.error('Error loading leaderboard:', err)
    }
  }

  // Copy mã phòng
  const handleCopyCode = async () => {
    const success = await copyToClipboard(quiz.roomCode)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Reset game
  const handlePlayAgain = () => {
    quiz.reset()
    lastProcessedQuestion.current = -1 // Reset câu hỏi đã xử lý
    setView('lobby')
    setJoinCode('')
    navigate('/quiz')
  }

  // Render different views
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-500">
      <AnimatePresence mode="wait">
        {view === 'lobby' && (
          <LobbyView
            playerName={playerName}
            setPlayerName={setPlayerName}
            joinCode={joinCode}
            setJoinCode={setJoinCode}
            error={error}
            onJoinRoom={handleJoinRoom}
            isAuthenticated={isAuthenticated}
            user={user}
          />
        )}
        
        {view === 'waiting' && (
          <WaitingRoomView
            roomCode={quiz.roomCode}
            roomData={quiz.roomData}
            isHost={quiz.isHost}
            copied={copied}
            onCopyCode={handleCopyCode}
            onStartQuiz={handleStartQuiz}
          />
        )}
        
        {view === 'playing' && currentQuestionData && (
          <PlayingView
            questionData={currentQuestionData}
            questionIndex={quiz.currentQuestion}
            totalQuestions={quizQuestions.length}
            timeLeft={timeLeft}
            selectedAnswer={quiz.selectedAnswer}
            isAnswered={quiz.isAnswered}
            showAnswer={showAnswer}
            onSelectAnswer={handleSelectAnswer}
          />
        )}
        
        {view === 'results' && (
          <ResultsView
            leaderboard={leaderboard}
            playerName={quiz.playerName}
            onPlayAgain={handlePlayAgain}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// Lobby View - Màn hình chờ tạo/tham gia phòng
// Admin tự động được redirect đến /admin
// Player hiện form nhập tên + mã phòng
const LobbyView = ({ playerName, setPlayerName, joinCode, setJoinCode, error, onJoinRoom, isAuthenticated, user }) => {
  // Nếu chưa đăng nhập -> hiện màn hình yêu cầu đăng nhập
  if (!isAuthenticated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="min-h-screen flex items-center justify-center p-4"
      >
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <HiLightningBolt className="w-10 h-10 text-accent-gold" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-white mb-2">Quiz Tương tác</h1>
            <p className="text-white/70">Đăng nhập để tham gia Quiz</p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
            <div className="text-center">
              <h2 className="font-heading text-xl font-bold text-gray-900 mb-2">Vui lòng đăng nhập</h2>
              <p className="text-gray-500 text-sm">Để chơi Quiz, bạn cần đăng nhập trước</p>
            </div>

            <Link
              to="/login"
              state={{ from: { pathname: '/quiz' } }}
              className="w-full btn-primary flex items-center justify-center space-x-3 py-4"
            >
              <HiLogin className="w-6 h-6" />
              <span className="font-bold">Đăng nhập với Google</span>
            </Link>

            <p className="text-center text-xs text-gray-400">
              Admin sẽ tự động được chuyển đến trang quản lý
            </p>
          </div>
        </div>
      </motion.div>
    )
  }

  // Đã đăng nhập (và không phải Admin vì Admin đã redirect) -> Form Player
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <HiLightningBolt className="w-10 h-10 text-accent-gold" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-white mb-2">Quiz Tương tác</h1>
          <p className="text-white/70">Nhập mã phòng từ Admin để tham gia</p>
        </div>

        {/* User Info */}
        <div className="bg-white/10 rounded-xl p-4 mb-6 flex items-center space-x-3">
          {user?.photoURL ? (
            <img src={user.photoURL} alt="" className="w-10 h-10 rounded-full" />
          ) : (
            <div className="w-10 h-10 bg-accent-gold rounded-full flex items-center justify-center text-primary-900 font-bold">
              {user?.displayName?.charAt(0)}
            </div>
          )}
          <div>
            <p className="font-medium text-white">{user?.displayName}</p>
            <p className="text-xs text-green-400">🎮 Player</p>
          </div>
        </div>

        {/* Form Player - Chỉ nhập tên + mã phòng */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 space-y-5">
          <div className="text-center pb-2">
            <h2 className="font-heading text-xl font-bold text-gray-900">Tham gia Quiz</h2>
            <p className="text-sm text-gray-500">Nhập tên và mã phòng để chơi</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Player Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên của bạn
            </label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Nhập tên hiển thị..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              maxLength={20}
            />
          </div>

          {/* Room Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mã phòng (lấy từ Admin)
            </label>
            <input
              type="text"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              placeholder="VD: ABC123"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent uppercase tracking-widest text-center font-mono text-xl"
              maxLength={6}
            />
          </div>

          {/* Join Button */}
          <button
            onClick={onJoinRoom}
            className="w-full bg-accent-red hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2"
          >
            <HiPlay className="w-6 h-6" />
            <span>Vào chơi</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// Waiting Room View - Phòng chờ
const WaitingRoomView = ({ roomCode, roomData, isHost, copied, onCopyCode, onStartQuiz }) => {
  const players = roomData?.players ? Object.values(roomData.players) : []
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="max-w-2xl w-full">
        {/* Room Code */}
        <div className="text-center mb-8">
          <p className="text-white/70 mb-2">Mã phòng</p>
          <div className="flex items-center justify-center space-x-4">
            <div className="bg-white text-primary-900 text-4xl md:text-6xl font-mono font-bold px-8 py-4 rounded-xl tracking-[0.3em]">
              {roomCode}
            </div>
            <button
              onClick={onCopyCode}
              className="bg-white/10 text-white p-4 rounded-xl hover:bg-white/20 transition-colors"
              title="Copy mã phòng"
            >
              {copied ? <HiCheck className="w-6 h-6" /> : <HiClipboardCopy className="w-6 h-6" />}
            </button>
          </div>
          {copied && <p className="text-accent-gold mt-2">Đã copy!</p>}
        </div>

        {/* Players List */}
        <div className="bg-white rounded-2xl shadow-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-xl font-bold text-gray-900">
              Người chơi ({players.length}/40)
            </h2>
            <div className="text-sm text-gray-500">
              Đang chờ...
            </div>
          </div>

          {/* Players Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 max-h-60 overflow-y-auto">
            {players.map((player, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-primary-100 text-primary-900 px-4 py-3 rounded-lg text-center font-medium truncate"
              >
                {player.name}
              </motion.div>
            ))}
            {players.length === 0 && (
              <p className="col-span-4 text-center text-gray-400 py-8">
                Chưa có người chơi nào...
              </p>
            )}
          </div>

          {/* Start Button (Host only) */}
          {isHost && (
            <button
              onClick={onStartQuiz}
              disabled={players.length < 1}
              className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <HiPlay className="w-5 h-5" />
              <span>Bắt đầu Quiz</span>
            </button>
          )}

          {!isHost && (
            <div className="text-center text-gray-500">
              <p>Đang chờ host bắt đầu quiz...</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Playing View - Màn hình chơi quiz
const PlayingView = ({ questionData, questionIndex, totalQuestions, timeLeft, selectedAnswer, isAnswered, showAnswer, onSelectAnswer }) => {
  const answerColors = ['bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500']
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col p-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-white">
          <span className="text-lg font-bold">Câu {questionIndex + 1}/{totalQuestions}</span>
        </div>
        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${
          timeLeft <= 5 ? 'bg-red-500 animate-pulse' : 'bg-white/20'
        } text-white`}>
          {timeLeft}
        </div>
      </div>

      {/* Question */}
      <div className="flex-grow flex flex-col items-center justify-center">
        <motion.div
          key={questionIndex}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl p-8 mb-8 max-w-3xl w-full text-center shadow-2xl"
        >
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            {questionData.question}
          </h2>
        </motion.div>

        {/* Answer Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl w-full">
          {questionData.options.map((option, index) => {
            const isCorrect = index === questionData.correctAnswer
            const isSelected = selectedAnswer === index
            
            // Base button class với màu gốc
            let buttonClass = `${answerColors[index]} hover:opacity-90`
            let extraStyles = ''
            
            if (showAnswer) {
              if (isCorrect) {
                // Đáp án ĐÚNG: Nổi bật (scale, ring, shadow) - GIỮ MÀU GỐC
                buttonClass = `${answerColors[index]} scale-105 ring-4 ring-white shadow-2xl`
                extraStyles = 'z-10 transform'
              } else {
                // Đáp án SAI: Nhạt màu
                buttonClass = `${answerColors[index]} opacity-40`
              }
            } else if (isSelected) {
              // Đang chọn (chưa reveal)
              buttonClass = `${answerColors[index]} ring-4 ring-white`
            }

            return (
              <motion.button
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ 
                  y: 0, 
                  opacity: 1,
                  scale: showAnswer && isCorrect ? 1.05 : 1
                }}
                transition={{ 
                  delay: index * 0.1,
                  scale: { duration: 0.3, ease: 'easeOut' }
                }}
                onClick={() => onSelectAnswer(index)}
                disabled={isAnswered || showAnswer}
                className={`${buttonClass} ${extraStyles} text-white p-6 rounded-xl font-medium text-lg transition-all disabled:cursor-not-allowed flex items-center relative`}
              >
                <span className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-4 font-bold">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-left flex-grow">{option}</span>
                {showAnswer && isCorrect && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 500 }}
                  >
                    <HiCheck className="w-8 h-8 ml-2" />
                  </motion.span>
                )}
                {showAnswer && isSelected && !isCorrect && (
                  <HiX className="w-8 h-8 ml-2" />
                )}
              </motion.button>
            )
          })}
        </div>

        {/* Explanation (after answer) */}
        {showAnswer && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white/10 backdrop-blur-sm text-white p-6 rounded-xl mt-6 max-w-3xl w-full"
          >
            <h3 className="font-bold mb-2 flex items-center">
              <HiLightningBolt className="w-5 h-5 mr-2 text-accent-gold" />
              Giải thích:
            </h3>
            <p className="text-white/90">{questionData.explanation}</p>
            <p className="text-white/50 text-sm mt-2">Tự động chuyển câu sau 5 giây...</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

// Results View - Màn hình kết quả
const ResultsView = ({ leaderboard, playerName, onPlayAgain }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <HiStar className="w-20 h-20 text-accent-gold mx-auto mb-4" />
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">
            Kết quả Quiz
          </h1>
          <p className="text-white/70">Xem bảng xếp hạng</p>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-2xl shadow-2xl p-6">
          <h2 className="font-heading text-xl font-bold text-gray-900 mb-4">
            Bảng xếp hạng
          </h2>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {leaderboard.map((player, index) => (
              <motion.div
                key={player.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center p-4 rounded-lg ${
                  player.name === playerName ? 'bg-primary-100 ring-2 ring-primary-500' : 'bg-gray-50'
                }`}
              >
                {/* Rank */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mr-4 ${
                  index === 0 ? 'bg-yellow-400 text-yellow-900' :
                  index === 1 ? 'bg-gray-300 text-gray-700' :
                  index === 2 ? 'bg-orange-400 text-orange-900' :
                  'bg-gray-200 text-gray-600'
                }`}>
                  {index + 1}
                </div>

                {/* Name */}
                <div className="flex-grow">
                  <p className="font-medium text-gray-900">
                    {player.name}
                    {player.name === playerName && (
                      <span className="ml-2 text-xs bg-primary-500 text-white px-2 py-1 rounded-full">
                        Bạn
                      </span>
                    )}
                  </p>
                </div>

                {/* Score */}
                <div className="text-right">
                  <p className="font-bold text-primary-900 text-lg">
                    {formatNumber(player.score)}
                  </p>
                  <p className="text-xs text-gray-500">điểm</p>
                </div>
              </motion.div>
            ))}

            {leaderboard.length === 0 && (
              <p className="text-center text-gray-400 py-8">
                Chưa có dữ liệu...
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex space-x-4 mt-6">
            <button
              onClick={onPlayAgain}
              className="flex-1 btn-secondary flex items-center justify-center space-x-2"
            >
              <HiRefresh className="w-5 h-5" />
              <span>Chơi lại</span>
            </button>
            <a
              href="/"
              className="flex-1 btn-primary flex items-center justify-center space-x-2"
            >
              <HiHome className="w-5 h-5" />
              <span>Trang chủ</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default QuizPage

