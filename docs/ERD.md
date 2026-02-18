### ERD – AI-LMS (High Level)

#### Core Entities

- **User**
  - Fields: `id`, `email`, `password`, `fullName`, `avatarUrl`, `role`, `status`, `isVerified`, timestamps.
  - Relations:
    - 1–N với `Course` (teacher courses).
    - 1–N với `Enrollment`, `Submission`, `LessonProgress`, `AIRequest`, `Notification`, `ActivityLog`, `RefreshToken`, `Certificate`, `Subscription`, `Recommendation`.

- **Course**
  - Fields: `id`, `title`, `description`, `level`, `price`, `thumbnailUrl`, `status`, `teacherId`, timestamps.
  - Relations:
    - N–1 với `User` (teacher).
    - 1–N với `Lesson`, `Enrollment`, `Certificate`, `Recommendation`.

- **Lesson**
  - Fields: `id`, `title`, `videoUrl`, `content`, `orderIndex`, `duration`, `courseId`, timestamps.
  - Relations:
    - N–1 với `Course`.
    - 1–N với `Quiz`, `LessonProgress`.

- **Enrollment**
  - Fields: `id`, `userId`, `courseId`, `progress`, `status`, `enrolledAt`.
  - Relations:
    - N–1 với `User`.
    - N–1 với `Course`.
  - Unique: `(userId, courseId)`.

- **LessonProgress**
  - Fields: `id`, `userId`, `lessonId`, `isCompleted`, `completedAt`.
  - Relations:
    - N–1 với `User`.
    - N–1 với `Lesson`.
  - Unique: `(userId, lessonId)`.

- **Quiz**
  - Fields: `id`, `title`, `lessonId`, `createdAt`.
  - Relations:
    - N–1 với `Lesson`.
    - 1–N với `Question`, `Submission`.

- **Question**
  - Fields: `id`, `quizId`, `type`, `content`, `correctAnswer`, `score`.
  - Relations:
    - N–1 với `Quiz`.

- **Submission**
  - Fields: `id`, `userId`, `quizId`, `answer`, `score`, `aiFeedback`, `submittedAt`.
  - Relations:
    - N–1 với `User`.
    - N–1 với `Quiz`.
  - Unique: `(userId, quizId)`.

- **AIRequest**
  - Fields: `id`, `userId`, `type`, `prompt`, `response`, `tokens`, `cost`, `createdAt`.
  - Relations:
    - N–1 với `User`.

- **Notification**
  - Fields: `id`, `userId`, `type`, `content`, `isRead`, `createdAt`.
  - Relations:
    - N–1 với `User`.

- **ActivityLog**
  - Fields: `id`, `userId`, `action`, `entity`, `entityId`, `metadata`, `createdAt`.
  - Relations:
    - N–1 với `User`.

- **RefreshToken**
  - Fields: `id`, `token`, `userId`, `expiredAt`, `isRevoked`, `createdAt`.
  - Relations:
    - N–1 với `User`.

- **Certificate**
  - Fields: `id`, `userId`, `courseId`, `issuedAt`.
  - Relations:
    - N–1 với `User`.
    - N–1 với `Course`.
  - Unique: `(userId, courseId)`.

- **Subscription**
  - Fields: `id`, `userId`, `plan`, `status`, `startedAt`, `endedAt`.
  - Relations:
    - N–1 với `User`.

- **Recommendation**
  - Fields: `id`, `userId`, `courseId`, `score`, `reason`.
  - Relations:
    - N–1 với `User`.
    - N–1 với `Course`.

---

### ERD (Mermaid)

```mermaid
erDiagram
  User {
    string id
    string email
    string password
    string fullName
    string avatarUrl
    string role
    string status
    boolean isVerified
  }

  RefreshToken {
    string id
    string token
    string userId
    datetime expiredAt
    boolean isRevoked
  }

  Course {
    string id
    string title
    string description
    string level
    float price
    string thumbnailUrl
    string status
    string teacherId
  }

  Lesson {
    string id
    string title
    string videoUrl
    string content
    int orderIndex
    int duration
    string courseId
  }

  Enrollment {
    string id
    string userId
    string courseId
    float progress
    string status
  }

  LessonProgress {
    string id
    string userId
    string lessonId
    boolean isCompleted
  }

  Quiz {
    string id
    string title
    string lessonId
  }

  Question {
    string id
    string quizId
    string type
    string content
    string correctAnswer
    float score
  }

  Submission {
    string id
    string userId
    string quizId
    string answer
    float score
    string aiFeedback
  }

  AIRequest {
    string id
    string userId
    string type
    string prompt
    string response
    int tokens
    float cost
  }

  Notification {
    string id
    string userId
    string type
    string content
    boolean isRead
  }

  ActivityLog {
    string id
    string userId
    string action
    string entity
    string entityId
  }

  Certificate {
    string id
    string userId
    string courseId
  }

  Subscription {
    string id
    string userId
    string plan
    string status
  }

  Recommendation {
    string id
    string userId
    string courseId
    float score
    string reason
  }

  User ||--o{ Course : "teaches"
  User ||--o{ Enrollment : "enrolls"
  User ||--o{ Submission : "submits"
  User ||--o{ LessonProgress : "progress"
  User ||--o{ AIRequest : "ai requests"
  User ||--o{ Notification : "receives"
  User ||--o{ ActivityLog : "activities"
  User ||--o{ RefreshToken : "tokens"
  User ||--o{ Certificate : "certificates"
  User ||--o{ Subscription : "subscriptions"
  User ||--o{ Recommendation : "recommendations"

  Course ||--o{ Lesson : "has"
  Course ||--o{ Enrollment : "enrollments"
  Course ||--o{ Certificate : "certificates"
  Course ||--o{ Recommendation : "recommendations"

  Lesson ||--o{ Quiz : "has"
  Lesson ||--o{ LessonProgress : "progress"

  Quiz ||--o{ Question : "has"
  Quiz ||--o{ Submission : "submissions"

  Enrollment }o--|| User : "user"
  Enrollment }o--|| Course : "course"

  LessonProgress }o--|| User : "user"
  LessonProgress }o--|| Lesson : "lesson"

  Submission }o--|| User : "user"
  Submission }o--|| Quiz : "quiz"
```

