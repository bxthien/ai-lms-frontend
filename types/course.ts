import type { User } from "./user";
import type { Quiz } from "./quiz";

export enum CourseLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}

export enum CourseStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

export interface Course {
  id: string;
  title: string;
  description: string;
  level: CourseLevel;
  price: number;
  thumbnailUrl?: string | null;
  status: CourseStatus;
  teacherId: string;
  teacher?: User;
  lessons?: Lesson[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Lesson {
  id: string;
  title: string;
  videoUrl?: string | null;
  content: string;
  orderIndex: number;
  duration: number;
  courseId: string;
  course?: Course;
  quizzes?: Quiz[];
  createdAt?: string;
  updatedAt?: string;
}
