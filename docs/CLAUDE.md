# ShelfCheck – Claude Code Instructions

@./docs/architecture.md
@./docs/plan.md

## Project Overview
ShelfCheck is a mobile app (Expo / React Native + TypeScript) for tracking food expiry dates and nutritional health ratings. Users scan barcodes, get product info automatically from Open Food Facts, and receive push notifications before items expire.

## Team
- Noah Aufner
- Matteo Greiner

## Tech Stack
- **Mobile:** Expo SDK, React Native, TypeScript, Expo Router
- **Backend:** Node.js, Hono, REST API
- **Database:** PostgreSQL + Prisma ORM
- **Barcode:** expo-camera, expo-barcode-scanner
- **Product Data:** Open Food Facts API (free, no auth required)
- **Push Notifications:** expo-notifications

## Commands
- `npx expo start` – Start Expo dev server
- `npx expo start --ios` / `--android` – Run on simulator
- `npm run dev` – Start backend (from /backend)
- `npx prisma migrate dev` – Run DB migrations
- `npx prisma studio` – Open Prisma DB GUI
- `npx tsc --noEmit` – Type check without building

## Code Conventions
- TypeScript strict mode – no `any`, use `unknown` with type guards
- Functional components only, no class components
- Custom hooks in `hooks/` prefixed with `use`
- All API calls go through `lib/api.ts` – never fetch directly in components
- Zod for all API response validation
- Error boundaries on all main screens

## Naming Conventions
- Files: `camelCase.tsx` for components, `camelCase.ts` for utils
- Components: `PascalCase`
- Types/Interfaces: `PascalCase`, interfaces prefixed with `I` only if needed for clarity
- Constants: `UPPER_SNAKE_CASE` in `constants/`

## Health Rating Logic
Traffic light system per product (not per day):
- 🟢 GREEN – Nutri-Score A/B, or low sugar/fat/salt + good protein/fiber
- 🟡 YELLOW – Nutri-Score C, or moderate values
- 🔴 RED – Nutri-Score D/E, or high sugar (>15g/100g), high calories (>400kcal/100g), high salt (>1.5g/100g)

## Git
- Branch: `feat/<feature-name>`, `fix/<bug-name>`
- Commit messages in English, imperative: "Add barcode scanner screen"
- Always run `npx tsc --noEmit` before committing

## Compact Instructions
When compacting, preserve:
- Current feature being implemented
- Any unresolved TypeScript errors
- Last migration state
- API endpoints already implemented
