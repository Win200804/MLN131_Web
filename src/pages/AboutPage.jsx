// AboutPage - Trang giới thiệu dự án
import { motion } from 'framer-motion'
import { HiAcademicCap, HiCode, HiLightBulb, HiUsers, HiHeart, HiExternalLink, HiChat } from 'react-icons/hi'

const AboutPage = () => {
  // Các tính năng chính
  const features = [
    {
      icon: HiAcademicCap,
      title: 'Nội dung Học thuật',
      description: 'Biên soạn từ giáo trình Chủ nghĩa xã hội khoa học, trình bày theo cấu trúc dễ hiểu và sinh động.'
    },
    {
      icon: HiLightBulb,
      title: 'Quiz Tương tác',
      description: 'Hệ thống quiz multiplayer theo phong cách Kahoot, hỗ trợ tối đa 40 người chơi cùng lúc.'
    },
    {
      icon: HiCode,
      title: 'Mini Games',
      description: 'Hai trò chơi học tập: Điền từ còn thiếu và Sắp xếp Timeline sự kiện lịch sử.'
    },
    {
      icon: HiChat,
      title: 'AI Chatbox',
      description: 'Tính năng hỏi đáp AI (đang phát triển) giúp giải đáp thắc mắc về nội dung bài học.'
    }
  ]

  // Công nghệ sử dụng
  const technologies = [
    { name: 'React 18', description: 'UI Library' },
    { name: 'Vite', description: 'Build Tool' },
    { name: 'Tailwind CSS', description: 'Styling' },
    { name: 'Firebase', description: 'Realtime Database' },
    { name: 'Framer Motion', description: 'Animations' },
    { name: 'React Router', description: 'Routing' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <HiAcademicCap className="w-5 h-5" />
              <span className="text-sm font-medium">Sản phẩm Sáng tạo</span>
            </div>
            
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Về dự án <span className="text-accent-gold">Công nhân 4.0</span>
            </h1>
            
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Website học tập tương tác về Chủ nghĩa xã hội khoa học, 
              tập trung vào chủ đề "Giai cấp công nhân: Thách thức và Cơ hội trong kỷ nguyên 4.0"
            </p>

            {/* 3 Tiêu chí */}
            <div className="flex flex-wrap justify-center gap-4">
              {['Mới lạ', 'Lợi ích', 'Tương tác'].map((criteria, i) => (
                <span
                  key={i}
                  className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl font-medium"
                >
                  ✓ {criteria}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mô tả dự án */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="section-title text-center">Giới thiệu Dự án</h2>
          <div className="max-w-4xl mx-auto">
            <div className="card">
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Công nhân 4.0</strong> là sản phẩm sáng tạo cho môn học 
                <strong> Chủ nghĩa xã hội khoa học (MLN131)</strong>. Dự án được xây dựng 
                với mục tiêu giúp sinh viên tiếp cận nội dung học thuật một cách sinh động, 
                tương tác và hiệu quả.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Nội dung chính tập trung vào <strong className="text-primary-900">
                "Thách thức và Cơ hội của giai cấp công nhân trong kỷ nguyên Cách mạng Công nghiệp 4.0"
                </strong> - một chủ đề mang tính thời sự cao, giúp sinh viên hiểu rõ 
                vai trò và sứ mệnh của giai cấp công nhân trong bối cảnh hiện đại.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Tính năng */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="section-title text-center">Tính năng Chính</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card text-center"
              >
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-primary-900" />
                </div>
                <h3 className="font-heading font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default AboutPage

