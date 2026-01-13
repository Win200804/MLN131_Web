// adminConfig.js - Cấu hình danh sách Admin
// Thêm email của Admin/Giáo viên vào đây

export const ADMIN_EMAILS = ['nguyenhoangnhatan31@gmail.com'
  // ⚠️ THÊM EMAIL CỦA BẠN VÀO ĐÂY ⚠️
  // Ví dụ: 'your-email@gmail.com',
  
  // Danh sách Admin/Giáo viên:
  // (Thay bằng email thật của bạn)
  
]

// Kiểm tra xem email có phải Admin không
export const isAdmin = (email) => {
  if (!email) return false
  return ADMIN_EMAILS.some(
    adminEmail => adminEmail.toLowerCase() === email.toLowerCase()
  )
}

// Hoặc: Tất cả người tạo phòng đều là admin của phòng đó
// Nếu muốn ai cũng có thể tạo phòng, set này thành true
export const ALLOW_ANYONE_CREATE_ROOM = true

