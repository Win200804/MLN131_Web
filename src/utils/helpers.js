// Helpers - Các hàm tiện ích

// Format số với dấu phẩy ngăn cách hàng nghìn
export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// Format thời gian từ giây sang mm:ss
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// Tạo ID ngẫu nhiên
export const generateId = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// Shuffle mảng (Fisher-Yates algorithm)
export const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Truncate text với ellipsis
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

// Debounce function
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Capitalize first letter
export const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Tính thứ hạng với suffix (1st, 2nd, 3rd, 4th...)
export const getOrdinalSuffix = (num) => {
  const j = num % 10
  const k = num % 100
  if (j === 1 && k !== 11) return num + 'st'
  if (j === 2 && k !== 12) return num + 'nd'
  if (j === 3 && k !== 13) return num + 'rd'
  return num + 'th'
}

// Tính thứ hạng tiếng Việt
export const getRankVietnamese = (rank) => {
  if (rank === 1) return 'Hạng Nhất'
  if (rank === 2) return 'Hạng Nhì'
  if (rank === 3) return 'Hạng Ba'
  return `Hạng ${rank}`
}

// Validate room code
export const isValidRoomCode = (code) => {
  return /^[A-Z0-9]{6}$/.test(code.toUpperCase())
}

// Copy to clipboard
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Failed to copy:', err)
    return false
  }
}

// Local storage với error handling
export const safeLocalStorage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch {
      return false
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key)
      return true
    } catch {
      return false
    }
  }
}

// Scroll to element
export const scrollToElement = (elementId, offset = 80) => {
  const element = document.getElementById(elementId)
  if (element) {
    const top = element.getBoundingClientRect().top + window.pageYOffset - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

// Check if device is mobile
export const isMobile = () => {
  return window.innerWidth < 768
}

