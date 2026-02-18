/**
 * Types & enums theo SCHEMA backend (Prisma) và API_NOTES.
 * @see docs/SCHEMA.md, docs/API_NOTES.md
 */

export type { ApiError } from "./api";
export {
  UserRole,
  UserStatus,
  type User,
  type AuthTokens,
} from "./user";
export {
  CourseLevel,
  CourseStatus,
  type Course,
  type Lesson,
} from "./course";
export type { Enrollment, LessonProgress } from "./enrollment";
export {
  QuestionType,
  type Quiz,
  type Question,
  type Submission,
} from "./quiz";
