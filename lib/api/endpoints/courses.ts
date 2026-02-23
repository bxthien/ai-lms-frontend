import type { Course } from "@/types";
import { apiGet, apiPost, apiPatch, apiDelete } from "../client";

export const coursesApi = {
  list: (params?: { level?: string; status?: string }) => {
    const search = params
      ? new URLSearchParams(params as Record<string, string>).toString()
      : "";
    return apiGet<Course[]>(`/courses${search ? `?${search}` : ""}`);
  },
  getById: (id: string) => apiGet<Course>(`/courses/${id}`),
  create: (body: {
    title: string;
    description: string;
    level: string;
    price: number;
    thumbnailUrl?: string;
  }) => apiPost<Course>("/courses", body),
  update: (
    id: string,
    body: Partial<{
      title: string;
      description: string;
      level: string;
      price: number;
      thumbnailUrl: string;
    }>
  ) => apiPatch<Course>(`/courses/${id}`, body),
  delete: (id: string) => apiDelete(`/courses/${id}`),
  publish: (id: string, body?: { publish: boolean }) =>
    apiPatch(`/courses/${id}/publish`, body ?? { publish: true }),
  addLesson: (
    courseId: string,
    body: {
      title: string;
      content: string;
      orderIndex: number;
      duration: number;
      videoUrl?: string;
    }
  ) => apiPost<unknown>(`/courses/${courseId}/lessons`, body),
  getLesson: (courseId: string, lessonId: string) =>
    apiGet<unknown>(`/courses/${courseId}/lessons/${lessonId}`),
};
