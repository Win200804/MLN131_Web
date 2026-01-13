// Quiz Questions - 20 câu hỏi trắc nghiệm về Chủ nghĩa xã hội khoa học
// Mỗi câu hỏi có 4 đáp án, đáp án đúng và giải thích

const quizQuestions = [
  {
    id: 1,
    question: "Theo C. Mác và Ph. Ăngghen, giai cấp công nhân là sản phẩm của nền sản xuất nào?",
    options: [
      "Nông nghiệp truyền thống",
      "Đại công nghiệp",
      "Thủ công nghiệp",
      "Dịch vụ thương mại"
    ],
    correctAnswer: 1,
    explanation: "Giai cấp công nhân là con đẻ của nền đại công nghiệp tư bản chủ nghĩa, là giai cấp đại biểu cho lực lượng sản xuất tiên tiến, cho phương thức sản xuất hiện đại."
  },
  {
    id: 2,
    question: "Trong chủ nghĩa tư bản, giai cấp công nhân KHÔNG sở hữu gì?",
    options: [
      "Sức lao động",
      "Kỹ năng nghề nghiệp",
      "Tư liệu sản xuất chủ yếu",
      "Quyền lao động"
    ],
    correctAnswer: 2,
    explanation: "Trong quan hệ sản xuất tư bản chủ nghĩa, giai cấp vô sản là những người mất các tư liệu sản xuất, buộc phải bán sức lao động để sống và bị giai cấp tư sản bóc lột giá trị thặng dư."
  },
  {
    id: 3,
    question: "Đặc điểm nổi bật nhất của giai cấp công nhân là gì?",
    options: [
      "Số lượng đông đảo",
      "Lao động bằng phương thức công nghiệp",
      "Thu nhập thấp",
      "Sống ở thành thị"
    ],
    correctAnswer: 1,
    explanation: "Đặc điểm nổi bật của giai cấp công nhân là lao động bằng phương thức công nghiệp với đặc trưng công cụ lao động là máy móc, tạo ra năng suất lao động cao, quá trình lao động mang tính chất xã hội hóa."
  },
  {
    id: 4,
    question: "Sứ mệnh lịch sử của giai cấp công nhân bao gồm mấy nội dung cơ bản?",
    options: [
      "2 nội dung",
      "3 nội dung",
      "4 nội dung",
      "5 nội dung"
    ],
    correctAnswer: 1,
    explanation: "Sứ mệnh lịch sử của giai cấp công nhân thể hiện trên 3 nội dung cơ bản: kinh tế, chính trị - xã hội, và văn hóa - tư tưởng."
  },
  {
    id: 5,
    question: "Mâu thuẫn cơ bản của phương thức sản xuất tư bản chủ nghĩa là gì?",
    options: [
      "Giữa công nhân và nông dân",
      "Giữa thành thị và nông thôn",
      "Giữa lực lượng sản xuất xã hội hóa và quan hệ sản xuất tư hữu",
      "Giữa các nước tư bản"
    ],
    correctAnswer: 2,
    explanation: "Mâu thuẫn cơ bản của phương thức sản xuất tư bản chủ nghĩa là mâu thuẫn giữa lực lượng sản xuất xã hội hóa ngày càng rộng lớn với quan hệ sản xuất tư bản chủ nghĩa dựa trên chế độ tư hữu tư bản chủ nghĩa về tư liệu sản xuất."
  },
  {
    id: 6,
    question: "Điều kiện chủ quan QUAN TRỌNG NHẤT để giai cấp công nhân thực hiện sứ mệnh lịch sử là gì?",
    options: [
      "Số lượng công nhân đông đảo",
      "Đảng Cộng sản ra đời và lãnh đạo",
      "Sự phát triển của công nghệ",
      "Điều kiện làm việc tốt"
    ],
    correctAnswer: 1,
    explanation: "Đảng Cộng sản là nhân tố chủ quan quan trọng nhất để giai cấp công nhân thực hiện thắng lợi sứ mệnh lịch sử của mình. Đảng là đội tiên phong của giai cấp công nhân."
  },
  {
    id: 7,
    question: "Xu hướng 'trí tuệ hóa' của giai cấp công nhân hiện đại nghĩa là gì?",
    options: [
      "Công nhân trở nên thông minh hơn",
      "Công nhân được đào tạo và sử dụng tri thức cao trong lao động",
      "Công nhân làm việc ít hơn",
      "Công nhân sử dụng máy tính"
    ],
    correctAnswer: 1,
    explanation: "Xu hướng trí tuệ hóa gắn liền với cách mạng khoa học công nghệ hiện đại, kinh tế tri thức. Công nhân hiện đại được đào tạo chuẩn mực, thường xuyên đào tạo lại, hao phí lao động chủ yếu là hao phí trí lực."
  },
  {
    id: 8,
    question: "Giai cấp công nhân Việt Nam ra đời vào thời gian nào?",
    options: [
      "Cuối thế kỷ XVIII",
      "Đầu thế kỷ XIX",
      "Đầu thế kỷ XX",
      "Giữa thế kỷ XX"
    ],
    correctAnswer: 2,
    explanation: "Giai cấp công nhân Việt Nam ra đời vào đầu thế kỷ XX, gắn liền với chính sách khai thác thuộc địa của thực dân Pháp ở Việt Nam."
  },
  {
    id: 9,
    question: "Đặc điểm KHÁC BIỆT của giai cấp công nhân Việt Nam so với công nhân các nước tư bản là gì?",
    options: [
      "Ra đời trước giai cấp tư sản",
      "Số lượng ít hơn",
      "Không có tổ chức công đoàn",
      "Làm việc trong nông nghiệp"
    ],
    correctAnswer: 0,
    explanation: "Giai cấp công nhân Việt Nam ra đời trước giai cấp tư sản, là giai cấp trực tiếp đối kháng với tư bản thực dân Pháp. Đây là đặc điểm khác biệt so với công nhân ở các nước tư bản phát triển."
  },
  {
    id: 10,
    question: "Trong Cách mạng công nghiệp lần thứ tư, giai cấp công nhân đứng trước thách thức nào?",
    options: [
      "Thiếu lương thực",
      "Tự động hóa thay thế lao động thủ công",
      "Không có nơi ở",
      "Bị cấm tổ chức công đoàn"
    ],
    correctAnswer: 1,
    explanation: "Trong Cách mạng công nghiệp 4.0, tự động hóa, trí tuệ nhân tạo, robot đang thay thế nhiều công việc truyền thống, đặt ra thách thức về việc làm và yêu cầu nâng cao kỹ năng cho công nhân."
  },
  {
    id: 11,
    question: "Xu hướng 'trung lưu hóa' của công nhân ở các nước tư bản nghĩa là gì?",
    options: [
      "Công nhân trở thành trung nông",
      "Một bộ phận công nhân có mức sống trung lưu qua cổ phần hóa",
      "Công nhân di cư đến miền Trung",
      "Công nhân làm việc trung bình 8 giờ/ngày"
    ],
    correctAnswer: 1,
    explanation: "Xu hướng trung lưu hóa: một bộ phận công nhân tham gia sở hữu tư liệu sản xuất qua chế độ cổ phần hóa, có mức sống trung lưu. Tuy nhiên, họ vẫn không có quyền quyết định trong sản xuất."
  },
  {
    id: 12,
    question: "Theo Nghị quyết Hội nghị TW6 khóa X, xây dựng giai cấp công nhân Việt Nam cần đảm bảo điều gì?",
    options: [
      "Chỉ phát triển số lượng",
      "Phát triển cả số lượng và chất lượng",
      "Chỉ phát triển ở thành phố",
      "Phát triển riêng biệt với nông dân"
    ],
    correctAnswer: 1,
    explanation: "Xây dựng giai cấp công nhân lớn mạnh, phát triển nhanh về số lượng, nâng cao chất lượng, có cơ cấu đáp ứng yêu cầu phát triển đất nước; ngày càng được trí thức hóa."
  },
  {
    id: 13,
    question: "Liên minh công - nông - trí thức có vai trò gì trong cách mạng xã hội chủ nghĩa?",
    options: [
      "Không quan trọng",
      "Là điều kiện quan trọng để thực hiện sứ mệnh lịch sử của giai cấp công nhân",
      "Chỉ có ý nghĩa trong nông nghiệp",
      "Chỉ áp dụng ở nông thôn"
    ],
    correctAnswer: 1,
    explanation: "Liên minh giai cấp công nhân với giai cấp nông dân và các tầng lớp lao động khác do Đảng Cộng sản lãnh đạo là điều kiện quan trọng không thể thiếu để thực hiện sứ mệnh lịch sử của giai cấp công nhân."
  },
  {
    id: 14,
    question: "Nội dung kinh tế trong sứ mệnh lịch sử của giai cấp công nhân là gì?",
    options: [
      "Tăng lương cho công nhân",
      "Xây dựng lực lượng sản xuất tiên tiến và quan hệ sản xuất mới phù hợp",
      "Chỉ phát triển công nghiệp nặng",
      "Bãi bỏ mọi hình thức sản xuất"
    ],
    correctAnswer: 1,
    explanation: "Về nội dung kinh tế: giai cấp công nhân là nhân tố hàng đầu của lực lượng sản xuất xã hội hóa cao, đại biểu cho quan hệ sản xuất mới, sản xuất ra của cải vật chất đáp ứng nhu cầu xã hội."
  },
  {
    id: 15,
    question: "Tại sao giai cấp công nhân là giai cấp cách mạng triệt để?",
    options: [
      "Vì họ nghèo khổ nhất",
      "Vì họ đại biểu cho lực lượng sản xuất và phương thức sản xuất tiên tiến",
      "Vì họ đông nhất",
      "Vì họ sống ở thành phố"
    ],
    correctAnswer: 1,
    explanation: "Giai cấp công nhân cách mạng triệt để vì họ đại biểu cho lực lượng sản xuất hiện đại, phương thức sản xuất tiên tiến. KHÔNG PHẢI vì nghèo khổ - đó là hậu quả của bóc lột cần được xóa bỏ."
  },
  {
    id: 16,
    question: "Theo Đại hội XIII của Đảng, giai cấp công nhân Việt Nam cần thích ứng với điều gì?",
    options: [
      "Biến đổi khí hậu",
      "Cách mạng công nghiệp lần thứ tư",
      "Nền kinh tế nông nghiệp",
      "Thủ công nghiệp truyền thống"
    ],
    correctAnswer: 1,
    explanation: "Đại hội XIII xác định: Xây dựng giai cấp công nhân hiện đại, lớn mạnh; nâng cao kỹ năng nghề nghiệp, tác phong công nghiệp, kỷ luật lao động thích ứng với cuộc Cách mạng công nghiệp lần thứ tư."
  },
  {
    id: 17,
    question: "CƠ HỘI lớn nhất của giai cấp công nhân trong kỷ nguyên 4.0 là gì?",
    options: [
      "Làm việc ít hơn",
      "Tiếp cận công nghệ mới, nâng cao năng suất và giá trị lao động",
      "Nghỉ hưu sớm",
      "Chuyển sang làm nông nghiệp"
    ],
    correctAnswer: 1,
    explanation: "Cơ hội của công nhân 4.0: tiếp cận và làm chủ công nghệ tiên tiến, nâng cao năng suất lao động, giá trị sản phẩm, có điều kiện phát triển toàn diện về trí tuệ và kỹ năng."
  },
  {
    id: 18,
    question: "Phương thức sản xuất nào sẽ thay thế phương thức sản xuất tư bản chủ nghĩa theo Chủ nghĩa Mác-Lênin?",
    options: [
      "Phương thức sản xuất phong kiến",
      "Phương thức sản xuất cộng sản chủ nghĩa",
      "Phương thức sản xuất nô lệ",
      "Phương thức sản xuất nguyên thủy"
    ],
    correctAnswer: 1,
    explanation: "Giai cấp công nhân có sứ mệnh xác lập phương thức sản xuất cộng sản chủ nghĩa, hình thái kinh tế - xã hội cộng sản chủ nghĩa thay thế phương thức sản xuất tư bản chủ nghĩa."
  },
  {
    id: 19,
    question: "Giai cấp công nhân cần làm gì để bảo vệ nền tảng tư tưởng của Đảng?",
    options: [
      "Không cần làm gì",
      "Đấu tranh chống quan điểm sai trái, xuyên tạc",
      "Chỉ tập trung sản xuất",
      "Rời bỏ Đảng"
    ],
    correctAnswer: 1,
    explanation: "Đấu tranh bảo vệ nền tảng tư tưởng của Đảng, giáo dục nhận thức và củng cố niềm tin khoa học đối với lý tưởng, mục tiêu của chủ nghĩa xã hội là nội dung sứ mệnh của giai cấp công nhân về văn hóa tư tưởng."
  },
  {
    id: 20,
    question: "THÁCH THỨC lớn nhất của giai cấp công nhân Việt Nam hiện nay là gì?",
    options: [
      "Thiếu đất canh tác",
      "Tâm lý tiểu nông và yêu cầu nâng cao trình độ trong kỷ nguyên số",
      "Không có tổ chức công đoàn",
      "Bị cấm làm việc"
    ],
    correctAnswer: 1,
    explanation: "Thách thức của công nhân Việt Nam: khắc phục tâm lý tiểu nông, thói quen lạc hậu từ xã hội nông nghiệp, đồng thời nâng cao trình độ để đáp ứng yêu cầu của Cách mạng công nghiệp 4.0."
  }
]

export default quizQuestions

