# GBrain Technologies Website

Corporate website for GBrain Technologies Company Limited, built with Next.js 15, TypeScript, Tailwind CSS v4 and next-intl (English and Kiswahili).

## Tech Stack

- Next.js 15 App Router, React 18, TypeScript strict mode
- Tailwind CSS v4 with `tailwind.config.ts`
- next-intl 3 for localized routing and messages
- Zod validation for API routes
- Resend for contact and newsletter delivery
- Vitest + React Testing Library for unit tests
- Playwright for end-to-end tests
- GitHub Actions for CI

## Getting Started

Prerequisites: Node.js 24 and npm 11.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

The default locale has no prefix, so English is served at `/`. Kiswahili is served under `/sw` with localized route names.

## Scripts

| Command                | Description                     |
| ---------------------- | ------------------------------- |
| `npm run dev`          | Start development server        |
| `npm run build`        | Build for production            |
| `npm run start`        | Start production server         |
| `npm run lint`         | Run ESLint                      |
| `npm run typecheck`    | Run TypeScript compiler check   |
| `npm test`             | Run Vitest unit tests           |
| `npm run test:e2e`     | Run Playwright end-to-end tests |
| `npm run format`       | Format code with Prettier       |
| `npm run format:check` | Check formatting                |

## Project Structure

```text
i18n.ts                    Routing, middleware and request config
src/i18n/navigation.ts     Localized Link/router helpers
src/content/docs.ts        Product documentation content
src/content/blog.ts        Blog post content
src/app/[locale]/          Localized pages and API routes
src/components/            Layout, sections, product and UI components
src/messages/              en.json and sw.json translations
tests/e2e/                 Playwright specs
```

## Internationalization

- Locales: `en` (default), `sw`
- Locale prefix: `as-needed`
- Add or update routes in `i18n.ts` → `routing.pathnames`
- Use `useTranslations` in client components and `getTranslations` in server components
- Import `Link` from `@/i18n/navigation` for internal links

## Environment Variables

See `.env.example`. Production requires:

- `NEXT_PUBLIC_SITE_URL` — canonical site URL
- `CONTACT_TO_EMAIL` — contact form destination
- `RESEND_API_KEY` — Resend API key
- `RESEND_AUDIENCE_ID` — newsletter audience ID
- `RESEND_FROM_EMAIL` — verified sender identity
- `SESSION_SECRET` — long random secret used to sign account sessions

Optional:

- `NEXT_PUBLIC_PHONELINK_DASHBOARD_URL` — PhoneLink dashboard link on the product page. Defaults to `http://phonelink.localhost:7842`; set it to `https://phonelink.gbrain.tech` in production.
- `GBRAIN_DATA_DIR` — directory for the local JSON user/device/message store. Defaults to `./data`.
- `NEXT_PUBLIC_SMS_DASHBOARD_URL` — SMS dashboard link for documentation.

Without Resend credentials, API routes return a `503` in production. In development they respond with `demo: true`.

## User accounts and SMS dashboard

Users sign up at `/dashboard/sms/login`, then connect PCs with `gbrain-cli sign-in`
from the `gbrain-sms` repository. Multiple PCs can be connected to one account;
each PC receives its own token and appears separately in the dashboard.

The SMS dashboard caches messages synced by the CLI and shows the existing
AudioLink 6-digit phone pairing code forwarded from the local bridge. The website
never receives the local AudioLink admin token.

The bundled store is file-backed at `GBRAIN_DATA_DIR/gbrain-web.json`. Mount a
persistent volume and set `SESSION_SECRET` in production, or replace the store
adapter with a shared database before running multiple app instances.

## CI

`.github/workflows/ci-cd.yml` runs formatting, linting, typechecking, unit tests, a production build, Lighthouse budgets and Playwright E2E tests on every push and pull request.

Deployment is handled by connecting this repository to the hosting provider.

## Assets

Open Graph images, favicons and illustrative product screenshots are stored in `public/`. Product screenshots are referenced by `src/components/product/ProductScreenshots.tsx`.
