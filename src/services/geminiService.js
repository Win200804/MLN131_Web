// Gemini AI Service - Dịch vụ AI chatbot với Gemini API
// Chỉ trả lời về chủ đề Chủ nghĩa xã hội khoa học, Giai cấp công nhân, Công nhân 4.0

// API key của Gemini - lấy từ biến môi trường .env
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY

// URL endpoint của Gemini API - sử dụng gemini-1.5-flash để tránh lỗi quota
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'

// System prompt để giới hạn chủ đề trả lời
const SYSTEM_PROMPT = `Bạn là trợ lý AI chuyên về môn học "Chủ nghĩa xã hội khoa học" (MLN131).
Bạn CHỈ trả lời các câu hỏi liên quan đến:

1. Quan điểm cơ bản của Chủ nghĩa Mác-Lênin về Giai cấp Công nhân:
   - Khái niệm giai cấp công nhân (phương diện kinh tế-xã hội và chính trị-xã hội)
   - Đặc điểm của giai cấp công nhân
   - Sứ mệnh lịch sử của giai cấp công nhân (nội dung kinh tế, chính trị-xã hội, văn hóa-tư tưởng)
   - Điều kiện thực hiện sứ mệnh lịch sử (khách quan và chủ quan)

2. Thách thức và Cơ hội của Công nhân 4.0:
   - Bối cảnh Cách mạng Công nghiệp 4.0 (AI, IoT, tự động hóa, robot, blockchain...)
   - Những điểm ổn định so với thế kỷ XIX
   - 5 THÁCH THỨC: Tự động hóa thay thế lao động, khoảng cách kỹ năng, tâm lý tiểu nông, hình thức bóc lột mới, đấu tranh tư tưởng
   - 5 CƠ HỘI: Tiếp cận công nghệ, xu hướng trí tuệ hóa, kết nối toàn cầu, ngành nghề mới, tiếng nói được nâng cao
   - Xu hướng biến đổi: trí tuệ hóa, trung lưu hóa, vai trò lãnh đạo

3. Sứ mệnh lịch sử của Giai cấp Công nhân Việt Nam:
   - Đặc điểm lịch sử và hiện đại của giai cấp công nhân Việt Nam
   - Nội dung sứ mệnh lịch sử tại Việt Nam (kinh tế, chính trị-xã hội, văn hóa-tư tưởng)
   - Phương hướng và giải pháp xây dựng giai cấp công nhân theo Đại hội XIII

QUY TẮC:
- Nếu câu hỏi KHÔNG liên quan đến các chủ đề trên, hãy lịch sự từ chối và gợi ý người dùng hỏi về các chủ đề trên.
- Trả lời ngắn gọn, súc tích nhưng đầy đủ thông tin.
- Sử dụng tiếng Việt, ngôn ngữ học thuật nhưng dễ hiểu.
- Khi cần thiết, trích dẫn C. Mác, Ph. Ăngghen, V.I. Lênin hoặc văn kiện Đảng.
- Có thể đưa ra ví dụ thực tiễn từ Việt Nam và thế giới.`

// Lưu lịch sử hội thoại để có context
let conversationHistory = []

// Hàm reset lịch sử hội thoại
export const resetConversation = () => {
  // Reset mảng lịch sử về rỗng
  conversationHistory = []
}

// Hàm gọi Gemini API
export const sendMessageToGemini = async (userMessage) => {
  try {
    // Thêm tin nhắn của user vào lịch sử
    conversationHistory.push({
      role: 'user',
      parts: [{ text: userMessage }]
    })

    // Chuẩn bị nội dung gửi đi với system instruction
    const requestBody = {
      // System instruction để giới hạn chủ đề
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }]
      },
      // Nội dung hội thoại
      contents: conversationHistory,
      // Cấu hình generation
      generationConfig: {
        temperature: 0.7,        // Độ sáng tạo vừa phải
        topK: 40,               // Top K sampling
        topP: 0.95,             // Top P sampling
        maxOutputTokens: 1024,  // Giới hạn độ dài output
      },
      // Cấu hình an toàn
      safetySettings: [
        {
          category: 'HARM_CATEGORY_HARASSMENT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE'
        },
        {
          category: 'HARM_CATEGORY_HATE_SPEECH',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE'
        },
        {
          category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE'
        },
        {
          category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE'
        }
      ]
    }

    // Gọi API Gemini
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })

    // Kiểm tra response
    if (!response.ok) {
      // Lấy thông tin lỗi
      const errorData = await response.json()
      // Log lỗi để debug
      console.error('Gemini API Error:', errorData)
      // Xóa tin nhắn user vừa thêm vào nếu lỗi
      conversationHistory.pop()
      // Throw error
      throw new Error(errorData.error?.message || 'Có lỗi xảy ra khi kết nối với AI')
    }

    // Parse response JSON
    const data = await response.json()

    // Lấy text từ response
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text

    // Kiểm tra có response không
    if (!aiResponse) {
      // Xóa tin nhắn user nếu không có response
      conversationHistory.pop()
      // Throw error
      throw new Error('Không nhận được phản hồi từ AI')
    }

    // Thêm response của AI vào lịch sử
    conversationHistory.push({
      role: 'model',
      parts: [{ text: aiResponse }]
    })

    // Trả về response
    return aiResponse

  } catch (error) {
    // Log lỗi
    console.error('Error calling Gemini API:', error)
    // Throw error để component xử lý
    throw error
  }
}

// Export service
export default {
  sendMessageToGemini,
  resetConversation
}

