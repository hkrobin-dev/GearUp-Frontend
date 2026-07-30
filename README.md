# GearUp Frontend 🏋️

Next.js (App Router) + TypeScript + Tailwind CSS frontend for the GearUp gear rental platform. Consumes the GearUp backend API (Express + Prisma + Stripe).

This README is written as a **complete step-by-step guide** — follow it top to bottom.

---

## 0. Prerequisites

Same as the backend project — Node.js 18+, Git, VS Code, a GitHub account. If you already set these up for the backend, skip ahead.

You'll also need your **backend's live URL** (e.g. `https://gearup-backend-seqn.onrender.com`) and your **Stripe publishable key** (different from the secret key — starts with `pk_test_`, found in the same Stripe dashboard page as the secret key).

---

## 1. Install dependencies

```bash
npm install
```

## 2. Set up environment variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_API_URL` | Your deployed backend URL + `/api`, e.g. `https://gearup-backend-seqn.onrender.com/api` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Your Stripe **publishable** key (`pk_test_...`) from the Stripe dashboard |

## 3. Run locally

```bash
npm run dev
```

Open http://localhost:3000 — you should see the GearUp homepage, pulling live gear data from your backend.

## 4. Update backend redirect URLs (important!)

Your backend's Stripe payment flow redirects back to the **frontend** after checkout. Update these two environment variables on your **backend's** Render dashboard (Environment tab):

```
CLIENT_SUCCESS_URL=https://YOUR-FRONTEND-URL.vercel.app/payment/success
CLIENT_CANCEL_URL=https://YOUR-FRONTEND-URL.vercel.app/payment/cancel
```

(You'll fill in the real Vercel URL after Step 6 — come back and update this once you have it.)

## 5. Push to GitHub

```bash
git init
git add .
git commit -m "chore: initial Next.js frontend setup"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/gearup-frontend.git
git push -u origin main
```

Make at least 20 meaningful commits over the course of development (this is graded) — e.g. `feat: add gear filter sidebar`, `fix: resolve stripe redirect loop`, `feat: add role-based middleware`.

## 6. Deploy to Vercel

1. Go to **https://vercel.com**, sign up/log in with GitHub
2. **Add New → Project** → import your `gearup-frontend` repo
3. Framework preset: Next.js (auto-detected)
4. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_API_URL` = your backend URL + `/api`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = your Stripe publishable key
5. Click **Deploy**
6. Once live, copy your Vercel URL (e.g. `https://gearup-frontend.vercel.app`) and go back to **Step 4** to update your backend's `CLIENT_SUCCESS_URL` / `CLIENT_CANCEL_URL`, then redeploy the backend.

## 7. Test the full flow live

1. Visit your live Vercel URL
2. Register as a Customer, then in another session/incognito, register as a Provider
3. As Provider: add gear
4. As Customer: browse, rent gear, pay via Stripe (test card `4242 4242 4242 4242`)
5. Confirm you land on `/payment/success` and the order shows as `PAID`
6. As Provider: mark picked up → returned
7. As Customer: leave a review
8. Log in as Admin (your backend's seeded admin credentials) → check `/dashboard/admin`

## 8. Record your demo video (7-10 min)

Cover: architecture overview, all 3 roles via the actual UI, CRUD via UI, form validation errors, full payment flow (click Pay → Stripe → success page), and one technical challenge (e.g. "role-based route protection via Next.js Middleware reading JWT + role from cookies").

---

## Project Structure

```
src/
  app/                      # Next.js App Router pages
    auth/                   # register, login
    gear/                   # public browse + detail
    dashboard/
      customer/             # overview, orders, orders/[id]/pay, payments
      provider/             # overview, gear (CRUD), orders
      admin/                # overview, users, gear, rentals
    payment/                # success, cancel
  components/
    ui/                     # Button, Input, Select, StatusBadge, etc.
    layout/                 # Navbar, Footer, DashboardSidebar, DashboardShell
    gear/                   # GearCard, GearFilters, RentNowForm, ReviewList
    provider/               # GearForm (add/edit)
    customer/               # OrderCard, ReviewForm
  lib/
    api/                    # React Query hooks, one file per resource
    schemas/                # Zod schemas for every form
    api-client.ts           # Axios instance + JWT interceptor + error normalization
    utils.ts
  store/
    auth-store.ts           # Zustand store, JWT in cookies for middleware
  middleware.ts              # Role-based route protection
API_INTEGRATION.md          # Component-to-endpoint mapping (mandatory doc)
```

## Roles & Route Protection

Routes under `/dashboard/customer`, `/dashboard/provider`, `/dashboard/admin` are protected by `src/middleware.ts`, which reads the `gearup_token` and `gearup_role` cookies:
- No token → redirected to `/auth/login?redirect=<original path>`
- Wrong role for the section → redirected to their own dashboard

## Troubleshooting

- **CORS errors in the browser console** → make sure `NEXT_PUBLIC_API_URL` matches your backend exactly (including `/api`), and that your backend's CORS middleware allows your frontend's origin (the backend's `cors()` call allows all origins by default, so this should already work).
- **Stripe checkout doesn't redirect back correctly** → double-check `CLIENT_SUCCESS_URL` / `CLIENT_CANCEL_URL` on the **backend** point to your **frontend's** `/payment/success` and `/payment/cancel` routes, not the backend's own URL.
- **Middleware redirects in a loop** → clear cookies for your site and log in again; this usually means a stale/invalid `gearup_role` cookie.
- **Images not loading** → `next.config.ts` allows any `https` remote host by default so provider-supplied image URLs work without extra config.
