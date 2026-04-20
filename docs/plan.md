# ShelfCheck – Implementation Plan

## Stack
- **Backend:** Convex (replaces Hono + Prisma + PostgreSQL + Docker)
- **Auth:** Convex Auth (built-in)
- **Mobile:** Expo + React Native + TypeScript + Expo Router

---

## Milestones

### Phase 1 – Project Setup
- [ ] Init Expo project with TypeScript template (`npx create-expo-app app --template blank-typescript`)
- [ ] Set up Expo Router (file-based routing)
- [ ] Init Convex in project root (`npm create convex@latest`)
- [ ] Define `convex/schema.ts` with users + products tables
- [ ] Set up ESLint + Prettier
- [ ] Create GitHub repo, push initial commit

### Phase 2 – Auth + Onboarding
- [ ] Install Convex Auth (`npm install @convex-dev/auth`)
- [ ] Configure auth provider (Email + Password via Convex Auth)
- [ ] Build `app/(auth)/welcome.tsx` – onboarding splash (logo, tagline, CTA buttons)
- [ ] Build `app/(auth)/signup.tsx` – name, email, password fields
- [ ] Build `app/(auth)/login.tsx` – email + password login
- [ ] Add auth guard in `app/_layout.tsx` – redirect unauthenticated users to `/welcome`
- [ ] Store user session via Convex Auth hooks (`useAuthActions`, `useConvexAuth`)
- [ ] Build `convex/users.ts` – `createUser` mutation, `getCurrentUser` query
- [ ] Onboarding flow after signup:
  - [ ] Step 1 – "What is ShelfCheck?" intro screen
  - [ ] Step 2 – Request notification permissions (`expo-notifications`)
  - [ ] Step 3 – "Scan your first product" CTA → navigates to scan screen

### Phase 3 – Barcode Scanner + Product Fetch
- [ ] Install `expo-camera` and `expo-barcode-scanner`
- [ ] Build `BarcodeScanner.tsx` component
- [ ] Create `app/(tabs)/scan.tsx` screen
- [ ] Build `convex/nutrition.ts` – Convex Action that fetches Open Food Facts API
- [ ] Parse and return: name, brand, imageUrl, calories, protein, carbs, fat, fiber, sugar, salt, nutriScore
- [ ] Implement `calculateHealthRating()` in `convex/lib/healthRating.ts`
- [ ] Display product preview after scan with pre-filled data + health rating badge

### Phase 4 – Product Storage
- [ ] Build `convex/products.ts` – `add`, `list`, `remove` mutations/queries
- [ ] Add expiry date + quantity input to scan screen
- [ ] Implement `useProducts` hook using `useQuery(api.products.list, { userId })`
- [ ] Build `ProductCard.tsx` component
- [ ] Build `app/(tabs)/index.tsx` – Home screen sorted by expiry, traffic light filter tabs
- [ ] Build `app/product/[id].tsx` – product detail screen
- [ ] Delete product with swipe gesture

### Phase 5 – Push Notifications
- [ ] Install `expo-notifications`
- [ ] Register Expo push token after login, store in `users` table via Convex mutation
- [ ] Build `convex/notifications.ts` – Convex scheduled function (cron) that checks expiry dates daily
- [ ] Send push notification N days before expiry via Expo Push API
- [ ] Build `app/(tabs)/settings.tsx` – configure warning days (default: 3)

### Phase 6 – Macro / Nutrition UI
- [ ] Build `MacroBar.tsx` – animated progress bar for each macro
- [ ] Show full macro breakdown on product detail screen
- [ ] Add `TrafficLight.tsx` badge (GREEN / YELLOW / RED)
- [ ] Display Nutri-Score label if available

### Phase 7 – Polish + Deployment
- [ ] Add loading skeletons for scan + home screen
- [ ] Error handling for unknown barcodes (manual entry fallback)
- [ ] App icon + splash screen
- [ ] Deploy Convex backend (`npx convex deploy`)
- [ ] Build APK for Android via EAS Build (`eas build --platform android`)
- [ ] Final testing on physical device

---

## Current Status
> Update this section as you progress

- [ ] Phase 1 in progress
- [ ] Switched from Hono + Prisma + PostgreSQL to Convex

## Known Issues / TODOs
> Add issues here as you find them during development

- Open Food Facts API has no auth but rate limiting applies – add retry logic in Convex Action
- Nutri-Score not available for all products – fallback scoring must be robust
- Convex scheduled functions need Convex Pro for cron – use `scheduler.runAfter` as free alternative

---

## Dependencies

### Mobile (`app/package.json`)
```json
{
  "expo": "~52.0.0",
  "expo-router": "~4.0.0",
  "expo-camera": "~16.0.0",
  "expo-barcode-scanner": "~13.0.0",
  "expo-notifications": "~0.29.0",
  "react-native": "0.76.x",
  "convex": "^1.0.0",
  "@convex-dev/auth": "^0.0.80"
}
```

### Convex (root `package.json`)
```json
{
  "convex": "^1.0.0"
}
```