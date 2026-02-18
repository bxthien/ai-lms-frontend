# OpenAPI / Swagger – Các lựa chọn đã áp dụng và gợi ý

Dự án dùng **@nestjs/swagger** để phát hành tài liệu OpenAPI và Swagger UI.

---

## Đã triển khai

- **Swagger UI**: truy cập tại `GET /docs` khi chạy server.
- **OpenAPI JSON**: `GET /docs-json` – dùng cho client codegen hoặc import vào Postman/Insomnia.
- **Tags**: Nhóm endpoint theo domain (auth, users, courses, enrollments, quizzes, ai, health, root).
- **Decorators**:
  - Controller: `@ApiTags`, `@ApiOperation`, `@ApiResponse`, `@ApiBearerAuth` (cho route cần JWT).
  - DTO: `@ApiProperty` / `@ApiPropertyOptional` cho request/response schema.
- **Ghi file spec**: Set biến môi trường `WRITE_OPENAPI_SPEC=true` khi start app để ghi `openapi.json` ra thư mục gốc project (phục vụ CI hoặc generate client).

---

## Các option bạn có thể bật thêm

### 1. Thêm server URL (staging, production)

Trong `main.ts`, sau khi `DocumentBuilder` gọi `.addBearerAuth()`:

```ts
.addServer('https://api.example.com', 'Production')
.addServer('https://staging-api.example.com', 'Staging')
.build();
```

Hoặc đọc từ env: `configService.get('API_BASE_URL')` rồi truyền vào `.addServer(...)`.

### 2. Validation DTO bằng class-validator

- Cài: `class-validator`, `class-transformer`.
- Trong DTO thêm `@IsEmail()`, `@MinLength(6)`, … (đã có ví dụ trong comment tại auth DTO).
- Trong `main.ts`: `app.useGlobalPipes(new ValidationPipe({ whitelist: true }));`.
- OpenAPI vẫn dùng `@ApiProperty`; class-validator giúp reject request không hợp lệ trước khi vào controller.

### 3. Plugin Swagger CLI (tự sinh schema từ TypeScript)

Trong `nest-cli.json`:

```json
{
  "compilerOptions": {
    "plugins": [{ "name": "@nestjs/swagger", "options": { "classValidatorShim": true } }]
  }
}
```

- Nhiều DTO sẽ tự lên schema mà không cần ghi `@ApiProperty` đầy đủ (vẫn nên dùng cho example/description).
- Cần `class-validator` nếu bật `classValidatorShim`.

### 4. Nhiều document (public vs internal)

Tách hai document: một cho API public, một cho admin/internal:

```ts
const publicDoc = SwaggerModule.createDocument(app, publicConfig);
const internalDoc = SwaggerModule.createDocument(app, internalConfig, { include: [AdminModule, InternalModule] });
SwaggerModule.setup('docs', app, publicDoc);
SwaggerModule.setup('docs-internal', app, internalDoc);
```

### 5. Bảo mật spec (chỉ khi đã login)

- Có thể wrap route `/docs` và `/docs-json` bằng guard (ví dụ JwtAuthGuard) hoặc middleware kiểm tra API key.
- Hoặc tắt Swagger trong production: chỉ gọi `SwaggerModule.setup(...)` khi `NODE_ENV !== 'production'`.

### 6. Export file YAML

Sau khi `createDocument`:

```ts
const yaml = require('js-yaml');
fs.writeFileSync('openapi.yaml', yaml.dump(document));
```

Cần cài `js-yaml`. Hữu ích nếu tool (Redoc, codegen) yêu cầu file `.yaml`.

### 7. Response schema rõ ràng

Với endpoint trả về object cố định (ví dụ login trả `{ accessToken, refreshToken, user }`):

- Tạo class DTO response, thêm `@ApiProperty`.
- Trong controller: `@ApiResponse({ status: 200, type: LoginResponseDto })`.
- Swagger sẽ hiển thị đúng schema response.

---

## Tóm tắt

| Nhu cầu | Cách làm |
|--------|----------|
| Xem API trên trình duyệt | Mở `GET /docs` (đã có). |
| Lấy file OpenAPI JSON | `GET /docs-json` hoặc `WRITE_OPENAPI_SPEC=true` để ghi `openapi.json`. |
| Generate client (TS/JS, React Query, v.v.) | Dùng `openapi.json` với openapi-generator hoặc Orval. |
| Validate body/query | Thêm class-validator + ValidationPipe (xem mục 2). |
| Tự động schema từ type | Bật Swagger CLI plugin (mục 3). |
| Tách docs public vs nội bộ | Nhiều document (mục 4). |

Nếu bạn muốn áp dụng thêm option nào (ví dụ validation, plugin, hoặc export YAML), có thể nói rõ để triển khai từng bước.
