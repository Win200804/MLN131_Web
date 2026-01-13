// Quiz Service - Quản lý logic Quiz multiplayer với Firebase
// Hỗ trợ tối đa 40 người chơi trong một phòng

import { database, ref, set, get, push, onValue, update, remove, off, isFirebaseConfigured } from './firebase'

// Tạo mã phòng ngẫu nhiên 6 ký tự
const generateRoomCode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

// Check Firebase có sẵn sàng không
const checkFirebase = () => {
  if (!database) {
    throw new Error('Firebase chưa được cấu hình. Vui lòng xem hướng dẫn trong file README.md')
  }
}

// Tạo phòng quiz mới
// hostId: Firebase UID của host (để phân quyền)
export const createQuizRoom = async (hostName, quizSettings = {}, hostId = null) => {
  checkFirebase()
  
  const roomCode = generateRoomCode()
  const roomRef = ref(database, `rooms/${roomCode}`)
  
  // Kiểm tra xem mã phòng đã tồn tại chưa
  const snapshot = await get(roomRef)
  if (snapshot.exists()) {
    // Nếu đã tồn tại, tạo lại mã mới
    return createQuizRoom(hostName, quizSettings, hostId)
  }
  
  // Dữ liệu phòng mới
  const roomData = {
    code: roomCode,
    host: hostName,
    hostId: hostId, // Firebase UID của host - dùng để phân quyền
    status: 'waiting', // waiting, playing, finished
    currentQuestion: 0,
    maxPlayers: 40, // Tối đa 40 người chơi
    players: {},
    settings: {
      timePerQuestion: quizSettings.timePerQuestion || 10,
      totalQuestions: quizSettings.totalQuestions || 20,
      showExplanation: quizSettings.showExplanation !== false
    },
    createdAt: Date.now()
  }
  
  // Lưu phòng vào Firebase
  await set(roomRef, roomData)
  
  return roomCode
}

// Tham gia phòng quiz
export const joinQuizRoom = async (roomCode, playerName) => {
  checkFirebase()
  
  const roomRef = ref(database, `rooms/${roomCode}`)
  const snapshot = await get(roomRef)
  
  // Kiểm tra phòng có tồn tại không
  if (!snapshot.exists()) {
    throw new Error('Phòng không tồn tại!')
  }
  
  const roomData = snapshot.val()
  
  // Kiểm tra trạng thái phòng
  if (roomData.status !== 'waiting') {
    throw new Error('Phòng đã bắt đầu hoặc kết thúc!')
  }
  
  // Kiểm tra số lượng người chơi
  const currentPlayers = roomData.players ? Object.keys(roomData.players).length : 0
  if (currentPlayers >= roomData.maxPlayers) {
    throw new Error('Phòng đã đầy (tối đa 40 người)!')
  }
  
  // Kiểm tra tên trùng lặp
  if (roomData.players) {
    const existingNames = Object.values(roomData.players).map(p => p.name.toLowerCase())
    if (existingNames.includes(playerName.toLowerCase())) {
      throw new Error('Tên này đã được sử dụng trong phòng!')
    }
  }
  
  // Tạo player ID mới
  const playerRef = push(ref(database, `rooms/${roomCode}/players`))
  const playerId = playerRef.key
  
  // Dữ liệu người chơi
  const playerData = {
    name: playerName,
    score: 0,
    answers: {},
    joinedAt: Date.now()
  }
  
  // Lưu người chơi vào phòng
  await set(playerRef, playerData)
  
  return { playerId, roomData }
}

// Rời phòng quiz
export const leaveQuizRoom = async (roomCode, playerId) => {
  checkFirebase()
  const playerRef = ref(database, `rooms/${roomCode}/players/${playerId}`)
  await remove(playerRef)
}

// Bắt đầu quiz (chỉ host)
export const startQuiz = async (roomCode) => {
  checkFirebase()
  const roomRef = ref(database, `rooms/${roomCode}`)
  await update(roomRef, {
    status: 'playing',
    currentQuestion: 0,
    questionStartTime: Date.now()
  })
}

// Chuyển câu hỏi tiếp theo
export const nextQuestion = async (roomCode, questionIndex) => {
  checkFirebase()
  const roomRef = ref(database, `rooms/${roomCode}`)
  await update(roomRef, {
    currentQuestion: questionIndex,
    questionStartTime: Date.now()
  })
}

// Gửi câu trả lời
export const submitAnswer = async (roomCode, playerId, questionIndex, answerIndex, timeRemaining) => {
  checkFirebase()
  const answerRef = ref(database, `rooms/${roomCode}/players/${playerId}/answers/${questionIndex}`)
  
  // Tính điểm dựa trên thời gian trả lời
  // Điểm cơ bản: 1000, bonus thời gian: tối đa 500
  const baseScore = 1000
  const timeBonus = Math.floor((timeRemaining / 10) * 500)
  
  await set(answerRef, {
    answer: answerIndex,
    timeRemaining: timeRemaining,
    submittedAt: Date.now()
  })
  
  return { baseScore, timeBonus }
}

// Cập nhật điểm người chơi
export const updatePlayerScore = async (roomCode, playerId, additionalScore) => {
  checkFirebase()
  const playerRef = ref(database, `rooms/${roomCode}/players/${playerId}`)
  const snapshot = await get(playerRef)
  
  if (snapshot.exists()) {
    const currentScore = snapshot.val().score || 0
    await update(playerRef, {
      score: currentScore + additionalScore
    })
  }
}

// Kết thúc quiz
export const finishQuiz = async (roomCode) => {
  checkFirebase()
  const roomRef = ref(database, `rooms/${roomCode}`)
  await update(roomRef, {
    status: 'finished',
    finishedAt: Date.now()
  })
}

// Xóa phòng
export const deleteRoom = async (roomCode) => {
  checkFirebase()
  const roomRef = ref(database, `rooms/${roomCode}`)
  await remove(roomRef)
}

// Lắng nghe thay đổi phòng (realtime)
export const subscribeToRoom = (roomCode, callback) => {
  if (!database) {
    console.warn('Firebase chưa được cấu hình')
    return () => {}
  }
  
  const roomRef = ref(database, `rooms/${roomCode}`)
  onValue(roomRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.val())
    } else {
      callback(null)
    }
  })
  
  // Return unsubscribe function
  return () => off(roomRef)
}

// Lấy bảng xếp hạng
export const getLeaderboard = async (roomCode) => {
  checkFirebase()
  const playersRef = ref(database, `rooms/${roomCode}/players`)
  const snapshot = await get(playersRef)
  
  if (!snapshot.exists()) {
    return []
  }
  
  const players = snapshot.val()
  const leaderboard = Object.entries(players)
    .map(([id, data]) => ({
      id,
      name: data.name,
      score: data.score || 0
    }))
    .sort((a, b) => b.score - a.score)
  
  return leaderboard
}

// Export các hàm tiện ích
export { generateRoomCode }
