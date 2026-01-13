// Quiz Context - Quản lý state toàn cục cho Quiz
// Sử dụng React Context API

import { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import { subscribeToRoom } from '../services/quizService'

// Tạo context
const QuizContext = createContext(null)

// Initial state - State ban đầu
const initialState = {
  roomCode: null,
  playerId: null,
  playerName: '',
  isHost: false,
  roomData: null,
  currentQuestion: 0,
  selectedAnswer: null,
  isAnswered: false,
  timeRemaining: 10,
  showResults: false,
  error: null,
  loading: false
}

// Action types - Các loại action
const ACTIONS = {
  SET_ROOM: 'SET_ROOM',
  SET_PLAYER: 'SET_PLAYER',
  UPDATE_ROOM_DATA: 'UPDATE_ROOM_DATA',
  SELECT_ANSWER: 'SELECT_ANSWER',
  SET_TIME_REMAINING: 'SET_TIME_REMAINING',
  SHOW_RESULTS: 'SHOW_RESULTS',
  NEXT_QUESTION: 'NEXT_QUESTION',
  SET_ERROR: 'SET_ERROR',
  SET_LOADING: 'SET_LOADING',
  RESET: 'RESET'
}

// Reducer - Xử lý các action
const quizReducer = (state, action) => {
  switch (action.type) {
    // Đặt thông tin phòng
    case ACTIONS.SET_ROOM:
      return {
        ...state,
        roomCode: action.payload.roomCode,
        isHost: action.payload.isHost
      }
    
    // Đặt thông tin người chơi
    case ACTIONS.SET_PLAYER:
      return {
        ...state,
        playerId: action.payload.playerId,
        playerName: action.payload.playerName
      }
    
    // Cập nhật dữ liệu phòng từ Firebase
    case ACTIONS.UPDATE_ROOM_DATA:
      return {
        ...state,
        roomData: action.payload,
        currentQuestion: action.payload?.currentQuestion || 0
      }
    
    // Chọn đáp án
    case ACTIONS.SELECT_ANSWER:
      return {
        ...state,
        selectedAnswer: action.payload,
        isAnswered: true
      }
    
    // Cập nhật thời gian còn lại
    case ACTIONS.SET_TIME_REMAINING:
      return {
        ...state,
        timeRemaining: action.payload
      }
    
    // Hiển thị kết quả
    case ACTIONS.SHOW_RESULTS:
      return {
        ...state,
        showResults: action.payload
      }
    
    // Chuyển câu hỏi tiếp theo
    case ACTIONS.NEXT_QUESTION:
      return {
        ...state,
        currentQuestion: action.payload,
        selectedAnswer: null,
        isAnswered: false,
        timeRemaining: 10,
        showResults: false
      }
    
    // Đặt lỗi
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    
    // Đặt trạng thái loading
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    
    // Reset state
    case ACTIONS.RESET:
      return initialState
    
    default:
      return state
  }
}

// Provider component
export const QuizProvider = ({ children }) => {
  // Khởi tạo reducer
  const [state, dispatch] = useReducer(quizReducer, initialState)

  // Subscribe to room changes - Lắng nghe thay đổi phòng
  useEffect(() => {
    if (!state.roomCode) return

    // Đăng ký lắng nghe thay đổi từ Firebase
    const unsubscribe = subscribeToRoom(state.roomCode, (data) => {
      if (data) {
        dispatch({ type: ACTIONS.UPDATE_ROOM_DATA, payload: data })
      } else {
        // Phòng đã bị xóa
        dispatch({ type: ACTIONS.SET_ERROR, payload: 'Phòng đã bị đóng!' })
      }
    })

    // Cleanup khi unmount
    return () => unsubscribe()
  }, [state.roomCode])

  // Actions - Các hàm action
  const setRoom = useCallback((roomCode, isHost = false) => {
    dispatch({ type: ACTIONS.SET_ROOM, payload: { roomCode, isHost } })
  }, [])

  const setPlayer = useCallback((playerId, playerName) => {
    dispatch({ type: ACTIONS.SET_PLAYER, payload: { playerId, playerName } })
  }, [])

  const selectAnswer = useCallback((answerIndex) => {
    dispatch({ type: ACTIONS.SELECT_ANSWER, payload: answerIndex })
  }, [])

  const setTimeRemaining = useCallback((time) => {
    dispatch({ type: ACTIONS.SET_TIME_REMAINING, payload: time })
  }, [])

  const showResults = useCallback((show) => {
    dispatch({ type: ACTIONS.SHOW_RESULTS, payload: show })
  }, [])

  const nextQuestion = useCallback((questionIndex) => {
    dispatch({ type: ACTIONS.NEXT_QUESTION, payload: questionIndex })
  }, [])

  const setError = useCallback((error) => {
    dispatch({ type: ACTIONS.SET_ERROR, payload: error })
  }, [])

  const setLoading = useCallback((loading) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: loading })
  }, [])

  const reset = useCallback(() => {
    dispatch({ type: ACTIONS.RESET })
  }, [])

  // Context value
  const value = {
    ...state,
    setRoom,
    setPlayer,
    selectAnswer,
    setTimeRemaining,
    showResults,
    nextQuestion,
    setError,
    setLoading,
    reset
  }

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  )
}

// Custom hook để sử dụng QuizContext
export const useQuiz = () => {
  const context = useContext(QuizContext)
  if (!context) {
    throw new Error('useQuiz phải được sử dụng trong QuizProvider')
  }
  return context
}

export default QuizContext

