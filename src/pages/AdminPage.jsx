// AdminPage.jsx - Trang Admin quản lý phòng Quiz
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  HiCog, HiUsers, HiPlay, HiStop, HiTrash, HiRefresh, 
  HiEye, HiArrowLeft, HiStatusOnline, HiClock, HiLogout, HiPlus, HiClipboardCopy, HiCheck
} from 'react-icons/hi'
import { useAuth } from '../context/AuthContext'
import { database, ref, onValue, update, remove, off } from '../services/firebase'
import { createQuizRoom } from '../services/quizService'
import quizQuestions from '../data/quizQuestions'
import { QUIZ_SETTINGS } from '../utils/constants'

const AdminPage = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [creating, setCreating] = useState(false)
  const [newRoomCode, setNewRoomCode] = useState(null)
  const [copied, setCopied] = useState(false)
  const [firebaseError, setFirebaseError] = useState(null)

  // Redirect nếu chưa đăng nhập
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/admin' } } })
    }
  }, [isAuthenticated, navigate])

  // Lắng nghe danh sách TẤT CẢ phòng (Admin thấy hết)
  useEffect(() => {
    console.log('AdminPage: useEffect triggered, database:', !!database)
    
    if (!database) {
      console.log('AdminPage: No database, setting loading false')
      setLoading(false)
      return
    }

    setLoading(true)
    const roomsRef = ref(database, 'rooms')
    console.log('AdminPage: Subscribing to rooms...')
    
    const unsubscribe = onValue(roomsRef, (snapshot) => {
      console.log('AdminPage: onValue callback triggered')
      const data = snapshot.val()
      console.log('AdminPage: Raw data from Firebase:', data)
      
      if (data) {
        // Admin thấy TẤT CẢ phòng
        const allRooms = Object.entries(data)
          .map(([code, room]) => ({
            code,
            ...room,
            playerCount: room.players ? Object.keys(room.players).length : 0
          }))
          .sort((a, b) => b.createdAt - a.createdAt)
        
        console.log('AdminPage: Processed rooms:', allRooms)
        setRooms(allRooms)
      } else {
        console.log('AdminPage: No rooms data')
        setRooms([])
      }
      setLoading(false)
    }, (error) => {
      console.error('AdminPage: Firebase error:', error)
      setFirebaseError(error.message)
      setLoading(false)
    })

    return () => {
      console.log('AdminPage: Cleanup - unsubscribing')
      unsubscribe()
    }
  }, [])

  // Bắt đầu quiz
  const handleStartQuiz = async (roomCode) => {
    try {
      const roomRef = ref(database, `rooms/${roomCode}`)
      await update(roomRef, { 
        status: 'playing',
        currentQuestion: 0,
        startedAt: Date.now()
      })
    } catch (error) {
      console.error('Error starting quiz:', error)
    }
  }

  // Kết thúc quiz
  const handleEndQuiz = async (roomCode) => {
    try {
      const roomRef = ref(database, `rooms/${roomCode}`)
      await update(roomRef, { 
        status: 'finished',
        endedAt: Date.now()
      })
    } catch (error) {
      console.error('Error ending quiz:', error)
    }
  }

  // Xóa phòng
  const handleDeleteRoom = async (roomCode) => {
    try {
      const roomRef = ref(database, `rooms/${roomCode}`)
      await remove(roomRef)
      setShowDeleteConfirm(null)
      if (selectedRoom?.code === roomCode) {
        setSelectedRoom(null)
      }
    } catch (error) {
      console.error('Error deleting room:', error)
    }
  }

  // Đăng xuất
  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  // Tạo phòng mới
  const handleCreateRoom = async () => {
    if (!user?.uid) return
    
    setCreating(true)
    try {
      const roomCode = await createQuizRoom(
        user.displayName,
        {
          timePerQuestion: QUIZ_SETTINGS.TIME_PER_QUESTION,
          totalQuestions: quizQuestions.length
        },
        user.uid
      )
      setNewRoomCode(roomCode)
    } catch (error) {
      console.error('Error creating room:', error)
      alert('Không thể tạo phòng. Vui lòng thử lại.')
    }
    setCreating(false)
  }

  // Copy mã phòng
  const handleCopyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // Format thời gian
  const formatTime = (timestamp) => {
    if (!timestamp) return 'N/A'
    const date = new Date(timestamp)
    return date.toLocaleString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit'
    })
  }

  // Status badge
  const getStatusBadge = (status) => {
    const badges = {
      waiting: { text: 'Đang chờ', class: 'bg-yellow-100 text-yellow-800' },
      playing: { text: 'Đang chơi', class: 'bg-green-100 text-green-800' },
      finished: { text: 'Đã kết thúc', class: 'bg-gray-100 text-gray-800' }
    }
    const badge = badges[status] || badges.waiting
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.class}`}>
        {badge.text}
      </span>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-900 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/quiz')}
                className="text-white/70 hover:text-white transition-colors"
              >
                <HiArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="font-heading text-2xl font-bold flex items-center">
                  <HiCog className="w-7 h-7 mr-3" />
                  Quản lý phòng Quiz
                </h1>
                <p className="text-white/70 text-sm mt-1">
                  Xin chào, {user?.displayName}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn-secondary text-sm py-2 flex items-center"
              >
                <HiPlus className="w-5 h-5 mr-2" />
                Tạo phòng mới
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center text-white/70 hover:text-white transition-colors"
              >
                <HiLogout className="w-5 h-5 mr-2" />
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Room List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="font-heading text-lg font-bold text-gray-900">
                  Danh sách phòng ({rooms.length})
                </h2>
                <button
                  onClick={() => setLoading(true)}
                  className="text-gray-400 hover:text-gray-600"
                  title="Làm mới"
                >
                  <HiRefresh className="w-5 h-5" />
                </button>
              </div>

              {firebaseError ? (
                <div className="p-8 text-center">
                  <div className="text-red-500 mb-4">
                    <HiStop className="w-12 h-12 mx-auto mb-2" />
                    <p className="font-medium">Lỗi kết nối Firebase</p>
                    <p className="text-sm text-gray-500 mt-2">{firebaseError}</p>
                  </div>
                  <button
                    onClick={() => window.location.reload()}
                    className="text-primary-600 hover:text-primary-700 text-sm"
                  >
                    Tải lại trang
                  </button>
                </div>
              ) : loading ? (
                <div className="p-8 text-center">
                  <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-gray-500 text-sm mt-2">Đang tải danh sách phòng...</p>
                </div>
              ) : rooms.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <HiUsers className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>Bạn chưa có phòng nào</p>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="mt-4 text-primary-600 hover:text-primary-700 font-medium text-sm"
                  >
                    Tạo phòng đầu tiên →
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {rooms.map((room) => (
                    <motion.div
                      key={room.code}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                        selectedRoom?.code === room.code ? 'bg-primary-50' : ''
                      }`}
                      onClick={() => setSelectedRoom(room)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-primary-100 text-primary-900 px-3 py-2 rounded-lg font-mono font-bold">
                            {room.code}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              {getStatusBadge(room.status)}
                              <span className="text-sm text-gray-500 flex items-center">
                                <HiUsers className="w-4 h-4 mr-1" />
                                {room.playerCount} người chơi
                              </span>
                            </div>
                            <p className="text-xs text-gray-400 mt-1 flex items-center">
                              <HiClock className="w-3 h-3 mr-1" />
                              {formatTime(room.createdAt)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          {room.status === 'waiting' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleStartQuiz(room.code)
                              }}
                              className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                              title="Bắt đầu"
                            >
                              <HiPlay className="w-5 h-5" />
                            </button>
                          )}
                          {room.status === 'playing' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEndQuiz(room.code)
                              }}
                              className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                              title="Kết thúc"
                            >
                              <HiStop className="w-5 h-5" />
                            </button>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setShowDeleteConfirm(room.code)
                            }}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Xóa"
                          >
                            <HiTrash className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Room Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm sticky top-8">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="font-heading text-lg font-bold text-gray-900">
                  Chi tiết phòng
                </h2>
              </div>

              {selectedRoom ? (
                <div className="p-6">
                  {/* Room Code */}
                  <div className="text-center mb-6">
                    <p className="text-sm text-gray-500 mb-2">Mã phòng</p>
                    <div className="bg-primary-100 text-primary-900 text-3xl font-mono font-bold px-6 py-3 rounded-xl">
                      {selectedRoom.code}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-500">Trạng thái</span>
                      {getStatusBadge(selectedRoom.status)}
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-500">Số người chơi</span>
                      <span className="font-medium">{selectedRoom.playerCount}/40</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-500">Câu hỏi hiện tại</span>
                      <span className="font-medium">
                        {selectedRoom.currentQuestion !== undefined 
                          ? `${selectedRoom.currentQuestion + 1}/20` 
                          : 'Chưa bắt đầu'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-500">Tạo lúc</span>
                      <span className="font-medium">{formatTime(selectedRoom.createdAt)}</span>
                    </div>
                  </div>

                  {/* Players List */}
                  {selectedRoom.players && (
                    <div className="mt-6">
                      <h3 className="text-sm font-medium text-gray-700 mb-3">Người chơi</h3>
                      <div className="max-h-40 overflow-y-auto space-y-2">
                        {Object.values(selectedRoom.players).map((player, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                            <span className="text-sm">{player.name}</span>
                            <span className="text-xs text-gray-500">{player.score || 0} điểm</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-6 space-y-3">
                    <button
                      onClick={() => navigate(`/quiz/${selectedRoom.code}`)}
                      className="w-full btn-primary flex items-center justify-center"
                    >
                      <HiEye className="w-5 h-5 mr-2" />
                      Xem phòng
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500">
                  <HiStatusOnline className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>Chọn một phòng để xem chi tiết</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">
                Xác nhận xóa phòng
              </h3>
              <p className="text-gray-600 mb-6">
                Bạn có chắc muốn xóa phòng <strong>{showDeleteConfirm}</strong>? 
                Hành động này không thể hoàn tác.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 btn-secondary"
                >
                  Hủy
                </button>
                <button
                  onClick={() => handleDeleteRoom(showDeleteConfirm)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Xóa phòng
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Room Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => {
              if (!creating) {
                setShowCreateModal(false)
                setNewRoomCode(null)
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {!newRoomCode ? (
                // Chưa tạo phòng
                <>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <HiPlus className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">
                      Tạo phòng Quiz mới
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Phòng sẽ có {quizQuestions.length} câu hỏi, tối đa 40 người chơi
                    </p>
                  </div>

                  <div className="space-y-4">
                    <button
                      onClick={handleCreateRoom}
                      disabled={creating}
                      className="w-full btn-primary py-4 flex items-center justify-center disabled:opacity-50"
                    >
                      {creating ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Đang tạo...
                        </>
                      ) : (
                        <>
                          <HiPlus className="w-5 h-5 mr-2" />
                          Tạo phòng ngay
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setShowCreateModal(false)}
                      disabled={creating}
                      className="w-full btn-secondary"
                    >
                      Hủy
                    </button>
                  </div>
                </>
              ) : (
                // Đã tạo phòng thành công
                <>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <HiCheck className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">
                      Tạo phòng thành công!
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Chia sẻ mã phòng cho người chơi để họ tham gia
                    </p>
                  </div>

                  {/* Room Code */}
                  <div className="bg-primary-50 rounded-xl p-6 mb-6 text-center">
                    <p className="text-sm text-gray-500 mb-2">Mã phòng</p>
                    <div className="flex items-center justify-center space-x-3">
                      <span className="text-4xl font-mono font-bold text-primary-900 tracking-widest">
                        {newRoomCode}
                      </span>
                      <button
                        onClick={() => handleCopyCode(newRoomCode)}
                        className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                        title="Copy mã phòng"
                      >
                        {copied ? (
                          <HiCheck className="w-5 h-5 text-green-500" />
                        ) : (
                          <HiClipboardCopy className="w-5 h-5 text-gray-500" />
                        )}
                      </button>
                    </div>
                    {copied && (
                      <p className="text-green-600 text-sm mt-2">Đã copy!</p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        setShowCreateModal(false)
                        setNewRoomCode(null)
                      }}
                      className="w-full btn-primary"
                    >
                      Đóng
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AdminPage

