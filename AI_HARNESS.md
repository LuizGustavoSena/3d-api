# 3D API - AI Development Harness

This document describes the architecture, conventions, and patterns used in this project. AI agents must follow these rules when creating or modifying code.

## Architecture Overview

**Clean Architecture / Layered Architecture** with strict separation of concerns:

```
src/
├── domain/           # Domain Layer (Enterprise Business Rules)
│   ├── constants/    # Application-wide constants & enums
│   ├── errors/       # Custom error classes
│   ├── models/       # Domain entities (interfaces)
│   └── use-cases/    # Use case interfaces (contracts)
├── data/             # Data Layer (Application Business Rules)
│   ├── protocols/    # Interfaces for external dependencies
│   └── use-cases/    # Use case implementations
├── infraestructure/  # Infrastructure Layer (Frameworks & Drivers)
│   ├── encrypt/      # Encryption implementations
│   ├── jwt/          # JWT implementations
│   ├── repositories/ # Database implementations (Prisma)
│   ├── storage/      # File storage implementations (AWS S3)
│   ├── uuid/         # UUID implementations
│   └── validations/  # Validation schemas (Zod)
└── main/             # Main/Application Layer (Interface Adapters)
    ├── controller/   # HTTP Controllers
    ├── factories/    # Dependency Injection Factories
    ├── middlewares/  # Express Middlewares
    └── routes/       # Route definitions
```

## Dependency Rule

**Dependencies point inward**: `main` → `data` → `domain` ← `infraestructure`

- Domain has zero external dependencies
- Data depends only on Domain
- Infrastructure implements Data protocols
- Main composes everything via Factories

## Naming Conventions

| Type | Convention | Examples |
|------|------------|----------|
| Interfaces | `I` prefix + PascalCase | `IEncrypt`, `IUserRepository`, `IJwt`, `IStorage`, `IUuid` |
| Domain Models | `I` prefix + PascalCase | `IUser`, `IProduct` |
| Use Cases | `{Action}{Entity}UseCase` | `CreateUserUseCase`, `LoginUserUseCase`, `CreateProductUseCase` |
| Controllers | `{Action}{Entity}Controller` | `CreateUserController`, `LoginUserController`, `CreateProductController` |
| Repositories | `{Entity}Repository` | `UserRepository`, `ProductRepository` |
| Factories | `factory{Name}` (function) | `factoryCreateUserUseCase()`, `factoryUserRepository()` |
| Enums | PascalCase + `Enum` suffix | `StatusCodeEnum`, `AppErrorCodes` |
| Error Classes | PascalCase + `Error` suffix | `UnauthorizedUserError`, `UnprocessedEmailError` |
| Zod Schemas | `{name}Schema` + `type {Name}Schema = z.infer<...>` | `createUserSchema`, `CreateUserSchema` |
| Files | kebab-case with descriptive suffix | `create-user.use-case.ts`, `login-user.interface.ts` |
| Folders | kebab-case, singular for entities | `user/`, `product/`, `encrypt/`, `repositories/` |

## Core Patterns

### 1. Interface Segregation (Protocols)

All external dependencies defined as interfaces in `src/data/protocols/`:

```typescript
// src/data/protocols/encrypt/index.ts
export interface IEncrypt {
    encrypt(data: string): string;
    decrypt(data: string): string;
}
```

### 2. Use Case Implementation

```typescript
// src/data/use-cases/user/create-user.use-case.ts
import { RequestCreateUser, ResponseCreateUser } from "../../../domain/use-cases/user/create-user.use-case.interface";
import { IUsecase } from "../../../domain/use-cases/use-cases.interface";
import { IUserRepository } from "../../protocols/repositories/user";
import { IEncrypt } from "../../protocols/encrypt";
import { IUuid } from "../../protocols/uuid";
import { UnprocessedEmailError } from "../../../domain/errors/user/unprocessed-email.error";

export class CreateUserUseCase implements IUsecase<RequestCreateUser, ResponseCreateUser> {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly uuid: IUuid,
        private readonly encrypt: IEncrypt,
    ){};

    async execute(params: RequestCreateUser): Promise<ResponseCreateUser> {
        // Implementation
    }
}
```

