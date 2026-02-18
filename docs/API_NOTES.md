### Ghi chú API & Module – AI-LMS Backend

File này dùng để **note định hướng API**, module và roadmap, bạn sẽ triển khai chi tiết sau.

---

### 1. Phase 1 – MVP

- **AuthModule**
  - `POST /auth/register` – đăng ký (default role STUDENT).
  - `POST /auth/login` – trả access + refresh token.
  - `POST /auth/refresh` – refresh access token.
  - `POST /auth/logout` – revoke refresh token.
  - (Sau) `POST /auth/verify-email`, `POST /auth/reset-password`.

- **UsersModule**
  - `GET /users/me` – lấy profile hiện tại.
  - `PATCH /users/me` – update profile.
  - `GET /users/:id` – xem thông tin user (ADMIN/TEACHER).
  - `GET /users` – list/filter user (ADMIN).
  - `PATCH /users/:id/status` – ban/unban (ADMIN).

- **CoursesModule**
  - Teacher:
    - `POST /courses` – tạo course.
    - `PATCH /courses/:id` – sửa course.
    - `DELETE /courses/:id` – xóa/soft-delete.
    - `PATCH /courses/:id/publish` – publish/unpublish.
    - `POST /courses/:id/lessons` – thêm lesson.
    - `PATCH /lessons/:id` – sửa lesson.
    - `DELETE /lessons/:id` – xóa lesson.
  - Student:
    - `GET /courses` – browse, filter (level, price, status=PUBLISHED).
    - `GET /courses/:id` – detail + list lesson.
    - `GET /courses/:id/lessons/:lessonId` – xem bài học (check enrollment).

- **EnrollmentsModule**
  - Student:
    - `POST /courses/:id/enroll` – enroll course.
    - `GET /me/enrollments` – list course đã enroll + progress.
  - Learning flow:
    - `PATCH /lessons/:id/complete` – đánh dấu lesson completed (update LessonProgress, Enrollment.progress).

- **QuizzesModule**
  - Teacher:
    - `POST /lessons/:lessonId/quizzes` – tạo quiz cho lesson.
    - `POST /quizzes/:quizId/questions` – thêm question.
    - `PATCH /questions/:id` – sửa question.
    - `DELETE /questions/:id` – xóa question.
  - Student:
    - `GET /lessons/:lessonId/quizzes` – lấy quiz của bài học.
    - `POST /quizzes/:quizId/submissions` – nộp bài (MCQ + TEXT).
    - `GET /quizzes/:quizId/submissions/me` – xem điểm + feedback.

- **AiModule**
  - `POST /ai/generate-quiz` – generate quiz từ nội dung bài học (queue job, lưu AIRequest).
  - `POST /ai/grade-essay` – chấm bài luận (queue job, update Submission + AIRequest).

- **HealthModule**
  - `GET /health` – check DB, Redis, queue.

---

### 2. Phase 2 – Middle Features

- **NotificationsModule**
  - `GET /notifications` – list notification của user.
  - `PATCH /notifications/:id/read` – mark as read.
  - Trigger từ: enroll thành công, hoàn thành course (certificate), feedback mới, v.v.

- **ActivityLogModule**
  - `GET /admin/activity-logs` – xem log theo user/action/entity.
  - Interceptor/service: log các action quan trọng (login, enroll, complete lesson, submit quiz, issue certificate...).

- **AnalyticsModule**
  - `GET /analytics/courses/:courseId/progress` – completion rate, avg progress.
  - `GET /analytics/courses/:courseId/quizzes` – điểm trung bình, số submission.
  - `GET /analytics/system/overview` – active users/day, completion rate system.

- **CertificatesModule**
  - Tự động issue khi Enrollment.progress = 100%.
  - `GET /me/certificates` – certificate của user.
  - `GET /courses/:courseId/certificates/me` – certificate cho course cụ thể.
  - `GET /courses/:courseId/certificates` – list certificate (teacher/admin).

- **SearchModule**
  - `GET /search/courses?q=&level=&priceRange=` – search/filter course.

---

### 3. Phase 3 – Advanced

- **SubscriptionModule**
  - `GET /me/subscription` – xem gói hiện tại.
  - `POST /subscriptions/checkout` – tạo phiên thanh toán.
  - Webhook từ payment provider → update Subscription (plan, status, startedAt, endedAt).
  - `GET /admin/subscriptions` – list/filter (admin).

- **RecommendationModule**
  - `GET /me/recommendations` – trả về course gợi ý dựa trên Recommendation.
  - Service đọc data từ ActivityLog, Enrollment, LessonProgress, Submission, AIRequest.

- **RealtimeModule**
  - WebSocket cho:
    - Live class.
    - Live quiz.
    - Chat room theo course.

---

### 4. Ghi chú triển khai

- Ưu tiên **Phase 1 – MVP** trước (đúng roadmap PRD).
- Khi implement, nên:
  - Áp dụng guard/role cho từng endpoint.
  - Thêm DTO + validation bằng `class-validator`.
  - Log action quan trọng vào `ActivityLog` để dùng cho analytics và recommendation sau này.
