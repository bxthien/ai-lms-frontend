# Cấu trúc thư mục – AI-LMS Frontend

Quy ước tổ chức code theo domain và vai trò, dễ mở rộng và bảo trì.

---

## Tổng quan

```
app/                    # Next.js App Router – chỉ routing & layout
config/                  # Cấu hình app (env, constants)
contexts/                # Global React context (auth)
features/                # Theo từng chức năng (auth, courses, …)
components/              # Component dùng chung (ui, layout)
hooks/                   # Custom hooks dùng chung
lib/                     # Core: API client, auth storage, utils
types/                   # TypeScript types theo domain
docs/                    # Tài liệu (PRD, ERD, API, …)
```

---

## Chi tiết

### `app/`
- Chỉ chứa route (page.tsx, layout.tsx) và file Next.js.
- Page gọn: gọi component từ `features/` hoặc `components/`, không gắn logic nghiệp vụ phức tạp trong page.

### `config/`
- **env.ts**: đọc biến môi trường (ví dụ `getBaseUrl()`).
- **constants.ts**: hằng số app (APP_NAME, ROUTES).
- Import: `import { ROUTES, getBaseUrl } from "@/config"`.

### `contexts/`
- Mỗi context một thư mục (ví dụ `auth/`).
- **AuthContext.tsx**: provider + hook (useAuth).
- **index.ts**: re-export. Import: `import { AuthProvider, useAuth } from "@/contexts/auth"`.

### `features/`
- Mỗi feature một thư mục (auth, courses, dashboard, …).
- Chứa component và logic thuộc feature đó.
- **auth/**: LoginForm, RegisterForm.
- Mở rộng: courses (CourseCard, CourseList), dashboard (DashboardCard), …
- Import: `import { LoginForm } from "@/features/auth"`.

### `components/`
- **ui/**: component giao diện cơ bản (Button, Input, Card). Có **index.ts** re-export.
- **layout/**: Header, Footer. Có **index.ts**.
- Import: `import { Button, Card } from "@/components/ui"` hoặc `import { Header } from "@/components/layout"`.

### `hooks/`
- Hook dùng chung (useAuth re-export từ context, sau này thêm useCourses, …).
- **index.ts** re-export. Import: `import { useAuth } from "@/hooks"`.

### `lib/`
- **api/**: client HTTP (client.ts), endpoints tách file (auth, users, courses, enrollments, quizzes, ai), **index.ts** gộp export.
- **auth/**: storage token (storage.ts), **index.ts** re-export.
- **utils/**: tiện ích (error.ts: getErrorMessage), **index.ts** re-export.
- Import API: `import { authApi, coursesApi, ApiClientError } from "@/lib/api"`.
- Import auth: `import { getAccessToken, clearAuth } from "@/lib/auth"`.

### `types/`
- Tách theo domain: **api.ts**, **user.ts**, **course.ts**, **enrollment.ts**, **quiz.ts**.
- **index.ts** re-export toàn bộ. Import: `import type { User, Course, ApiError } from "@/types"`.

---

## Quy tắc import

1. Dùng alias **@/** (trỏ gốc project).
2. Import types: `import type { X } from "@/types"`.
3. Mỗi thư mục có **index.ts** re-export để import gọn: `@/components/ui`, `@/contexts/auth`, `@/features/auth`, `@/lib/api`, `@/hooks`.
4. Trang (app) dùng ROUTES từ config thay vì hardcode path.
