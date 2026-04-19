# ShelfCheck – Implementation Plan

## Milestones

### Phase 1 – Project Setup
- [ ] Init Expo project with TypeScript template (`npx create-expo-app selfcheck --template`)
- [ ] Set up Expo Router (file-based routing)
- [ ] Init backend with Node.js + Hono
- [ ] Set up PostgreSQL locally + Prisma schema
- [ ] Run first migration (`npx prisma migrate dev --name init`)
- [ ] Set up ESLint + Prettier
- [ ] Create GitHub repo, push initial commit

### Phase 2 – Barcode Scanner + Product Fetch
- [ ] Install `expo-camera` and `expo-barcode-scanner`
- [ ] Build `BarcodeScanner.tsx` component
- [ ] Create `scan.tsx` screen
- [ ] Implement `/nutrition/:barcode` backend route
- [ ] Build `openfoodfacts.ts` API wrapper
- [ ] Parse and return: name, brand, imageUrl, calories, protein, carbs, fat, fiber, sugar, salt, nutriScore
- [ ] Implement `calculateHealthRating()` function
- [ ] Display product preview after scan with health rating badge

### Phase 3 – Product Storage
- [ ] Build `POST /products` backend route
- [ ] Add expiry date + quantity input to scan screen
- [ ] Implement `useProducts` hook (fetch all products for user)
- [ ] Build `ProductCard.tsx` component
- [ ] Build `index.tsx` (Home screen) – sorted by expiry date, traffic light filter tabs
- [ ] Build `product/[id].tsx` detail screen
- [ ] Implement `DELETE /products/:id`

### Phase 4 – Push Notifications
- [ ] Install `expo-notifications`
- [ ] Request notification permissions on first launch
- [ ] Register and store Expo push token in backend
- [ ] Add cron job to backend (check expiring products daily)
- [ ] Send push notification N days before expiry
- [ ] Build `settings.tsx` – configure warning days

### Phase 5 – Macro / Nutrition UI
- [ ] Build `MacroBar.tsx` – animated progress bar
- [ ] Show full macro breakdown on product detail screen
- [ ] Add `TrafficLight.tsx` badge (GREEN / YELLOW / RED)
- [ ] Display Nutri-Score label if available

### Phase 6 – Polish + Deployment
- [ ] Add loading skeletons for scan + home screen
- [ ] Error handling for unknown barcodes (manual entry fallback)
- [ ] App icon + splash screen
- [ ] Build APK for Android via EAS Build (`eas build --platform android`)
- [ ] Final testing on physical device

## Current Status
> Update this section as you progress

- [ ] Phase 1 in progress
- [ ] Nothing deployed yet

## Known Issues / TODOs
> Add issues here as you find them during development

- Open Food Facts API has no auth but rate limiting applies – add retry logic
- Nutri-Score not available for all products – fallback scoring must be robust

## Dependencies

### Mobile (package.json)
```json
{
  "expo": "~52.0.0",
  "expo-router": "~4.0.0",
  "expo-camera": "~16.0.0",
  "expo-barcode-scanner": "~13.0.0",
  "expo-notifications": "~0.29.0",
  "react-native": "0.76.x",
  "zod": "^3.23.0"
}
```

### Backend (package.json)
```json
{
  "hono": "^4.0.0",
  "@prisma/client": "^6.0.0",
  "prisma": "^6.0.0",
  "node-cron": "^3.0.0"
}
```