### 3. Abstract Controller with Zod Validation

```typescript
// src/main/controller/index.ts
export abstract class Controller<T> {
    protected abstract schema: ZodType<T>;

    async execute(req: Request, res: Response): Promise<Response> {
        const data = this.schema.parse(req);
        const response = await this.handle(data);
        return res.status(response.statusCode).json(response.data);
    }

    protected abstract handle(data: T): Promise<IHttpResponse>;
}

// Usage
export class CreateUserController extends Controller<CreateUserSchema> {
    protected schema = createUserSchema;

    constructor(private readonly createUserUseCase: CreateUserUseCase) { super(); }

    protected async handle(data: CreateUserSchema): Promise<IHttpResponse> {
        const user = await this.createUserUseCase.execute(data.body);
        return created(user);
    }
}
```

### 4. Factory Pattern for DI

```typescript
// src/main/factories/use-cases/user/create.factory.ts
export function factoryCreateUserUseCase() {
    return new CreateUserUseCase(
        factoryUserRepository(),
        factoryUuid(),
        factoryEncrypt(),
    );
}

// src/main/factories/controllers/user/create.factory.ts
export function factoryCreateUserController() {
    const useCase = factoryCreateUserUseCase();
    return new CreateUserController(useCase);
}

// Route wiring
publicUserRouter.post('/create', factoryController(factoryCreateUserController()));
```

### 5. Repository Pattern

```typescript
// Protocol
export interface IUserRepository {
    create(user: IUser): Promise<void>;
    findByEmail(email: string): Promise<IUser>;
    updateRefreshtoken(params: UpdateRefreshtokenParams): Promise<void>;
}

// Implementation
export class UserRepository implements IUserRepository {
    constructor(private readonly prisma: PrismaClient) {};

    async create(user: IUser): Promise<void> { /* ... */ }
    async findByEmail(email: string): Promise<IUser> { /* ... */ }
    async updateRefreshtoken(params: UpdateRefreshtokenParams): Promise<void> { /* ... */ }
}
```

### 6. Error Handling

```typescript
// Base error
export class AppError extends Error {
    public readonly statusCode: number;
    public readonly code: string;
    public readonly details?: ErrorDetails;

    constructor(message: string, statusCode: StatusCodeEnum, code: AppErrorCodes, details?: ErrorDetails) {
        super(message);
        this.name = 'AppError';
        this.statusCode = statusCode;
        this.code = code;
        this.details = details;
    }
}

// Specific errors
export class UnauthorizedUserError extends AppError {
    constructor() {
        super('Usuário não autorizado', StatusCodeEnum.UNAUTHORIZED, AppErrorCodes.UNAUTHORIZED_USER);
        this.name = 'UnauthorizedUserError';
    }
}
```

### 7. Environment Validation (Zod)

```typescript
// src/infraestructure/validations/zod/env.ts
const schema = z.object({
    DATABASE_URL: z.string(),
    SECRET_KEY_TOKEN: z.string(),
    SECRET_KEY_ENCRYPT: z.string(),
    SECRET_IV_ENCRYPT: z.string(),
    NODE_ENV: z.enum(['dev', 'prd']),
    PORT: z.coerce.number().default(3000),
    S3_BUCKET: z.string(),
    S3_ACCESS_KEY_ID: z.string(),
    S3_SECRET_ACCESS_KEY: z.string(),
    S3_REGION: z.string(),
});

const _env = schema.safeParse({ ...process.env });

if (!_env.success) {
    throw new InvalidEnvError(JSON.stringify(_env.error.format()));
}

export const env = _env.data;
```

## File Creation Rules

### Adding a New Entity (e.g., "Order")

1. **Domain Model** → `src/domain/models/order/index.ts`
   ```typescript
   export interface IOrder {
       id: string;
       // fields...
   }
   ```

2. **Repository Protocol** → `src/data/protocols/repositories/order/index.ts`
   ```typescript
   import { IOrder } from "../../../../domain/models/order";
   export interface IOrderRepository {
       create(order: IOrder): Promise<void>;
       findById(id: string): Promise<IOrder>;
   }
   ```

3. **Use Case Interfaces** → `src/domain/use-cases/order/`
   - `create-order.interface.ts` (Request/Response types)
   - `list-orders.interface.ts`

4. **Use Case Implementation** → `src/data/use-cases/order/`
   - `create-order.use-case.ts`
   - `list-orders.use-case.ts`

5. **Repository Implementation** → `src/infraestructure/repositories/mysql/order/order.repository.ts`

6. **Validation Schema** → `src/infraestructure/validations/zod/order/create.schema.ts`

7. **Controller** → `src/main/controller/order/create.controller.ts`

8. **Factories** → `src/main/factories/`
   - `repositories/mysql/order/order.factory.ts`
   - `use-cases/order/create.factory.ts`
   - `controllers/order/create.controller.ts`

9. **Routes** → `src/main/routes/public/order/index.router.ts`

10. **Prisma Schema** → `prisma/schema.prisma` + migration

## Code Style Rules

- **TypeScript** with ES modules (`"type": "module"` in package.json)
- **Strict mode** enabled in tsconfig
- **Private readonly** for constructor-injected dependencies
- **Async/await** for all async operations
- **Early returns** for error conditions
- **No comments** unless explicitly requested
- **Single responsibility** per file/class
- **Explicit return types** for public methods
- **Zod** for all input validation
- **Factory functions** (not classes) for DI composition

## HTTP Response Helpers

```typescript
// src/main/controller/index.ts
export function created(data?: any): IHttpResponse {
    return { data, statusCode: StatusCodeEnum.CREATED };
}
export function ok(data?: any): IHttpResponse {
    return { data, statusCode: StatusCodeEnum.OK };
}
// Also: noContent(), badRequest(), etc.
```

## Status Codes (src/data/protocols/http/index.ts)

```typescript
export enum StatusCodeEnum {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    PRECONDITION_FAILED = 412,
    SERVER_ERROR = 500
}
```

## Error Codes (src/domain/constants/app-error/index.ts)

```typescript
export enum AppErrorCodes {
    UNPROCESSED_EMAIL = 'UNPROCESSED_EMAIL',
    UNAUTHORIZED_USER = 'UNAUTHORIZED_USER',
    // Add new codes here
}
```

## Testing

- **Vitest** for unit/integration tests
- **vitest-mock-extended** for mocking interfaces
- Test files: `*.test.ts` alongside source files
- Mock protocols, test use cases in isolation

## Key Dependencies

| Category | Packages |
|----------|----------|
| Runtime | express, cors, helmet, express-rate-limit, toobusy-js |
| Auth | jwt-simple, crypto |
| Database | @prisma/client, @prisma/adapter-pg |
| Storage | @aws-sdk/client-s3, @aws-sdk/s3-request-presigner |
| Validation | zod |
| Utils | uuid, dotenv |
| Dev | typescript, tsx, vitest, eslint, prettier, prisma |

## Commands

```bash
npm run dev      # Development with hot reload (tsx watch)
npm run build    # TypeScript compile (tsc)
npm start        # Run compiled JS
npm test         # Run tests (vitest)
npx prisma migrate dev  # Create/run migrations
npx prisma generate     # Generate Prisma client
```

## Project-Specific Notes

- **Authentication**: JWT (HS512) with access + refresh tokens
- **Passwords**: AES-256-CBC encryption (not hashing - by design)
- **Database**: PostgreSQL via Prisma with Pg adapter
- **File Storage**: AWS S3 with presigned URLs
- **UUID**: v4 via uuid package
- **Env**: Validated at startup via Zod, throws on invalid config
- **CORS/Rate Limit/Helmet**: Configured in main/app.ts (currently minimal)

## Anti-Patterns to Avoid

- ❌ Direct Prisma usage in use cases (use Repository protocol)
- ❌ Importing infrastructure in domain/data layers
- ❌ Business logic in controllers (delegate to use cases)
- ❌ Skipping Zod validation in controllers
- ❌ Throwing raw Errors (use AppError subclasses)
- ❌ Circular dependencies between layers
- ❌ `any` type (use proper interfaces)
- ❌ Mutating function parameters