import type { User } from "./user";
import type { Course } from "./course";

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  progress: number;
  status: string;
  enrolledAt: string;
  user?: User;
  course?: Course;
}

export interface LessonProgress {
  id: string;
  userId: string;
  lessonId: string;
  isCompleted: boolean;
  completedAt?: string | null;
}
