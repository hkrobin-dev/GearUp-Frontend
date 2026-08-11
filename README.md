# GearUp 🏋️ — Frontend

Rent Sports & Outdoor Gear Instantly. Built with Next.js (App Router), TypeScript, Tailwind CSS, React Hook Form + Zod, TanStack Query, Framer Motion, and Stripe.

## 🔗 Live Links

| Item | Link |
|---|---|
| **Live Frontend** | https://gear-up-neon.vercel.app |
| **Frontend GitHub Repo** | https://github.com/hkrobin-dev/GearUp-Frontend |
| **Backend API (Live)** | https://gearup-backend-seqn.onrender.com/api |
| **Backend GitHub Repo** | https://github.com/hkrobin-dev/GearUp |

## 🔑 Demo Credentials

| Role | Email | Password |
|---|---|---|
| **Admin** | admin@gearup.com | Admin@123 |
| **Provider** | provider@gearup.com | Provider@123 |
| **Customer** | Register a new account, or use "Demo Login" on the login page | — |

Google Sign-In is also available on the Login page (creates a Customer account automatically).

## ✨ Features

- **Public**: Home page with featured gear, category browsing, gear detail pages with image gallery and reviews
- **Gear Listing**: Search, category filter, price range filter, sorting, pagination
- **Auth**: Email/password registration & login with Zod validation, Google OAuth login, role selection (Customer/Provider) at signup
- **Customer Dashboard**: Order history, Stripe payment flow (checkout → success/cancel pages), payment history, leave reviews, profile management
- **Provider Dashboard**: Gear inventory CRUD, incoming order management with status updates, search/filter/pagination on orders
- **Admin Dashboard**: User management (suspend/activate), gear moderation, rental oversight, category management, analytics charts
- **Role-based route protection** via Next.js Middleware
- **Dark mode** support across the app
- **Responsive** design (mobile, tablet, desktop)

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 (App Router) | Framework, routing, middleware |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling |
| React Hook Form + Zod | Form state & validation |
| TanStack Query | Server state & data fetching |
| Zustand | Client auth state |
| Framer Motion | Animations |
| Stripe | Payment gateway |
| Axios | HTTP client |

## 📁 Project Structure
