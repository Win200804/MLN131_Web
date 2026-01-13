// Content Data - Nội dung 3 phần bài giảng về Chủ nghĩa xã hội khoa học
// CHÚ TRỌNG: Phần 2 - Thách thức và Cơ hội của Công dân 4.0

const contentData = {
  // ========================================
  // PHẦN 1: QUAN ĐIỂM CƠ BẢN CỦA CHỦ NGHĨA MÁC-LÊNIN
  // ========================================
  section1: {
    id: 'quan-diem-co-ban',
    title: 'Quan điểm cơ bản của Chủ nghĩa Mác-Lênin về Giai cấp Công nhân',
    subtitle: 'Nền tảng lý luận về giai cấp công nhân và sứ mệnh lịch sử',
    icon: '📚',
    color: 'blue',
    
    // Phần 1.1: Khái niệm giai cấp công nhân
    concept: {
      title: 'Khái niệm Giai cấp Công nhân',
      description: 'C. Mác và Ph. Ăngghen đã sử dụng nhiều thuật ngữ để chỉ giai cấp công nhân: giai cấp vô sản, giai cấp vô sản hiện đại, giai cấp công nhân đại công nghiệp...',
      
      // Hai phương diện xác định giai cấp công nhân
      aspects: [
        {
          id: 'economic',
          title: 'Phương diện Kinh tế - Xã hội',
          icon: '💰',
          points: [
            'Là sản phẩm và chủ thể của nền sản xuất đại công nghiệp',
            'Lao động trực tiếp hay gián tiếp vận hành công cụ sản xuất công nghiệp',
            'Sản xuất bằng máy móc, năng suất cao',
            'Lao động có tính chất xã hội hóa',
            'Tạo ra tiền đề của cải vật chất cho xã hội mới'
          ],
          quote: '"Công nhân cũng là một phát minh của thời đại mới, giống như máy móc vậy" - Ph. Ăngghen'
        },
        {
          id: 'political',
          title: 'Phương diện Chính trị - Xã hội',
          icon: '⚖️',
          points: [
            'Không sở hữu tư liệu sản xuất chủ yếu của xã hội',
            'Phải bán sức lao động cho nhà tư bản để sống',
            'Bị giai cấp tư sản bóc lột giá trị thặng dư',
            'Lợi ích cơ bản đối lập với giai cấp tư sản',
            'Là giai cấp có sứ mệnh phủ định chế độ tư bản chủ nghĩa'
          ],
          quote: '"Những công nhân ấy, buộc phải tự bán mình để kiếm ăn từng bữa một, là một hàng hóa" - C. Mác'
        }
      ],
      
      // Định nghĩa tổng hợp
      definition: {
        title: 'Định nghĩa Giai cấp Công nhân theo Chủ nghĩa Mác-Lênin',
        content: 'Giai cấp công nhân là một tập đoàn xã hội, hình thành và phát triển cùng với quá trình phát triển của nền công nghiệp hiện đại; họ lao động bằng phương thức công nghiệp ngày càng hiện đại và gắn liền với quá trình sản xuất vật chất hiện đại, là đại biểu cho phương thức sản xuất mang tính xã hội hóa ngày càng cao. Họ là người làm thuê do không có tư liệu sản xuất, buộc phải bán sức lao động để sống và bị giai cấp tư sản bóc lột giá trị thặng dư.'
      }
    },
    
    // Phần 1.2: Đặc điểm giai cấp công nhân
    characteristics: {
      title: 'Đặc điểm của Giai cấp Công nhân',
      items: [
        {
          id: 'labor-method',
          title: 'Lao động bằng phương thức công nghiệp',
          description: 'Công cụ lao động là máy móc, tạo ra năng suất cao, quá trình lao động mang tính chất xã hội hóa.',
          icon: '🏭'
        },
        {
          id: 'advanced-force',
          title: 'Đại biểu cho lực lượng sản xuất tiên tiến',
          description: 'Giai cấp công nhân là chủ thể của quá trình sản xuất vật chất hiện đại, quyết định sự tồn tại và phát triển của xã hội.',
          icon: '⚡'
        },
        {
          id: 'organization',
          title: 'Tính tổ chức và kỷ luật cao',
          description: 'Nền sản xuất đại công nghiệp rèn luyện cho giai cấp công nhân tính tổ chức, kỷ luật lao động, tinh thần hợp tác.',
          icon: '🤝'
        },
        {
          id: 'revolutionary',
          title: 'Tinh thần cách mạng triệt để',
          description: 'Giai cấp công nhân là giai cấp cách mạng, có tinh thần cách mạng triệt để, đại biểu cho tương lai và xu thế đi lên của lịch sử.',
          icon: '✊'
        }
      ]
    },
    
    // Phần 1.3: Nội dung sứ mệnh lịch sử
    mission: {
      title: 'Nội dung Sứ mệnh Lịch sử của Giai cấp Công nhân',
      overview: 'Sứ mệnh lịch sử tổng quát: Thông qua chính đảng tiền phong, giai cấp công nhân tổ chức, lãnh đạo nhân dân lao động đấu tranh xóa bỏ các chế độ người bóc lột người, xây dựng xã hội cộng sản chủ nghĩa văn minh.',
      
      contents: [
        {
          id: 'economic',
          title: 'Nội dung Kinh tế',
          icon: '📈',
          color: 'green',
          points: [
            'Là nhân tố hàng đầu của lực lượng sản xuất xã hội hóa cao',
            'Đại biểu cho quan hệ sản xuất mới',
            'Sản xuất ra của cải vật chất đáp ứng nhu cầu xã hội',
            'Tạo tiền đề vật chất - kỹ thuật cho xã hội mới',
            'Thực hiện một kiểu tổ chức xã hội mới về lao động'
          ]
        },
        {
          id: 'political',
          title: 'Nội dung Chính trị - Xã hội',
          icon: '🏛️',
          color: 'red',
          points: [
            'Tiến hành cách mạng chính trị để lật đổ giai cấp thống trị',
            'Giành quyền lực về tay giai cấp công nhân và nhân dân lao động',
            'Thiết lập nhà nước kiểu mới mang bản chất giai cấp công nhân',
            'Xây dựng nền dân chủ xã hội chủ nghĩa',
            'Thực hiện quyền lực và quyền làm chủ của nhân dân'
          ]
        },
        {
          id: 'cultural',
          title: 'Nội dung Văn hóa - Tư tưởng',
          icon: '🎓',
          color: 'purple',
          points: [
            'Xây dựng hệ giá trị mới: lao động, công bằng, dân chủ, bình đẳng, tự do',
            'Cải tạo cái cũ lỗi thời, xây dựng cái mới tiến bộ',
            'Xây dựng và củng cố ý thức hệ chủ nghĩa Mác-Lênin',
            'Phát triển văn hóa, xây dựng con người mới xã hội chủ nghĩa',
            'Đấu tranh khắc phục ý thức hệ tư sản và các tàn dư cũ'
          ]
        }
      ]
    },
    
    // Phần 1.4: Điều kiện thực hiện sứ mệnh lịch sử
    conditions: {
      title: 'Điều kiện thực hiện Sứ mệnh Lịch sử',
      
      objective: {
        title: 'Điều kiện Khách quan',
        items: [
          {
            title: 'Do địa vị kinh tế',
            content: 'Giai cấp công nhân là con đẻ của nền đại công nghiệp, đại diện cho phương thức sản xuất tiên tiến và lực lượng sản xuất hiện đại.'
          },
          {
            title: 'Do địa vị chính trị - xã hội',
            content: 'Lợi ích cơ bản đối lập với giai cấp tư sản, thống nhất với lợi ích của đa số nhân dân lao động.'
          }
        ],
        quote: '"Sự sụp đổ của giai cấp tư sản và thắng lợi của giai cấp vô sản đều là tất yếu như nhau" - C. Mác & Ph. Ăngghen'
      },
      
      subjective: {
        title: 'Điều kiện Chủ quan',
        items: [
          {
            title: 'Sự phát triển của bản thân giai cấp công nhân',
            content: 'Phát triển về số lượng và chất lượng, giác ngộ về lý luận khoa học và cách mạng của chủ nghĩa Mác-Lênin.',
            icon: '📊'
          },
          {
            title: 'Đảng Cộng sản ra đời và lãnh đạo',
            content: 'Đảng Cộng sản là nhân tố chủ quan quan trọng nhất - đội tiên phong, bộ tham mưu chiến đấu của giai cấp.',
            icon: '⭐'
          },
          {
            title: 'Liên minh giai cấp',
            content: 'Liên minh giai cấp công nhân với nông dân và các tầng lớp lao động khác do Đảng Cộng sản lãnh đạo.',
            icon: '🤲'
          }
        ]
      }
    }
  },

  // ========================================
  // PHẦN 2: THÁCH THỨC VÀ CƠ HỘI CỦA CÔNG DÂN 4.0 (CHÚ TRỌNG)
  // ========================================
  section2: {
    id: 'thach-thuc-co-hoi',
    title: 'THÁCH THỨC và CƠ HỘI của Công dân 4.0',
    subtitle: 'Giai cấp công nhân trong kỷ nguyên Cách mạng Công nghiệp lần thứ Tư',
    icon: '🚀',
    color: 'orange',
    highlight: true, // Đánh dấu phần quan trọng
    
    // Giới thiệu bối cảnh
    intro: {
      title: 'Bối cảnh Cách mạng Công nghiệp 4.0',
      description: 'So với giai cấp công nhân truyền thống ở thế kỷ XIX, giai cấp công nhân hiện nay vừa có những điểm tương đồng, vừa có những điểm khác biệt trong điều kiện lịch sử mới của toàn cầu hóa, hội nhập quốc tế và Cách mạng công nghiệp lần thứ tư.',
      features: [
        'Trí tuệ nhân tạo (AI) và Machine Learning',
        'Internet vạn vật (IoT)',
        'Tự động hóa và Robot',
        'Công nghệ in 3D',
        'Blockchain và Big Data',
        'Thực tế ảo và tăng cường (VR/AR)'
      ]
    },
    
    // Những điểm ổn định so với thế kỷ XIX
    stable: {
      title: 'Những điểm ỔN ĐỊNH so với thế kỷ XIX',
      subtitle: 'Giá trị bền vững của lý luận Mác-Lênin',
      items: [
        {
          id: 'production-force',
          title: 'Vẫn là lực lượng sản xuất hàng đầu',
          description: 'Giai cấp công nhân hiện nay vẫn đang là lực lượng sản xuất hàng đầu của xã hội hiện đại, là chủ thể của quá trình sản xuất công nghiệp hiện đại mang tính xã hội hóa ngày càng cao.',
          icon: '⚙️'
        },
        {
          id: 'exploitation',
          title: 'Vẫn bị bóc lột giá trị thặng dư',
          description: 'Ở các nước tư bản chủ nghĩa hiện nay, công nhân vẫn bị giai cấp tư sản và chủ nghĩa tư bản bóc lột giá trị thặng dư. Quan hệ sản xuất tư bản chủ nghĩa với chế độ sở hữu tư nhân vẫn tồn tại.',
          icon: '💸'
        },
        {
          id: 'movement',
          title: 'Phong trào cộng sản và công nhân vẫn tiếp diễn',
          description: 'Phong trào cộng sản và công nhân ở nhiều nước vẫn luôn là lực lượng đi đầu trong các cuộc đấu tranh vì hòa bình, hợp tác và phát triển, vì dân sinh, dân chủ, tiến bộ xã hội.',
          icon: '✊'
        }
      ],
      conclusion: 'Lý luận về sứ mệnh lịch sử của giai cấp công nhân trong chủ nghĩa Mác-Lênin vẫn mang giá trị khoa học và cách mạng, vẫn có ý nghĩa thực tiễn to lớn.'
    },
    
    // ========== THÁCH THỨC (QUAN TRỌNG) ==========
    challenges: {
      title: '⚠️ THÁCH THỨC của Công dân 4.0',
      subtitle: 'Những khó khăn cần vượt qua trong kỷ nguyên số',
      highlightColor: 'red',
      
      items: [
        {
          id: 'automation',
          title: 'Tự động hóa thay thế lao động',
          severity: 'high',
          icon: '🤖',
          description: 'Robot, AI và tự động hóa đang thay thế nhiều công việc truyền thống, đặc biệt các công việc lặp đi lặp lại, thủ công.',
          impacts: [
            'Mất việc làm hàng loạt trong một số ngành',
            'Yêu cầu kỹ năng mới mà nhiều công nhân chưa có',
            'Tăng khoảng cách giữa công nhân có kỹ năng cao và thấp',
            'Áp lực cạnh tranh việc làm gay gắt hơn'
          ],
          solution: 'Đào tạo lại, nâng cao kỹ năng số và thích ứng với công nghệ mới'
        },
        {
          id: 'skill-gap',
          title: 'Khoảng cách kỹ năng ngày càng lớn',
          severity: 'high',
          icon: '📉',
          description: 'Yêu cầu về trình độ và kỹ năng thay đổi nhanh chóng, nhiều công nhân không kịp cập nhật.',
          impacts: [
            'Công nhân truyền thống bị lạc hậu',
            'Khó chuyển đổi sang ngành nghề mới',
            'Thu nhập phân hóa mạnh theo kỹ năng',
            'Nguy cơ bị đào thải khỏi thị trường lao động'
          ],
          solution: 'Học tập suốt đời, đào tạo nghề liên tục, chuyển đổi kỹ năng'
        },
        {
          id: 'psychology',
          title: 'Tâm lý tiểu nông và thói quen lạc hậu',
          severity: 'medium',
          icon: '🧠',
          description: 'Đặc biệt ở Việt Nam, công nhân xuất thân từ nông thôn còn mang nhiều tâm lý tiểu nông, lối sống, thói quen lạc hậu từ xã hội nông nghiệp cổ truyền.',
          impacts: [
            'Khó thích ứng với tác phong công nghiệp',
            'Thiếu kỷ luật lao động nghiêm ngặt',
            'Tư duy ngắn hạn, ít sáng tạo',
            'Khó làm việc nhóm hiệu quả'
          ],
          solution: 'Giáo dục tác phong công nghiệp, xây dựng văn hóa doanh nghiệp hiện đại'
        },
        {
          id: 'exploitation-new',
          title: 'Hình thức bóc lột mới, tinh vi hơn',
          severity: 'high',
          icon: '⛓️',
          description: 'Giai cấp tư sản sử dụng công nghệ, tập đoàn xuyên quốc gia, cơ chế toàn cầu hóa để bóc lột tinh vi hơn.',
          impacts: [
            'Bóc lột thông qua công nghệ giám sát',
            'Lao động linh hoạt nhưng bấp bênh (gig economy)',
            'Quyền lợi lao động bị xói mòn',
            'Khó tổ chức công đoàn trong nền kinh tế số'
          ],
          solution: 'Hoàn thiện pháp luật lao động, bảo vệ quyền công nhân trong kỷ nguyên số'
        },
        {
          id: 'ideology',
          title: 'Đấu tranh tư tưởng phức tạp',
          severity: 'medium',
          icon: '💭',
          description: 'Cuộc đấu tranh ý thức hệ giữa chủ nghĩa xã hội với chủ nghĩa tư bản diễn ra phức tạp, gay gắt hơn trong thời đại thông tin.',
          impacts: [
            'Các thế lực thù địch xuyên tạc, chống phá qua mạng xã hội',
            'Niềm tin vào lý tưởng xã hội chủ nghĩa bị thử thách',
            'Giá trị tư sản lan truyền qua văn hóa đại chúng',
            'Công nhân trẻ dễ bị tác động bởi thông tin sai lệch'
          ],
          solution: 'Tăng cường giáo dục chính trị, bảo vệ nền tảng tư tưởng của Đảng'
        }
      ]
    },
    
    // ========== CƠ HỘI (QUAN TRỌNG) ==========
    opportunities: {
      title: '✨ CƠ HỘI của Công dân 4.0',
      subtitle: 'Tiềm năng phát triển trong kỷ nguyên mới',
      highlightColor: 'green',
      
      items: [
        {
          id: 'tech-access',
          title: 'Tiếp cận công nghệ tiên tiến',
          potential: 'high',
          icon: '💻',
          description: 'Công nhân có cơ hội tiếp cận và làm chủ khoa học - công nghệ tiên tiến, hiện đại trong điều kiện phát triển kinh tế tri thức.',
          benefits: [
            'Nâng cao năng suất lao động đáng kể',
            'Giảm lao động nặng nhọc, nguy hiểm',
            'Môi trường làm việc an toàn, hiện đại hơn',
            'Cơ hội sáng tạo và đổi mới'
          ],
          example: 'Công nhân vận hành robot, điều khiển dây chuyền tự động, lập trình CNC'
        },
        {
          id: 'intellectualization',
          title: 'Xu hướng trí tuệ hóa - Nâng cao giá trị',
          potential: 'high',
          icon: '🎓',
          description: 'Xu hướng "trí tuệ hóa" giúp công nhân phát triển toàn diện, từ lao động cơ bắp sang lao động trí óc.',
          benefits: [
            'Thu nhập cao hơn theo trình độ',
            'Điều kiện làm việc tốt hơn',
            'Địa vị xã hội được nâng cao',
            'Nhu cầu tinh thần, văn hóa được đáp ứng'
          ],
          example: '"Công nhân tri thức", "công nhân áo trắng", lao động trình độ cao'
        },
        {
          id: 'global-connect',
          title: 'Kết nối toàn cầu và học hỏi quốc tế',
          potential: 'high',
          icon: '🌍',
          description: 'Toàn cầu hóa và Internet mở ra cơ hội học hỏi, trao đổi kinh nghiệm với công nhân trên toàn thế giới.',
          benefits: [
            'Học hỏi kinh nghiệm từ các nước phát triển',
            'Cơ hội làm việc cho doanh nghiệp quốc tế',
            'Tiếp cận nguồn học liệu, đào tạo online miễn phí',
            'Mở rộng tầm nhìn và tư duy'
          ],
          example: 'Khóa học online từ Coursera, edX; làm việc remote cho công ty nước ngoài'
        },
        {
          id: 'new-jobs',
          title: 'Ngành nghề mới ra đời',
          potential: 'medium',
          icon: '🆕',
          description: 'Cách mạng 4.0 tạo ra nhiều ngành nghề mới mà trước đây chưa tồn tại.',
          benefits: [
            'Nhiều cơ hội việc làm mới',
            'Thu nhập hấp dẫn trong ngành mới',
            'Môi trường làm việc linh hoạt',
            'Cơ hội khởi nghiệp sáng tạo'
          ],
          example: 'Data Scientist, AI Engineer, UX Designer, Digital Marketing, Cloud Architect'
        },
        {
          id: 'voice-power',
          title: 'Tiếng nói và quyền lực được nâng cao',
          potential: 'medium',
          icon: '📢',
          description: 'Mạng xã hội và công nghệ giúp công nhân có tiếng nói mạnh mẽ hơn, dễ dàng tổ chức và bảo vệ quyền lợi.',
          benefits: [
            'Dễ dàng liên kết, tổ chức tập thể',
            'Tiếng nói được xã hội lắng nghe qua mạng xã hội',
            'Giám sát và phản ánh vi phạm quyền lao động',
            'Tham gia xây dựng chính sách'
          ],
          example: 'Các phong trào công nhân qua mạng xã hội, livestream phản ánh điều kiện làm việc'
        }
      ]
    },
    
    // So sánh Thách thức vs Cơ hội
    comparison: {
      title: 'Cân bằng Thách thức và Cơ hội',
      description: 'Trong bối cảnh Cách mạng công nghiệp 4.0, giai cấp công nhân cần nhận thức rõ cả thách thức và cơ hội để có chiến lược phát triển phù hợp.',
      keyMessage: 'Thách thức và cơ hội luôn song hành. Chìa khóa thành công là HỌC TẬP SUỐT ĐỜI và SẴN SÀNG THÍCH ỨNG.'
    },
    
    // Xu hướng biến đổi
    trends: {
      title: 'Xu hướng Biến đổi của Giai cấp Công nhân Hiện đại',
      items: [
        {
          id: 'intellectualization',
          title: 'Xu hướng "Trí tuệ hóa"',
          icon: '🧠',
          description: 'Công nhân hiện đại có xu hướng trí tuệ hóa, tri thức hóa. Hao phí lao động hiện đại chủ yếu là hao phí về trí lực chứ không còn thuần túy là hao phí sức lực cơ bắp.',
          stats: 'Ngày nay, công nhân được đào tạo chuẩn mực và thường xuyên được đào tạo lại, đáp ứng sự thay đổi nhanh chóng của công nghệ.'
        },
        {
          id: 'middle-class',
          title: 'Xu hướng "Trung lưu hóa"',
          icon: '📈',
          description: 'Một bộ phận công nhân đã tham gia vào sở hữu tư liệu sản xuất thông qua chế độ cổ phần hóa, có mức sống "trung lưu".',
          note: 'Tuy nhiên, về thực chất, quyền quyết định quá trình sản xuất vẫn thuộc về giai cấp tư sản.'
        },
        {
          id: 'leadership',
          title: 'Vai trò Lãnh đạo và Cầm quyền',
          icon: '⭐',
          description: 'Ở các nước xã hội chủ nghĩa, giai cấp công nhân và Đảng Cộng sản đã trở thành giai cấp lãnh đạo, giữ vai trò cầm quyền trong quá trình xây dựng chủ nghĩa xã hội.',
          examples: ['Việt Nam', 'Trung Quốc', 'Cuba', 'Lào']
        }
      ]
    }
  },

  // ========================================
  // PHẦN 3: SỨ MỆNH LỊCH SỬ TẠI VIỆT NAM
  // ========================================
  section3: {
    id: 'su-menh-viet-nam',
    title: 'Sứ mệnh Lịch sử của Giai cấp Công nhân Việt Nam',
    subtitle: 'Đặc điểm, nội dung và phương hướng xây dựng giai cấp công nhân Việt Nam hiện nay',
    icon: '🇻🇳',
    color: 'red',
    
    // Đặc điểm giai cấp công nhân Việt Nam
    characteristics: {
      title: 'Đặc điểm Giai cấp Công nhân Việt Nam',
      
      definition: {
        source: 'Hội nghị lần thứ sáu Ban Chấp hành Trung ương khóa X',
        content: '"Giai cấp công nhân Việt Nam là một lực lượng xã hội to lớn, đang phát triển, bao gồm những người lao động chân tay và trí óc, làm công hưởng lương trong các loại hình sản xuất kinh doanh và dịch vụ công nghiệp, hoặc sản xuất kinh doanh và dịch vụ có tính chất công nghiệp."'
      },
      
      historical: {
        title: 'Đặc điểm Lịch sử',
        items: [
          {
            title: 'Ra đời trước giai cấp tư sản',
            description: 'Giai cấp công nhân Việt Nam ra đời vào đầu thế kỷ XX, gắn liền với chính sách khai thác thuộc địa của thực dân Pháp, trực tiếp đối kháng với tư bản thực dân.',
            icon: '📅'
          },
          {
            title: 'Tiên phong trong đấu tranh giải phóng dân tộc',
            description: 'Tự thể hiện mình là lực lượng chính trị tiên phong để lãnh đạo cuộc đấu tranh giải phóng dân tộc, giải quyết mâu thuẫn cơ bản giữa dân tộc Việt Nam với đế quốc thực dân.',
            icon: '🔥'
          },
          {
            title: 'Gắn bó mật thiết với nhân dân, dân tộc',
            description: 'Giai cấp công nhân Việt Nam có truyền thống yêu nước, đoàn kết và bất khuất chống xâm lược, thể hiện tinh thần dân tộc sâu sắc.',
            icon: '❤️'
          },
          {
            title: 'Sớm giác ngộ lý tưởng cách mạng',
            description: 'Tuy số lượng còn ít nhưng sớm được tôi luyện trong đấu tranh cách mạng, trưởng thành nhanh chóng về ý thức chính trị giai cấp.',
            icon: '⭐'
          }
        ]
      },
      
      modern: {
        title: 'Biến đổi trong Thời kỳ Đổi mới',
        items: [
          {
            title: 'Tăng nhanh về số lượng và chất lượng',
            description: 'Giai cấp công nhân Việt Nam hiện nay đã tăng nhanh về số lượng và chất lượng, là giai cấp đi đầu trong sự nghiệp đẩy mạnh công nghiệp hóa, hiện đại hóa.',
            icon: '📊'
          },
          {
            title: 'Đa dạng về cơ cấu nghề nghiệp',
            description: 'Có mặt trong mọi thành phần kinh tế, đội ngũ công nhân trong khu vực kinh tế nhà nước là tiêu biểu, đóng vai trò nòng cốt, chủ đạo.',
            icon: '🏭'
          },
          {
            title: 'Công nhân tri thức là lực lượng chủ đạo',
            description: 'Công nhân nắm vững khoa học - công nghệ tiên tiến và công nhân trẻ được đào tạo nghề theo chuẩn nghề nghiệp là lực lượng chủ đạo.',
            icon: '💻'
          },
          {
            title: 'Đối mặt thời cơ và thách thức mới',
            description: 'Trong bối cảnh Cách mạng công nghiệp lần thứ tư, giai cấp công nhân Việt Nam đứng trước cả thời cơ phát triển và những thách thức nguy cơ.',
            icon: '⚡'
          }
        ]
      }
    },
    
    // Nội dung sứ mệnh lịch sử tại Việt Nam
    mission: {
      title: 'Nội dung Sứ mệnh Lịch sử tại Việt Nam',
      
      overview: {
        source: 'Đảng Cộng sản Việt Nam',
        content: '"Giai cấp công nhân nước ta có sứ mệnh lịch sử to lớn: Là giai cấp lãnh đạo cách mạng thông qua đội tiền phong là Đảng Cộng sản Việt Nam; giai cấp đại diện cho phương thức sản xuất tiên tiến; giai cấp tiên phong trong sự nghiệp xây dựng chủ nghĩa xã hội, lực lượng đi đầu trong sự nghiệp công nghiệp hóa, hiện đại hóa đất nước vì mục tiêu dân giàu, nước mạnh, xã hội công bằng, dân chủ, văn minh."'
      },
      
      contents: [
        {
          id: 'economic',
          title: 'Nội dung Kinh tế',
          icon: '📈',
          color: 'green',
          keyPoints: [
            'Là nguồn nhân lực lao động chủ yếu phát triển nền kinh tế thị trường định hướng XHCN',
            'Lấy khoa học - công nghệ làm động lực tăng năng suất, chất lượng, hiệu quả',
            'Phát huy vai trò lực lượng đi đầu trong công nghiệp hóa, hiện đại hóa',
            'Thực hiện liên minh công - nông - trí thức để phát triển nông nghiệp - nông thôn'
          ],
          highlight: 'Thực hiện thắng lợi mục tiêu công nghiệp hóa, hiện đại hóa, làm cho nước ta trở thành một nước công nghiệp theo hướng hiện đại.'
        },
        {
          id: 'political',
          title: 'Nội dung Chính trị - Xã hội',
          icon: '🏛️',
          color: 'red',
          keyPoints: [
            'Giữ vững và tăng cường sự lãnh đạo của Đảng',
            'Giữ vững bản chất giai cấp công nhân của Đảng',
            'Tăng cường xây dựng, chỉnh đốn Đảng',
            'Ngăn chặn, đẩy lùi sự suy thoái, "tự diễn biến", "tự chuyển hóa"',
            'Tham gia xây dựng, chỉnh đốn Đảng thông qua tổ chức công đoàn'
          ],
          highlight: 'Bảo vệ Đảng, bảo vệ chế độ xã hội chủ nghĩa để bảo vệ nhân dân - đó là trọng trách lịch sử.'
        },
        {
          id: 'cultural',
          title: 'Nội dung Văn hóa - Tư tưởng',
          icon: '🎓',
          color: 'purple',
          keyPoints: [
            'Xây dựng nền văn hóa Việt Nam tiên tiến, đậm đà bản sắc dân tộc',
            'Xây dựng con người mới xã hội chủ nghĩa',
            'Giáo dục đạo đức cách mạng, rèn luyện lối sống, tác phong công nghiệp',
            'Bảo vệ sự trong sáng của chủ nghĩa Mác-Lênin và tư tưởng Hồ Chí Minh',
            'Chống lại các quan điểm sai trái, xuyên tạc của các thế lực thù địch'
          ],
          highlight: 'Đoàn kết giai cấp gắn liền với đoàn kết dân tộc và đoàn kết quốc tế - kết hợp sức mạnh dân tộc với sức mạnh thời đại.'
        }
      ]
    },
    
    // Phương hướng và giải pháp
    solutions: {
      title: 'Phương hướng và Giải pháp Xây dựng Giai cấp Công nhân',
      
      directions: {
        title: 'Phương hướng theo Đại hội XIII',
        source: 'Đại hội XIII của Đảng',
        items: [
          'Xây dựng giai cấp công nhân hiện đại, lớn mạnh',
          'Nâng cao bản lĩnh chính trị, trình độ học vấn, chuyên môn, kỹ năng nghề nghiệp',
          'Tác phong công nghiệp, kỷ luật lao động thích ứng với Cách mạng công nghiệp 4.0',
          'Tăng cường tuyên truyền, giáo dục chính trị, tư tưởng cho giai cấp công nhân',
          'Chăm lo đời sống vật chất, tinh thần, nhà ở và phúc lợi xã hội',
          'Đổi mới tổ chức và hoạt động của công đoàn'
        ]
      },
      
      measures: {
        title: 'Giải pháp Chủ yếu',
        items: [
          {
            id: 1,
            title: 'Nâng cao nhận thức về vai trò giai cấp công nhân',
            description: 'Kiên định quan điểm giai cấp công nhân là giai cấp lãnh đạo cách mạng thông qua Đảng Cộng sản Việt Nam.',
            icon: '🎯'
          },
          {
            id: 2,
            title: 'Xây dựng giai cấp công nhân gắn với liên minh công - nông - trí',
            description: 'Phát huy sức mạnh của liên minh giai cấp, củng cố khối đại đoàn kết toàn dân tộc.',
            icon: '🤝'
          },
          {
            id: 3,
            title: 'Gắn kết với chiến lược phát triển kinh tế - xã hội',
            description: 'Xử lý đúng đắn mối quan hệ giữa tăng trưởng kinh tế với tiến bộ, công bằng xã hội.',
            icon: '📊'
          },
          {
            id: 4,
            title: 'Đào tạo, bồi dưỡng, trí thức hóa giai cấp công nhân',
            description: 'Xây dựng thế hệ công nhân trẻ có học vấn, kỹ năng nghề nghiệp cao ngang tầm khu vực và quốc tế.',
            icon: '🎓'
          },
          {
            id: 5,
            title: 'Xây dựng Đảng trong sạch, vững mạnh',
            description: 'Xây dựng giai cấp công nhân lớn mạnh gắn liền với xây dựng Đảng trong sạch, vững mạnh về chính trị, tư tưởng, tổ chức và đạo đức.',
            icon: '⭐'
          }
        ]
      }
    }
  }
}

export default contentData

