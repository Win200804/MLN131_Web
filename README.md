# Công nhân 4.0 - Thách thức và Cơ hội

Website học tập tương tác về Chủ nghĩa xã hội khoa học, tập trung vào chủ đề "Giai cấp công nhân: Thách thức và Cơ hội trong kỷ nguyên Cách mạng Công nghiệp 4.0".

## Thông tin Dự án

- **Môn học:** Chủ nghĩa xã hội khoa học (MLN131)
- **Loại:** Sản phẩm sáng tạo
- **Học kỳ:** Spring 2026

## Tính năng

1. **Nội dung Bài giảng** - 3 phần nội dung chính:
   - Quan điểm cơ bản của Chủ nghĩa Mác-Lênin
   - **Thách thức và Cơ hội của Công nhân 4.0** (Trọng tâm)
   - Sứ mệnh lịch sử tại Việt Nam

2. **Quiz Multiplayer** - Kiểu Kahoot
   - Tối đa 40 người chơi
   - 20 câu hỏi trắc nghiệm
   - Bảng xếp hạng realtime
   - Sử dụng Firebase Realtime Database

3. **Mini Games**
   - Điền từ còn thiếu
   - Sắp xếp Timeline sự kiện

4. **AI Chatbox** - Placeholder (sẽ phát triển sau)

## Cài đặt

### Yêu cầu
- Node.js >= 18
- npm hoặc yarn

### Bước 1: Cài đặt dependencies
```bash
npm install
```

### Bước 2: Cấu hình Firebase

1. Tạo project Firebase tại [Firebase Console](https://console.firebase.google.com/)
2. Bật Realtime Database
3. Copy cấu hình Firebase
4. Tạo file `.env` từ `env.example`:

```bash
cp env.example .env
```

5. Điền thông tin Firebase vào file `.env`:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Bước 3: Chạy development server

```bash
npm run dev
```

Website sẽ chạy tại `http://localhost:3000`

### Build Production

```bash
npm run build
```

## Công nghệ sử dụng

- **React 18** - UI Library
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Firebase Realtime Database** - Quiz multiplayer
- **Framer Motion** - Animations
- **React Router v6** - Routing
- **React Icons** - Icons

## Cấu trúc thư mục

```
src/
├── components/         # React components
│   ├── layout/        # Header, Footer
│   └── common/        # Shared components
├── pages/             # Page components
├── services/          # Firebase, storage services
├── context/           # React Context (Quiz state)
├── data/              # Content & Quiz questions
├── hooks/             # Custom hooks
├── utils/             # Helper functions
└── styles/            # CSS files
```

## Lưu ý quan trọng

- Tất cả nội dung và hình ảnh đảm bảo tính chính xác về chủ quyền quốc gia
- Bản đồ Việt Nam bao gồm hai quần đảo Hoàng Sa và Trường Sa
- Không sử dụng hình ảnh có đường lưỡi bò hoặc cờ Trung Quốc

## License

Dự án này được phát triển cho mục đích học tập.

