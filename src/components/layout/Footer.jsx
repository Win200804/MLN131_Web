// Footer Component - Chân trang
import { Link } from 'react-router-dom'
import { HiHeart, HiAcademicCap, HiBookOpen } from 'react-icons/hi'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary-900 text-white">
      {/* Decorative top border - Viền trang trí */}
      <div className="h-1 vietnam-gradient"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Thông tin dự án */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <HiAcademicCap className="w-6 h-6 text-accent-gold" />
              <h3 className="font-heading font-bold text-lg">Công nhân 4.0</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Sản phẩm sáng tạo môn Chủ nghĩa xã hội khoa học.
              Khám phá thách thức và cơ hội của giai cấp công nhân trong kỷ nguyên 4.0.
            </p>
          </div>

          {/* Liên kết nhanh */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4 flex items-center space-x-2">
              <HiBookOpen className="w-5 h-5 text-accent-gold" />
              <span>Liên kết nhanh</span>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/content" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Nội dung bài giảng
                </Link>
              </li>
              <li>
                <Link to="/quiz" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Quiz tương tác
                </Link>
              </li>
              <li>
                <Link to="/games" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Mini Games
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Giới thiệu dự án
                </Link>
              </li>
            </ul>
          </div>

          {/* Thông tin học phần */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Thông tin học phần</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p><strong>Môn học:</strong> Chủ nghĩa xã hội khoa học</p>
              <p><strong>Mã môn:</strong> MLN131</p>
              <p><strong>Chủ đề:</strong> Công nhân 4.0 - Thách thức và Cơ hội</p>
              <p><strong>Học kỳ:</strong> Spring 2026</p>
              <p><strong>Giảng viên:</strong> LamTD8</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <p className="text-gray-400 text-sm flex items-center">
              Made by Group 1 for MLN131 - {currentYear}
            </p>

            {/* Disclaimer */}
            <p className="text-gray-500 text-xs text-center md:text-right max-w-md">
              Nội dung được biên soạn từ giáo trình Chủ nghĩa xã hội khoa học.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

