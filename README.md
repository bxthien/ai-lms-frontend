# AI-LMS Frontend

Frontend cho **AI-Powered Learning Management System**, xây dựng bằng **Next.js** (App Router), **TypeScript** và **Tailwind CSS v4**. Kết nối với backend NestJS (Phase 1) theo tài liệu trong `docs/`.

- **Tailwind CSS v4**: cấu hình CSS-first trong `app/globals.css` (`@import "tailwindcss"`, `@theme inline`). Toàn bộ UI dùng utility class Tailwind (emerald primary, zinc neutral, dark mode).

## Yêu cầu

- Node.js 18+
- pnpm (khuyến nghị: `corepack enable && corepack prepare pnpm@latest --activate`)

## Cài đặt

```bash
pnpm install
cp .env.example .env.local
# Chỉnh .env.local: NEXT_PUBLIC_API_URL trỏ tới backend (mặc định http://localhost:3001)
```

## Chạy dev

```bash
pnpm dev
```

Mở [http://localhost:3000](http://localhost:3000).

## Build & chạy production

```bash
pnpm build
pnpm start
```

## Cấu trúc dự án

- **`app/`** – Next.js App Router: routes, layout; page gọn, logic đưa vào features/components
- **`config/`** – Cấu hình: env (`getBaseUrl`), constants (`ROUTES`, `APP_NAME`)
- **`contexts/auth/`** – AuthProvider, useAuth
- **`features/auth/`** – LoginForm, RegisterForm (và sau này features khác: courses, dashboard)
- **`components/ui/`** – Button, Input, Card (có index re-export)
- **`components/layout/`** – Header (có index)
- **`hooks/`** – useAuth (re-export) và hooks dùng chung
- **`lib/api/`** – Client (client.ts) + endpoints tách file (auth, users, courses, …), index gộp export
- **`lib/auth/`** – Token storage (storage.ts)
- **`lib/utils/`** – getErrorMessage, tiện ích chung
- **`types/`** – Types theo domain (api, user, course, enrollment, quiz) + index re-export
- **`docs/`** – PRD, ERD, SCHEMA, API_NOTES, STRUCTURE (quy ước cấu trúc)

Chi tiết quy ước folder: xem **`docs/STRUCTURE.md`**.

## Tính năng đã có (Phase 1)

- **Auth**: Đăng ký, đăng nhập, JWT + refresh token (lưu localStorage), logout
- **Layout**: Header với nav (Trang chủ, Khóa học, Dashboard) và trạng thái đăng nhập
- **Dashboard**: Theo vai trò (Student / Teacher / Admin) – placeholder các link
- **API client**: `authApi`, `usersApi`, `coursesApi`, `enrollmentsApi`, `quizzesApi`, `aiApi`; tự gắn Bearer và refresh khi 401

## API backend (tham chiếu)

- Auth: `POST /auth/register`, `POST /auth/login`, `POST /auth/refresh`, `POST /auth/logout`
- Users: `GET /users/me`, `PATCH /users/me`, …
- Courses: `GET /courses`, `GET /courses/:id`, …
- Enrollments: `POST /courses/:id/enroll`, `GET /me/enrollments`, …
- Quizzes: `GET /lessons/:lessonId/quizzes`, `POST /quizzes/:id/submissions`, …
- AI: `POST /ai/generate-quiz`, `POST /ai/grade-essay`

Chi tiết xem `docs/API_NOTES.md`, `docs/SCHEMA.md`.

## Linting

```bash
pnpm lint
```
