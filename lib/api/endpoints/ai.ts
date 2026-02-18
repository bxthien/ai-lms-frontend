import { apiPost } from "../client";

export const aiApi = {
  generateQuiz: (body: { lessonId: string; content?: string }) =>
    apiPost<unknown>("/ai/generate-quiz", body),
  gradeEssay: (body: { submissionId: string; answer: string }) =>
    apiPost<unknown>("/ai/grade-essay", body),
};
