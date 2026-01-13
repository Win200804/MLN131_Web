// Constants - Các hằng số sử dụng trong ứng dụng

// Quiz settings - Cài đặt quiz
export const QUIZ_SETTINGS = {
  MAX_PLAYERS: 40,              // Tối đa 40 người chơi
  TIME_PER_QUESTION: 10,        // 10 giây mỗi câu
  TOTAL_QUESTIONS: 20,          // 20 câu hỏi
  BASE_SCORE: 1000,             // Điểm cơ bản
  MAX_TIME_BONUS: 500,          // Điểm thưởng thời gian tối đa
  ROOM_CODE_LENGTH: 6           // Độ dài mã phòng
}

// Section IDs - ID các phần nội dung
export const SECTION_IDS = {
  SECTION_1: 'quan-diem-co-ban',
  SECTION_2: 'thach-thuc-co-hoi',
  SECTION_3: 'su-menh-viet-nam'
}

// Section titles - Tiêu đề các phần
export const SECTION_TITLES = {
  [SECTION_IDS.SECTION_1]: 'Quan điểm cơ bản của Chủ nghĩa Mác-Lênin',
  [SECTION_IDS.SECTION_2]: 'Thách thức và Cơ hội của Công nhân 4.0',
  [SECTION_IDS.SECTION_3]: 'Sứ mệnh lịch sử tại Việt Nam'
}

// Game types - Loại mini games
export const GAME_TYPES = {
  FILL_BLANK: 'fill-blank',     // Điền từ còn thiếu
  TIMELINE: 'timeline'           // Sắp xếp timeline
}

// Quiz room status - Trạng thái phòng quiz
export const ROOM_STATUS = {
  WAITING: 'waiting',
  PLAYING: 'playing',
  FINISHED: 'finished'
}

// Animation variants - Cấu hình animation
export const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  },
  slideUp: {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  },
  staggerItem: {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }
}

// Colors - Màu sắc (để sử dụng trong JS)
export const COLORS = {
  primary: '#1a365d',
  secondary: '#2c5282',
  accentRed: '#c53030',
  accentGold: '#d69e2e',
  background: '#f7fafc',
  text: '#1a202c'
}

// Breakpoints - Điểm ngắt responsive
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280
}

