import { apiGet, apiPost } from "../client";

export const quizzesApi = {
  getByLesson: (lessonId: string) =>
    apiGet<unknown[]>(`/lessons/${lessonId}/quizzes`),
  create: (lessonId: string, body: { title: string }) =>
    apiPost<unknown>(`/lessons/${lessonId}/quizzes`, body),
  addQuestion: (
    quizId: string,
    body: {
      type: string;
      content: string;
      correctAnswer?: string;
      score: number;
    }
  ) => apiPost<unknown>(`/quizzes/${quizId}/questions`, body),
  submit: (quizId: string, body: { answer: string }) =>
    apiPost<unknown>(`/quizzes/${quizId}/submissions`, body),
  mySubmission: (quizId: string) =>
    apiGet<unknown>(`/quizzes/${quizId}/submissions/me`),
};
