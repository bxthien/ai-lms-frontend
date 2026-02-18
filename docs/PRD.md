### 1. Product Overview

#### 1.1. Product Name

- **AI-Powered Learning Management System (AI-LMS)**

#### 1.2. Problem Statement

Hiện tại:

- **Học online thiếu cá nhân hóa**
- **Giáo viên tốn thời gian chấm bài**
- **Sinh viên không biết lộ trình học phù hợp**
- **Thiếu insight về tiến độ học tập**

#### 1.3. Solution

Một nền tảng LMS:

- **Quản lý khóa học**
- **Theo dõi tiến độ**
- **AI tự động**:
  - Chấm bài
  - Tạo quiz
  - Gợi ý lộ trình

---

### 2. User Roles

- **Admin**: Quản trị hệ thống
- **Teacher**: Tạo nội dung
- **Student**: Học viên

---

### 3. Core Features (MVP)

#### 3.1. Authentication & User

- Register / Login
- Verify email
- Reset password
- Update profile
- JWT + Refresh Token

#### 3.2. Course Management

- **Teacher**
  - Create / update / delete course
  - Publish / unpublish
  - Upload lesson video
  - Create quiz
- **Student**
  - Browse courses
  - Enroll course
  - View lesson
  - Track progress

#### 3.3. Learning Flow

- Student enroll course
- View lessons
- Complete lesson
- Do quiz
- Receive score + feedback

#### 3.4. Quiz & Assessment

- Multiple choice
- Text answer
- Auto grading (MCQ)
- AI grading (Essay)

#### 3.5. AI Features (Basic)

- Generate quiz from lesson
- Grade essay
- Give learning feedback

---

### 4. User Stories (Agile)

#### Student

- As a student, I want to enroll a course.
- As a student, I want AI to give feedback.
- As a student, I want to see my progress.

#### Teacher

- As a teacher, I want to generate quiz by AI.
- As a teacher, I want analytics of students.

#### Admin

- As an admin, I want to manage users.
- As an admin, I want system reports.

---

### 5. Non-Functional Requirements

- **Performance**
  - API response \< 300ms
  - AI request async (queue)
- **Security**
  - Password hashed
  - JWT expired
  - Role-based access
- **Scalability**
  - Redis caching
  - Stateless API
  - Docker ready
- **Observability**
  - Logging
  - Audit log
  - Error tracking

---

### 6. Technical Stack

- **Backend**: NestJS, PostgreSQL, Prisma, Redis, BullMQ, Swagger, Docker
- **AI**: Gemini / OpenAI
- **Infra**: Nginx, PM2 / Docker, AWS S3

---

### 7. Middle Features (Phase 2)

- **System**
  - Redis caching
  - Rate limit
  - Background jobs
  - Email queue
- **Learning**
  - Progress analytics
  - Completion rate
  - Certificate
- **Search**
  - Full-text search
  - Filter by level

---

### 8. Advanced Features (Phase 3)

- **AI Advanced**
  - Recommendation system
  - AI tutor chat
  - Adaptive learning path
- **Architecture**
  - Event-driven
  - CQRS
  - Microservice
- **Realtime**
  - Websocket live class
  - Live quiz
  - Chat room
- **Payment**
  - Subscription
  - Invoice
  - Refund

---

### 9. Success Metrics (KPI)

- **Product**
  - Completion rate \> 60%
  - Active users / day
  - Avg quiz score improvement
- **System**
  - API error rate \< 1%
  - AI response \< 5s
  - Cache hit rate \> 70%

---

### 10. Roadmap

- **Phase 1 – MVP (2–3 tuần)**
  - Auth
  - Course
  - Enrollment
  - Quiz
  - AI grading
- **Phase 2 – Middle (1 tháng)**
  - Redis
  - Queue
  - Upload
  - Analytics
  - Notification
- **Phase 3 – Advanced**
  - Websocket
  - Recommendation
  - Payment
  - Microservice

---

### 11. Out of Scope (Version 1)

- Mobile app
- Offline mode
- Social network
- Marketplace

