// Storage Service - Quản lý lưu trữ local
// Sử dụng LocalStorage cho dữ liệu cá nhân

// Lưu dữ liệu vào LocalStorage
export const saveToStorage = (key, data) => {
  try {
    const serializedData = JSON.stringify(data)
    localStorage.setItem(key, serializedData)
    return true
  } catch (error) {
    console.error('Error saving to localStorage:', error)
    return false
  }
}

// Lấy dữ liệu từ LocalStorage
export const getFromStorage = (key, defaultValue = null) => {
  try {
    const serializedData = localStorage.getItem(key)
    if (serializedData === null) {
      return defaultValue
    }
    return JSON.parse(serializedData)
  } catch (error) {
    console.error('Error reading from localStorage:', error)
    return defaultValue
  }
}

// Xóa dữ liệu từ LocalStorage
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error('Error removing from localStorage:', error)
    return false
  }
}

// Lưu tiến độ học tập
export const saveLearningProgress = (progress) => {
  const existing = getFromStorage('learningProgress', {
    completedSections: [],
    lastVisited: null,
    quizScores: []
  })
  
  const updated = { ...existing, ...progress, updatedAt: Date.now() }
  return saveToStorage('learningProgress', updated)
}

// Lấy tiến độ học tập
export const getLearningProgress = () => {
  return getFromStorage('learningProgress', {
    completedSections: [],
    lastVisited: null,
    quizScores: []
  })
}

// Lưu lịch sử quiz
export const saveQuizHistory = (quizResult) => {
  const history = getFromStorage('quizHistory', [])
  history.push({
    ...quizResult,
    playedAt: Date.now()
  })
  
  // Giữ tối đa 50 lần chơi gần nhất
  if (history.length > 50) {
    history.shift()
  }
  
  return saveToStorage('quizHistory', history)
}

// Lấy lịch sử quiz
export const getQuizHistory = () => {
  return getFromStorage('quizHistory', [])
}

// Lưu lịch sử game
export const saveGameHistory = (gameResult) => {
  const history = getFromStorage('gameHistory', [])
  history.push({
    ...gameResult,
    playedAt: Date.now()
  })
  
  // Giữ tối đa 50 lần chơi gần nhất
  if (history.length > 50) {
    history.shift()
  }
  
  return saveToStorage('gameHistory', history)
}

// Lấy lịch sử game
export const getGameHistory = () => {
  return getFromStorage('gameHistory', [])
}

// Lưu tên người chơi
export const savePlayerName = (name) => {
  return saveToStorage('playerName', name)
}

// Lấy tên người chơi
export const getPlayerName = () => {
  return getFromStorage('playerName', '')
}

// Xóa toàn bộ dữ liệu
export const clearAllData = () => {
  const keys = ['learningProgress', 'quizHistory', 'gameHistory', 'playerName']
  keys.forEach(key => removeFromStorage(key))
}

