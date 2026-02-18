import type { Lesson } from "./course";

export enum QuestionType {
  MCQ = "MCQ",
  TEXT = "TEXT",
}

export interface Quiz {
  id: string;
  title: string;
  lessonId: string;
  lesson?: Lesson;
  questions?: Question[];
  createdAt?: string;
}

export interface Question {
  id: string;
  quizId: string;
  type: QuestionType;
  content: string;
  correctAnswer?: string | null;
  score: number;
}

export interface Submission {
  id: string;
  userId: string;
  quizId: string;
  answer: string;
  score?: number | null;
  aiFeedback?: string | null;
  submittedAt: string;
}
