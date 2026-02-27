import { apiGet, apiPost, apiPatch } from "../client";

export const enrollmentsApi = {
  enroll: (courseId: string) => apiPost<unknown>(`/courses/${courseId}/enroll`),
  myEnrollments: () => apiGet<unknown[]>("/enrollments/me"),
  completeLesson: (lessonId: string) =>
    apiPatch<unknown>(`/lessons/${lessonId}/complete`),
};
