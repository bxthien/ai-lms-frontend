import { apiGet, apiPost, apiPatch } from "../client";

export const enrollmentsApi = {
  enroll: (courseId: string) =>
    apiPost<unknown>(`/courses/${courseId}/enroll`),
  myEnrollments: () => apiGet<unknown[]>("/me/enrollments"),
  completeLesson: (lessonId: string) =>
    apiPatch<unknown>(`/lessons/${lessonId}/complete`),
};
