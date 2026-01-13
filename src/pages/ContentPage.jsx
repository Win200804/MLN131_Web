// ContentPage - Trang nội dung bài giảng
// CHÚ TRỌNG: Phần 2 - Thách thức và Cơ hội của Công nhân 4.0

import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiChevronRight, HiChevronLeft, HiBookOpen, HiLightBulb, HiExclamation, HiCheck, HiStar, HiArrowRight } from 'react-icons/hi'
import contentData from '../data/content'

const ContentPage = () => {
  const { section } = useParams()
  const navigate = useNavigate()
  
  // Danh sách các phần
  const sections = [
    { id: 'quan-diem-co-ban', data: contentData.section1 },
    { id: 'thach-thuc-co-hoi', data: contentData.section2 },
    { id: 'su-menh-viet-nam', data: contentData.section3 }
  ]
  
  // Tìm section hiện tại
  const currentIndex = sections.findIndex(s => s.id === section)
  const currentSection = currentIndex >= 0 ? sections[currentIndex].data : null
  
  // Nếu không có section param, hiển thị overview
  if (!section) {
    return <ContentOverview sections={sections} />
  }
  
  // Nếu section không hợp lệ
  if (!currentSection) {
    return (
      <div className="content-container text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy nội dung</h2>
        <Link to="/content" className="btn-primary">Quay lại danh sách</Link>
      </div>
    )
  }
  
  // Navigation helpers
  const prevSection = currentIndex > 0 ? sections[currentIndex - 1] : null
  const nextSection = currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-primary-900">Trang chủ</Link>
            <HiChevronRight className="w-4 h-4 text-gray-400" />
            <Link to="/content" className="text-gray-500 hover:text-primary-900">Nội dung</Link>
            <HiChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-primary-900 font-medium truncate">{currentSection.title}</span>
          </nav>
        </div>
      </div>

      {/* Section Header */}
      <div className={`bg-gradient-to-r ${
        section === 'thach-thuc-co-hoi' 
          ? 'from-orange-600 to-red-600' 
          : section === 'su-menh-viet-nam'
            ? 'from-red-700 to-red-600'
            : 'from-primary-900 to-secondary-500'
      } text-white py-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-4xl">{currentSection.icon}</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                Phần {currentIndex + 1}/3
              </span>
              {currentSection.highlight && (
                <span className="bg-accent-gold text-primary-900 px-3 py-1 rounded-full text-sm font-bold">
                  TRỌNG TÂM
                </span>
              )}
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">
              {currentSection.title}
            </h1>
            <p className="text-lg text-white/80 max-w-3xl">
              {currentSection.subtitle}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Render section content based on section id */}
        {section === 'quan-diem-co-ban' && <Section1Content data={currentSection} />}
        {section === 'thach-thuc-co-hoi' && <Section2Content data={currentSection} />}
        {section === 'su-menh-viet-nam' && <Section3Content data={currentSection} />}
      </div>

      {/* Navigation Footer */}
      <div className="bg-white border-t py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {prevSection ? (
              <Link
                to={`/content/${prevSection.id}`}
                className="flex items-center space-x-2 text-gray-600 hover:text-primary-900 transition-colors"
              >
                <HiChevronLeft className="w-5 h-5" />
                <div className="text-left">
                  <div className="text-sm text-gray-400">Phần trước</div>
                  <div className="font-medium">{prevSection.data.title}</div>
                </div>
              </Link>
            ) : <div />}
            
            {nextSection ? (
              <Link
                to={`/content/${nextSection.id}`}
                className="flex items-center space-x-2 text-gray-600 hover:text-primary-900 transition-colors"
              >
                <div className="text-right">
                  <div className="text-sm text-gray-400">Phần tiếp theo</div>
                  <div className="font-medium">{nextSection.data.title}</div>
                </div>
                <HiChevronRight className="w-5 h-5" />
              </Link>
            ) : (
              <Link
                to="/quiz"
                className="flex items-center space-x-2 bg-primary-900 text-white px-6 py-3 rounded-lg hover:bg-primary-800 transition-colors"
              >
                <span>Làm Quiz kiểm tra</span>
                <HiArrowRight className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Content Overview - Hiển thị danh sách các phần
const ContentOverview = ({ sections }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-900 to-secondary-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <HiBookOpen className="w-16 h-16 mx-auto mb-4 text-accent-gold" />
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Nội dung Bài giảng
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Chủ nghĩa xã hội khoa học - Giai cấp công nhân và Sứ mệnh lịch sử
            </p>
          </motion.div>
        </div>
      </div>

      {/* Sections Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Link to={`/content/${section.id}`}>
                <div className={`card h-full hover:scale-105 transition-transform ${
                  section.data.highlight ? 'ring-2 ring-orange-500' : ''
                }`}>
                  {section.data.highlight && (
                    <div className="absolute -top-3 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      TRỌNG TÂM
                    </div>
                  )}
                  <div className="text-5xl mb-4">{section.data.icon}</div>
                  <div className="text-sm text-gray-500 mb-2">Phần {index + 1}</div>
                  <h3 className="font-heading text-xl font-bold text-gray-900 mb-3">
                    {section.data.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {section.data.subtitle}
                  </p>
                  <div className="flex items-center text-primary-900 font-medium">
                    <span>Đọc chi tiết</span>
                    <HiChevronRight className="w-5 h-5 ml-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Section 1 Content - Quan điểm cơ bản Mác-Lênin
const Section1Content = ({ data }) => {
  return (
    <div className="space-y-12">
      {/* Khái niệm */}
      <div>
        <h2 className="section-title flex items-center">
          <HiBookOpen className="w-8 h-8 mr-3 text-primary-900" />
          {data.concept.title}
        </h2>
        <p className="text-lg text-gray-600 mb-8">{data.concept.description}</p>
        
        {/* Hai phương diện */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {data.concept.aspects.map((aspect) => (
            <div key={aspect.id} className="card">
              <div className="text-3xl mb-3">{aspect.icon}</div>
              <h3 className="font-heading text-xl font-bold text-gray-900 mb-4">
                {aspect.title}
              </h3>
              <ul className="space-y-2 mb-4">
                {aspect.points.map((point, i) => (
                  <li key={i} className="flex items-start">
                    <HiCheck className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
              <blockquote className="italic text-sm text-gray-500 border-l-4 border-primary-500 pl-4">
                {aspect.quote}
              </blockquote>
            </div>
          ))}
        </div>

        {/* Định nghĩa */}
        <div className="bg-primary-50 border-l-4 border-primary-900 p-6 rounded-r-lg">
          <h4 className="font-heading font-bold text-primary-900 mb-2">
            {data.concept.definition.title}
          </h4>
          <p className="text-gray-700 leading-relaxed">
            {data.concept.definition.content}
          </p>
        </div>
      </div>

      {/* Đặc điểm */}
      <div>
        <h2 className="section-title">{data.characteristics.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.characteristics.items.map((item) => (
            <div key={item.id} className="card flex items-start space-x-4">
              <div className="text-3xl">{item.icon}</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nội dung sứ mệnh lịch sử */}
      <div>
        <h2 className="section-title">{data.mission.title}</h2>
        <p className="text-lg text-gray-600 mb-8">{data.mission.overview}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.mission.contents.map((content) => (
            <div key={content.id} className={`card border-t-4 ${
              content.color === 'green' ? 'border-green-500' :
              content.color === 'red' ? 'border-red-500' :
              'border-purple-500'
            }`}>
              <div className="text-3xl mb-3">{content.icon}</div>
              <h3 className="font-heading font-bold text-gray-900 mb-4">
                {content.title}
              </h3>
              <ul className="space-y-2">
                {content.points.map((point, i) => (
                  <li key={i} className="flex items-start text-sm">
                    <span className={`w-2 h-2 rounded-full mr-2 mt-1.5 flex-shrink-0 ${
                      content.color === 'green' ? 'bg-green-500' :
                      content.color === 'red' ? 'bg-red-500' :
                      'bg-purple-500'
                    }`}></span>
                    <span className="text-gray-600">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Điều kiện thực hiện */}
      <div>
        <h2 className="section-title">{data.conditions.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Điều kiện khách quan */}
          <div className="card bg-blue-50">
            <h3 className="font-heading text-xl font-bold text-blue-900 mb-4">
              {data.conditions.objective.title}
            </h3>
            {data.conditions.objective.items.map((item, i) => (
              <div key={i} className="mb-4">
                <h4 className="font-bold text-gray-900">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.content}</p>
              </div>
            ))}
            <blockquote className="italic text-sm text-blue-800 border-l-4 border-blue-500 pl-4 mt-4">
              {data.conditions.objective.quote}
            </blockquote>
          </div>

          {/* Điều kiện chủ quan */}
          <div className="card bg-green-50">
            <h3 className="font-heading text-xl font-bold text-green-900 mb-4">
              {data.conditions.subjective.title}
            </h3>
            {data.conditions.subjective.items.map((item, i) => (
              <div key={i} className="flex items-start space-x-3 mb-4">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h4 className="font-bold text-gray-900">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Section 2 Content - THÁCH THỨC VÀ CƠ HỘI (TRỌNG TÂM)
const Section2Content = ({ data }) => {
  const [activeTab, setActiveTab] = useState('challenges')

  return (
    <div className="space-y-12">
      {/* Intro */}
      <div className="card bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-500">
        <h2 className="font-heading text-2xl font-bold text-orange-900 mb-3">
          {data.intro.title}
        </h2>
        <p className="text-gray-700 mb-4">{data.intro.description}</p>
        <div className="flex flex-wrap gap-2">
          {data.intro.features.map((feature, i) => (
            <span key={i} className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border">
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Những điểm ổn định */}
      <div>
        <h2 className="section-title">
          <HiCheck className="w-8 h-8 mr-3 text-green-600" />
          {data.stable.title}
        </h2>
        <p className="text-gray-600 mb-6">{data.stable.subtitle}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {data.stable.items.map((item) => (
            <div key={item.id} className="card border-t-4 border-green-500">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="bg-green-100 p-4 rounded-lg text-green-800 text-center">
          <strong>{data.stable.conclusion}</strong>
        </div>
      </div>

      {/* Tab Navigation - Thách thức vs Cơ hội */}
      <div>
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 p-1 rounded-xl inline-flex">
            <button
              onClick={() => setActiveTab('challenges')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'challenges'
                  ? 'bg-red-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <HiExclamation className="w-5 h-5 inline mr-2" />
              Thách thức
            </button>
            <button
              onClick={() => setActiveTab('opportunities')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'opportunities'
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <HiLightBulb className="w-5 h-5 inline mr-2" />
              Cơ hội
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'challenges' && (
            <motion.div
              key="challenges"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <h2 className="text-2xl font-bold text-red-700 mb-6 flex items-center">
                <HiExclamation className="w-8 h-8 mr-2" />
                {data.challenges.title}
              </h2>
              <p className="text-gray-600 mb-8">{data.challenges.subtitle}</p>
              <div className="space-y-6">
                {data.challenges.items.map((item) => (
                  <div key={item.id} className="card border-l-4 border-red-500">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">{item.icon}</span>
                        <h3 className="font-heading text-xl font-bold text-gray-900">
                          {item.title}
                        </h3>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.severity === 'high' 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {item.severity === 'high' ? 'Nghiêm trọng' : 'Trung bình'}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="bg-red-50 p-4 rounded-lg mb-4">
                      <h4 className="font-bold text-red-800 mb-2">Tác động:</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {item.impacts.map((impact, i) => (
                          <li key={i} className="flex items-start text-sm text-gray-700">
                            <span className="w-2 h-2 bg-red-500 rounded-full mr-2 mt-1.5"></span>
                            {impact}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-bold text-green-800 mb-1">Giải pháp:</h4>
                      <p className="text-green-700 text-sm">{item.solution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'opportunities' && (
            <motion.div
              key="opportunities"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-2xl font-bold text-green-700 mb-6 flex items-center">
                <HiLightBulb className="w-8 h-8 mr-2" />
                {data.opportunities.title}
              </h2>
              <p className="text-gray-600 mb-8">{data.opportunities.subtitle}</p>
              <div className="space-y-6">
                {data.opportunities.items.map((item) => (
                  <div key={item.id} className="card border-l-4 border-green-500">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">{item.icon}</span>
                        <h3 className="font-heading text-xl font-bold text-gray-900">
                          {item.title}
                        </h3>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.potential === 'high' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {item.potential === 'high' ? 'Tiềm năng cao' : 'Tiềm năng TB'}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="bg-green-50 p-4 rounded-lg mb-4">
                      <h4 className="font-bold text-green-800 mb-2">Lợi ích:</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {item.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start text-sm text-gray-700">
                            <HiCheck className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-bold text-blue-800 mb-1">Ví dụ thực tế:</h4>
                      <p className="text-blue-700 text-sm">{item.example}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Key Message */}
      <div className="bg-gradient-to-r from-primary-900 to-secondary-500 text-white p-8 rounded-2xl text-center">
        <HiStar className="w-12 h-12 mx-auto mb-4 text-accent-gold" />
        <h3 className="font-heading text-2xl font-bold mb-4">
          {data.comparison.title}
        </h3>
        <p className="text-lg text-white/80 mb-4">{data.comparison.description}</p>
        <p className="text-xl font-bold text-accent-gold">
          {data.comparison.keyMessage}
        </p>
      </div>

      {/* Xu hướng biến đổi */}
      <div>
        <h2 className="section-title">{data.trends.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.trends.items.map((item) => (
            <div key={item.id} className="card">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-heading font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{item.description}</p>
              {item.stats && (
                <p className="text-xs text-gray-500 italic">{item.stats}</p>
              )}
              {item.note && (
                <p className="text-xs text-orange-600 mt-2">{item.note}</p>
              )}
              {item.examples && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.examples.map((ex, i) => (
                    <span key={i} className="bg-gray-100 px-2 py-1 rounded text-xs">
                      {ex}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Section 3 Content - Sứ mệnh Việt Nam
const Section3Content = ({ data }) => {
  return (
    <div className="space-y-12">
      {/* Định nghĩa */}
      <div className="card bg-red-50 border-l-4 border-red-600">
        <p className="text-sm text-red-600 mb-2">{data.characteristics.definition.source}</p>
        <blockquote className="text-lg text-gray-800 italic">
          {data.characteristics.definition.content}
        </blockquote>
      </div>

      {/* Đặc điểm lịch sử */}
      <div>
        <h2 className="section-title">{data.characteristics.historical.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.characteristics.historical.items.map((item, i) => (
            <div key={i} className="card flex items-start space-x-4">
              <div className="text-3xl">{item.icon}</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Biến đổi hiện đại */}
      <div>
        <h2 className="section-title">{data.characteristics.modern.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.characteristics.modern.items.map((item, i) => (
            <div key={i} className="card flex items-start space-x-4">
              <div className="text-3xl">{item.icon}</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nội dung sứ mệnh */}
      <div>
        <h2 className="section-title">{data.mission.title}</h2>
        <div className="bg-red-50 p-6 rounded-lg mb-8">
          <p className="text-sm text-red-600 mb-2">{data.mission.overview.source}</p>
          <blockquote className="text-gray-800 italic">
            {data.mission.overview.content}
          </blockquote>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.mission.contents.map((content) => (
            <div key={content.id} className={`card border-t-4 ${
              content.color === 'green' ? 'border-green-500' :
              content.color === 'red' ? 'border-red-500' :
              'border-purple-500'
            }`}>
              <div className="text-3xl mb-3">{content.icon}</div>
              <h3 className="font-heading font-bold text-gray-900 mb-4">
                {content.title}
              </h3>
              <ul className="space-y-2 mb-4">
                {content.keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start text-sm">
                    <HiCheck className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{point}</span>
                  </li>
                ))}
              </ul>
              <div className={`p-3 rounded-lg text-sm ${
                content.color === 'green' ? 'bg-green-100 text-green-800' :
                content.color === 'red' ? 'bg-red-100 text-red-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                <strong>{content.highlight}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Giải pháp */}
      <div>
        <h2 className="section-title">{data.solutions.title}</h2>
        
        {/* Phương hướng */}
        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <h3 className="font-bold text-blue-900 mb-4">{data.solutions.directions.title}</h3>
          <p className="text-sm text-blue-600 mb-3">{data.solutions.directions.source}</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.solutions.directions.items.map((item, i) => (
              <li key={i} className="flex items-start text-gray-700">
                <HiChevronRight className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* 5 Giải pháp */}
        <h3 className="font-heading text-xl font-bold text-gray-900 mb-6">
          {data.solutions.measures.title}
        </h3>
        <div className="space-y-4">
          {data.solutions.measures.items.map((item) => (
            <div key={item.id} className="card flex items-start space-x-4">
              <div className="w-10 h-10 bg-primary-900 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                {item.id}
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContentPage

