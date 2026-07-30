# API Integration Map

This document maps every frontend component/page to the backend endpoint(s) it consumes.
Backend repo: see `NEXT_PUBLIC_API_URL` in `.env.local`.

## Auth

| Frontend | Component | Backend Endpoint |
|---|---|---|
| `/auth/register` | `app/auth/register/page.tsx` → `useRegister()` | `POST /api/auth/register` |
| `/auth/login` | `app/auth/login/page.tsx` → `useLogin()` | `POST /api/auth/login` |
| Navbar (session check) | `store/auth-store.ts` (persisted client-side, no polling) | `GET /api/auth/me` (available via `useMe()`, used for verification) |

## Public Gear Browsing

| Frontend | Component | Backend Endpoint |
|---|---|---|
| `/` | `components/gear/featured-gear.tsx` | `GET /api/gear` |
| `/gear` | `app/gear/page.tsx` + `components/gear/gear-filters.tsx` | `GET /api/gear` (search, category, minPrice, maxPrice, page, limit) |
| `/gear` (filter sidebar) | `components/gear/gear-filters.tsx` | `GET /api/categories` |
| `/gear/[id]` | `app/gear/[id]/page.tsx` | `GET /api/gear/:id` |

## Customer

| Frontend | Component | Backend Endpoint |
|---|---|---|
| Rent Now form on `/gear/[id]` | `components/gear/rent-now-form.tsx` | `POST /api/rentals` |
| `/dashboard/customer` | `app/dashboard/customer/page.tsx` | `GET /api/rentals` |
| `/dashboard/customer/orders` | `app/dashboard/customer/orders/page.tsx` + `order-card.tsx` | `GET /api/rentals` |
| `/dashboard/customer/orders/[id]/pay` | `app/dashboard/customer/orders/[id]/pay/page.tsx` | `GET /api/rentals/:id`, `POST /api/payments/create` |
| `/payment/success` | `app/payment/success/page.tsx` | `POST /api/payments/confirm` (with Stripe `session_id`) |
| `/payment/cancel` | `app/payment/cancel/page.tsx` | none (UI only, order remains unpaid) |
| `/dashboard/customer/payments` | `app/dashboard/customer/payments/page.tsx` | `GET /api/payments` |
| Review form (shown on RETURNED orders) | `components/customer/review-form.tsx` | `POST /api/reviews` |

## Provider

| Frontend | Component | Backend Endpoint |
|---|---|---|
| `/dashboard/provider` | `app/dashboard/provider/page.tsx` | `GET /api/provider/gear`, `GET /api/provider/orders` |
| `/dashboard/provider/gear` | `app/dashboard/provider/gear/page.tsx` | `GET /api/provider/gear`, `PUT /api/provider/gear/:id` (status toggle), `DELETE /api/provider/gear/:id` |
| `/dashboard/provider/gear/new` | `app/dashboard/provider/gear/new/page.tsx` + `components/provider/gear-form.tsx` | `POST /api/provider/gear`, `GET /api/categories` |
| `/dashboard/provider/gear/[id]/edit` | `app/dashboard/provider/gear/[id]/edit/page.tsx` | `GET /api/gear/:id`, `PUT /api/provider/gear/:id` |
| `/dashboard/provider/orders` | `app/dashboard/provider/orders/page.tsx` | `GET /api/provider/orders`, `PATCH /api/provider/orders/:id` |

## Admin

| Frontend | Component | Backend Endpoint |
|---|---|---|
| `/dashboard/admin` | `app/dashboard/admin/page.tsx` | `GET /api/admin/users`, `GET /api/admin/gear`, `GET /api/admin/rentals` |
| `/dashboard/admin/users` | `app/dashboard/admin/users/page.tsx` | `GET /api/admin/users`, `PATCH /api/admin/users/:id` |
| `/dashboard/admin/gear` | `app/dashboard/admin/gear/page.tsx` | `GET /api/admin/gear` |
| `/dashboard/admin/rentals` | `app/dashboard/admin/rentals/page.tsx` | `GET /api/admin/rentals` |

## Cross-cutting concerns

- **JWT storage**: token stored in a cookie (`gearup_token`) via `js-cookie` so Next.js Middleware (`src/middleware.ts`) can read it server-side for route protection. User profile cached in `localStorage` for fast UI hydration; role also duplicated into a `gearup_role` cookie for middleware role checks.
- **Request auth**: `lib/api-client.ts` is an Axios instance with a request interceptor that attaches `Authorization: Bearer <token>` to every call automatically.
- **Error normalization**: the same Axios instance has a response interceptor that unwraps the backend's `{ success, message, errorDetails }` shape into a consistent `{ message, errorDetails, status }` object thrown to calling code, so every `try/catch` + `toast.error(e.message)` pattern works uniformly across the app.
- **Server state**: all API reads/writes go through TanStack Query hooks in `lib/api/*.ts` (one file per resource), giving automatic caching, loading states, and cache invalidation on mutations (e.g. adding gear invalidates the provider gear list; updating an order invalidates both provider and customer order lists).
- **Route protection**: `src/middleware.ts` inspects the `gearup_token` / `gearup_role` cookies on every request to `/dashboard/*` and redirects unauthenticated users to `/auth/login` (preserving the intended destination via `?redirect=`), or redirects users with the wrong role to their own dashboard.
