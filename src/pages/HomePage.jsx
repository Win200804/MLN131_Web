// HomePage - Trang chủ của ứng dụng
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiBookOpen, HiLightningBolt, HiPuzzle, HiChevronRight, HiAcademicCap, HiUserGroup, HiGlobe } from 'react-icons/hi'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
}

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1 }
}

const HomePage = () => {
  // Các tính năng chính
  const features = [
    {
      icon: HiBookOpen,
      title: 'Nội dung Bài giảng',
      description: 'Khám phá quan điểm Mác-Lênin về giai cấp công nhân và sứ mệnh lịch sử trong kỷ nguyên 4.0',
      link: '/content',
      color: 'bg-blue-500'
    },
    {
      icon: HiLightningBolt,
      title: 'Quiz Tương tác',
      description: 'Kiểm tra kiến thức với Quiz multiplayer theo phong cách Kahoot - Chơi cùng bạn bè!',
      link: '/quiz',
      color: 'bg-orange-500'
    },
    {
      icon: HiPuzzle,
      title: 'Mini Games',
      description: 'Học qua trò chơi: Điền từ còn thiếu, Sắp xếp Timeline sự kiện lịch sử',
      link: '/games',
      color: 'bg-green-500'
    }
  ]

  // Các điểm nhấn về nội dung
  const highlights = [
    {
      icon: HiAcademicCap,
      title: 'Lý luận Mác-Lênin',
      description: 'Nền tảng khoa học về giai cấp công nhân'
    },
    {
      icon: HiUserGroup,
      title: 'Công nhân 4.0',
      description: 'Thách thức và cơ hội trong kỷ nguyên số'
    },
    {
      icon: HiGlobe,
      title: 'Sứ mệnh Việt Nam',
      description: 'Giai cấp công nhân Việt Nam hiện đại'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-500 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-accent-gold rounded-full animate-pulse"></span>
              <span className="text-sm font-medium">Chủ nghĩa Xã hội Khoa học - MLN131</span>
            </div>

            {/* Main Title */}
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              Công nhân <span className="text-accent-gold">4.0</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-200 mb-4">
              Thách thức & Cơ hội
            </p>
            
            {/* Description */}
            <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-10">
              Khám phá sứ mệnh lịch sử của giai cấp công nhân trong kỷ nguyên Cách mạng Công nghiệp lần thứ Tư. 
              Học tập, kiểm tra kiến thức và tương tác qua các trò chơi thú vị.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/content"
                className="group flex items-center space-x-2 bg-white text-primary-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
              >
                <span>Bắt đầu Học</span>
                <HiChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/quiz"
                className="flex items-center space-x-2 border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all"
              >
                <HiLightningBolt className="w-5 h-5" />
                <span>Chơi Quiz</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Khám phá <span className="text-primary-900">Nội dung</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ba cách học tập tương tác giúp bạn hiểu sâu về chủ nghĩa xã hội khoa học
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
              >
                <Link to={feature.link}>
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full">
                    {/* Icon Header */}
                    <div className={`${feature.color} p-6`}>
                      <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-heading text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-900 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {feature.description}
                      </p>
                      <div className="flex items-center text-primary-900 font-medium">
                        <span>Khám phá ngay</span>
                        <HiChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Key Topic Section */}
      <section className="py-20 bg-gradient-to-r from-accent-red to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Chủ đề Trọng tâm
            </h2>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              <strong>THÁCH THỨC và CƠ HỘI</strong> của giai cấp công nhân trong kỷ nguyên Cách mạng Công nghiệp 4.0
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="font-bold text-xl mb-3">Thách thức</h3>
                <ul className="text-left space-y-2 text-sm">
                  <li>• Tự động hóa thay thế lao động</li>
                  <li>• Khoảng cách kỹ năng ngày càng lớn</li>
                  <li>• Hình thức bóc lột mới, tinh vi</li>
                  <li>• Đấu tranh tư tưởng phức tạp</li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="font-bold text-xl mb-3">Cơ hội</h3>
                <ul className="text-left space-y-2 text-sm">
                  <li>• Tiếp cận công nghệ tiên tiến</li>
                  <li>• Xu hướng trí tuệ hóa - nâng cao giá trị</li>
                  <li>• Kết nối toàn cầu và học hỏi</li>
                  <li>• Ngành nghề mới ra đời</li>
                </ul>
              </div>
            </div>
            <Link
              to="/content/thach-thuc-co-hoi"
              className="inline-flex items-center space-x-2 bg-white text-accent-red px-8 py-4 rounded-xl font-semibold mt-8 hover:bg-gray-100 transition-all"
            >
              <span>Tìm hiểu chi tiết</span>
              <HiChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage

