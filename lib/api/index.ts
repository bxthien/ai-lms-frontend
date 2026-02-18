/**
 * API client – re-export client + tất cả endpoints.
 */

export {
  ApiClientError,
  apiGet,
  apiPost,
  apiPatch,
  apiDelete,
  type RequestConfig,
} from "./client";

export { authApi } from "./endpoints/auth";
export { usersApi } from "./endpoints/users";
export { coursesApi } from "./endpoints/courses";
export { enrollmentsApi } from "./endpoints/enrollments";
export { quizzesApi } from "./endpoints/quizzes";
export { aiApi } from "./endpoints/ai";
