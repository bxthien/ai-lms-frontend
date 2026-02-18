### Prisma Schema – AI-LMS

Mã nguồn thực tế nằm trong `prisma/schema.prisma`. Bản dưới đây là snapshot để tiện đọc trong tài liệu.

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum UserRole {
  ADMIN
  TEACHER
  STUDENT
}

enum UserStatus {
  ACTIVE
  BANNED
}

enum CourseLevel {
  BEGINNER
  INTERMEDIATE
  ADVANCED
}

enum CourseStatus {
  DRAFT
  PUBLISHED
}

enum QuestionType {
  MCQ
  TEXT
}

enum AIRequestType {
  GENERATE_QUIZ
  GRADE_ESSAY
  RECOMMEND
}

////////////////////
/// USER & AUTH
////////////////////

model User {
  id            String @id @default(uuid())
  email         String @unique
  password      String
  fullName      String
  avatarUrl     String?
  role          UserRole
  status        UserStatus @default(ACTIVE)
  isVerified    Boolean @default(false)

  courses        Course[]        @relation("TeacherCourses")
  enrollments    Enrollment[]
  submissions    Submission[]
  lessonProgress LessonProgress[]
  aiRequests     AIRequest[]
  notifications  Notification[]
  activityLogs   ActivityLog[]
  refreshTokens  RefreshToken[]
  certificates   Certificate[]
  subscriptions  Subscription[]
  recommendations Recommendation[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  deletedAt DateTime?

  @@index([email])
}

model RefreshToken {
  id        String   @id @default(uuid())
  token     String   @unique
  userId    String
  expiredAt DateTime
  isRevoked Boolean  @default(false)

  user User @relation(fields: [userId], references: [id])

  createdAt DateTime @default(now())
}

////////////////////
/// COURSE DOMAIN
////////////////////

model Course {
  id           String @id @default(uuid())
  title        String
  description  String
  level        CourseLevel
  price        Float
  thumbnailUrl String?
  status       CourseStatus @default(DRAFT)

  teacherId String
  teacher   User   @relation("TeacherCourses", fields: [teacherId], references: [id])

  lessons        Lesson[]
  enrollments    Enrollment[]
  certificates   Certificate[]
  recommendations Recommendation[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  deletedAt DateTime?

  @@index([teacherId])
}

model Lesson {
  id         String @id @default(uuid())
  title      String
  videoUrl   String?
  content    String
  orderIndex Int
  duration   Int

  courseId String
  course   Course @relation(fields: [courseId], references: [id])

  quizzes        Quiz[]
  lessonProgress LessonProgress[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  deletedAt DateTime?

  @@index([courseId])
}

model Enrollment {
  id       String @id @default(uuid())
  userId   String
  courseId String

  progress Float @default(0)
  status   String @default("ACTIVE")

  user   User   @relation(fields: [userId], references: [id])
  course Course @relation(fields: [courseId], references: [id])

  enrolledAt DateTime @default(now())

  @@unique([userId, courseId])
  @@index([userId])
  @@index([courseId])
}

model LessonProgress {
  id       String @id @default(uuid())
  userId   String
  lessonId String

  isCompleted Boolean @default(false)
  completedAt DateTime?

  user   User   @relation(fields: [userId], references: [id])
  lesson Lesson @relation(fields: [lessonId], references: [id])

  @@unique([userId, lessonId])
}

////////////////////
/// ASSESSMENT
////////////////////

model Quiz {
  id       String @id @default(uuid())
  title    String
  lessonId String

  lesson     Lesson @relation(fields: [lessonId], references: [id])
  questions  Question[]
  submissions Submission[]

  createdAt DateTime @default(now())
}

model Question {
  id      String @id @default(uuid())
  quizId String
  type    QuestionType
  content String

  correctAnswer String?
  score         Float

  quiz Quiz @relation(fields: [quizId], references: [id])
}

model Submission {
  id     String @id @default(uuid())
  userId String
  quizId String

  answer     String
  score      Float?
  aiFeedback String?

  user User @relation(fields: [userId], references: [id])
  quiz Quiz @relation(fields: [quizId], references: [id])

  submittedAt DateTime @default(now())

  @@unique([userId, quizId])
}

////////////////////
/// AI DOMAIN
////////////////////

model AIRequest {
  id     String @id @default(uuid())
  userId String

  type   AIRequestType
  prompt String
  response String?

  tokens Int?
  cost   Float?

  user User @relation(fields: [userId], references: [id])

  createdAt DateTime @default(now())

  @@index([userId])
}

////////////////////
/// NOTIFICATION
////////////////////

model Notification {
  id      String @id @default(uuid())
  userId String

  type    String
  content String
  isRead  Boolean @default(false)

  user User @relation(fields: [userId], references: [id])

  createdAt DateTime @default(now())
}

////////////////////
/// SYSTEM
////////////////////

model ActivityLog {
  id       String @id @default(uuid())
  userId  String

  action   String
  entity   String
  entityId String
  metadata Json?

  user User @relation(fields: [userId], references: [id])

  createdAt DateTime @default(now())
}

////////////////////
/// ADVANCED
////////////////////

model Certificate {
  id       String @id @default(uuid())
  userId  String
  courseId String

  user   User   @relation(fields: [userId], references: [id])
  course Course @relation(fields: [courseId], references: [id])

  issuedAt DateTime @default(now())

  @@unique([userId, courseId])
}

model Subscription {
  id     String @id @default(uuid())
  userId String

  plan   String
  status String

  startedAt DateTime
  endedAt   DateTime?

  user User @relation(fields: [userId], references: [id])
}

model Recommendation {
  id       String @id @default(uuid())
  userId  String
  courseId String

  score  Float
  reason String

  user   User   @relation(fields: [userId], references: [id])
  course Course @relation(fields: [courseId], references: [id])
}
```

